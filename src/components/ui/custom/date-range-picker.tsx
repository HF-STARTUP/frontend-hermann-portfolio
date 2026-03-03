"use client";

import React, { useEffect, useState, forwardRef } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import BtnBase from "@/components/elements/BtnBase";

interface DateRangePickerProps {
  dateRange?: DateRange;
  onDateRangeChange?: (dateRange: DateRange | undefined) => void;
  dateFilterLabel?: string;
  className?: string;
  placeholder?: string;
  showClearButton?: boolean;
  numberOfMonths?: number;
  disabled?: boolean;
  defaultMonth?: Date;
  colorCalendarIcon?: string;
  minDate?: Date;
  maxDate?: Date;
  onApply?: () => void;
  useInDialog?: boolean;
}

export const DateRangePicker = forwardRef<HTMLButtonElement, DateRangePickerProps>(
  (
    {
      dateRange,
      onDateRangeChange,
      dateFilterLabel = "Sélectionner une période",
      className,
      placeholder = "Sélectionner une période",
      showClearButton = true,
      disabled = false,
      numberOfMonths = 2,
      defaultMonth,
      minDate,
      maxDate,
      colorCalendarIcon,
      onApply,
      useInDialog = false,
    },
    ref
  ) => {
    const [localDateRange, setLocalDateRange] = useState<DateRange | undefined>(dateRange);
    const [isOpen, setIsOpen] = useState(false);
    const [activeMonths, setActiveMonths] = useState(numberOfMonths);

    // --- Gestion du Responsive pour le nombre de mois ---
    useEffect(() => {
      const updateMonths = () => {
        if (window.innerWidth < 768) {
          setActiveMonths(1);
        } else {
          setActiveMonths(numberOfMonths);
        }
      };

      updateMonths();
      window.addEventListener("resize", updateMonths);
      return () => window.removeEventListener("resize", updateMonths);
    }, [numberOfMonths]);

    // --- Sync locale si la prop change de l'extérieur ---
    useEffect(() => {
      setLocalDateRange(dateRange);
    }, [dateRange?.from?.getTime(), dateRange?.to?.getTime()]);

    const handleApply = () => {
      if (localDateRange?.from) {
        // Si une seule date est sélectionnée, on crée une plage d'un jour
        const finalRange = localDateRange.to 
          ? localDateRange 
          : { from: localDateRange.from, to: localDateRange.from };
        
        onDateRangeChange?.(finalRange);
      }
      setIsOpen(false);
      onApply?.();
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      setLocalDateRange(undefined);
      onDateRangeChange?.(undefined);
    };

    const displayRange = localDateRange || dateRange;

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen} modal={!useInDialog}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            disabled={disabled}
            className={cn(
              "h-11 px-4 w-full md:w-auto min-w-[240px] justify-between text-left font-normal rounded-xl border-[#E9EAEC] bg-white hover:bg-gray-50 transition-all",
              !displayRange && "text-vaTextPrimary",
              className
            )}
          >
            <div className="flex items-center gap-2 overflow-hidden mr-2">
              <CalendarIcon 
                className={cn("size-4 shrink-0", colorCalendarIcon ? `text-[${colorCalendarIcon}]` : "text-admin-primary")} 
              />
              <span className="truncate text-sm">
                {displayRange?.from ? (
                  <span className="text-vaTextPrimary font-medium">
                    {format(displayRange.from, "dd MMM", { locale: fr })}
                    {displayRange.to && displayRange.to !== displayRange.from && (
                      <> - {format(displayRange.to, "dd MMM yyyy", { locale: fr })}</>
                    )}
                  </span>
                ) : (
                  placeholder
                )}
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {showClearButton && displayRange && (
                <div 
                  onClick={handleClear}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="size-3 text-gray-400" />
                </div>
              )}
              <ChevronDown className={cn("size-4 text-gray-400 transition-transform", isOpen && "rotate-180")} />
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent 
          className="w-screen sm:w-auto p-0 sm:p-2 border-[#E9EAEC] shadow-lg z-[100] rounded-3xl" 
          align="start"
          sideOffset={8}
          usePortal={!useInDialog}
        >
          <div className="p-4 flex flex-col gap-4">
            <div className="flex flex-col">
              <h4 className="font-semibold text-vaTextPrimary text-sm">{dateFilterLabel}</h4>
              <p className="text-[11px] text-vaTextPrimary">Sélectionnez une date ou une période</p>
            </div>

            <div className="overflow-x-auto pb-2 flex justify-center">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={displayRange?.from || defaultMonth || new Date()}
                selected={localDateRange}
                onSelect={setLocalDateRange}
                numberOfMonths={activeMonths}
                locale={fr}
                disabled={[
                  minDate ? { before: minDate } : undefined,
                  maxDate ? { after: maxDate } : undefined,
                ].filter((d): d is any => !!d)}
                className="rounded-md border border-[#E9EAEC]"
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2 border-t pt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="w-full h-10 rounded-lg text-xs"
              >
                Annuler
              </Button>
              <Button
                size="sm"
                variant="mainBlue"
                disabled={!localDateRange?.from}
                onClick={handleApply}
                className="w-full h-10 rounded-lg text-xs font-semibold"
              >
                Appliquer
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);

DateRangePicker.displayName = "DateRangePicker";