import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook"
import { DialogMainBody } from "@/components/display/DialogMainBody"
import { DialogFooter } from "@/components/display/DialogFooter"
export const AdvancedFiltersDialog = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { currency } = useGetActiveCurrency()
  return (
    <Dialog open={isOpen} onOpenChange={onClose} bgType="blured">
      <DialogContent>
          <DialogHeader>
            <DialogTitle>Filtrer et trier</DialogTitle>
          </DialogHeader>
          <DialogMainBody>
            <div className="trie flex flex-col gap-4">
              <div className="title font-semibold text-[#000B20]">Trier par</div>
              <div className="options pl-4 flex flex-col gap-3 font-medium">
                <label htmlFor="recent" className="option flex items-center cursor-pointer gap-2 justify-center w-full border rounded-full p-2 text-sm">
                  <Checkbox className="hidden" id="recent" />
                  <span>Plus récent d'abord</span>
                </label>
                <label htmlFor="oldest" className="option flex items-center cursor-pointer gap-2 justify-center w-full border rounded-full p-2 text-sm">
                  <Checkbox className="hidden" id="oldest" />
                  <span>Plus ancien d'abord</span>
                </label>
              </div>
            </div>
            <hr className="opacity-55" />
            <div className="numerical-filters flex flex-col gap-3">
              <div className="title font-semibold text-[#000B20]">Filtre numérique</div>
              <div className="options pl-4 flex flex-col gap-3">
                <div className="option flex flex-col gap-2">
                  <label className="text-sm font-medium">
                    Nombre de chauffeurs
                  </label>
                  <div className="gap-2 grid grid-cols-1 sm:grid-cols-2">
                    <Input type="number" placeholder="min" />
                    <Input type="number" placeholder="max" />
                  </div>
                </div>
                <div className="option flex flex-col gap-2">
                  <label className="text-sm font-medium">
                    Nombre de véhicules
                  </label>
                  <div className="gap-2 grid grid-cols-1 sm:grid-cols-2">
                    <Input type="number" placeholder="min" />
                    <Input type="number" placeholder="max" />
                  </div>
                </div>
                <div className="option flex flex-col gap-2">
                  <label className="text-sm font-medium">
                    Montant (transactions)
                  </label>
                  <div className="gap-2 grid grid-cols-1 sm:grid-cols-2">
                    <Input type="number" placeholder={`min (${currency})`} />
                    <Input type="number" placeholder={`max (${currency})`} />
                  </div>
                </div>
              </div>
            </div>
            <hr className="opacity-55" />
            <div className="text-filters flex flex-col gap-3">
              <div className="title font-semibold text-[#000B20]">Type d'événement</div>
              <div className="desc text-vaLightGray">Premières actions uniquement</div>
              <div className="options pl-4 flex flex-col gap-3 text-sm font-medium text-[#364153]">
                <div className="option flex gap-2 items-center cursor-pointer">
                  <Checkbox id="event-type-1" />
                  <label htmlFor="event-type-1" className="cursor-pointer">Utilisation de code promo</label>
                </div>
                <div className="option flex gap-2 items-center cursor-pointer">
                  <Checkbox id="event-type-2" />
                  <label htmlFor="event-type-2" className="cursor-pointer">Premier véhicule ajouté</label>
                </div>
                <div className="option flex gap-2 items-center cursor-pointer">
                  <Checkbox id="event-type-3" />
                  <label htmlFor="event-type-3" className="cursor-pointer">Premier chauffeur ajouté</label>
                </div>
                <div className="option flex gap-2 items-center cursor-pointer">
                  <Checkbox id="event-type-4" />
                  <label htmlFor="event-type-4" className="cursor-pointer">Premier encaissement effectué</label>
                </div>
                <div className="option flex gap-2 items-center cursor-pointer">
                  <Checkbox id="event-type-5" />
                  <label htmlFor="event-type-5" className="cursor-pointer">Premier entretien ajouté</label>
                </div>
                <div className="option flex gap-2 items-center cursor-pointer">
                  <Checkbox id="event-type-6" />
                  <label htmlFor="event-type-6" className="cursor-pointer">Premier check-up effectué</label>
                </div>
              </div>
            </div>
          </DialogMainBody>
          <hr />
          <DialogFooter className="grid grid-cols-2 gap-3">
            <Button variant={"outline"}>
              Réinitialiser
            </Button>
            <Button variant={"mainBlue"}>
              Appliquer
            </Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}