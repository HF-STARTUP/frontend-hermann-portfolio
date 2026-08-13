import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getAvatarInitials } from "@/lib/initials.avatar.util";

interface AgentAvatarProps {
    name?: string;
}

export function AgentAvatar({ name = "Non assigné" }: AgentAvatarProps) {
    return (
        <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-vaMainBlue text-[10px] font-medium text-white">
                {name === "Non assigné" ? "?" : getAvatarInitials(name)}
            </AvatarFallback>
        </Avatar>
    );
}