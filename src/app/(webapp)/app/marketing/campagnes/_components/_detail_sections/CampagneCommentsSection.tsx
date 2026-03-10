import { TextArea } from "@/components/form/TextField"
import { Button } from "@/components/ui/button"
import { PageSubTitle } from "@/components/ui/custom/PageTitle"
import { Paperclip, Send, User, User2 } from "lucide-react"
import { CampagneCommentItem } from "../../_hook/useCampagneCommentsHook"
import { EmptyData } from "@/components/box/PageNetworkState"

export const CommentRow = ({ comment }: { comment: CampagneCommentItem }) => {
    return (
        <div className="flex gap-3">
            <div className="rounded-full size-10 bg-vaBlue text-white p-2 text-xs font-semibold flex items-center justify-center">
                {comment.initials}
            </div>
            <div className="flex flex-col gap-2 bg-vaTextPrimary/5 p-4 rounded-2xl border">
                <div className="flex flex-col">
                    <p className="font-semibold text-black text-base"> {comment.userName} </p>
                    <p className="text-xs text-vaLightGray"> {comment.commentDuration} </p>
                </div>
                <p className="text-sm text-vaTextPrimary">
                    {
                        comment.contentText
                    }
                </p>
            </div>
        </div>
    )
}

const CommentsList = ({ id, comments }: { id?: string, comments?:CampagneCommentItem[] }) => {
    return (
        <div className="bg-white rounded-2xl p-4 space-y-6">
            <div className="rounded-2xl p-4 border ">
                <div className="flex items-start gap-2 w-full">
                    <div className="rounded-full p-2 flex items-center justify-center bg-vaBlue text-white text-sm font-medium">
                        <p>TD</p>
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        <TextArea placeholder="Ajouter un commentaire..." />
                        <div className="w-full flex items-center justify-between">
                            <div className="flex items-center -space-x-3">
                                <Button variant="ghost" size={"icon"}>
                                    <Paperclip className="size-4 text-vaTextPrimary" />
                                </Button>
                                <Button variant="ghost" size={"icon"}>
                                    <User2 className="size-4 text-vaTextPrimary" />
                                </Button>
                            </div>
                            <Button variant={"mainBlue"}>
                                Publier <Send className="size-5 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
            <PageSubTitle subtitle={`COMMENTAIRES (${comments?.length})`} />
            {
                (comments?.length && comments.length >0) ? (comments?.map((comment)=><CommentRow comment={comment} key={comment.commentDuration} />)): <EmptyData message="Soyez le premier a commenter" />
            }
        </div>
    )
}

export default CommentsList