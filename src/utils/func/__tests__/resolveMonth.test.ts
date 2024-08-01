import { describe, it, expect, vi } from 'vitest';
import {resolveMonth} from "@/utils/func/dateConfig";

vi.mock('@/utils/staticData', () => ({
    YEAR_MONTHS: [
        { id: 1, value: 'January' },
        { id: 2, value: 'February' },
        { id: 3, value: 'March' },
    ],
}));

describe('resolveMonth', () => {
    it('returns the correct month name for a given month ID', () => {
        expect(resolveMonth(1)).toBe('January');
        expect(resolveMonth(2)).toBe('February');
    });

    it('throws an error for an invalid month ID', () => {
        const invalidMonthID = 13;
        expect(() => resolveMonth(invalidMonthID)).toThrow('Month not found');
    });
});
