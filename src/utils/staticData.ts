import {DropdownSelectItemsProps} from "@/app/(protected)/dashboard/_components/_utils/DashboardSection.utils";
import {PlaningType} from "@/types/dashboard.schedule.type";

export const YEAR_MONTHS = [
    {
        id: 1,
        value: 'Janvier'
    },
    {
        id: 2,
        value: 'Février'
    },
    {
        id: 3,
        value: 'Mars'
    },
    {
        id: 4,
        value: 'Avril'
    },
    {
        id: 5,
        value: 'Mai'
    },
    {
        id: 6,
        value: 'Juin'
    },
    {
        id: 7,
        value: 'Juillet'
    },
    {
        id: 8,
        value: 'Août'
    },
    {
        id: 9,
        value: 'Septembre'
    },
    {
        id: 10,
        value: 'Octobre'
    },
    {
        id: 11,
        value: 'Novembre'
    },
    {
        id: 12,
        value: 'Decembre'
    },
] satisfies DropdownSelectItemsProps[]


export const DAYS_OF_WEEk = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

const _YEARS = [2024, 2025, 2026, 2027, 2028]
function generateWeeks() {
    const weeks = [];
    for (let i = 1; i <= 52; i++) {
        const weekNumber = String(i).padStart(2, '0');
        weeks.push(`Semaine ${weekNumber}`);
    }
    return weeks;
}

const _WEEKS = generateWeeks();

export const YEARS_NUM = _YEARS.map((_, i) => ({id: _, value: '' + _})) satisfies DropdownSelectItemsProps[]
export const WEEKS_CLASIC = _WEEKS.map((_, i) => ({id: i+1, value: '' + _})) satisfies DropdownSelectItemsProps[]

export const PLANING_TYPES: {drivers: PlaningType, cars: PlaningType, agents: PlaningType} = {
    drivers: 'Chauffeurs',
    cars: 'Véhicules',
    agents: 'Agents'
}
