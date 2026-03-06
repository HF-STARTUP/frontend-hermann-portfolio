import { Crown } from "lucide-react";
import { SubscriptionExpiredSoon } from "../../_hook/useDashboardHook";
import { EmptyData } from "@/components/box/PageNetworkState";

export function ExpiredSubsRow({ subs }: { subs: SubscriptionExpiredSoon }) {
    return (
        <div className="p-4 rounded-2xl w-full bg-vaOrange/5 border border-vaOrange/40 flex items-center gap-4">
            <div className="rounded-full p-4 size-20 bg-vaOrange/10 text-vaOrange flex items-center justify-center">
                <Crown className="size-10" strokeWidth={2} />
            </div>
            <div className="detail flex flex-col justify-between min-h-24">
                <p className="text-black font-semibold text-lg">
                    {subs.fleetName}
                </p>
                <p className="text-vaTextPrimary font-normal text-sm">
                    Expire le : {subs.expiredAt}
                </p>
                <p className="text-vaRed font-medium text-sm">
                    {subs.remainingDays}
                </p>
            </div>
        </div>
    )
}

const ExpiredSubsList = ({ subs }: { subs?: SubscriptionExpiredSoon[] }) => {
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