import { Calendar, Phone, User } from "lucide-react";
import { BiEnvelope } from "react-icons/bi";
import Badge from "@/components/display/Badge";
import { CustomerItem, CustomerStatus } from "../_hooks/usePipelineHook";

export const CustomerKanbanCard = ({ customer }: { customer: CustomerItem }) => {
    return (
        <div className="flex flex-col gap-4 bg-white rounded-2xl shadow-sm border p-4 w-full cursor-pointer">
            <div className="">
                <p className="text-lg font-semibold line-clamp-1 truncated">{customer.name}</p>
                <p className="text-sm text-vaTextPrimary">{customer.companyName}</p>
            </div>
            <div className="text-sm text-vaTextPrimary space-y-1">
                <div className="flex items-center gap-2">
                    <Phone className="size-4" />
                    <p>{customer.phoneNum}</p>
                </div>
                <div className="flex items-center gap-2">
                    <BiEnvelope className="size-4 shrink-0" />
                    <p className="truncate">{customer.email}</p>
                </div>
            </div>
            <Badge variant="purple" className="w-full !rounded-full !font-normal">
                {customer.channelName}
            </Badge>
            <div className="text-sm text-vaTextPrimary space-y-1">
                <div className="flex items-center gap-2">
                    <User className="size-4" />
                    <p>{customer.assignedCommercial}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <p>Ajouté le {new Date(customer.convertedAt).toLocaleDateString('fr-FR')}</p>
                </div>
            </div>
        </div>
    )
};

const CustomerKanbanGrid = ({ customersByStatus }: { customersByStatus: Record<CustomerStatus, CustomerItem[]> }) => {
    return (
        <div className="bg-white w-full overflow-auto custom-scrollbar rounded-2xl px-6 pb-6 max-h-[calc(100dvh-200px)]">
            <div className="grid grid-cols-6 gap-6 min-w-[110rem]">
                {/* Colonne Lead Converti */}
                <div className="flex flex-col gap-2">
                    <header className="flex items-center justify-between text-lg font-semibold px-2 sticky top-0 bg-white z-10 pt-4 pb-2">
                        Leads Convertis
                        <div className="p-2 rounded-full bg-vaLightGray/5 size-10 flex items-center justify-center font-semibold text-base">
                            {customersByStatus.lead_converted?.length || 0}
                        </div>
                    </header>
                    <div className="bg-vaLightGreen/5 p-4 rounded-xl flex flex-col gap-5 h-full min-h-[500px]">
                        {customersByStatus.lead_converted?.map((customer, index) => (
                            <CustomerKanbanCard customer={customer} key={index} />
                        ))}
                    </div>
                </div>

                {/* Colonne Onboarding */}
                <div className="flex flex-col gap-2">
                    <header className="flex items-center justify-between text-lg font-semibold px-2 sticky top-0 bg-white z-10 pt-4 pb-2">
                        Onboarding
                        <div className="p-2 rounded-full bg-vaLightGray/5 size-10 flex items-center justify-center font-semibold text-base">
                            {customersByStatus.onboarding?.length || 0}
                        </div>
                    </header>
                    <div className="bg-vaMainBlue/10 p-4 rounded-xl flex flex-col gap-5 h-full min-h-[500px]">
                        {customersByStatus.onboarding?.map((customer, index) => (
                            <CustomerKanbanCard customer={customer} key={index} />
                        ))}
                    </div>
                </div>

                {/* Colonne Actif */}
                <div className="flex flex-col gap-2">
                    <header className="flex items-center justify-between text-lg font-semibold px-2 sticky top-0 bg-white z-10 pt-4 pb-2">
                    Clients actifs
                        <div className="p-2 rounded-full bg-vaLightGray/5 size-10 flex items-center justify-center font-semibold text-base">
                            {customersByStatus.active?.length || 0}
                        </div>
                    </header>
                    <div className="bg-vaLightGreen/10 p-4 rounded-xl flex flex-col gap-5 h-full min-h-[500px]">
                        {customersByStatus.active?.map((customer, index) => (
                            <CustomerKanbanCard customer={customer} key={index} />
                        ))}
                    </div>
                </div>

                {/* Colonne Stable */}
                <div className="flex flex-col gap-2">
                    <header className="flex items-center justify-between text-lg font-semibold px-2 sticky top-0 bg-white z-10 pt-4 pb-2">
                    Clients stables
                        <div className="p-2 rounded-full bg-vaLightGray/5 size-10 flex items-center justify-center font-semibold text-base">
                            {customersByStatus.stable?.length || 0}
                        </div>
                    </header>
                    <div className="bg-vaPurple/5 p-4 rounded-xl flex flex-col gap-5 h-full min-h-[500px]">
                        {customersByStatus.stable?.map((customer, index) => (
                            <CustomerKanbanCard customer={customer} key={index} />
                        ))}
                    </div>
                </div>

                {/* Colonne Risqué */}
                <div className="flex flex-col gap-2">
                    <header className="flex items-center justify-between text-lg font-semibold px-2 sticky top-0 bg-white z-10 pt-4 pb-2">
                    Clients à risque
                        <div className="p-2 rounded-full bg-vaLightGray/5 size-10 flex items-center justify-center font-semibold text-base">
                            {customersByStatus.risked?.length || 0}
                        </div>
                    </header>
                    <div className="bg-vaRed/5 p-4 rounded-xl flex flex-col gap-5 h-full min-h-[500px]">
                        {customersByStatus.risked?.map((customer, index) => (
                            <CustomerKanbanCard customer={customer} key={index} />
                        ))}
                    </div>
                </div>

                {/* Colonne Inactif */}
                <div className="flex flex-col gap-2">
                    <header className="flex items-center justify-between text-lg font-semibold px-2 sticky top-0 bg-white z-10 pt-4 pb-2">
                    Clients inactifs
                        <div className="p-2 rounded-full bg-vaLightGray/5 size-10 flex items-center justify-center font-semibold text-base">
                            {customersByStatus.inactive?.length || 0}
                        </div>
                    </header>
                    <div className="bg-vaOrange/10 p-4 rounded-xl flex flex-col gap-5 h-full min-h-[500px]">
                        {customersByStatus.inactive?.map((customer, index) => (
                            <CustomerKanbanCard customer={customer} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerKanbanGrid;