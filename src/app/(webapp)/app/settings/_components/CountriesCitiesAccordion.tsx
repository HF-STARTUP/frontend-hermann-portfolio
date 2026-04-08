import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Country from "@/model/location/Country";
import { useCity } from "@/hooks/location/useCity/useCity";
import { Loader } from "lucide-react";

interface LocationAccordionProps {
  country: Country;
  selectedIds: (string | number)[];
  onSelectionChange: (ids: (string | number)[]) => void;
}

export const LocationAccordion = ({ 
  country, 
  selectedIds, 
  onSelectionChange 
}: LocationAccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: cities, isLoading: isLoadingCities } = useCity(
    { country_code: country.isoCode, itemPerPage: 500 },
    { enabled: isExpanded }
  );

  const countryKey = `country_${country.id}`;

  const isAllCitiesSelected = !!cities?.length && cities.every(city => selectedIds.includes(city.id));

  const toggleCountry = (checked: boolean) => {    
    if (!cities) return;

    const otherSelectedIds = selectedIds.filter(
      (id) => !cities.some((city) => city.id === id)
    );

    if (checked) {
      const currentCountryCityIds = cities.map((city) => city.id);
      onSelectionChange([...otherSelectedIds, ...currentCountryCityIds]);
    } else {
      onSelectionChange(otherSelectedIds);
    }
  };

  const toggleCity = (cityId: string | number, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedIds, cityId]);
    } else {
      onSelectionChange(selectedIds.filter((id) => id !== cityId));
    }
  };

  return (
    <Accordion 
      type="single" 
      collapsible 
      className="w-full space-y-4"
      value={isExpanded ? countryKey : ""}
      onValueChange={(value) => setIsExpanded(value === countryKey)}
    >
      <AccordionItem value={countryKey} className="border rounded-2xl overflow-hidden shadow-sm">
        <div className="flex items-center gap-3 px-3  bg-vaDarkBlue/20">
          <Checkbox 
            className="size-3.5 border-vaLightGray/50" 
            id={countryKey} 
            checked={isAllCitiesSelected}
            onCheckedChange={(checked: boolean) => {
                if (checked && !isExpanded) setIsExpanded(true);
                toggleCountry(checked);
            }}
          />
          <AccordionTrigger className="hover:no-underline flex-grow py-2.5">
            <span className="text-sm font-semibold text-[#1e293b]">
                {country.flag} {country.name}
            </span>
          </AccordionTrigger>
        </div>

        <AccordionContent className="border-t">
          {isLoadingCities ? (
            <div className="p-4 text-xs text-gray-400 italic text-center flex flex-col gap-2 items-center justify-center"> 
              <Loader className="animate-spin" size={20} /> Chargement des villes...
            </div>
          ) : (
            <div className="flex flex-col">
              {cities?.map((city) => (
                <div key={city.id} className="flex items-center justify-between p-3 border-b last:border-0 hover:bg-gray-50/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      className="size-3.5 border-vaLightGray/50" 
                      id={city.id.toString()} 
                      checked={selectedIds.includes(city.id)}
                      onCheckedChange={(checked: boolean) => toggleCity(city.id, checked)}
                    />
                    <label 
                      htmlFor={city.id.toString()} 
                      className="text-sm cursor-pointer text-[#506D82] font-medium"
                    >
                      {city.name}
                    </label>
                  </div>
                </div>
              ))}
              
              {cities?.length === 0 && (
                  <div className="p-4 text-center text-xs text-gray-400">
                      Aucune ville disponible pour ce pays.
                  </div>
              )}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};