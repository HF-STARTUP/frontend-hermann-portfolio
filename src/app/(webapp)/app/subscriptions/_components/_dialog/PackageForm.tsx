import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { usePackageForm } from "../../_hooks/usePackageForm"
import { DialogMainBody } from "@/components/display/DialogMainBody"
import { DialogFooter } from "@/components/display/DialogFooter"
import { Button } from "@/components/ui/button"
import { PackageStep1 } from "../_form_steps/Step1"
import { ChevronLeft } from "lucide-react"
import { PackageStep2 } from "../_form_steps/Step2"
import { PackageStep3 } from "../_form_steps/Step3"
import { PackageOverview } from "../_form_steps/Overview"
import { useCreateSubscriptionPackage } from "@/hooks/subscription/useSubscription"
import { useEffect } from "react"

const PackageForm = ({ isOpenned, onClose, action = "add" }: { isOpenned: boolean, onClose: () => void, action?: "add" | "edit" }) => {
    const { step, handleGoToNext, handleBack, formData, updateFormData, isLastStep, reset, canSubmit } = usePackageForm()
    const createPackage = useCreateSubscriptionPackage()

    useEffect(() => {
        if (createPackage.isSuccess) {
            reset()
            onClose()
        }
    }, [createPackage.isSuccess, onClose, reset])

    const handlePrimaryAction = () => {
        if (!isLastStep) {
            handleGoToNext()
            return
        }

        if (!canSubmit()) return
        createPackage.handleMutation(formData)
    }

    return (
        <Dialog open={isOpenned} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center justify-between pr-8">
                        <div className="flex items-center">
                            {step > 1 && <Button variant={"ghost"} size={"icon"} onClick={() => handleBack()}>
                                <ChevronLeft />
                            </Button>}
                            <DialogTitle> {step == 1 ? (action=="add"?"Créer un package":"Modifier un package") : step == 2 ? "Tarifactions" : "Aperçu"} </DialogTitle>
                        </div>

                       {step < 3 && <p className="text-vaTextPrimary">Étape {step}/2</p>}
                    </div>
                </DialogHeader>
                <DialogMainBody>
                    {step === 1 && (
                        <PackageStep1
                            data={formData}
                            onChange={(val) => updateFormData(val)}
                        />
                    )}
                    {step === 2 && (
                        <PackageStep2
                            data={formData}
                            onChange={updateFormData}
                        />
                    )}
                    {/* {step === 3 && (
                        <PackageStep3
                            data={formData}
                            onChange={(val) => updateFormData({ features: val })}
                        />
                    )} */}

                       {step === 3 && (
                        <PackageOverview
                            data={formData}
                        />
                    )}
                </DialogMainBody>
                <DialogFooter>
                    <Button
                        variant={"mainBlue"}
                        onClick={handlePrimaryAction}
                        fullWidth
                        loading={createPackage.loading}
                    >
                        {isLastStep ? "Ajouter" : "Suivant"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default PackageForm