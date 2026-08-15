import { DialogFooter } from "@/components/display/DialogFooter";
import { DialogMainBody } from "@/components/display/DialogMainBody";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUsersFormHook } from "../../_hook/useUsersFormHook";
import { PageSubTitle } from "@/components/ui/custom/PageTitle";
import { useCountries } from "@/hooks/location/useCountry/useCountry";
import { useEffect, useState } from "react";
import { LocationAccordion } from "../CountriesCitiesAccordion";
import Loading from "@/components/ui/Loader";

interface UserFormProps {
    isOpenned: boolean;
    onClose: () => void;
    userId?: string;
    action?: "add" | "edit";
}

export const UserFormDialog = ({ isOpenned, onClose, userId, action = "add" }: UserFormProps) => {
    const {
        isLoadingRoles,
        roleList,
        formData,
        setFormData,
        handleAddAdmin,
        isSubmitting,
        isSuccess,
        isLoadingUserData,
        handleUpdateAdmin
    } = useUsersFormHook(userId);

    const { isLoading: isLoadingCountries, data: countries } = useCountries({
        fleet: true
    });

    useEffect(() => {
        if (isSuccess) {
            onClose()
        }
    }, [isSuccess]);

    const handleChange = (field: keyof typeof formData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Dialog open={isOpenned} onOpenChange={() => onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {action === "add" ? "Ajouter un utilisateur" : "Modifier l'utilisateur"}
                    </DialogTitle>
                </DialogHeader>

                {!isLoadingUserData ? <DialogMainBody className="space-y-4">
                    <Input
                        type="text"
                        label="Nom complet"
                        placeholder="Ex: Roger Nasser"
                        value={formData.last_name}
                        onChange={(e) => handleChange("last_name", e.target.value)}
                        required
                    />
                    <Input
                        type="tel"
                        label="Numero de téléphone"
                        placeholder="672-511-079"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        required
                    />

                    <Input
                        type="email"
                        label="E-mail"
                        placeholder="Indiquer l’adresse e-mail"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                    />

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Rôle <span className="text-vaRed">*</span></label>
                        <Select
                            value={formData.role_id}
                            onValueChange={(value) => handleChange("role_id", value)}
                        >
                            <SelectTrigger className="w-full rounded-xl py-2.5" inForm>
                                <SelectValue placeholder="Sélectionner un rôle" />
                            </SelectTrigger>
                            <SelectContent>
                                {roleList?.map((r, index) =>
                                    <SelectItem value={r.id.toString()} key={index}> {r.displayName} </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <Input
                        type="password"
                        label="Mot de passe"
                        placeholder="Indiquer un mot de passe"
                        onChange={(e) => handleChange("password", e.target.value)}
                        required
                    />

                    <hr className="my-6" />

                    <div className="space-y-1">
                        <PageSubTitle subtitle="Accès géographique" />
                        <p className="text-vaTextPrimary text-sm">
                            Définissez les pays et villes auxquels cet utilisateur peut accéder
                        </p>
                    </div>

                    <div className="space-y-3 mt-4">
                        <PageSubTitle subtitle="Pays" />
                        {isLoadingCountries ? (
                            <p className="text-xs text-gray-400 italic"> <Loading /> Chargement des pays...</p>
                        ) : (
                            countries?.map((country) => (
                                <LocationAccordion
                                    key={country.id}
                                    country={country}
                                    selectedIds={formData.cities_id}
                                    onSelectionChange={(ids) => handleChange("cities_id", ids)}
                                    action={action}
                                />
                            ))
                        )}
                    </div>
                </DialogMainBody> : <Loading />}

                <DialogFooter>
                    <Button
                        variant="mainBlue"
                        fullWidth
                        loading={isSubmitting}
                        onClick={() => action == "add" ? handleAddAdmin() : handleUpdateAdmin()}
                    >
                        {action === "add" ? "Ajouter" : "Modifier"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};