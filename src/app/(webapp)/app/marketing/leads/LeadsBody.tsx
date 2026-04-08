"use client"

import { PageSubTitle, PageTitle } from "@/components/ui/custom/PageTitle"
import { useLeadsHook } from "./_hooks/useLeadsHook"
import KpiGrid from "@/components/display/Kpi"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Columns3, List } from "lucide-react"
import { useState } from "react"
import { LuSearch } from "react-icons/lu"
import { Input } from "@/components/ui/input"
import { DateRangePicker } from "@/components/ui/custom/date-range-picker"
import { DataTable } from "@/components/display/CustomTableDisplay"
import LeadKanbanGrid from "./_components/LeadsKanbanGrid"
import { Button } from "@/components/ui/button"
import { AffectLeadsDialog } from "./_components/dialogs/LeadsAffectDialog"
import { LeadDetailsSheet } from "./_components/dialogs/LeadsDetailsSheet"

const LeadsBody = () => {
    const [viewType, setViewType] = useState<'table' | 'kanban'>('table')
    const {
        kpiItems,
        leadsList,
        pagination,
        tableColumns,

        contactedLeads,
        convertedLeads,
        demoPlanedLeads,
        lostLeads,
        newLeads,
        propositionLeads,

        currency,
        selectedLead,
        setSelectedLead,
        isLeadDetailOpenned,
        setIsLeadDetailOpenned,

        handleViewLead

    } = useLeadsHook()

    const [isAffectOpenned, setIsAffectOpenned] = useState(false)
    return (
        <div className="space-y-6">
            <PageTitle page_title="Leads & Conversations" withSelect={false} />
            {/* Kpi grid */}
            <KpiGrid items={kpiItems} />
            {/* Leads viewType Tabs */}
            <div className="flex items-center gap-4 flex-wrap">
                <PageSubTitle subtitle="Gestion des leads" />
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
                                placeholder="Recherche un lead..."
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

                    <Select
                        defaultValue="all"
                    // value={filterState.abonType}
                    // onValueChange={(value) => handleAbonTypeFilter(value)}
                    >
                        <SelectTrigger className="w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Selectionner la source" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Toutes les sources</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="prospection">Prospection</SelectItem>
                            <SelectItem value="reactivation">Réactivation</SelectItem>
                            <SelectItem value="fidelisation">Fidélisation</SelectItem>
                            <SelectItem value="evenementiel">Évènementiel</SelectItem>
                        </SelectContent>
                    </Select>

                    <DateRangePicker placeholder="FIlter par date" />


                </div>
                <div className="flex items-center justify-end w-full">
                    <Button variant={"mainBlueOutline"} className="float-right" onClick={() => setIsAffectOpenned(true)}>
                        Affecter des leads
                    </Button>
                </div>
            </div>
            {/* Leads List; Kanban/ Table */}

            {
                viewType == "table" &&
                <DataTable columns={tableColumns} data={leadsList} pagination={pagination} onRowClick={(item)=>handleViewLead(item)} />
            }


            {
                viewType == "kanban" &&
                <LeadKanbanGrid contacted={contactedLeads} converted={convertedLeads} demoPlaned={demoPlanedLeads} lost={lostLeads} newLeads={newLeads} propositon={propositionLeads} currency={currency} />
            }

            <AffectLeadsDialog isOpenned={isAffectOpenned} onClose={() => setIsAffectOpenned(false)} />
            <LeadDetailsSheet isOpenned={isLeadDetailOpenned} onClose={()=>setIsLeadDetailOpenned(false)} lead={selectedLead} />
        </div>
    )
}

export default LeadsBody