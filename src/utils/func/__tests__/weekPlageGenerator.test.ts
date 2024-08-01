import {describe, expect, it, vi} from 'vitest';
import {weekPlageGenerator} from "@/utils/func/dateConfig";

vi.mock('./../dateConfig', () => ({
    resolveMonth: (month: number) => ['janvier', 'février', 'mars', 'avril', 'mai'][month - 1]
}));

describe('weekPlageGenerator', () => {
    it('should format range within the same month correctly in French', () => {
        expect(weekPlageGenerator(1, 2024)).toBe('01 au 07 janvier 2024');
    });

    it('should format range across two months correctly in French', () => {
        expect(weekPlageGenerator(9, 2024)).toBe('26 février au 03 mars 2024');
    });

});
