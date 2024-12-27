"use client"
//
// import React from "react";
// import AdminSubNav from "@/components/layout/admin/SubNav/AdminSubNav";
// import SuppliersItems from "@/app/(protected)/dashboard/suppliers-list/_components/suppliersItems/SuppliersItems";
// import {AddSupplierDialog} from "@/app/(protected)/dashboard/suppliers-list/actions/addSupplier/AddSupplierDialog";
// import {useResetSearchState} from "@/hooks/__globlal/useGlobalHook";
//
// const SuppliersListPage: React.FC = () => {
//
//     const [addSupplierDialogIsOpen, setAddSupplierDialogIsOpen] = React.useState<boolean>(false)
//     useResetSearchState()
//
//     const handleToggleSupplierDialog = () => {
//         setAddSupplierDialogIsOpen(!addSupplierDialogIsOpen)
//     }
//     return (
//         <div>
//             <AdminSubNav title={`Fournisseurs agréés`} handleAdd={handleToggleSupplierDialog}/>
//             <div>
//                 <SuppliersItems/>
//             </div>
//             <>
//                 <AddSupplierDialog isMain={true} isOpen={addSupplierDialogIsOpen} onClose={handleToggleSupplierDialog}/>
//             </>
//         </div>
//     )
// }
//
// export default SuppliersListPage

export default function Page(){
    return <div></div>
}
