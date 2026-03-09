import { DataTable } from "@/components/display/CustomTableDisplay"
import { DateRangePicker } from "@/components/ui/custom/date-range-picker"
import { PageSubTitle } from "@/components/ui/custom/PageTitle"
import { Input } from "@/components/ui/input"
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnchorIcon } from "lucide-react"
import { LuSearch } from "react-icons/lu"
import { useCampagneLeadsHook } from "../../_hook/useCampagneLeadsHook"

const CampagneLeadsSection = ({ id }: { id?: string }) => {
    const { leadsList, pagination, tableColumns } = useCampagneLeadsHook()
    return (
        <div className="space-y-6 p-6 bg-white rounded-2xl">
            <PageSubTitle subtitle={`Leads(${leadsList.length})`}  />
            <div className="flex justify-between items-end flex-wrap gap-4">
                <div className="filters flex items-center gap-4 flex-wrap w-full">

                    <Select defaultValue="all">
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Selectionner le statut" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les statuts</SelectItem>
                            <SelectItem value="qualified">Qualifié</SelectItem>
                            <SelectItem value="converted">Converti</SelectItem>
                            <SelectItem value="contacted">Contacté</SelectItem>
                            <SelectItem value="lost">Perdu</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select defaultValue="all">
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Selectionner le canal" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les canaux</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="google">Google</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="influenceur">Influenceur</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select
                        defaultValue="all"
                    // value={filterState.abonType}
                    // onValueChange={(value) => handleAbonTypeFilter(value)}
                    >
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Selectionner un commercial" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les commerciaux</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="prospection">Prospection</SelectItem>
                            <SelectItem value="reactivation">Réactivation</SelectItem>
                            <SelectItem value="fidelisation">Fidélisation</SelectItem>
                            <SelectItem value="evenementiel">Évènementiel</SelectItem>
                        </SelectContent>
                    </Select>
                <DateRangePicker placeholder="Filtre par date" className="h-12" />
                </div>

                <div className="flex justify-end items-center gap-4 flex-wrap ml-auto">
                    <Select>
                        <SelectTrigger variant="mainBlueOutline" className="rounded-xl h-11" leftIcon={<AnchorIcon className="size-4 mr-2" />}>
                            <SelectValue placeholder="Exporter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="csv">CSV</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="pdf">PDF</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
            </div>
            <DataTable columns={tableColumns} data={leadsList} pagination={pagination} />
        </div>
    )
}

export default CampagneLeadsSection