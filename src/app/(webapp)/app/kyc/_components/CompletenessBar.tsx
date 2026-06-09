import { cn } from "@/lib/utils";
import { getCompletenessColor } from "../utils";

export function CompletenessBar({ value }: { value: number }) {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div
        className="flex-1 h-2 bg-[#E9EAEC] rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-300",
            getCompletenessColor(clampedValue),
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-[#506D82] w-10 text-right">
        {clampedValue}%
      </span>
    </div>
  );
}
