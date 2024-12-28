// "use client"
//
// import React from "react";
// import AdminSubNav from "@/components/layout/admin/SubNav/AdminSubNav";
// import ClientItems from "@/app/(protected)/dashboard/clients/_components/suppliersItems/ClientItems";
// import {AddClientDialog} from "@/app/(protected)/dashboard/clients/actions/addClient/addClientDialog";
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
//             <AdminSubNav title={`Clients`} handleAdd={handleToggleSupplierDialog}/>
//             <div>
//                 <ClientItems/>
//             </div>
//             <>
//                 <AddClientDialog isMain={true} isOpen={addSupplierDialogIsOpen} onClose={handleToggleSupplierDialog}/>
//             </>
//         </div>
//     )
// }
//
// export default SuppliersListPage

export default function Page(){
    return <div></div>
}