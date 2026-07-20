import { DialogFooter } from "@/components/display/DialogFooter";
import { DialogMainBody } from "@/components/display/DialogMainBody";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useFleetFormHook } from "../../_hook/useFleetFormHook";
import { useState, useEffect } from "react";
import ProfilStep from "../steps/ProfileStep";
import FlotteStep from "../steps/FleetDetailsStep";
import SubscriptionStep from "../steps/SubscriptionStep";

type FleetFormStep = 1 | 2 | 3;

const stepTitles: Record<FleetFormStep, string> = {
    1: "Profil du propriétaire",
    2: "Informations de la flotte",
    3: "Plan d'abonnement",
};

export default function FleetFromDialog({ isOpen, onClose, action, fleetId }: { isOpen: boolean, onClose: () => void, action: "create" | "edit", fleetId?: string }) {

    const {
        cities,
        countries,
        isLoadingCities,
        selectedCountry,
        setSelectedCountry,

        formData,
        handleCreate,
        isSubmiting,
        isSuccess,
        updateField,
        validateStep,
        goToStep
    } = useFleetFormHook()

    const [currentStep, setCurrentStep] = useState<FleetFormStep>(1);

    const handleClose = () => {
        setCurrentStep(1);
        onClose();
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((step) => (step < 3 ? (step + 1) as FleetFormStep : step));
            goToStep(currentStep + 1 as FleetFormStep);
        }
    };

    const handlePrevious = () => {
        setCurrentStep((step) => (step > 1 ? (step - 1) as FleetFormStep : step));
        goToStep(currentStep - 1 as FleetFormStep);
    };

    const handleSubmit = () => {
        if (validateStep(3)) {
            handleCreate();
        }
    };

    useEffect(() => {
        if (isSuccess) {
            handleClose()
        }
    }, [isSuccess]);


    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{action === "create" ? "Ajouter une flotte" : "Modifier une flotte"} — {stepTitles[currentStep]}</DialogTitle>
                </DialogHeader>
                <DialogMainBody>
                    {currentStep === 1 && (
                        <ProfilStep
                            formData={formData}
                            updateField={updateField}
                        />
                    )}
                    {currentStep === 2 && (
                        <FlotteStep
                            formData={formData}
                            updateField={updateField}
                            countries={countries}
                            cities={cities}
                            isLoadingCities={isLoadingCities}
                            setSelectedCountry={setSelectedCountry}
                            selectedCountry = {selectedCountry}
                        />
                    )}
                    {currentStep === 3 && (
                        <SubscriptionStep
                            formData={formData}
                            updateField={updateField}
                            selectedCountry={selectedCountry}
                        />
                    )}
                </DialogMainBody>
                <DialogFooter>
                    <div className="flex w-full gap-3">
                        {currentStep > 1 && (
                            <Button
                                variant="outline"
                                className="rounded-xl"
                                fullWidth
                                onClick={handlePrevious}
                            >
                                Précédent
                            </Button>
                        )}
                        {currentStep < 3 ? (
                            <Button
                                variant="mainBlue"
                                className="rounded-xl"
                                fullWidth
                                onClick={handleNext}
                            >
                                Suivant
                            </Button>
                        ) : (
                            <Button
                                variant="mainBlue"
                                className="rounded-xl"
                                fullWidth
                                onClick={handleSubmit}
                                loading={isSubmiting}
                            >
                                {(action === "create" ? "Ajouter la flotte" : "Modifier la flotte")}
                            </Button>
                        )}
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}