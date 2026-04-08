import { useGetFleetJournal } from "@/hooks/admin/useFleetHook";
import FleetJournalModel from "@/model/ADMIN/FleetJournalModel";
import React from "react";

export default function useFleetJournalHook(
  fleetId?: string,
  scrollRootRef?: React.RefObject<HTMLElement>
) {
  const [page, setPage] = React.useState(1);
  const [journals, setJournals] = React.useState<FleetJournalModel[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [isInitialLoading, setIsInitialLoading] = React.useState(false);
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);

  const observerRef = React.useRef<IntersectionObserver | null>(null);
  
  const { data, isLoading } = useGetFleetJournal(
    fleetId ?? "",
    page,
    10
  );

  const setSentinelRef = React.useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!node || !hasMore || isLoading) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: scrollRootRef?.current ?? null,
        rootMargin: "200px 0px -50px 0px",
        threshold: 0.1
      }
    );

    observer.observe(node);
    observerRef.current = observer;
  }, [hasMore, isLoading, scrollRootRef]);

  // Reset quand le fleetId change
  React.useEffect(() => {
    setPage(1);
    setJournals([]);
    setHasMore(true);
  }, [fleetId]);

  // Gérer les états de chargement
  React.useEffect(() => {
    if (isLoading) {
      if (page === 1) {
        setIsInitialLoading(true);
      } else {
        setIsFetchingMore(true);
      }
    }
  }, [isLoading, page]);

  // Mettre à jour les journaux quand les données arrivent
  React.useEffect(() => {
    if (!data?.journals) {
      // Si pas de données et qu'on était en train de charger, on arrête le chargement
      if (isInitialLoading) setIsInitialLoading(false);
      if (isFetchingMore) setIsFetchingMore(false);
      return;
    }

    setJournals((prev) => {
      if (page === 1) {
        setIsInitialLoading(false);
        return [...data.journals];
      }

      const seen = new Set(prev.map((j) => j.id));
      const newUnique = data.journals.filter((j) => !seen.has(j.id));

      setIsFetchingMore(false);
      return [...prev, ...newUnique];
    });

    setHasMore(page < data.totalPages);
  }, [data, page]);

  React.useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    journals,
    isLoadingFleetJournal: isInitialLoading, // Uniquement pour le chargement initial
    isFetchingFleetJournal: isFetchingMore, // Pour le chargement des pages suivantes
    setSentinelRef,
    hasMore,
    page
  };
}