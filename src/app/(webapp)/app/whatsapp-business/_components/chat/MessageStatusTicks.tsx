import { Check, CheckCheck, Clock, AlertCircle } from "lucide-react";
import { WaMessageStatus } from "@/types/whatsapp.type";

interface MessageStatusTicksProps {
  status: WaMessageStatus;
}

export function MessageStatusTicks({ status }: MessageStatusTicksProps) {
  switch (status) {
    case "PENDING":
      return <Clock className="h-3.5 w-3.5 text-white/70" />;
    case "SENT":
      return <Check className="h-3.5 w-3.5 text-white/70" />;
    case "DELIVERED":
      return <CheckCheck className="h-3.5 w-3.5 text-white/70" />;
    case "READ":
      return <CheckCheck className="h-3.5 w-3.5 text-vaGreen" />;
    case "FAILED":
      return <AlertCircle className="h-3.5 w-3.5 text-vaYellow" />;
    default:
      return null;
  }
}