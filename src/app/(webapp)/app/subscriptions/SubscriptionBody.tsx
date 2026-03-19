"use client"

import { Crumb } from "@/components/ui/custom/crumb"
import { PageSubTitle, PageTitle } from "@/components/ui/custom/PageTitle"
import { useSubscriptionsHook } from "./_hooks/useSubscriptionsHook"
import KpiGrid from "@/components/display/Kpi"
import SubscriptionsEvolution from "./_components/SubscriptionsEvolution"
import ExpiredSubscriptions from "./_components/ExpiredSubscription"
import RepartitionByPaymentMethods from "./_components/RepartitionByPaymentMethod"
import { Input } from "@/components/ui/input"
import { LuPlus, LuSearch } from "react-icons/lu"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { AnchorIcon } from "lucide-react"
import { usePackagesList } from "./_hooks/usePackageList"
import { DataTable } from "@/components/display/CustomTableDisplay"
import { useState } from "react"
import PackageForm from "./_components/_dialog/PackageForm"
import SubscriptionDetailsSheet from "./_components/_dialog/SubscriptionDetailsSheet"
import { SuspendPackageDialog } from "./_components/_dialog/SuspendPackageConfirmation"
import { DeletePackageDialog } from "./_components/_dialog/DeletePackageConfirmation"

const SubscriptionsBody = () => {

    const { kpiItems } = useSubscriptionsHook()
    const { packagesList, 
        pagination, 
        tableColumns, 
        handleViewPackage, 
        isDetailsSheetOpen, 
        selectedPackage, 
        setIsDetailsSheetOpen, 
        rowActions, 
        isDeleteVisible, 
        isSupendVisible, 
        setIsDeleteVisible, 
        setIsSuspendVisible, 
        isFormDialogOpen, 
        setIsFormDialogOpen,
        action,
        setAction,
        handleAdd,
        handleEdit
    } = usePackagesList()
    
    return (
        <div className="space-y-6">
            <Crumb
                items={[
                    {
                        label: "Abonnements",
                        url: "subscriptions"
                    }
                ]}
            />
            <PageTitle page_title="Abonnements" withSelect={false} />

            {/* Kpi grid */}

            <KpiGrid items={kpiItems} />

            {/* Subscriptions evolution & Renews Vs Expired */}

            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4 col-span-12">
                <div className="lg:col-span-2 xl:col-span-3">
                    <SubscriptionsEvolution />
                </div>
                <div className="xl:col-span-2">
                    <ExpiredSubscriptions />
                </div>
            </div>

            {/* Repartition by payment methods */}
            <RepartitionByPaymentMethods />

            <PageSubTitle subtitle="Gestion des packages (23)" />
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-6">

                <div className="filters flex items-center gap-4 flex-wrap flex-1 w-full">
                    <div className="search w-full sm:w-auto">
                        <div className="search-input relative flex items-center bg-white p-2 rounded-xl">
                            <Input
                                placeholder="Recherche par nom ou proprietaire..."
                                type="search"
                                className="pl-9 h-10 w-full sm:w-80 bg-[#F4F7FE] border-none text-sm"
                                leftIcon={<LuSearch className="text-vaTextPrimary" />}
                            />
                        </div>
                    </div>

                    <Select defaultValue="all">
                        <SelectTrigger className="w-full sm:w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Selectionner le profil" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les profils</SelectItem>
                            <SelectItem value="professionnel">Professionnel</SelectItem>
                            <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select defaultValue="all">
                        <SelectTrigger className="w-full sm:w-44 min-w-fit h-12 border-[#E9EAEC] text-[#A3AED0] border bg-white text-sm rounded-xl">
                            <SelectValue placeholder="Selectionner le statut" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les statuts</SelectItem>
                            <SelectItem value="active">Actif</SelectItem>
                            <SelectItem value="inactive">Inactif</SelectItem>
                            <SelectItem value="suspended">Suspendu</SelectItem>
                            <SelectItem value="deleted">Supprimé</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Conteneur Actions : Aligné à droite sur desktop, pleine largeur sur mobile */}
                <div className="flex flex-wrap items-center justify-start lg:justify-end w-full lg:w-max gap-4">
                    <Button size="xl" variant="mainBlue" className="rounded-2xl w-full sm:w-auto" onClick={()=>handleAdd()}>
                        <LuPlus className="w-4 h-4 mr-2" />
                        Ajouter un package
                    </Button>
                    <Select>
                        <SelectTrigger
                            variant="mainBlueOutline"
                            className="w-full sm:w-auto"
                            leftIcon={<AnchorIcon className="size-4 mr-2" />}
                        >
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

            {/* Packages table */}
               
            <DataTable columns={tableColumns} data={packagesList} pagination={pagination} onRowClick={(item)=>handleViewPackage(item)} rowActions={rowActions} />

            {/* Dialogs */}
            <SubscriptionDetailsSheet isOpenned={isDetailsSheetOpen} onClose={()=>setIsDetailsSheetOpen(false)} packageId={selectedPackage?.packageName || ""}  packageData={selectedPackage} onEdit={()=>handleEdit()} onDelete={()=>setIsDeleteVisible(true)} onSuspend={()=>setIsSuspendVisible(true)}  />

            <PackageForm isOpenned={isFormDialogOpen} onClose={()=>setIsFormDialogOpen(false)} action={ action }  />
            
            <SuspendPackageDialog isOpen={isSupendVisible} onClose={()=>setIsSuspendVisible(false)} />

            <DeletePackageDialog isOpen={isDeleteVisible} onClose={()=>setIsDeleteVisible(false)} PackageId={selectedPackage?.packageName || ""} />
        </div>
    )
}

export default SubscriptionsBody