import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getAvatarInitials } from "@/lib/initials.avatar.util";
import WaContactModel from "@/model/whatsapp/WaContactModel";

interface ContactHeaderProps {
  contact: WaContactModel;
}

export function ContactHeader({ contact }: ContactHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2 border-b border-border px-4 py-6">
      <Avatar className="h-20 w-20">
        <AvatarFallback className="bg-vaPrimary text-2xl font-medium text-white">
          {getAvatarInitials(contact.displayName)}
        </AvatarFallback>
      </Avatar>
      <p className="text-base font-semibold text-foreground">{contact.displayName}</p>
      <p className="text-sm text-vaTextPrimary">{contact.waId}</p>
    </div>
  );
}