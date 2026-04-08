import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook"
import { DialogMainBody } from "@/components/display/DialogMainBody"
import { DialogFooter } from "@/components/display/DialogFooter"
import { GetFleetsParams, FirstAction } from "@/types/admin/fleet.type"
import { useState, useEffect } from "react"
import { FirstActionMap } from "../../utils"

interface AdvancedFiltersDialogProps {
  isOpen: boolean
  onClose: () => void
  filterState: GetFleetsParams
  updateFilter: <K extends keyof GetFleetsParams>(key: K, value: GetFleetsParams[K]) => void
  resetFilters: () => void
}

export const AdvancedFiltersDialog = ({
  isOpen,
  onClose,
  filterState,
  updateFilter,
  resetFilters,
}: AdvancedFiltersDialogProps) => {
  const { currency } = useGetActiveCurrency()

  const [tempFilters, setTempFilters] = useState<Partial<GetFleetsParams>>({})

  useEffect(() => {
    if (isOpen) {
      setTempFilters({
        sort: filterState.sort,
        drivers_count_min: filterState.drivers_count_min,
        drivers_count_max: filterState.drivers_count_max,
        vehicles_count_min: filterState.vehicles_count_min,
        vehicles_count_max: filterState.vehicles_count_max,
        transactions_amount_min: filterState.transactions_amount_min,
        transactions_amount_max: filterState.transactions_amount_max,
        first_actions: [...(filterState.first_actions || [])],
      })
    }
  }, [isOpen, filterState])

  // Handlers pour les filtres temporaires
  const onRecentFirstChange = (checked: boolean) => {
    if (checked) {
      setTempFilters((prev) => ({ ...prev, sort: "recent" }))
    } else if (tempFilters.sort === "recent") {
      setTempFilters((prev) => ({ ...prev, sort: undefined }))
    }
  }

  const onOldestFirstChange = (checked: boolean) => {
    if (checked) {
      setTempFilters((prev) => ({ ...prev, sort: "oldest" }))
    } else if (tempFilters.sort === "oldest") {
      setTempFilters((prev) => ({ ...prev, sort: undefined }))
    }
  }

  const onDriversCountMinChange = (value: string) => {
    setTempFilters((prev) => ({
      ...prev,
      drivers_count_min: value ? Number(value) : undefined,
    }))
  }

  const onDriversCountMaxChange = (value: string) => {
    setTempFilters((prev) => ({
      ...prev,
      drivers_count_max: value ? Number(value) : undefined,
    }))
  }

  const onVehiclesCountMinChange = (value: string) => {
    setTempFilters((prev) => ({
      ...prev,
      vehicles_count_min: value ? Number(value) : undefined,
    }))
  }

  const onVehiclesCountMaxChange = (value: string) => {
    setTempFilters((prev) => ({
      ...prev,
      vehicles_count_max: value ? Number(value) : undefined,
    }))
  }

  const onTransactionsAmountMinChange = (value: string) => {
    setTempFilters((prev) => ({
      ...prev,
      transactions_amount_min: value ? Number(value) : undefined,
    }))
  }

  const onTransactionsAmountMaxChange = (value: string) => {
    setTempFilters((prev) => ({
      ...prev,
      transactions_amount_max: value ? Number(value) : undefined,
    }))
  }

  const onFirstActionsChange = (action: FirstAction, checked: boolean) => {
    setTempFilters((prev) => {
      const currentActions = prev.first_actions || []
      if (checked) {
        return { ...prev, first_actions: [...currentActions, action] }
      } else {
        return { ...prev, first_actions: currentActions.filter((a) => a !== action) }
      }
    })
  }

  // Appliquer les filtres (appliquer localement via updateFilter)
  const handleApply = () => {
    // Appliquer chaque filtre modifié
    Object.entries(tempFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        updateFilter(key as keyof GetFleetsParams, value)
      } else {
        // Si la valeur est undefined, on supprime le filtre
        updateFilter(key as keyof GetFleetsParams, undefined as any)
      }
    })
    onClose()
  }

  // Réinitialiser les filtres locaux uniquement (pas ceux du hook)
  const handleLocalReset = () => {
    setTempFilters({
      sort: undefined,
      drivers_count_min: undefined,
      drivers_count_max: undefined,
      vehicles_count_min: undefined,
      vehicles_count_max: undefined,
      transactions_amount_min: undefined,
      transactions_amount_max: undefined,
      first_actions: [],
    })
  }

  // Fermer le dialogue sans appliquer les changements
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} bgType="blured">
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
                className={`option flex items-center cursor-pointer gap-2 justify-center w-full border rounded-full p-2 text-sm ${tempFilters.sort === "recent"?"bg-vaDarkBlue":""}`}
              >
                <Checkbox
                  id="recent"
                  checked={tempFilters.sort === "recent"}
                  onCheckedChange={onRecentFirstChange}
                  className="hidden"
                />
                <span>Plus récent d'abord</span>
              </label>
              <label
                htmlFor="oldest"
                className={`option flex items-center cursor-pointer gap-2 justify-center w-full border rounded-full p-2 text-sm ${tempFilters.sort === "oldest"?"bg-vaDarkBlue":""}`}
              >
                <Checkbox
                  id="oldest"
                  checked={tempFilters.sort === "oldest"}
                  onCheckedChange={onOldestFirstChange}
                  className="hidden"
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
                    value={tempFilters.drivers_count_min ?? ""}
                    onChange={(e) => onDriversCountMinChange(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="max"
                    value={tempFilters.drivers_count_max ?? ""}
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
                    value={tempFilters.vehicles_count_min ?? ""}
                    onChange={(e) => onVehiclesCountMinChange(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="max"
                    value={tempFilters.vehicles_count_max ?? ""}
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
                    value={tempFilters.transactions_amount_min ?? ""}
                    onChange={(e) => onTransactionsAmountMinChange(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder={`max (${currency})`}
                    value={tempFilters.transactions_amount_max ?? ""}
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
              {Object.entries(FirstActionMap).map(([action, label]) => (
                <div className="option flex gap-2 items-center cursor-pointer" key={action}>
                  <Checkbox
                    id={`first-action-${action}`}
                    checked={tempFilters.first_actions?.includes(action as FirstAction)}
                    onCheckedChange={(checked) => onFirstActionsChange(action as FirstAction, checked as boolean)}
                  />
                  <label htmlFor={`first-action-${action}`} className="cursor-pointer">
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </DialogMainBody>
        <DialogFooter className="grid grid-cols-2 gap-3">
          <Button variant={"outline"} onClick={handleLocalReset}>
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