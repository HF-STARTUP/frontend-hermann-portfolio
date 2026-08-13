whatsapp-business/
            ├── page.tsx                          # écran principal (3 colonnes)
            ├── layout.tsx                         # garde de rôle ROOT/OWNER/ADMIN
            │
            ├── [conversationId]/
            │   └── page.tsx                       # même shell, colonne chat active
            │
            └── _components/
                │
                ├── shell/
                │   ├── WhatsAppShell.tsx           # grille 3 colonnes, gère l'ouverture/fermeture du panneau détails
                │   ├── SidebarColumn.tsx
                │   ├── ChatColumn.tsx
                │   └── DetailsColumn.tsx           # rétractable, comme le panneau "i" de WA Desktop
                │
                ├── sidebar/
                │   ├── SidebarHeader.tsx            # titre + icône filtre
                │   ├── ConversationSearchBar.tsx
                │   ├── ConversationStatusTabs.tsx   # Ouvertes/Assignées/Clôturées/Mes conversations
                │   ├── ConversationList.tsx
                │   ├── ConversationListItem.tsx     # avatar, nom, aperçu dernier msg, heure, badge
                │   ├── ConversationAvatar.tsx        # initiales si pas de photo
                │   ├── UnreadBadge.tsx
                │   └── EmptyInboxState.tsx
                │
                ├── chat/
                │   ├── ChatHeader.tsx                # avatar + nom + wa_id + menu actions
                │   ├── ChatHeaderActionsMenu.tsx     # Prendre en charge / Clôturer / Rouvrir
                │   ├── ToggleDetailsButton.tsx       # ouvre/ferme DetailsColumn
                │   ├── MessageList.tsx               # scroll + pagination vers le haut
                │   ├── DateSeparator.tsx             # "Aujourd'hui", "23 juillet"
                │   ├── MessageBubble.tsx             # INBOUND gauche / OUTBOUND droite
                │   ├── MessageStatusTicks.tsx        # ✓ / ✓✓ / ✓✓ bleu, à la WhatsApp
                │   ├── ScrollToBottomButton.tsx      # apparaît si on remonte dans l'historique
                │   ├── SessionWindowBanner.tsx       # bandeau si fenêtre 24h fermée
                │   ├── Composer.tsx                  # orchestre input + boutons
                │   ├── ComposerTextarea.tsx           # auto-resize, disabled si !canReply
                │   ├── EmojiPickerButton.tsx
                │   ├── AttachmentButton.tsx           # visible mais désactivé (hors Phase 1)
                │   └── SendButton.tsx
                │
                ├── details/
                │   ├── ContactHeader.tsx              # grand avatar + nom + numéro, centré
                │   ├── ContactInfoList.tsx            # date premier contact, etc.
                │   ├── OpenVtcProfileButton.tsx       # si profile_id renseigné
                │   ├── ConversationTagsSection.tsx
                │   ├── InternalNotesSection.tsx       # notes invisibles au client
                │   └── ConversationActionsSection.tsx # assigner/clôturer, redondant avec le menu header
                │
                └── shared/
                    ├── AgentAvatar.tsx
                    ├── StatusBadge.tsx
                    └── EmptyState.tsx                 # état "aucune conversation sélectionnée"










models/
└── whatsapp/
    ├── WaConversationModel.ts       # status, unreadCount, sessionWindowOpen, contact, lastMessage
    ├── WaMessageModel.ts            # direction, type, status, body, wamid, createdAt
    └── WaContactModel.ts            # waId, profileName, profileId

hooks/
└── whatsapp/
    ├── useWaConversations.ts        # GET /whatsapp/conversations (+ polling 5–8s)
    ├── useWaConversation.ts         # GET /whatsapp/conversations/{id}
    ├── useWaMessages.ts             # GET .../messages (+ polling 3–5s)
    ├── useSendWaMessage.ts          # POST .../messages
    ├── useAssignWaConversation.ts   # POST .../assign
    ├── useCloseWaConversation.ts    # POST .../close
    ├── useReopenWaConversation.ts   # POST .../reopen
    └── useWaContact.ts              # GET /whatsapp/contacts/{wa_id}

lib/
└── whatsappApi.ts                  # client HTTP /whatsapp/*, gère Authorization + profile_id

types/
└── whatsapp.ts