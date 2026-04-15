import { getAvatarColor, getAvatarInitials } from "@/lib/initials.avatar.util"
import Image from "next/image"

export const UserNameAndInitials = ({ name, imageUrl }: { name?: string, imageUrl?: string }) => {
    return (
        <div className="flex items-center gap-2">
            {imageUrl ? (
                <div className="size-6 rounded-full overflow-hidden shrink-0">
                    <Image
                        src={imageUrl}
                        alt={name || "Avatar"}
                        width={24}
                        height={24}
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className={`rounded-full size-6 flex items-center justify-center text-white font-semibold text-xs p-1 shrink-0 ${getAvatarColor(name)}`}>
                    {getAvatarInitials(name)}
                </div>
            )}
            <p className="truncate" title={name}> {name} </p>
        </div>
    )
}