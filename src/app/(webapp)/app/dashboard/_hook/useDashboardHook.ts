import { NotificationBandContent } from "@/components/display/NotificationBand";

export interface SubscriptionExpiredSoon {
    fleetName: string;
    expiredAt: string;
    remainingDays: string
}

export interface InactiveFleet {
    fleetName: string;
    lastActivityAt: string;
    inactiveDays: string
}

export const useDashboardHook = ()=>{
    const expiredSubscriptions: SubscriptionExpiredSoon[] = [
        { expiredAt: "05 Mars 2026", fleetName: "LogiCam Unit", remainingDays: "1 jour restant" },
        { expiredAt: "07 Mars 2026", fleetName: "Express Douala", remainingDays: "3 jours restants" },
        { expiredAt: "10 Mars 2026", fleetName: "Bafoussam Trans", remainingDays: "6 jours restants" },
        { expiredAt: "12 Mars 2026", fleetName: "Coastal Fleet", remainingDays: "8 jours restants" },
        { expiredAt: "15 Mars 2026", fleetName: "Urban Move", remainingDays: "11 jours restants" },
        { expiredAt: "18 Mars 2026", fleetName: "Kribi Logistics", remainingDays: "14 jours restants" },
        { expiredAt: "20 Mars 2026", fleetName: "Mountain Riders", remainingDays: "16 jours restants" },
        { expiredAt: "22 Mars 2026", fleetName: "Sahel Express", remainingDays: "18 jours restants" },
        { expiredAt: "25 Mars 2026", fleetName: "Global Cargo", remainingDays: "21 jours restants" },
        { expiredAt: "30 Mars 2026", fleetName: "Prime Delivery", remainingDays: "26 jours restants" }
    ];

    const inactiveFleets: InactiveFleet[] = [
        { lastActivityAt: "01 Mars 2026", fleetName: "Fleet Alpha", inactiveDays: "3 jours d'inactivité" },
        { lastActivityAt: "28 Février 2026", fleetName: "Beta Logistics", inactiveDays: "4 jours d'inactivité" },
        { lastActivityAt: "25 Février 2026", fleetName: "Rapid Service", inactiveDays: "7 jours d'inactivité" },
        { lastActivityAt: "20 Février 2026", fleetName: "Garoua Trans", inactiveDays: "12 jours d'inactivité" },
        { lastActivityAt: "15 Février 2026", fleetName: "Oceanic Way", inactiveDays: "17 jours d'inactivité" },
        { lastActivityAt: "10 Février 2026", fleetName: "Yaoundé Express", inactiveDays: "22 jours d'inactivité" },
        { lastActivityAt: "05 Février 2026", fleetName: "Truck Flow", inactiveDays: "27 jours d'inactivité" },
        { lastActivityAt: "01 Février 2026", fleetName: "Eco Moving", inactiveDays: "31 jours d'inactivité" },
        { lastActivityAt: "20 Janvier 2026", fleetName: "Sky Freight", inactiveDays: "43 jours d'inactivité" },
        { lastActivityAt: "01 Janvier 2026", fleetName: "Old Guard Fleet", inactiveDays: "62 jours d'inactivité" }
    ];

    const subscriptionsBandContent: NotificationBandContent = {
        label: `${expiredSubscriptions.length} abonnements expirent dans 7 jours`,
        details: `${
            expiredSubscriptions.map((subs) => subs.fleetName).join(', ')
        }`
    } 

    const fleetBandContent: NotificationBandContent = {
        label: `${inactiveFleets.length} flottes sont inactives depuis 30 jours`,
        details: `${
            inactiveFleets.map((fleet) => fleet.fleetName).join(', ')
        }`
    } 

    return{
        expiredSubscriptions,
        inactiveFleets,
        subscriptionsBandContent,
        fleetBandContent
    }

}