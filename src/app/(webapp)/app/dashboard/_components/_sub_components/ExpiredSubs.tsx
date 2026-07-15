import { Crown } from "lucide-react";
import { EmptyData } from "@/components/box/PageNetworkState";
import ExpiringSubscriptionsModel from "@/model/dashboard/ExpiringSubscriptionsModel";
import { useRouter } from "next/navigation";

export function ExpiredSubsRow({ subs }: { subs: ExpiringSubscriptionsModel }) {
    const $router = useRouter()
    return (
        <div className="p-2 rounded-2xl w-full bg-vaOrange/5 border border-vaOrange/40 flex items-center gap-4 cursor-pointer" onClick={() => $router.push(`/app/at-risk-customers/${subs.accountId}/details`)}>
            <div className="rounded-full size-14 bg-vaOrange/10 text-vaOrange flex items-center justify-center">
                <Crown className="size-8" strokeWidth={2} />
            </div>
            <div className="detail flex flex-col justify-between min-h-14">
                <p className="text-black font-semibold text-base">
                    {subs.fleetName}
                </p>
                <p className="text-vaTextPrimary font-normal text-sm">
                    Expire le : {subs.endDate}
                </p>
                <p className="text-vaRed font-medium text-sm">
                    {subs.getDifference * -1} Jours restants
                </p>
            </div>
        </div>
    )
}

const ExpiredSubsList = ({ subs }: { subs?: ExpiringSubscriptionsModel[] }) => {
    if (!subs?.length || !subs) {
        return (
            <EmptyData message="Vous etes a jours !!!" description="Aucun abonnements n'expire bientot." />
        )
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            {
                subs.map((sub, index) => <ExpiredSubsRow subs={sub} key={index} />)
            }
        </div>
    )
}

export default ExpiredSubsList