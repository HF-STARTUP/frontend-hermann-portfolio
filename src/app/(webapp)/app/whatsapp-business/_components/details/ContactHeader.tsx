import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { WaContactModel } from "@/models/whatsapp/WaContactModel";

interface ContactHeaderProps {
  contact: WaContactModel;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function ContactHeader({ contact }: ContactHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2 border-b border-border px-4 py-6">
      <Avatar className="h-20 w-20">
        <AvatarFallback className="bg-vaPrimary text-2xl font-medium text-white">
          {getInitials(contact.displayName)}
        </AvatarFallback>
      </Avatar>
      <p className="text-base font-semibold text-foreground">{contact.displayName}</p>
      <p className="text-sm text-vaTextPrimary">{contact.waId}</p>
    </div>
  );
}