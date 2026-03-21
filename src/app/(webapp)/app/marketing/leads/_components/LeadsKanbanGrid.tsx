import { Calendar, Phone, User } from "lucide-react";
import { LeadItem } from "../../campagnes/_hook/useCampagneLeadsHook";
import { BiEnvelope } from "react-icons/bi";
import Badge from "@/components/display/Badge";

export const LeadKanbanCard = ({ lead, currency }: { lead: LeadItem, currency?: string }) => {
    return (
        <div className="flex flex-col gap-4 bg-white rounded-2xl shadow-sm border p-4 w-full cursor-pointer">
            <div className="">
                <p className="text-lg font-semibold line-clamp-1 truncated">{lead.lead.name}</p>
                <p className="text-sm text-vaTextPrimary"> { lead.company } </p>
            </div>
            <div className="text-sm text-vaTextPrimary space-y-1">
                <div className="flex items-center gap-2">
                    <Phone className="size-4" />
                    <p> {lead.lead.phoneNum} </p>
                </div>
                <div className="flex items-center gap-2">
                    <BiEnvelope className="size-4" />
                    <p> {lead.lead.email} </p>
                </div>
            </div>
            <Badge variant="purple" className="w-full !rounded-full !font-normal">
                {lead.chanel}
            </Badge>
            <div className="text-sm text-vaTextPrimary space-y-1">
                <div className="flex items-center gap-2">
                    <User className="size-4" />
                    <p> {lead.commercialName} </p>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    Ajouter le<p> {lead.date} </p>
                </div>
            </div>
        </div>
    )
};

const LeadKanbanGrid = ({ newLeads, contacted, demoPlaned, propositon, converted, lost, currency = "XAF" }: { newLeads: LeadItem[], contacted: LeadItem[], demoPlaned: LeadItem[], propositon: LeadItem[], converted: LeadItem[], lost: LeadItem[], currency?: string }) => {
    return (
        <div className="bg-white w-full overflow-x-auto custom-scrollbar rounded-2xl p-6">
            <div className="grid grid-cols-6 gap-6 min-w-[110rem]">
                {/* Colonne À faire */}
                <div className="flex flex-col gap-2">
                    <header className="flex items-center justify-between text-lg font-semibold px-2">
                        Nouveaux
                        <div className="p-2 rounded-full bg-vaLightGray/5 size-10 flex items-center justify-center font-semibold text-base">
                            {newLeads.length}
                        </div>
                    </header>
                    <div className="bg-vaLightGray/10 p-4 rounded-xl flex flex-col gap-5 h-full min-h-[500px]">
                        {newLeads.length > 0 && newLeads.map((td, index) => (
                            <LeadKanbanCard currency={currency} lead={td} key={index} />
                        ))}
                    </div>
                </div>

                {/* Colonne À faire */}
                <div className="flex flex-col gap-2">
                    <header className="flex items-center justify-between text-lg font-semibold px-2">
                        Contacté
                        <div className="p-2 rounded-full bg-vaLightGray/5 size-10 flex items-center justify-center font-semibold text-base">
                            {contacted.length}
                        </div>
                    </header>
                    <div className="bg-vaMainBlue/10 p-4 rounded-xl flex flex-col gap-5 h-full min-h-[500px]">
                        {contacted.length > 0 && contacted.map((td, index) => (
                            <LeadKanbanCard currency={currency} lead={td} key={index} />
                        ))}
                    </div>
                </div>

                {/* Colonne En cours */}
                <div className="flex flex-col gap-2">
                    <header className="flex items-center justify-between text-lg font-semibold px-2">
                        Démo planifiée
                        <div className="p-2 rounded-full bg-vaLightGray/5 size-10 flex items-center justify-center font-semibold text-base">
                            {demoPlaned.length}
                        </div>
                    </header>
                    <div className="bg-vaPurple/5 p-4 rounded-xl flex flex-col gap-5 h-full min-h-[500px]">
                        {demoPlaned.length > 0 && demoPlaned.map((pro, index) => (
                            <LeadKanbanCard currency={currency} lead={pro} key={index} />
                        ))}
                    </div>
                </div>

                {/* Colonne Terminés */}
                <div className="flex flex-col gap-2">
                    <header className="flex items-center justify-between text-lg font-semibold px-2">
                        Proposition
                        <div className="p-2 rounded-full bg-vaLightGray/5 size-10 flex items-center justify-center font-semibold text-base">
                            {propositon.length}
                        </div>
                    </header>
                    <div className="bg-vaOrange/10 p-4 rounded-xl flex flex-col gap-5 h-full min-h-[500px]">
                        {propositon.length > 0 && propositon.map((fs, index) => (
                            <LeadKanbanCard currency={currency} lead={fs} key={index} />
                        ))}
                    </div>
                </div>
                {/* Colonne Terminés */}
                <div className="flex flex-col gap-2">
                    <header className="flex items-center justify-between text-lg font-semibold px-2">
                        Converti
                        <div className="p-2 rounded-full bg-vaLightGray/5 size-10 flex items-center justify-center font-semibold text-base">
                            {converted.length}
                        </div>
                    </header>
                    <div className="bg-vaGreen/10 p-4 rounded-xl flex flex-col gap-5 h-full min-h-[500px]">
                        {converted.length > 0 && converted.map((fs, index) => (
                            <LeadKanbanCard currency={currency} lead={fs} key={index} />
                        ))}
                    </div>
                </div>
                {/* Colonne Terminés */}
                <div className="flex flex-col gap-2">
                    <header className="flex items-center justify-between text-lg font-semibold px-2">
                        Perdu
                        <div className="p-2 rounded-full bg-vaLightGray/5 size-10 flex items-center justify-center font-semibold text-base">
                            {lost.length}
                        </div>
                    </header>
                    <div className="bg-vaRed/10 p-4 rounded-xl flex flex-col gap-5 h-full min-h-[500px]">
                        {lost.length > 0 && lost.map((fs, index) => (
                            <LeadKanbanCard currency={currency} lead={fs} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeadKanbanGrid;