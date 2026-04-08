import { DialogFooter } from "@/components/display/DialogFooter"
import { DialogMainBody } from "@/components/display/DialogMainBody"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import AuthManagerGuard, { ConnexionMode } from "@/guard/AuthManagerGuard"
import { ArrowLeftRight } from "lucide-react"

export const SwitchLoggingMode = ({isOpenned, onClose}:{isOpenned: boolean, onClose: ()=>void}) => {
    const handleSwitch = ()=>{
        const mode = AuthManagerGuard.getConnexionMode
    
        if (mode == "staging") {
            AuthManagerGuard.setConnexionMode(ConnexionMode.Production)
        } else {
            AuthManagerGuard.setConnexionMode(ConnexionMode.Staging)
        }
    
        onClose()
        window.location.reload()
    }
    return (
        <Dialog open={isOpenned} onOpenChange={onClose} >
            <DialogContent>
                <DialogMainBody className="flex items-center justify-center">
                    <div className="space-y-4 flex items-center justify-center flex-col max-w-96">
                        <div className="rounded-full size-24 p-2 bg-vaDarkBlue text-vaMainBlue flex items-center justify-center">
                            <ArrowLeftRight className="size-12" />
                        </div>
                        <p className="text-center font-semibold text-2xl">
                            {AuthManagerGuard.getConnexionMode == ConnexionMode.Staging ? "Passage en Production" : "Passage en Test"}
                        </p>
                        <p className="text-center text-sm text-vaTextPrimary">
                            {
                                AuthManagerGuard.getConnexionMode == ConnexionMode.Staging ?
                                    "Vous allez être redirigé vers le portail de Production. Cet espace utilise les données réelles et les transactions actives de la plateforme." :
                                    "Vous allez être redirigé vers le portail de Test. Dans cet espace, vous pouvez simuler des opérations sans impacter les données réelles."
                            }
                        </p>
                    </div>
                </DialogMainBody>
                <DialogFooter>
                    <div className="grid grid-cols-2 gap-8">
                        <Button variant={"outline"} fullWidth={true} onClick={()=>onClose()}>
                            Annuler
                        </Button>
                        <Button variant={"mainBlue"} fullWidth={true} onClick={()=>handleSwitch()}>
                            Confirmer
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}