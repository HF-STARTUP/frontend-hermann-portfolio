import { DialogFooter } from "@/components/display/DialogFooter";
import { DialogMainBody } from "@/components/display/DialogMainBody";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader, Plus, X } from "lucide-react";
import { useFleetFormHook } from "../../_hook/useFleetFormHook";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import notify from "@/utils/func/notification";
import { FleetTypeMap, SubscriptionNameMap } from "../../utils";

export default function FleetFromDialog({ isOpen, onClose, action, fleetId }: { isOpen: boolean, onClose: () => void, action: "create" | "edit", fleetId?: string }) {

    const {
        cities,
        countries,
        isLoadingCities,
        isLoadingCountries,
        setSelectedCountry,

        formData,
        handleCreate,
        isSubmiting,
        isSuccess,
        selectedCountry,
        setFormData,
        updateField,

        isLoadingSubscriptions,
        subscriptionsPacks,
    } = useFleetFormHook()

    // États pour la gestion de la photo
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                notify("Veuillez sélectionner une image valide", "error");
                return;
            }

            setSelectedImage(file);
            updateField("logo", file);

            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        updateField("logo", undefined);
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
            setImagePreview(null);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClose = () => {
        handleRemoveImage();
        onClose();
    };

    const handleSubmit = () => {
        handleCreate();
    };

    useEffect(() => {
        if (isSuccess) {
            onClose()
        }
    }, [isSuccess]);

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{action === "create" ? "Ajouter une flotte" : "Modifier une flotte"}</DialogTitle>
                </DialogHeader>
                <DialogMainBody>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="owner_type" className="text-sm font-medium">Type de compte <span className="text-vaRed">*</span> </label>
                            <Select 
                                value={formData.owner_type} 
                                onValueChange={(value) => updateField("owner_type", value)}
                            >
                                <SelectTrigger className="w-full rounded-xl py-2.5" inForm>
                                    <SelectValue placeholder="Sélectionner le type de compte" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(FleetTypeMap).map(([value, label]) => (
                                        <SelectItem key={value} value={value}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium">Nom de la flotte <span className="text-vaRed">*</span> </label>
                            <Input 
                                id="name" 
                                value={formData.name}
                                onChange={(e) => updateField("name", e.target.value)}
                                placeholder="Ex: Urban Drivers" 
                            />
                        </div>
                        <div className="grid grid-cols-2 w-full gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="country" className="text-sm font-medium">Pays <span className="text-vaRed">*</span> </label>
                                <Select onValueChange={(value) => setSelectedCountry(value)}>
                                    <SelectTrigger className="w-full rounded-xl py-2.5" inForm>
                                        <SelectValue placeholder="Sélectionner le pays" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries?.map((c) =>
                                            <SelectItem value={c.isoCode} key={c.id}>{c.name}</SelectItem>
                                        )
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="city_id" className="text-sm font-medium">Ville <span className="text-vaRed">*</span> </label>
                                <Select 
                                    value={formData.city_id}
                                    onValueChange={(value) => updateField("city_id", value)}
                                >
                                    <SelectTrigger className="w-full rounded-xl py-2.5" inForm>
                                        <SelectValue placeholder={!isLoadingCities && cities?.length ? "Sélectionner la ville" : !isLoadingCities ? "Aucune ville disponible" : "Chargement..."} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cities?.map((c) =>
                                            <SelectItem value={c.id} key={c.id}>{c.name}</SelectItem>
                                        )
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input 
                                type="text" 
                                id="owner" 
                                value={formData.first_name}
                                onChange={(e) => updateField("first_name", e.target.value)}
                                placeholder="Ex: John Doe" 
                                label="Propriétaire" 
                                required 
                            />
                        </div>
                        <div className="grid grid-cols-2 w-full gap-4">
                            <div className="flex flex-col gap-2">
                                <Input 
                                    type="email" 
                                    id="email" 
                                    value={formData.email}
                                    onChange={(e) => updateField("email", e.target.value)}
                                    placeholder="Ex: john.doe@example.com" 
                                    label="Adresse e-mail" 
                                    required 
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Input 
                                    type="tel" 
                                    id="phone" 
                                    value={formData.phone}
                                    onChange={(e) => updateField("phone", e.target.value)}
                                    placeholder="Ex: 675 67 65 43" 
                                    label="Numéro de téléphone" 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="subscription_id" className="text-sm font-medium">Plan d'abonnement <span className="text-vaRed">*</span> </label>
                            <Select 
                                value={formData.subscription_id}
                                onValueChange={(value) => updateField("subscription_id", value)}
                            >
                                <SelectTrigger className="w-full rounded-xl py-2.5" inForm>
                                    <SelectValue placeholder="Sélectionner le plan d'abonnement" />
                                </SelectTrigger>
                                <SelectContent>
                                    {subscriptionsPacks && subscriptionsPacks?.map((s) => (
                                        <SelectItem key={s.id} value={s.id}>
                                            {s.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="logo" className="text-sm font-medium">Ajouter une photo/logo</label>
                            <input
                                ref={fileInputRef}
                                type="file"
                                id="logo"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <div className="flex items-center gap-4">
                                {imagePreview ? (
                                    <div className="relative">
                                        <div className="size-16 rounded-xl overflow-hidden border border-gray-200">
                                            <Image
                                                src={imagePreview}
                                                alt="Aperçu du logo"
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex cursor-pointer items-center justify-center size-16 border border-dashed rounded-xl text-vaLightGray hover:border-vaBlue hover:text-vaBlue transition-colors"
                                    >
                                        <Plus size={24} />
                                    </button>
                                )}
                                {selectedImage && (
                                    <div className="text-sm text-vaLightGray">
                                        {selectedImage.name}
                                        <br />
                                        <span className="text-xs">
                                            {(selectedImage.size / 1024).toFixed(1)} KB
                                        </span>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-vaLightGray mt-1">
                                Formats acceptés : JPG, PNG, GIF. Taille max : 5MB
                            </p>
                        </div>
                    </div>
                </DialogMainBody>
                <DialogFooter>
                    <Button 
                        variant="mainBlue" 
                        className="rounded-xl" 
                        fullWidth
                        onClick={handleSubmit}                        
                        loading={isSubmiting}
                    >
                         {(action === "create" ? "Ajouter la flotte" : "Modifier la flotte")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}