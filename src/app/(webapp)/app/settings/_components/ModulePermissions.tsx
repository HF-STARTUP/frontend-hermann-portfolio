import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Info, AlertTriangle, ShieldAlert } from "lucide-react";
// Assure-toi que le chemin d'import correspond à ton fichier réel
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ModulePermissionGroupModel, { PermissionModel } from "@/model/ADMIN/PermissionsModel";
import Badge from "@/components/display/Badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PermissionAccordionProps {
  module: ModulePermissionGroupModel;
  selectedIds: string[]; // Tes permissions utilisent 'key' qui est un string
  fullAccess: boolean;
  onSelectionChange: (ids: string[]) => void;
}

export const PermissionAccordion = ({
  module,
  selectedIds,
  fullAccess,
  onSelectionChange
}: PermissionAccordionProps) => {

  // Utilise moduleName ou une combinaison unique comme identifiant de groupe
  const groupId = module.moduleName;

  const toggleModule = (checked: boolean) => {
    // On retire d'abord toutes les clés liées à ce module du tableau global
    const otherSelectedIds = selectedIds.filter(
      (id) => id !== groupId && !module.permissions.some((p) => p.key === id)
    );

    if (checked) {
      // On ajoute la clé du groupe + toutes les clés des permissions du module
      const allModuleKeys = [groupId, ...module.permissions.map((p) => p.key)];
      onSelectionChange([...otherSelectedIds, ...allModuleKeys]);
    } else {
      onSelectionChange(otherSelectedIds);
    }
  };

  const togglePermission = (permissionKey: string, checked: boolean) => {
    if (checked) {
      const newSelection = [...selectedIds, permissionKey];
      const allPermissionsChecked = module.permissions.every(p =>
        p.key === permissionKey ? true : newSelection.includes(p.key)
      );

      if (allPermissionsChecked) {
        onSelectionChange([...newSelection, groupId]);
      } else {
        onSelectionChange(newSelection);
      }
    } else {
      onSelectionChange(selectedIds.filter((id) => id !== permissionKey && id !== groupId));
    }
  };

  return (
    <Accordion type="multiple" className="w-full space-y-4">
      <AccordionItem value={groupId} className="border rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center gap-3 px-2 bg-vaDarkBlue/50">
          <Checkbox
            className="size-4"
            id={groupId}
            checked={fullAccess || selectedIds.includes(groupId)}
            onCheckedChange={(checked: boolean) => toggleModule(checked)}
            disabled={fullAccess}
          />
          <AccordionTrigger className="hover:no-underline flex-grow">
            <span className="text-sm font-semibold text-slate-900">
              {module.displayModuleName}
            </span>
          </AccordionTrigger>
        </div>

        <AccordionContent className="border-t bg-white">
          <div className="flex flex-col">
            {module.permissions.map((permission: PermissionModel) => (
              <div key={permission.key} className="flex items-center justify-between px-4 py-3 border-b last:border-0 hover:bg-slate-50/30 transition-colors">
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="size-4"
                    id={permission.key}
                    checked={fullAccess || selectedIds.includes(permission.key)}
                    onCheckedChange={(checked: boolean) => togglePermission(permission.key, checked)}
                    disabled={fullAccess || !permission.isSupported}
                  />
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor={permission.key}
                      className={`text-sm font-medium cursor-pointer ${!permission.isSupported ? 'opacity-50' : ''} ${permission.type === "CRITICAL" ? "text-vaRed" : permission.type === "SENSITIVE" ? "text-vaOrange" : ""}`}
                    >
                      {permission.label}
                    </label>
                    {!permission.isSupported && (
                      <span className="text-[10px] text-vaOrange font-medium italic">Bientôt disponible</span>
                    )}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info size={14} className="text-vaLightGray cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          {permission.moduleName}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                  </div>

                  {permission.type === "CRITICAL" && <ShieldAlert size={14} className="text-vaRed" />}
                  {permission.type === "SENSITIVE" && <AlertTriangle size={14} className="text-vaOrange" />}
                </div>

                <div className="flex items-center gap-2">
                  <Badge type={permission.type} />
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};