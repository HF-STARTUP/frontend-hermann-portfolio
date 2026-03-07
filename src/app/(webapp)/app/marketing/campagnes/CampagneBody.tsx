"use client"

import { Crumb } from "@/components/ui/custom/crumb"
import { PageSubTitle, PageTitle } from "@/components/ui/custom/PageTitle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCampagnesHook } from "./_hook/useCampagnesHook"
import KpiGrid from "@/components/display/Kpi"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { AnchorIcon, Columns3, List } from "lucide-react"
import { LuFilter, LuPlus, LuSearch } from "react-icons/lu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/display/CustomTableDisplay"
import CampagneKanbanGrid from "./_components/CampagneKanbanCard"

const CampagneBody = () => {
    const { CampagneKpi, campagnesList, pagination, tableColumns, currency, finishedCampagnes, processingCampagnes, todoCampagnes } = useCampagnesHook()
    const [viewType, setViewType] = useState<'table' | 'kanban'>('table')
    const [isCreateCampagne, setIsCreateCampagne] = useState<boolean>(false)
    return (
        <div className="space-y-6">
            <Crumb
                items={[
                    {
                        label: "Marketing & Campagnes",
                        url: "/app/marketing/campagnes",
                    }
                ]}
            />


            <PageTitle page_title="Campagnes" withSelect={false} end_component={
                <Select defaultValue="current-month">
                    <SelectTrigger className="border-none bg-white rounded-xl text-lg px-4 min-w-44 w-fit">
                        <SelectValue placeholder="periode"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="current-month">Ce mois-ci</SelectItem>
                        <SelectItem value="today">Aujourd'hui</SelectItem>
                        <SelectItem value="yesterday">Hier</SelectItem>
                        <SelectItem value="custom">Personaliser</SelectItem>
                    </SelectContent>
                </Select>} />

            <KpiGrid items={CampagneKpi} />
            <div className="flex items-center gap-8 flex-wrap">
                <PageSubTitle subtitle={`Liste des campagnes(${ campagnesList.length })`} />
                <Tabs
                    value={viewType}
                    onValueChange={(value) => setViewType(value as "table" | "kanban")}
                    defaultValue="table"
                >
                    <TabsList className="rounded-2xl w-fit grid grid-cols-2">
                        <TabsTrigger value="table" className="flex items-center gap-2 data-[state=active]:text-vaMainBlue">
                            <List /> Tableau
                        </TabsTrigger>
                        <TabsTrigger value="kanban" className="flex items-center gap-2 data-[state=active]:text-vaMainBlue">
                            <Columns3 /> Kanban
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="flex justify-between items-end flex-wrap gap-4">

                <div className="filters flex items-center gap-4 flex-wrap w-full">
                    <div className="search">
                        <div className="search-input relative flex items-center bg-white p-2 rounded-xl">
                            <Input
                                placeholder="Recherche par nom, responsable..."
                                // value={filterState.searchTerm}
                                // onChange={(e) => handleSearchChange(e.target.value)}
                                type="search"
                                className="pl-9 h-10 w-80 bg-[#F4F7FE] border-none text-sm"
                                leftIcon={<LuSearch className="text-vaTextPrimary" />}
                            />
                        </div>
                    </div>
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
                            <SelectValue placeholder="Selectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les types</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="prospection">Prospection</SelectItem>
                            <SelectItem value="reactivation">Réactivation</SelectItem>
                            <SelectItem value="fidelisation">Fidélisation</SelectItem>
                            <SelectItem value="evenementiel">Évènementiel</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select defaultValue="all">
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Selectionner le statut" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les statuts</SelectItem>
                            <SelectItem value="todo">À faire</SelectItem>
                            <SelectItem value="processing">En cours</SelectItem>
                            <SelectItem value="finished">Terminés</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex justify-end items-center gap-4 flex-wrap ml-auto">
                    <Button size="xl" variant="mainBlue" className="rounded-2xl" onClick={() => setIsCreateCampagne(true)}>
                        <LuPlus className="w-4 h-4 mr-2" />
                        Créer une campagne
                    </Button>                
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

            { viewType == "table" && <DataTable columns={tableColumns} data={campagnesList} pagination={pagination} />}
            { viewType == "kanban" && <CampagneKanbanGrid currency={currency} finished={finishedCampagnes} processing={processingCampagnes} toDo={todoCampagnes} />}

        </div>
    )
}

export default CampagneBody