# Intégration Admin — Répondre aux messages WhatsApp

Documentation d’intégration pour le **back-office VTC Control**.

> **Principe produit**  
> L’administrateur (ROOT / OWNER / ADMIN) **répond aux clients uniquement depuis l’interface Admin**.  
> Il n’utilise pas l’app WhatsApp Business sur téléphone pour le support VTC.  
> Tout le cycle se fait dans l’admin : voir les messages → répondre → suivre le statut → clôturer.

Architecture côté Meta (webhook, tokens) : [`whatsapp-admin-chat.md`](./whatsapp-admin-chat.md).

---

## 1. Ce que l’admin doit pouvoir faire

| Action | Depuis l’admin | Route API |
|--------|----------------|-----------|
| Voir les conversations entrantes | Inbox WhatsApp | `GET /whatsapp/conversations` |
| Ouvrir un fil de discussion | Écran chat | `GET /whatsapp/conversations/{id}/messages` |
| **Répondre au client** | Composer (textarea + Envoyer) | `POST /whatsapp/conversations/{id}/messages` |
| Voir si le message est envoyé / livré / lu | Sous la bulle | champs `status` (+ polling) |
| S’assigner une conversation | Bouton « Prendre en charge » | `POST .../assign` |
| Clôturer / rouvrir | Actions conversation | `POST .../close` / `.../reopen` |
| Voir le contact (+ fiche VTC) | Panneau latéral | `GET /whatsapp/contacts/{wa_id}` |

**Hors Phase 1 :** auto-réponses, IA, templates hors 24h, envoi d’images depuis l’admin.

---

## 2. Où placer la fonctionnalité dans l’Admin

Proposition de navigation :

```text
Admin VTC Control
 └── Support
      └── WhatsApp          ← nouvel écran
           ├── Inbox
           └── Conversation /:id
```

Menu visible uniquement si le profil connecté a un rôle :

- `ROOT` (`role_id = 1`)
- `OWNER` (`role_id = 2`)
- `ADMIN` (`role_id = 3`)

Sinon : masquer le menu (ou page 403).

Route front suggérée :

```text
/admin/support/whatsapp
/admin/support/whatsapp/:conversationId
```

---

## 3. Parcours admin (réponse manuelle)

```text
Client écrit sur WhatsApp
        │
        ▼
Webhook Meta → API VTC (persiste la conversation)
        │
        ▼
Admin ouvre « Support → WhatsApp »
        │
        ▼
Inbox : nouvelles conversations (badge non lus)
        │
        ▼
Admin clique une conversation
        │
        ▼
Chat : messages du client à gauche, réponses admin à droite
        │
        ▼
Admin tape sa réponse dans le composer
        │
        ▼
Clic « Envoyer »
        │
        ▼
POST /whatsapp/conversations/{id}/messages
        │
        ▼
API envoie via Meta → le client reçoit sur WhatsApp
        │
        ▼
Statut mis à jour : SENT → DELIVERED → READ
```

**Point clé :** le texte saisi dans l’admin est exactement ce que le client reçoit sur WhatsApp. Aucune autre interface n’est requise pour répondre.

---

## 4. Auth (obligatoire sur toutes les routes admin)

```http
Authorization: Bearer <token_admin>
profile_id: <uuid_du_profil_connecté>
Content-Type: application/json
```

Base URL :

```text
{API_BASE}/whatsapp
# ex. https://api.example.com/whatsapp
# ou  https://api.example.com/api/whatsapp
```

Réponse standard :

```json
{
  "code": 5000,
  "message": "Success",
  "data": {}
}
```

| `code` | Signification |
|--------|----------------|
| `5000` | OK |
| `5001` | Erreur métier |
| `5003` | Introuvable |

---

## 5. Écran Inbox — intégration

### 5.1 Appel

```http
GET /whatsapp/conversations?status=OPEN&assigned_to=me&page=1&limit=20&search=
```

| Query | Usage UI |
|-------|----------|
| `status` | Onglets : Ouvertes / Assignées / Clôturées (`OPEN`, `ASSIGNED`, `CLOSED`…) |
| `assigned_to=me` | Filtre « Mes conversations » |
| `search` | Recherche nom / numéro |
| `page` / `limit` | Pagination |

### 5.2 Ce qu’afficher par ligne

| Champ API | UI |
|-----------|-----|
| `contact.profile_name` | Titre (sinon `contact.wa_id`) |
| `contact.wa_id` | Sous-titre (numéro) |
| `last_message.body` | Aperçu |
| `last_message_at` | Heure |
| `unread_count` | Badge |
| `session_window_open` | ⚠️ si `false` (« hors 24h ») |
| `assigned_to` | Avatar / « Non assigné » |

### 5.3 Exemple `data`

```json
{
  "page": 1,
  "limit": 20,
  "total": 3,
  "items": [
    {
      "id": "conv-uuid",
      "status": "OPEN",
      "unread_count": 2,
      "session_window_open": true,
      "last_message_at": "2026-07-23T12:00:00.000Z",
      "contact": {
        "wa_id": "22507XXXXXXX",
        "profile_name": "Jean Dupont",
        "profile_id": "profile-uuid-or-null"
      },
      "last_message": {
        "direction": "INBOUND",
        "body": "Bonjour, j'ai un souci d'abonnement",
        "created_at": "2026-07-23T12:00:00.000Z"
      }
    }
  ]
}
```

Clic ligne → naviguer vers `/admin/support/whatsapp/{id}`.

---

## 6. Écran Chat — répondre depuis l’admin

C’est **l’écran principal** de la fonctionnalité.

### Layout suggéré

```text
┌──────────────────────────────┬─────────────────────┐
│ Header : nom + wa_id         │ Contact / fiche VTC │
│ [Prendre en charge] [Clôturer]│                     │
├──────────────────────────────┤                     │
│                              │                     │
│  [Client] Bonjour…           │                     │
│           [Admin] Bonjour !  │                     │
│  [Client] Mon abonnement…    │                     │
│                              │                     │
├──────────────────────────────┤                     │
│ [ Composer texte…… ] [Envoyer]│                     │
└──────────────────────────────┴─────────────────────┘
```

### 6.1 Charger le détail

```http
GET /whatsapp/conversations/{id}
```

Utiliser `session_window_open` :

- `true` → composer **actif**
- `false` → composer **désactivé** + message :  
  « La fenêtre de 24 h est fermée. Le client doit d’abord écrire, ou utiliser un template (bientôt). »

### 6.2 Charger les messages

```http
GET /whatsapp/conversations/{id}/messages?page=1&limit=50
```

Effet : marque la conversation comme lue côté API (`unread_count → 0`).

**Rendu des bulles :**

| `direction` | Affichage |
|-------------|-----------|
| `INBOUND` | Message **client** (gauche) |
| `OUTBOUND` | Message **admin** (droite) |

Sous chaque message **OUTBOUND**, afficher `status` :

| `status` | Label |
|----------|-------|
| `PENDING` | Envoi… |
| `SENT` | Envoyé |
| `DELIVERED` | Livré |
| `READ` | Lu |
| `FAILED` | Échec (`error_message`) |

### 6.3 Envoyer la réponse (cœur de l’intégration)

Quand l’admin clique **Envoyer** :

```http
POST /whatsapp/conversations/{id}/messages
Authorization: Bearer …
profile_id: …
Content-Type: application/json

{
  "type": "text",
  "body": "Bonjour, nous avons bien reçu votre demande. Pouvez-vous préciser votre park ?"
}
```

**Succès (`code: 5000`)** — ajouter la bulle retournée dans le fil :

```json
{
  "id": "msg-uuid",
  "direction": "OUTBOUND",
  "type": "text",
  "body": "Bonjour, nous avons bien reçu votre demande...",
  "wamid": "wamid.XXX",
  "status": "SENT",
  "agent_profile_id": "uuid-admin-connecté",
  "is_auto_reply": false,
  "created_at": "2026-07-23T12:05:00.000Z"
}
```

**Erreurs à gérer dans le composer :**

| Cas | Message API typique | UI |
|-----|---------------------|-----|
| Fenêtre 24h fermée | `SESSION_WINDOW_CLOSED` | Bloquer envoi + explication |
| Texte vide | `body requis` | Validation locale avant POST |
| Conversation absente | `NOT_FOUND` | Retour inbox |
| Échec Meta | message Graph | Toast + éventuelle bulle `FAILED` |

### 6.4 Pseudo-code front (réponse admin)

```ts
async function adminReply(conversationId: string, text: string) {
  const body = text.trim();
  if (!body) throw new Error("Message vide");

  // Désactiver le bouton Envoyer pendant l'appel
  const res = await api.post(
    `/whatsapp/conversations/${conversationId}/messages`,
    { type: "text", body },
  );

  if (res.code !== 5000) {
    // Afficher res.message (ex. SESSION_WINDOW_CLOSED)
    throw new Error(res.message);
  }

  // Ajouter res.data dans le state des messages
  appendMessage(res.data);
  clearComposer();
}
```

---

## 7. Actions admin complémentaires

### Prendre en charge (s’assigner)

```http
POST /whatsapp/conversations/{id}/assign
{ "assigned_to": "<profile_id_admin>" }
```

Ou body `{}` selon besoin métier (l’API peut s’auto-assigner à l’agent connecté).

Désassigner :

```json
{ "assigned_to": null }
```

### Clôturer

```http
POST /whatsapp/conversations/{id}/close
```

### Rouvrir

```http
POST /whatsapp/conversations/{id}/reopen
```

### Fiche contact (panneau droit)

```http
GET /whatsapp/contacts/{wa_id}
```

Si `profile_id` est renseigné → bouton **« Ouvrir la fiche VTC »** vers l’écran profil existant.

---

## 8. Rafraîchissement (nouveaux messages pendant que l’admin est connecté)

Pas encore de socket WhatsApp dédié.

**Phase 1 — polling recommandé :**

| Écran | Intervalle | Appel |
|-------|------------|-------|
| Inbox | 5–8 s | `GET /whatsapp/conversations?...` |
| Chat ouvert | 3–5 s | `GET /whatsapp/conversations/{id}/messages?limit=50` |

Quand un nouveau `INBOUND` apparaît pendant que l’admin tape → l’insérer dans le fil (sans écraser le brouillon du composer).

---

## 9. Composants front à créer

| Composant | Rôle |
|-----------|------|
| `WhatsAppInboxPage` | Liste + filtres |
| `WhatsAppConversationPage` | Chat + composer |
| `WhatsAppMessageBubble` | Bulle + statut |
| `WhatsAppComposer` | Textarea + Envoyer (disabled si hors 24h) |
| `WhatsAppContactPanel` | Infos contact / lien profil |
| `whatsappApi.ts` | Client HTTP des routes `/whatsapp/*` |

Le composer est **réservé à l’admin connecté** : c’est le seul point d’entrée pour répondre.

---

## 10. Types utiles

```ts
type WaDirection = "INBOUND" | "OUTBOUND";
type WaMessageStatus = "PENDING" | "SENT" | "DELIVERED" | "READ" | "FAILED";
type WaConversationStatus = "OPEN" | "PENDING" | "ASSIGNED" | "CLOSED" | "BOT";

interface SendAdminReplyBody {
  type?: "text";
  body: string; // texte saisi par l'administrateur
}
```

---

## 11. Checklist intégration Admin (réponse)

### Menu & droits
- [ ] Entrée menu **Support → WhatsApp**
- [ ] Visible seulement ROOT / OWNER / ADMIN
- [ ] Headers `Authorization` + `profile_id` sur tous les appels

### Inbox
- [ ] Liste des conversations
- [ ] Badge non lus
- [ ] Filtres statut / mes conversations / recherche
- [ ] Navigation vers le chat

### Chat — répondre
- [ ] Afficher messages client + admin
- [ ] Composer texte dans l’admin
- [ ] Bouton **Envoyer** → `POST .../messages`
- [ ] Afficher la réponse immédiatement après succès
- [ ] Afficher SENT / DELIVERED / READ / FAILED
- [ ] Bloquer l’envoi si `session_window_open === false`
- [ ] Toast d’erreur si échec Meta

### Actions
- [ ] Prendre en charge / assigner
- [ ] Clôturer / rouvrir
- [ ] Lien fiche VTC si `profile_id`

### Qualité
- [ ] Polling inbox + chat
- [ ] Ne jamais appeler Graph Meta depuis le front (uniquement API VTC)
- [ ] Ne pas utiliser `/ticket/webhook` pour ce chat

---

## 12. Recette QA (côté admin)

1. Un numéro client envoie « Bonjour » sur WhatsApp Business.
2. L’admin ouvre **Support → WhatsApp** → voit la conversation (badge).
3. L’admin ouvre le chat → lit le message.
4. L’admin répond depuis le composer : « Bonjour, comment pouvons-nous vous aider ? »
5. Le client reçoit le message sur WhatsApp.
6. Dans l’admin, le statut passe Envoyé → Livré → Lu.
7. L’admin clôture la conversation.

---

## 13. Récap routes (admin uniquement)

| Méthode | Route | Pour l’admin |
|---------|-------|--------------|
| `GET` | `/whatsapp/conversations` | Inbox |
| `GET` | `/whatsapp/conversations/{id}` | Détail + fenêtre 24h |
| `GET` | `/whatsapp/conversations/{id}/messages` | Fil de chat |
| `POST` | `/whatsapp/conversations/{id}/messages` | **Répondre** |
| `POST` | `/whatsapp/conversations/{id}/assign` | Assigner |
| `POST` | `/whatsapp/conversations/{id}/close` | Clôturer |
| `POST` | `/whatsapp/conversations/{id}/reopen` | Rouvrir |
| `GET` | `/whatsapp/contacts/{wa_id}` | Fiche contact |
| `GET` | `/whatsapp/config-status` | Debug config |

Les webhooks `GET|POST /whatsapp/webhook` sont **Meta → serveur** : le front admin ne les appelle pas.

---

## Résumé

- **Tout se fait depuis l’Admin** : lecture + réponse + suivi + clôture.
- L’intégration front = écran inbox + écran chat avec composer branché sur  
  `POST /whatsapp/conversations/{id}/messages`.
- Le client WhatsApp reçoit la réponse envoyée par l’administrateur via l’API VTC (Meta Graph en backend).
