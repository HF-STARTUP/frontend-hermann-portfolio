import { cn } from "@/lib/utils";
import { MessageStatusTicks } from "./MessageStatusTicks";
import WaMessageModel from "@/model/whatsapp/WaMessageModel";

interface MessageBubbleProps {
  message: WaMessageModel;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isOutbound = message.isOutbound;

  return (
    <div className={cn("flex w-full", isOutbound ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-3.5 py-2 text-sm shadow-sm",
          isOutbound
            ? "rounded-br-sm bg-blue-primary text-white"
            : "rounded-bl-sm border border-border bg-card text-foreground",
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.body}</p>
        <div
          className={cn(
            "mt-1 flex items-center justify-end gap-1 text-[11px]",
            isOutbound ? "text-white/70" : "text-vaTextPrimary",
          )}
        >
          <span>{message.timeLabel}</span>
          {isOutbound && <MessageStatusTicks status={message.status} />}
        </div>
        {message.status === "FAILED" && (
          <p className="mt-1 text-[11px] text-vaYellow">
            Échec d'envoi{message.errorMessage ? ` — ${message.errorMessage}` : ""}
          </p>
        )}
      </div>
    </div>
  );
}