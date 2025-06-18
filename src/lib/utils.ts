import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {animate} from 'framer-motion';
import {endOfMonth, format, parse, startOfMonth, subMonths} from "date-fns";
import {fr} from "date-fns/locale";


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export function setDateToTime(date?: Date, time?: string) {
    if (!(date instanceof Date) || typeof time !== 'string') {
        throw new Error('Invalid input: date must be a Date object and time must be a string');
    }

    const [hours, minutes] = time.split(':');

    if (isNaN(parseInt(hours)) || isNaN(parseInt(minutes))) {
        throw new Error('Invalid time format');
    }

    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
}

export const scrollToBottom = (element: HTMLElement) => {
    const scrollHeight = element.scrollHeight;
    const height = element.clientHeight;
    const maxScrollTop = scrollHeight - height;

    animate(element.scrollTop, maxScrollTop, {
        type: "tween",
        duration: 0.5,
        ease: "easeInOut",
        onUpdate: (value: number) => {
            element.scrollTop = value;
        }
    });
};


export type DateWithPreviewsDateType = {
    startCurrentMonth: string;
    endCurrentMonth: string;
    startPreviousMonth: string;
    endPreviousMonth: string;
};

/**
 * Set the time of a date to midnight.
 * @param date The date to adjust.
 * @returns The adjusted date at midnight.
 */
function setToMidnight(date: Date): Date {
    date.setHours(0, 0, 0, 0);
    return date;
}

/**
 * Get start and end dates for the current month and the previous month.
 * @param monthNumber The month number (1 for January, 2 for February, etc.)
 * @param year The year number
 * @returns An object containing the start and end dates for the current and previous months, formatted as strings.
 */
export function getMonthDates(monthNumber: number, year: number): DateWithPreviewsDateType {
    // Create a date object for the first day of the given month and year.
    const date = new Date(year, monthNumber - 1, 1);
    setToMidnight(date);

    // Get the start and end of the current month.
    const startCurrentMonth = setToMidnight(startOfMonth(date));
    const endCurrentMonth = setToMidnight(endOfMonth(date));

    // Get the start and end of the previous month.
    const startPreviousMonth = setToMidnight(startOfMonth(subMonths(date, 1)));
    const endPreviousMonth = setToMidnight(endOfMonth(subMonths(date, 1)));

    // Format dates to ISO string with timezone correction
    return {
        startCurrentMonth: format(startCurrentMonth, "yyyy-MM-dd'T'HH:mm:ss"),
        endCurrentMonth: format(endCurrentMonth, "yyyy-MM-dd'T'HH:mm:ss"),
        startPreviousMonth: format(startPreviousMonth, "yyyy-MM-dd'T'HH:mm:ss"),
        endPreviousMonth: format(endPreviousMonth, "yyyy-MM-dd'T'HH:mm:ss")
    };
}


/**
 * Get the previous month and year in the format "Month Year".
 * @param monthNumber The month number (1 for January, 2 for February, etc.)
 * @param year The year number
 * @returns A string representing the previous month and year in the format "Month Year".
 */
export function getPreviousMonthYear(monthNumber: number, year: number): string {
    // Create a date object for the first day of the given month and year.
    const date = new Date(year, monthNumber - 1, 1);

    // Subtract one month.
    const previousMonthDate = subMonths(date, 1);

    // Format and return the month and year in the desired format.
    return format(previousMonthDate, "MMMM yyyy", {locale: fr}); // Assume using French locale
}

/**
 * Get the current month and year.
 * @returns An object containing the current month and year.
 */
export function getCurrentMonthYear() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // getMonth() retourne un mois de 0 (janvier) à 11 (décembre)
    const year = currentDate.getFullYear();

    return {month, year};
}


/**
 * Get the specified month and year in the format "MMMM yyyy".
 * @param monthNumber The month number (1 for January, 2 for February, etc.)
 * @param year The year number
 * @returns A string representing the specified month and year in the format "MMMM yyyy".
 */
export function getSpecifiedMonthYear(monthNumber: number, year: number): string {
    // Create a date object for the first day of the given month and year.
    const date = new Date(year, monthNumber - 1, 1);

    // Format and return the month and year in the desired format.
    return format(date, "MMMM yyyy", {locale: fr});
}

export const formatDateToFormDate = (date: Date): Date => {
    if (!date) return '' as unknown as Date; // Retourne une chaîne vide si la date n'est pas définie

    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-') as unknown as Date;
};

export function parseDaysOff(input: string) {
    const match = input.match(/"\[([\d,]*)\]"/);
    if (!match) return [];

    const daysOffString = match[1];

    const daysOffArray = daysOffString.split(',').map(Number);

    return daysOffArray;
}

export function getDayDate(): string {
    const maintenant = new Date();
    return format(maintenant, 'eee dd MMMM yyyy', {locale: fr});
}


// Définir le format attendu de la chaîne de date
const formatString = 'yyyy-MM-dd';

export const parsedDate = (dateString: string | undefined) => dateString ? parse(dateString, formatString, new Date()) : new Date();

export function formatNumber(input: string | number | undefined): string {
    // Si `input` est falsy (undefined, null, chaîne vide...), on renvoie "0"
    if (!input) {
        return "0";
    }

    let numericValue: number;

    // Si c'est déjà un nombre, on l'assigne directement
    if (typeof input === "number") {
        numericValue = input;
    } else {
        // Sinon, on essaie de parser la chaîne de caractères
        const parsed = parseFloat(input.trim());
        // Si la valeur n'est pas un nombre, on renvoie "0"
        if (isNaN(parsed)) {
            return "0";
        }
        numericValue = parsed;
    }

    // On vérifie le nombre de décimales présent dans la chaîne d'origine
    // (par exemple "12.3456" => decimalPart.length === 4)
    const decimalPart = numericValue.toString().split(".")[1];
    // Si la partie décimale a plus de 2 chiffres, on garde 2 décimales,
    // sinon on arrondit à 0 décimale
    const decimals = decimalPart && decimalPart.length > 2 ? 2 : 0;

    // On arrondit le nombre au format désiré
    const fixedStr = numericValue.toFixed(decimals);

    // Séparation partie entière et partie décimale
    const [intPart, decPart] = fixedStr.split(".");

    // Ajout de la virgule de séparation tous les trois chiffres
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Si on a une partie décimale, on la réassemble
    // Sinon on renvoie juste la partie entière formatée
    return decPart ? `${formattedInt}.${decPart}` : formattedInt;
}

export enum ConnexionMode {
    Staging = "staging",
    Production = "production",
}