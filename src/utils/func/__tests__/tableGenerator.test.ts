import {describe, expect, it} from 'vitest';
import MonthlyCalendar from '../calendarGenerator';

describe('MonthlyCalendar', () => {
    it('should generate a correct 5 weeks calendar for February 2024', () => {
        const calendar = new MonthlyCalendar(2024, 2);
        const weeklyCalendar = calendar.generate5WeeksCalendar();
        expect(weeklyCalendar).toHaveLength(5);

        expect(weeklyCalendar[0][4].day).toBe(1);
        expect(weeklyCalendar[0][4].isActive).toBe(true);

        expect(weeklyCalendar[4][4].day).toBe(29);
        expect(weeklyCalendar[4][4].isActive).toBeTruthy();

        expect(weeklyCalendar[4][5].isActive).toBeFalsy();
    });
});
