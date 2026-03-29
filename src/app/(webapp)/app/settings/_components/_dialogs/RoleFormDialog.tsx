import { DialogFooter } from "@/components/display/DialogFooter"
import { DialogMainBody } from "@/components/display/DialogMainBody"
import { TextArea } from "@/components/form/TextField"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Search, ShieldAlert } from "lucide-react"
import { useRoleForm } from "../../_hook/useRoleFormHook"
import { PermissionAccordion } from "../ModulePermissions"
import { useEffect } from "react"
import Loading from "@/components/ui/Loader"

export const AddRoleDialog = ({ isOpenned, onClose, action = "add", roleId }: { isOpenned: boolean, onClose: () => void, action?: "add" | "edit", roleId?: number }) => {
    const {
        modules,
        isLoadingModules,
        formData,
        setFormData,
        fullAccess,
        setFullAccess,
        handleAddRole,
        isSubmitting,
        isSuccess,
        handleUpdateRole,
        isLoadingSelected
    } = useRoleForm(roleId)

    useEffect(() => {
        if (isSuccess) {
            onClose()
        }
    }, [isSuccess]);

    return (
        <Dialog open={isOpenned} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> {action == "add" ? "Créer un rôle" : "Modifier un rôle"} </DialogTitle>
                </DialogHeader>
                {isLoadingSelected ? <Loading /> : <DialogMainBody>
                    <Input
                        type="text"
                        label="Nom du rôle"
                        placeholder="Entrer le nom du role..."
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <TextArea
                        label="Description"
                        placeholder="Décrivez les responsabilités de ce rôle..."
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />

                    <div className="mt-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-base">Permissions</h2>
                            <div className="flex items-center justify-center gap-2 bg-vaLightGray/10 px-2 py-1 font-medium rounded-lg w-fit text-sm">
                                <ShieldAlert size={16} />
                                <p>Accès total système</p>
                                <Switch
                                    checked={fullAccess}
                                    onCheckedChange={setFullAccess}
                                    className="scale-75 data-[state=checked]:bg-vaLightGreen"
                                />
                            </div>
                        </div>

                        <Input
                            type="search"
                            className="h-8 text-sm"
                            leftIcon={<Search className="size-4 text-vaTextPrimary" />}
                            placeholder="Filtrer les permissions..."
                        />

                        {isLoadingModules ? (
                            <PermissionShimmer />
                        ) : (
                            modules?.map((mod, index) => (
                                <PermissionAccordion
                                    module={mod}
                                    key={index}
                                    selectedIds={formData.permission_keys}
                                    onSelectionChange={(newIds) => setFormData({
                                        ...formData,
                                        permission_keys: newIds
                                    })}
                                    fullAccess={fullAccess}
                                />
                            ))
                        )}
                    </div>
                </DialogMainBody>}

                <DialogFooter className="grid grid-cols-2 gap-4">
                    <Button variant={"outline"} onClick={onClose} fullWidth>
                        Annuler
                    </Button>
                    <Button
                        variant={"mainBlue"}
                        fullWidth
                        onClick={action == "add" ? () => handleAddRole() : () => handleUpdateRole()}
                        loading={isSubmitting}
                    >
                        Enregistrer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export const PermissionShimmer = () => {
    const skeletonItems = [1, 2, 3, 4];

    return (
        <div className="space-y-3 mt-2 animate-pulse">
            {skeletonItems.map((i) => (
                <div key={i} className="border rounded-xl overflow-hidden border-slate-200">
                    <div className="flex items-center gap-3 px-4 py-4 bg-slate-100/50">
                        <div className="h-4 w-4 bg-slate-200 rounded" />

                        <div className="h-4 w-32 bg-slate-200 rounded" />

                        <div className="flex-grow" />

                        <div className="h-4 w-4 bg-slate-200 rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );
};