import { cn } from "@/lib/utils";
import { WaConversationStatus } from "@/types/whatsapp.type";

interface StatusBadgeProps {
  status: WaConversationStatus;
  className?: string;
}

const STATUS_CONFIG: Record<WaConversationStatus, { label: string; className: string }> = {
  OPEN: { label: "Ouvert", className: "bg-vaDarkGreen text-vaGreen" },
  PENDING: { label: "En attente", className: "bg-vaDarkPurple text-vaPurple" },
  ASSIGNED: { label: "Assigné", className: "bg-vaDarkBlue text-blue-primary" },
  CLOSED: { label: "Clôturé", className: "bg-muted text-muted-foreground" },
  BOT: { label: "Bot", className: "bg-vaDarkPurple text-vaPurple" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}