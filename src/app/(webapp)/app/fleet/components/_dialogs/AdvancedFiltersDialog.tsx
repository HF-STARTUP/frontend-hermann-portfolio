import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook"
import { DialogMainBody } from "@/components/display/DialogMainBody"
import { DialogFooter } from "@/components/display/DialogFooter"
import { FilterState } from "@/app/(webapp)/app/fleet/_hook/useFleetHook"

interface AdvancedFiltersDialogProps {
  isOpen: boolean
  onClose: () => void
  filterState: FilterState
  onRecentFirstChange: (checked: boolean) => void
  onOldestFirstChange: (checked: boolean) => void
  onVehiclesCountMinChange: (value: string) => void
  onVehiclesCountMaxChange: (value: string) => void
  onDriversCountMinChange: (value: string) => void
  onDriversCountMaxChange: (value: string) => void
  onTransactionsAmountMinChange: (value: string) => void
  onTransactionsAmountMaxChange: (value: string) => void
  onFirstActionsChange: (action: string, checked: boolean) => void
  onResetFilters: () => void
}

export const AdvancedFiltersDialog = ({
  isOpen,
  onClose,
  filterState,
  onRecentFirstChange,
  onOldestFirstChange,
  onVehiclesCountMinChange,
  onVehiclesCountMaxChange,
  onDriversCountMinChange,
  onDriversCountMaxChange,
  onTransactionsAmountMinChange,
  onTransactionsAmountMaxChange,
  onFirstActionsChange,
  onResetFilters,
}: AdvancedFiltersDialogProps) => {
  const { currency } = useGetActiveCurrency()

  const handleReset = () => {
    onResetFilters()
    onClose()
  }

  const handleApply = () => {
    onClose()
  }

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
              <label
                htmlFor="recent"
                className="option flex items-center cursor-pointer gap-2 justify-center w-full border rounded-full p-2 text-sm"
              >
                <Checkbox
                  id="recent"
                  checked={filterState.sort === "recent"}
                  onCheckedChange={(checked) => onRecentFirstChange(checked as boolean)}
                />
                <span>Plus récent d'abord</span>
              </label>
              <label
                htmlFor="oldest"
                className="option flex items-center cursor-pointer gap-2 justify-center w-full border rounded-full p-2 text-sm"
              >
                <Checkbox
                  id="oldest"
                  checked={filterState.sort === "oldest"}
                  onCheckedChange={(checked) => onOldestFirstChange(checked as boolean)}
                />
                <span>Plus ancien d'abord</span>
              </label>
            </div>
          </div>
          <hr className="opacity-55" />
          <div className="numerical-filters flex flex-col gap-3">
            <div className="title font-semibold text-[#000B20]">Filtre numérique</div>
            <div className="options pl-4 flex flex-col gap-3">
              <div className="option flex flex-col gap-2">
                <label className="text-sm font-medium">Nombre de chauffeurs</label>
                <div className="gap-2 grid grid-cols-1 sm:grid-cols-2">
                  <Input
                    type="number"
                    placeholder="min"
                    value={filterState.driversCountMin ?? ""}
                    onChange={(e) => onDriversCountMinChange(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="max"
                    value={filterState.driversCountMax ?? ""}
                    onChange={(e) => onDriversCountMaxChange(e.target.value)}
                  />
                </div>
              </div>
              <div className="option flex flex-col gap-2">
                <label className="text-sm font-medium">Nombre de véhicules</label>
                <div className="gap-2 grid grid-cols-1 sm:grid-cols-2">
                  <Input
                    type="number"
                    placeholder="min"
                    value={filterState.vehiclesCountMin ?? ""}
                    onChange={(e) => onVehiclesCountMinChange(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="max"
                    value={filterState.vehiclesCountMax ?? ""}
                    onChange={(e) => onVehiclesCountMaxChange(e.target.value)}
                  />
                </div>
              </div>
              <div className="option flex flex-col gap-2">
                <label className="text-sm font-medium">Montant (transactions)</label>
                <div className="gap-2 grid grid-cols-1 sm:grid-cols-2">
                  <Input
                    type="number"
                    placeholder={`min (${currency})`}
                    value={filterState.transactionsAmountMin ?? ""}
                    onChange={(e) => onTransactionsAmountMinChange(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder={`max (${currency})`}
                    value={filterState.transactionsAmountMax ?? ""}
                    onChange={(e) => onTransactionsAmountMaxChange(e.target.value)}
                  />
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
                <Checkbox
                  id="first-action-1"
                  checked={filterState.firstActions.includes("promo_code_used")}
                  onCheckedChange={(checked) => onFirstActionsChange("promo_code_used", checked as boolean)}
                />
                <label htmlFor="first-action-1" className="cursor-pointer">
                  Utilisation de code promo
                </label>
              </div>
              <div className="option flex gap-2 items-center cursor-pointer">
                <Checkbox
                  id="first-action-2"
                  checked={filterState.firstActions.includes("first_vehicle_added")}
                  onCheckedChange={(checked) =>
                    onFirstActionsChange("first_vehicle_added", checked as boolean)
                  }
                />
                <label htmlFor="first-action-2" className="cursor-pointer">
                  Premier véhicule ajouté
                </label>
              </div>
              <div className="option flex gap-2 items-center cursor-pointer">
                <Checkbox
                  id="first-action-3"
                  checked={filterState.firstActions.includes("first_driver_added")}
                  onCheckedChange={(checked) =>
                    onFirstActionsChange("first_driver_added", checked as boolean)
                  }
                />
                <label htmlFor="first-action-3" className="cursor-pointer">
                  Premier chauffeur ajouté
                </label>
              </div>
              <div className="option flex gap-2 items-center cursor-pointer">
                <Checkbox
                  id="first-action-4"
                  checked={filterState.firstActions.includes("first_collection")}
                  onCheckedChange={(checked) =>
                    onFirstActionsChange("first_collection", checked as boolean)
                  }
                />
                <label htmlFor="first-action-4" className="cursor-pointer">
                  Premier encaissement effectué
                </label>
              </div>
              <div className="option flex gap-2 items-center cursor-pointer">
                <Checkbox
                  id="first-action-5"
                  checked={filterState.firstActions.includes("first_maintenance")}
                  onCheckedChange={(checked) =>
                    onFirstActionsChange("first_maintenance", checked as boolean)
                  }
                />
                <label htmlFor="first-action-5" className="cursor-pointer">
                  Premier entretien ajouté
                </label>
              </div>
              <div className="option flex gap-2 items-center cursor-pointer">
                <Checkbox
                  id="first-action-6"
                  checked={filterState.firstActions.includes("first_checkup")}
                  onCheckedChange={(checked) => onFirstActionsChange("first_checkup", checked as boolean)}
                />
                <label htmlFor="first-action-6" className="cursor-pointer">
                  Premier check-up effectué
                </label>
              </div>
            </div>
          </div>
        </DialogMainBody>
        <DialogFooter className="grid grid-cols-2 gap-3">
          <Button variant={"outline"} onClick={handleReset}>
            Réinitialiser
          </Button>
          <Button variant={"mainBlue"} onClick={handleApply}>
            Appliquer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}