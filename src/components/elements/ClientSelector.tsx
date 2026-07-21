"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Users, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "../ui/skeleton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ScrollContainer } from "../box/ScrollContainer";
import useFleetHook from "@/app/(webapp)/app/fleet/_hook/useFleetHook";
import { FleetModel } from "@/model/ADMIN/fleet";
import { EmptyData } from "../box/PageNetworkState";

interface ClientSelectorProps {
    selectedItems?: string[];
    onSelectionChange?: (selectedItems: string[]) => void;
    placeholder?: string;
    className?: string
}

const ClientSelectorSkeleton = () => {
    return (
        <div className="flex flex-col gap-2 p-4 pt-0">
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3 rounded-md p-2">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="flex flex-1 flex-col gap-2">
                        <Skeleton className="h-3 w-1/3" />
                        <Skeleton className="h-2.5 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export const ClientSelector = ({
    selectedItems = [],
    onSelectionChange,
    placeholder = "Sélectionner des clients",
    className,
}: ClientSelectorProps) => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [accumulatedFleets, setAccumulatedFleets] = useState<FleetModel[]>([]);

    const {
        fleets,
        setFleetFilters,
        isLoading,
        hasMore,
        page,
        setPage
    } = useFleetHook();

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            setDebouncedSearch(searchValue);
        }, 300);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [searchValue]);

    useEffect(() => {
        setPage(1);
        setAccumulatedFleets([]);
        setFleetFilters((prev) => ({ ...prev, name: debouncedSearch, page: 1 }));
    }, [debouncedSearch]);

    useEffect(() => {
        if (page <= 1) {
            setAccumulatedFleets(fleets);
        } else {
            setAccumulatedFleets((prev) => {
                const existingIds = new Set(prev.map((fleet) => fleet.id));
                const newFleets = fleets.filter((fleet) => !existingIds.has(fleet.id));
                return [...prev, ...newFleets];
            });
        }
    }, [fleets]);

    const handleNearBottom = () => {
        console.log("yesssjcnd", hasMore)
        if (isLoading || !hasMore) return;

        const nextPage = page + 1;
        setPage(nextPage);
        setFleetFilters((prev) => ({ ...prev, page: nextPage }));
    };

    const toggleClient = (clientId: string) => {
        if (!onSelectionChange) return;

        const isSelected = selectedItems.includes(clientId);
        const nextSelection = isSelected
            ? selectedItems.filter((id) => id !== clientId)
            : [...selectedItems, clientId];

        onSelectionChange(nextSelection);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className={cn("justify-start gap-2", className)}>
                    <Users className="h-4 w-4" />
                    {selectedItems.length > 0
                        ? `${selectedItems.length} client(s) sélectionné(s)`
                        : placeholder}
                </Button>
            </DialogTrigger>

            <DialogContent className="flex h-[70vh] flex-col gap-2 p-0">
                <DialogHeader className="p-4 pb-0">
                    <DialogTitle>Sélectionner des clients</DialogTitle>
                </DialogHeader>

                <div className="relative px-4">
                    <Search className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        placeholder="Rechercher un client..."
                        className="pl-9"
                    />
                </div>

                {isLoading && page <= 1 ? (
                    <ClientSelectorSkeleton />
                ) : (
                    <ScrollContainer
                        className="flex-1 flex flex-col gap-2 p-4 pt-0"
                        onNearBottom={handleNearBottom}
                    >
                        {accumulatedFleets.length === 0 ? (
                            <EmptyData message="Aucun client trouvé" />
                        ) : (
                            accumulatedFleets.map((fleet: FleetModel) => {
                                const isSelected = selectedItems.includes(fleet.id);

                                return (
                                    <Button
                                        key={fleet.id}
                                        type="button"
                                        variant="secondary"
                                        onClick={() => toggleClient(fleet.id)}
                                        className={cn(
                                            "flex h-auto items-center justify-start gap-3 rounded-2xl p-2 text-left",
                                            isSelected && "bg-accent"
                                        )}
                                    >
                                        <Checkbox
                                            checked={isSelected}
                                            tabIndex={-1}
                                            className="pointer-events-none"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{fleet.name}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {fleet.ownerName}
                                            </span>
                                        </div>
                                    </Button>
                                );
                            })
                        )}

                        {isLoading && page > 1 && (
                            <ClientSelectorSkeleton />
                        )}
                    </ScrollContainer>
                )}
            </DialogContent>
        </Dialog>
    );
};