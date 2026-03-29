import { DialogFooter } from "@/components/display/DialogFooter";
import { DialogMainBody } from "@/components/display/DialogMainBody";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PageSubTitle } from "@/components/ui/custom/PageTitle";
import UserProfile from "@/model/user/User";
import { UserRoundCheck, UserRoundX } from "lucide-react";
import { useDeactivateOrActivateAdmin } from "@/hooks/admin/useSettingsHook";
import { useEffect } from "react";

interface UserToggleProps {
    isOpenned: boolean;
    onClose: () => void;
    userId?: string;
    user?: UserProfile;
    action?: "enable" | "disable";
}

export const UserToggleDialog = ({ isOpenned, onClose, userId, action = "enable", user }: UserToggleProps) => {    
    const { data, isSuccess, loading, onToggleStatus } = useDeactivateOrActivateAdmin()

    const handleToggleStatus = (id: string)=>{
        onToggleStatus(id);
    }

    useEffect(() => {
        if (isSuccess) {
            onClose()
        }
    }, [isSuccess]);

    return (
        <Dialog open={isOpenned}>
            <DialogContent>
                <DialogMainBody className="space-y-4">
                    <div className="flex flex-col items-center justify-center gap-6 max-w-[80%] mx-auto">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className={`rounded-full p-4 size-24 flex items-center justify-center ${action == "enable" ? "bg-vaDarkGreen text-vaGreen" : "bg-vaRed/10 text-vaRed"}`}>
                                {action == "enable" ? <UserRoundCheck size={44} /> : <UserRoundX size={44} />}
                            </div>
                            <PageSubTitle subtitle={action == "enable" ? "Réactiver l'utilisateur" : "Désactiver l'utilisateur"} />
                        </div>
                        {action == "disable" &&
                            <p className="text-center text-vaTextPrimary text-sm ">
                                Êtes-vous sûr de vouloir désactiver <strong> {user?.getUsername} </strong>  ? Cet utilisateur ne pourra plus se connecter à l'application.
                            </p>}
                        {action == "enable" &&
                            <p className="text-center text-vaLightGray text-sm ">
                                Êtes-vous sûr de vouloir réactiver <strong className="font-bold text-vaTextPrimary"> {user?.getUsername} </strong>  ? Cet utilisateur pourra à nouveau se connecter à l'application.
                            </p>}
                    </div>
                </DialogMainBody>
                <DialogFooter>
                    <div className="grid grid-cols-2 gap-8">
                        <Button variant={"outline"} onClick={onClose}>
                            Annuler
                        </Button>
                        <Button variant={action=="enable"?"success":"destructive"} loading={loading} onClick={()=>handleToggleStatus(user?.getID ?? "")}>
                            Confirmer
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}