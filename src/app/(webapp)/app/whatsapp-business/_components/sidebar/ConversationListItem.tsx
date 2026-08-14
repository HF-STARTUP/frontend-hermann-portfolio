"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UnreadBadge } from "./UnreadBadge";
import WaConversationModel from "@/model/whatsapp/WaConversationModel";
import { getAvatarInitials } from "@/lib/initials.avatar.util";

interface ConversationListItemProps {
  conversation: WaConversationModel;
  active: boolean;
  onSelect: (id: string) => void;
}

export function ConversationListItem({ conversation, active, onSelect }: ConversationListItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(conversation.id)}
      className={cn(
        "flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-accent",
        active && "bg-vaDarkBlue hover:bg-vaDarkBlue",
      )}
    >
      <Avatar className="h-11 w-11 shrink-0">
        <AvatarFallback className="bg-vaPrimary text-sm font-medium text-white">
          {getAvatarInitials(conversation.displayName)}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-semibold text-foreground">
            {conversation.displayName}
          </span>
          <span className="shrink-0 text-xs text-vaTextPrimary">
            {conversation.lastMessageTimeLabel}
          </span>
        </div>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <span className="truncate text-sm text-vaLightGray">
            {conversation.lastMessagePreview}
          </span>
          <UnreadBadge count={conversation.unreadCount} />
        </div>
        {!conversation.sessionWindowOpen && (
          <span className="mt-1 inline-block text-xs text-vaOrange">
            Fenêtre 24h fermée
          </span>
        )}
      </div>
    </button>
  );
}