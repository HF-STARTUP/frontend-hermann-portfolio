import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import notify from "@/utils/func/notification";
import { FleetTypeMap } from "../../utils";
import { FleetRegisterFormData } from "@/types/admin/fleet.type";
import { useGetFleetActivitiesList } from "@/hooks/admin/useFleetHook";

interface FlotteStepProps {
    formData: FleetRegisterFormData;
    updateField: (field: keyof FleetRegisterFormData, value: any) => void
    countries: any;
    cities: any;
    isLoadingCities: boolean;
    setSelectedCountry: (value: string) => void;
    selectedCountry?: string;
}

export default function FlotteStep({ formData, updateField, countries, cities, isLoadingCities, setSelectedCountry }: FlotteStepProps) {

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

    const {
        data: activities,
        isLoading
    } = useGetFleetActivitiesList()

    console.log(activities)

    return (
        <div className="flex flex-col gap-6">
            {/* Type de compte et Activité sur la même ligne */}
            <div className="grid grid-cols-2 w-full gap-4">
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
                    <label htmlFor="parkActivity_id" className="text-sm font-medium">Activité <span className="text-vaRed">*</span> </label>
                    <Select
                        value={formData.parkActivity_id}
                        onValueChange={(value) => updateField("parkActivity_id", value)}
                    >
                        <SelectTrigger className="w-full rounded-xl py-2.5" inForm>
                            <SelectValue placeholder="Sélectionner votre activité" />
                        </SelectTrigger>
                        <SelectContent>
                            {activities?.map((a, idx) => (
                                <SelectItem key={idx} value={a.id}>
                                    {a.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
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
                            {countries?.map((c: any) =>
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
                            {cities?.map((c: any) =>
                                <SelectItem value={c.id} key={c.id}>{c.name}</SelectItem>
                            )
                            }
                        </SelectContent>
                    </Select>
                </div>
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
    )
}