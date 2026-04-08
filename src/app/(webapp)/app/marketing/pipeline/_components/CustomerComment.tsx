import Badge from "@/components/display/Badge"
import { CommentItem, useCommentsHook } from "../_hooks/useCommentsHook"
import { getAvatarColor, getAvatarInitials } from "@/lib/initials.avatar.util"
import { Button } from "@/components/ui/button"
import { CornerDownLeft, Eye, Send, X } from "lucide-react"
import { useState } from "react"
import { TextArea } from "@/components/form/TextField"
import { PiEyeSlash } from "react-icons/pi"

export const CommentRow = ({ item }: { item: CommentItem }) => {
    const [isAnswer, setIsAnswer] = useState(false)
    const [isAnswersVisible, setIsAnswersVisible] = useState(false)
    return (
        <div className="p-4 rounded-2xl bg-vaLightGray/5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <div className={`rounded-full size-10 flex items-center justify-center font-semibold text-white ${getAvatarColor(item.name)}`}>
                    {
                        getAvatarInitials(item.name)
                    }
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-semibold">
                        {item.name}
                    </p>
                    <p className="text-xs text-vaTextPrimary font-norma">
                        {item.dateTime}
                    </p>
                </div>
            </div>
            <p className="text-sm">
                {
                    item.content
                }
            </p>
            <div className="">
                <Button variant={"link"} size={"sm"} className="text-vaMainBlue w-fit text-xs" onClick={() => { setIsAnswer(!isAnswer) }}>
                    {isAnswer ? <><X size={16} className="mr-1" />Annuler</> : <><CornerDownLeft size={16} className="mr-1 text-white bg-vaMainBlue rounded-sm p-0.5" />Repondre</>}
                </Button>
                {!!item.answers.length &&
                    <Button variant={"link"} size={"sm"} className="text-vaMainBlue w-fit text-xs" onClick={() => { setIsAnswersVisible(!isAnswersVisible) }}>
                        {isAnswersVisible ? <><PiEyeSlash size={16} className="mr-1" />Masquer les reponses</> : <><Eye size={16} className="mr-1" />Voir les reponses</>}
                    </Button>}
            </div>


            {
                isAnswer && (
                    <div className="w-[90%] rounded-2xl p-4 pt-0 border border-vaMainBlue ml-auto space-y-3">
                        <TextArea placeholder="Répondre en tant qu'administrateur..." />
                        <div className="space-x-2 ml-auto w-full flex items-center">
                            <Button variant={"mainBlue"} size={"sm"}>
                                Envoyer  <Send size={18} className="ml-2" />
                            </Button>
                            <Button variant={"outline"} size={"sm"} onClick={() => { setIsAnswer(false) }}>
                                Annuler
                            </Button>
                        </div>
                    </div>
                )
            }
            {
                isAnswersVisible &&
                <div className="max-w-[90%] space-y-4">
                    {
                        item.answers.map((answer, index) => (
                            <div key={index} className="p-4 rounded-2xl border-vaLightGray/50 shadow-sm border flex flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    <div className={`rounded-full size-10 flex items-center justify-center font-semibold text-white ${getAvatarColor(answer.name)}`}>
                                        {
                                            getAvatarInitials(answer.name)
                                        }
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-semibold">
                                            {answer.name}
                                        </p>
                                        <p className="text-xs text-vaTextPrimary font-norma">
                                            {answer.dateTime}
                                        </p>
                                    </div>
                                    <Badge variant="blue">
                                        {answer.adminRole}
                                    </Badge>
                                </div>
                                <p className="text-sm">
                                    {
                                        answer.constent
                                    }
                                </p>
                            </div>
                        ))
                    }
                </div>
            }
        </div >
    )
}

const CommentsList = () => {
    const { comments } = useCommentsHook()
    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-4 max-h-[calc(100dvh-460px)] overflow-y-auto custom-scrollbar">
                {
                    comments.map((item, index) => <CommentRow item={item} key={index} />)
                }
            </div>
            <div className="rounded-2xl p-4 pt-0 border border-vaTextPrimary/50 ml-auto space-y-3">
                <TextArea placeholder="Ajouter un commentaire..." />
                <div className="space-x-2 ml-auto w-full flex items-center justify-end">
                    <Button variant={"mainBlue"} size={"sm"}>
                        Envoyer  <Send size={18} className="ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CommentsList