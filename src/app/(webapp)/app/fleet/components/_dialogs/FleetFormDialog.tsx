import { DialogFooter } from "@/components/display/DialogFooter";
import { DialogMainBody } from "@/components/display/DialogMainBody";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

export default function FleetFromDialog({ isOpen, onClose, action, fleetId }: { isOpen: boolean, onClose: () => void, action: "create" | "edit", fleetId?: string }) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{action === "create" ? "Ajouter une flotte" : "Modifier une flotte"}</DialogTitle>
                </DialogHeader>
                <DialogMainBody>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-sm font-medium">Type de compte <span className="text-vaRed">*</span> </label>
                            <Select>
                                <SelectTrigger className="w-full rounded-xl py-2.5" inForm>
                                    <SelectValue placeholder="Sélectionner le type de compte" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="professional">Professionnel</SelectItem>
                                    <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium">Nom de la flotte <span className="text-vaRed">*</span> </label>
                            <Input id="name" placeholder="Ex: Urban Drivers" />
                        </div>
                        <div className="grid grid-cols-2 w-full gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="" className="text-sm font-medium">Pays <span className="text-vaRed">*</span> </label>
                                <Select>
                                    <SelectTrigger className="w-full rounded-xl py-2.5" inForm>
                                        <SelectValue placeholder="Sélectionner le pays" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cm">Cameroun</SelectItem>
                                        <SelectItem value="ng">Nigeria</SelectItem>
                                        <SelectItem value="gh">Ghana</SelectItem>
                                        <SelectItem value="bj">Benin</SelectItem>
                                        <SelectItem value="tg">Togo</SelectItem>
                                        <SelectItem value="bf">Burkina Faso</SelectItem>
                                        <SelectItem value="ci">Côte d'Ivoire</SelectItem>
                                        <SelectItem value="ne">Niger</SelectItem>
                                        <SelectItem value="mr">Mauritanie</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="" className="text-sm font-medium">Ville <span className="text-vaRed">*</span> </label>
                                <Select>
                                    <SelectTrigger className="w-full rounded-xl py-2.5" inForm>
                                        <SelectValue placeholder="Sélectionner la ville" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="douala">Douala</SelectItem>
                                        <SelectItem value="yaoundé">Yaoundé</SelectItem>
                                        <SelectItem value="douala">Douala</SelectItem>
                                        <SelectItem value="yaoundé">Yaoundé</SelectItem>
                                        <SelectItem value="douala">Douala</SelectItem>
                                        <SelectItem value="yaoundé">Yaoundé</SelectItem>
                                        <SelectItem value="douala">Douala</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="owner" className="text-sm font-medium">Propriétaire <span className="text-vaRed">*</span> </label>
                            <Input type="text" id="owner" placeholder="Ex: John Doe" />
                        </div>
                        <div className="grid grid-cols-2 w-full gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-sm font-medium">Adresse e-mail <span className="text-vaRed">*</span> </label>
                                <Input type="email" id="email" placeholder="Ex: john.doe@example.com" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="phone" className="text-sm font-medium">Numéro de téléphone <span className="text-vaRed">*</span> </label>
                                <Input type="tel" id="phone" placeholder="Ex: 675 67 65 43" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-sm font-medium">Plan d'abonnement <span className="text-vaRed">*</span> </label>
                            <Select>
                                <SelectTrigger className="w-full rounded-xl py-2.5" inForm>
                                    <SelectValue placeholder="Sélectionner le plan d'abonnement" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="essential">Essentiel</SelectItem>
                                    <SelectItem value="performance">Performance</SelectItem>
                                    <SelectItem value="croissance">Croissance</SelectItem>
                                    <SelectItem value="elite">Elite</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-sm font-medium">Ajouter une photo/logo</label>
                            <Input type="file" id="logo" className="hidden" />
                            <div className="flex cursor-pointer items-center justify-center size-16 border border-dashed rounded-xl text-vaLightGray">
                                <Plus size={24} />
                            </div>
                        </div>
                    </div>
                </DialogMainBody>
                <DialogFooter>
                    <Button variant="mainBlue" className="rounded-xl" fullWidth>Ajouter la flotte</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}