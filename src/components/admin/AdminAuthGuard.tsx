"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Loader2, RefreshCw } from "lucide-react";
import { AuthServiceInstance } from "@/services/portfolio/authService";
import { clearToken, isAuthenticated } from "@/services/portfolio/http";
import { Button } from "@/components/ui/button";

/**
 * Garde de route admin (client) : exige une session Sanctum valide.
 * - token absent/expiré (cookie purgé ou périmé) → /admin/login en
 *   navigation douce, sans rechargement ;
 * - token présent mais me() échoue pour une autre raison (backend
 *   injoignable, 500…) → panneau « Réessayer » plutôt qu'un spinner
 *   infini ou une redirection en boucle ;
 * - session validée par l'API → rend les enfants.
 *
 * TODO production : passer à un cookie httpOnly posé par un BFF Next
 * (recommandation spec §7.3) pour ne plus exposer le token au JS.
 */
const AdminAuthGuard: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const router = useRouter();
    const [status, setStatus] = React.useState<
        "checking" | "ok" | "denied"
    >("checking");
    // Incrémenté par « Réessayer » pour relancer la vérification.
    const [attempt, setAttempt] = React.useState(0);

    React.useEffect(() => {
        if (!isAuthenticated()) {
            router.replace("/admin/login");
            return;
        }

        let cancelled = false;
        setStatus("checking");
        AuthServiceInstance.me()
            .then(() => {
                if (!cancelled) setStatus("ok");
            })
            .catch(() => {
                if (cancelled) return;
                // 401 : le service a déjà purgé le cookie → login.
                if (isAuthenticated()) {
                    // Autre échec (réseau, 500…) : panneau local,
                    // surtout pas de rechargement en boucle.
                    setStatus("denied");
                } else {
                    router.replace("/admin/login");
                }
            });

        return () => {
            cancelled = true;
        };
    }, [router, attempt]);

    if (status === "ok") {
        return <>{children}</>;
    }

    if (status === "denied") {
        return (
            <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-4 text-center">
                <p className="max-w-sm text-sm text-muted-foreground">
                    Impossible de vérifier la session (serveur injoignable ou
                    erreur inattendue).
                </p>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<RefreshCw size={14} />}
                        onClick={() => setAttempt((current) => current + 1)}
                    >
                        Réessayer
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            clearToken();
                            router.replace("/admin/login");
                        }}
                    >
                        Se reconnecter
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-4">
            <Loader2 size={32} className="animate-spin text-vaPrimary" />
            <p className="text-sm text-muted-foreground">
                Vérification de la session…
            </p>
        </div>
    );
};

export default AdminAuthGuard;
