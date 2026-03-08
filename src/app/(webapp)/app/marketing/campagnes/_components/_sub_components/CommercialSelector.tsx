import { useState, useMemo } from "react";
import { Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export interface CommercialItem {
    id: string;
    name: string;
    image?: string;
}

// 1. Mocks de données
const MOCK_COMMERCIAUX: CommercialItem[] = [
    { id: "COM001", name: "Jean-Pierre Bakary", image: "https://i.pravatar.cc/150?u=1" },
    { id: "COM002", name: "Alice Nono", image: "https://i.pravatar.cc/150?u=2" },
    { id: "COM003", name: "Cédric Fossuo", image: "https://i.pravatar.cc/150?u=3" },
    { id: "COM004", name: "Marie-Louise Eyenga", image: "https://i.pravatar.cc/150?u=4" },
    { id: "COM005", name: "Takam Djeutcha", image: "https://i.pravatar.cc/150?u=5" },
];

// 2. Ligne individuelle
export const CommercialRow = ({ 
    commercial, 
    isSelected, 
    onToggle 
}: { 
    commercial: CommercialItem, 
    isSelected: boolean, 
    onToggle: () => void 
}) => (
    <div 
        onClick={onToggle}
        className={cn(
            "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all bg-vaLightGray/10",
            isSelected 
                ? "bg-vaBlue/10" 
                : "border-transparent hover:bg-vaLightGray/20"
        )}
    >
        <div className="flex items-center gap-3">
            {commercial.image ? (
                <Image src={commercial.image} width={100} height={100} alt={commercial.name} className="size-10 rounded-full object-cover shadow-sm" />
            ) : (
                <div className="size-10 rounded-full bg-vaMainBlue/10 flex items-center justify-center font-bold text-vaMainBlue text-xs">
                    {commercial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
            )}
            <span className={cn("text-sm font-medium", isSelected ? "text-vaMainBlue" : "text-gray-700")}>
                {commercial.name}
            </span>
        </div>
        
        <div className={cn(
            "size-5 rounded-full border flex items-center justify-center transition-colors",
            isSelected ? "bg-vaMainBlue border-vaMainBlue" : "border-gray-300"
        )}>
            {isSelected && <Check className="size-3 text-white" strokeWidth={3} />}
        </div>
    </div>
);

// 3. Liste avec Recherche intégrée
export const CommercialList = ({ 
    selectedIds, 
    onChange 
}: { 
    selectedIds: string[], 
    onChange: (ids: string[]) => void 
}) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Filtrage dynamique des commerciaux
    const filteredCommerciaux = useMemo(() => {
        return MOCK_COMMERCIAUX.filter(com => 
            com.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const handleToggle = (id: string) => {
        const newSelection = selectedIds.includes(id)
            ? selectedIds.filter(item => item !== id)
            : [...selectedIds, id];
        onChange(newSelection);
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Barre de recherche demandée */}
            <div className="px-1">
                <Input 
                    type="search" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    leftIcon={<Search className="size-5 text-vaLightGray" />} 
                    placeholder="Rechercher un membre" 
                    className="bg-gray-50/50 border-gray-200"
                />
            </div>

            {/* Container de la liste */}
            <div className="flex flex-col gap-4">
                {filteredCommerciaux.length > 0 ? (
                    filteredCommerciaux.map((com) => (
                        <CommercialRow 
                            key={com.id} 
                            commercial={com} 
                            isSelected={selectedIds.includes(com.id)}
                            onToggle={() => handleToggle(com.id)}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-vaLightGray gap-2">
                        <Search className="size-8 opacity-20" />
                        <p className="text-sm">Aucun résultat pour "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};