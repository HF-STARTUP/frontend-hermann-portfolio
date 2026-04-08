"use client"

import PeriodSelector from "@/components/elements/PeriodSelector"
import { PageSubTitle, PageTitle } from "@/components/ui/custom/PageTitle"
import { usePipelineHook } from "./_hooks/usePipelineHook"
import KpiGrid from "@/components/display/Kpi"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Columns3, List } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { LuSearch } from "react-icons/lu"
import { DataTable } from "@/components/display/CustomTableDisplay"
import CustomerKanbanGrid from "./_components/KanbanView"
import { CustomerDetailsSheet } from "./_components/CustomerDetailsSheet"

const PipelineBody = () => {
    const [viewType, setViewType] = useState<"kanban" | "table">("table")
    const {
        kpiItems,
        pagination,
        tableColumns,
        customersList,
        rowActions,
        customersByStatus,
        handleView,
        selectedCustomer,
        setIsDetailsVisible,   
        isDetailsVisible     
    } = usePipelineHook()

    return (
        <div className="space-y-6">
            <PageTitle page_title="Pipeline Clients" withSelect={false} end_component={<PeriodSelector defaultPeriod={"current_month"} onChange={() => { }} />} />
            <KpiGrid items={kpiItems} />

            {/* Leads viewType Tabs */}
            <div className="flex items-center gap-4 flex-wrap">
                <PageSubTitle subtitle="Gestion des clients" />
                <Tabs
                    value={viewType}
                    onValueChange={(value) => setViewType(value as "table" | "kanban")}
                    defaultValue="table"
                >
                    <TabsList className="rounded-2xl w-fit grid grid-cols-2">
                        <TabsTrigger value="table" className="flex items-center gap-2 data-[state=active]:text-vaMainBlue">
                            <List className="size-5" /> Tableau
                        </TabsTrigger>
                        <TabsTrigger value="kanban" className="flex items-center gap-2 data-[state=active]:text-vaMainBlue">
                            <Columns3 className="size-5" /> Kanban
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Filters */}
            <div className="filters flex items-center gap-4 flex-wrap w-full">
                <div className="filters flex items-center gap-4 flex-wrap w-full">
                    <div className="search">
                        <div className="search-input relative flex items-center bg-white p-2 rounded-xl">
                            <Input
                                placeholder="Recherche un client..."
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
                            <SelectValue placeholder="Selectionner le commercial" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les commerciaux</SelectItem>
                            <SelectItem value="1">Pierre</SelectItem>
                            <SelectItem value="2">Paul</SelectItem>
                            <SelectItem value="3">Junior</SelectItem>
                            <SelectItem value="4">Angel</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select defaultValue="all">
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Selectionner le statut" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les statuts</SelectItem>
                            <SelectItem value="contacted">Contacté</SelectItem>
                            <SelectItem value="lost">Perdu</SelectItem>
                            <SelectItem value="qualified">Qualifié</SelectItem>
                            <SelectItem value="converted">Converti</SelectItem>
                        </SelectContent>
                    </Select>                   
                </div>
            </div>

            {/* Tableau */}

            {
                viewType == "table" &&
                <DataTable columns={tableColumns} data={customersList} pagination={pagination} rowActions={rowActions} onRowClick={(item)=>handleView(item)} />
            }
            {
                viewType == "kanban" &&
                <CustomerKanbanGrid customersByStatus={customersByStatus} />
            }


            <CustomerDetailsSheet isOpenned={isDetailsVisible} onClose={()=>setIsDetailsVisible(false)} customer={selectedCustomer} />
        </div>
    )
}

export default PipelineBody