"use client";

import { MoreVertical, Info } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "../shared/StatusBadge";
import WaConversationModel from "@/model/whatsapp/WaConversationModel";
import { getAvatarInitials } from "@/lib/initials.avatar.util";

interface ChatHeaderProps {
  conversation: WaConversationModel;
  onToggleDetails: () => void;
  onAssignToMe: () => void;
  onClose: () => void;
  onReopen: () => void;
}

export function ChatHeader({
  conversation,
  onToggleDetails,
  onAssignToMe,
  onClose,
  onReopen,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-border bg-background px-4 py-3">
      <button
        type="button"
        onClick={onToggleDetails}
        className="flex min-w-0 items-center gap-3 text-left"
      >
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback className="bg-vaPrimary text-sm font-medium text-white">
            {getAvatarInitials(conversation.displayName)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {conversation.displayName}
          </p>
          <p className="truncate text-xs text-vaTextPrimary">{conversation.waId}</p>
        </div>
      </button>

      <div className="flex items-center gap-2">
        <StatusBadge status={conversation.status} />
        <Button variant="ghost" size="icon" onClick={onToggleDetails}>
          <Info className="h-4 w-4 text-vaTextPrimary" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4 text-vaTextPrimary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onAssignToMe}>
              Prendre en charge
            </DropdownMenuItem>
            {conversation.status === "CLOSED" ? (
              <DropdownMenuItem onClick={onReopen}>Rouvrir</DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={onClose}>Clôturer</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}