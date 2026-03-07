import Badge from "@/components/display/Badge";
import { CampagneFormatted } from "../_hook/useCampagnesHook";
import { User } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export const CampagneKanbanCard = ({ campagne, currency }: { campagne: CampagneFormatted, currency?: string }) => {
    // Calcul du ratio pour la largeur de la jauge
    const percentage = campagne.budget > 0 ? Math.min((campagne.usedBudget / campagne.budget) * 100, 100) : 0;

    return (
        <div className="flex flex-col gap-4 bg-white rounded-2xl shadow-xl p-4 w-full cursor-pointer">
            <header className="font-bold text-black">{campagne.name}</header>

            <div className="text-vaTextPrimary flex flex-col gap-2">
                <div className="flex items-center gap-2 text-base">
                    <span>{campagne.startDate}</span>
                    -
                    <span>{campagne.endDate}</span>
                </div>
                <div className="flex items-center text-sm gap-2">
                    <User className="size-5" />
                    <p>{campagne.assignedTo}</p>
                </div>
            </div>

            <div className="flex flex-col flex-wrap gap-2">
                <Badge variant="purple">{campagne.leadsObjectif} leads</Badge>
                <div className="flex flex-wrap gap-2">  {campagne.channels.map((channel, index) => (
                    <Badge key={index} variant="blue">
                        {channel}
                    </Badge>
                ))}</div>
              
            </div>

            <div className="text-base flex flex-col gap-2 text-vaTextPrimary">
                <div className="flex items-center gap-2">
                    <p>Prévu: </p>
                    <p className="text-black font-medium">
                        {formatNumber(campagne.budget)} {" "}
                        <span className="text-[11px] text-vaLightGray">{currency}</span>
                    </p>
                </div>

                {/* LA JAUGE */}
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                        className="h-full bg-vaOrange rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>

                <div className="flex items-center gap-2">
                    <p>Consommé: </p>
                    <p className="text-black font-medium">
                        {formatNumber(campagne.usedBudget)} {" "}
                        <span className="text-[11px] text-vaLightGray">{currency}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

const CampagneKanbanGrid = ({ toDo, processing, finished, currency = "XAF" }: { toDo: CampagneFormatted[], processing: CampagneFormatted[], finished: CampagneFormatted[], currency?: string }) => {
    return (
        <div className="bg-white w-full overflow-x-auto custom-scrollbar rounded-2xl p-6">
            <div className="grid grid-cols-3 gap-6 min-w-[1000px]">
                {/* Colonne À faire */}
                <div className="flex flex-col gap-2">
                    <header className="flex items-center justify-between text-lg font-semibold px-2">
                        À faire
                        <div className="p-2 rounded-full bg-vaLightGray/5 size-10 flex items-center justify-center font-semibold text-base">
                            {toDo.length}
                        </div>
                    </header>
                    <div className="bg-vaLightGray/10 p-4 rounded-xl flex flex-col gap-5 h-full min-h-[500px]">
                        {toDo.length > 0 && toDo.map((td) => (
                            <CampagneKanbanCard currency={currency} campagne={td} key={td.id} />
                        ))}
                    </div>
                </div>

                {/* Colonne En cours */}
                <div className="flex flex-col gap-2">
                    <header className="flex items-center justify-between text-lg font-semibold px-2">
                        En cours
                        <div className="p-2 rounded-full bg-vaLightGray/5 size-10 flex items-center justify-center font-semibold text-base">
                            {processing.length}
                        </div>
                    </header>
                    <div className="bg-vaOrange/10 p-4 rounded-xl flex flex-col gap-5 h-full min-h-[500px]">
                        {processing.length > 0 && processing.map((pro) => (
                            <CampagneKanbanCard currency={currency} campagne={pro} key={pro.id} />
                        ))}
                    </div>
                </div>

                {/* Colonne Terminés */}
                <div className="flex flex-col gap-2">
                    <header className="flex items-center justify-between text-lg font-semibold px-2">
                        Terminés
                        <div className="p-2 rounded-full bg-vaLightGray/5 size-10 flex items-center justify-center font-semibold text-base">
                            {finished.length}
                        </div>
                    </header>
                    <div className="bg-vaGreen/10 p-4 rounded-xl flex flex-col gap-5 h-full min-h-[500px]">
                        {finished.length > 0 && finished.map((fs) => (
                            <CampagneKanbanCard currency={currency} campagne={fs} key={fs.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CampagneKanbanGrid;