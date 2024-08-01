import {getDate, getDay, getDaysInMonth} from "date-fns";

export type DayInfo = {
    day: number;
    isActive: boolean;
}

class MonthlyCalendar {
    private static readonly DAYS_IN_WEEK = 7;
    private static readonly MAX_CALENDAR_DAYS = 35; // 5 weeks
    private static readonly WEEKS_IN_CALENDAR = 5;

    constructor(private year: number, private month: number) {
    }

    public generate(): DayInfo[] {
        const daysInMonth = this.getDaysInMonth();
        const firstWeekdayOfMonth = this.getFirstWeekdayOfMonth();

        const calendar: DayInfo[] = [
            ...this.generateInactiveDays(firstWeekdayOfMonth),
            ...this.generateActiveDays(daysInMonth),
            ...this.generatePaddingDays(firstWeekdayOfMonth, daysInMonth)
        ];

        return calendar;
    }

    private generateInactiveDaysAtStart(firstDay: number): DayInfo[] {
        const previousMonthDays = getDate(new Date(this.year, this.month - 1, 0));
        return Array.from({length: firstDay}, (_, i) => ({
            day: previousMonthDays - firstDay + i + 1,
            isActive: false
        }));
    }

    private generateInactiveDaysAtEnd(startDay: number): DayInfo[] {
        const daysAfter = MonthlyCalendar.MAX_CALENDAR_DAYS - startDay;
        return Array.from({ length: daysAfter }, (_, i) => ({
            day: (i + 1),
            isActive: false
        }));
    }

    public generate5WeeksCalendar(): DayInfo[][] {
        const daysInMonth = this.getDaysInMonth();
        const firstWeekdayOfMonth = this.getFirstWeekdayOfMonth();

        const calendar: DayInfo[] = [
            ...this.generateInactiveDaysAtStart(firstWeekdayOfMonth),
            ...this.generateActiveDays(daysInMonth)
        ];

        calendar.push(...this.generateInactiveDaysAtEnd(daysInMonth + 1));

        const weeklyCalendar: DayInfo[][] = [];
        for (let week = 0; week < MonthlyCalendar.WEEKS_IN_CALENDAR; week++) {
            const weekStart = week * MonthlyCalendar.DAYS_IN_WEEK;
            const weekEnd = weekStart + MonthlyCalendar.DAYS_IN_WEEK;
            weeklyCalendar.push(calendar.slice(weekStart, weekEnd));
        }

        return weeklyCalendar;
    }

    private getDaysInMonth(): number {
        return getDaysInMonth(new Date(this.year, this.month - 1));
    }

    private getFirstWeekdayOfMonth(): number {
        const firstDayOfMonth = new Date(this.year, this.month - 1, 1);
        return getDay(firstDayOfMonth);
    }
    private generateInactiveDays(firstDay: number): DayInfo[] {
        return Array.from({length: firstDay}, () => ({day: 0, isActive: false}));
    }

    private generateActiveDays(daysInMonth: number): DayInfo[] {
        return Array.from({length: daysInMonth}, (_, i) => ({day: i + 1, isActive: true}));
    }

    private generatePaddingDays(firstDay: number, daysInMonth: number): DayInfo[] {
        const totalActiveAndInactiveDays = firstDay + daysInMonth;
        const paddingDaysNeeded = MonthlyCalendar.MAX_CALENDAR_DAYS - totalActiveAndInactiveDays;

        return Array.from({length: paddingDaysNeeded}, () => ({day: 0, isActive: false}));
    }
}

export default MonthlyCalendar
