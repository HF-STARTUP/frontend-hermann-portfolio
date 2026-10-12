import { Skeleton } from "@/components/ui/skeleton";

/**
 * Squelette de chargement des listes admin (shimmer), imitant le rendu
 * des rangées `rounded-2xl border p-5` utilisées par les pages.
 */
const ListSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => (
    <div className="flex flex-col gap-3" aria-busy="true">
        {Array.from({ length: rows }).map((_, index) => (
            <div
                key={index}
                className="flex items-center justify-between gap-4 rounded-2xl border border-vaPrimary/20 bg-vaSecondary/10 p-5"
            >
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-72 max-w-full" />
                </div>
                <Skeleton className="size-9 shrink-0 rounded-xl" />
            </div>
        ))}
    </div>
);

/**
 * Panneau d'échec de chargement (requête rejetée sans aucune donnée) —
 * distingue l'erreur réseau d'un vrai état vide.
 */
export const QueryErrorPanel: React.FC<{ message?: string }> = ({
    message = "Impossible de charger les données. Vérifiez que le serveur est joignable, puis rechargez.",
}) => (
    <p className="rounded-2xl border border-dashed border-destructive/40 bg-destructive/5 p-10 text-center text-sm text-destructive">
        {message}
    </p>
);

export default ListSkeleton;
