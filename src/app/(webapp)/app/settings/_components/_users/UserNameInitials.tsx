import { getAvatarColor, getAvatarInitials } from "@/lib/initials.avatar.util"

export const UserNameAndInitials = ({name}:{name?:string})=>{
    return(
        <div className="flex items-center gap-2">
            <div className={`rounded-full size-6 flex items-center justify-center text-white font-semibold text-xs p-1 ${getAvatarColor(name)}`}>
                { getAvatarInitials(name) }
            </div>
            <p className="truncate" title={name}> { name } </p>
        </div>
    )
}