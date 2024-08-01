import {addWeeks, endOfWeek, format, startOfWeek} from 'date-fns';
import {WEEKS_CLASIC, YEAR_MONTHS} from "@/utils/staticData";

export const resolveMonth = (monthID: number): string => {
    const monthResolved = YEAR_MONTHS.find(_ => _.id === monthID)?.value

    if (!monthResolved) {
        //throw new Error('Month not found')
        return YEAR_MONTHS[0].value
    }

    return monthResolved
}

export const resolveWeekClassic = (weekClassicID: number): string => {

    const weekResolved = WEEKS_CLASIC.find(_ => +_.id === weekClassicID)?.value

    if (!weekResolved) {
        throw new Error('Week not found')
    }

    return weekResolved
}


export const weekPlageGenerator = (weekNumber: number, year: number): string => {
    const startOfYear = new Date(year, 0, 1);
    const targetWeekStart = addWeeks(startOfYear, weekNumber - 1);

    const weekStartDate = startOfWeek(targetWeekStart, {weekStartsOn: 1});
    const weekEndDate = endOfWeek(targetWeekStart, {weekStartsOn: 1});


    const isSameMonth = weekStartDate.getMonth() === weekEndDate.getMonth();

    let formattedRange;

    if (isSameMonth) {
        formattedRange = `${format(weekStartDate, 'dd')} au 
        ${format(weekEndDate, 'dd')} 
        ${resolveMonth(+format(weekEndDate, 'M'))} 
        ${format(weekStartDate, 'yyyy')}`;
    } else {
        formattedRange = `${format(weekStartDate, 'dd')} ${resolveMonth(+format(weekStartDate, 'M'))}  au 
        ${format(weekEndDate, 'dd')} 
        ${resolveMonth(+format(weekEndDate, 'M'))} 
        ${format(weekEndDate, 'yyyy')}`;
    }

    return formattedRange;
};
