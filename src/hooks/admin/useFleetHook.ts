import { useQuery } from "@tanstack/react-query";
import { useMutationProvider, useQueryProvider } from "@/hooks/hooksProvider";
import { useGetParkID } from "@/hooks/__globlal/useGlobalHook";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { toIsoDate } from "@/services/Service";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import FleetService, {
  FleetApiPath,
} from "@/services/admin/fleet/fleetService";
import {
  FleetByCityInputs,
  FleetRegisterFormData,
  FleetSubscriptionParams,
  GetFleetsParams,
  OperatorRevenusInputs,
  ProfitableListInputs,
  SubscriptionPlanRevenusInputs,
  SuspendFleetData,
  TransactionHistoryParams,
} from "@/types/admin/fleet.type";
import { DashboardParams } from "@/types/dashboard.type";

export const useGetSubscriptionPlanRevenus = (
  inputs: SubscriptionPlanRevenusInputs,
) => {
  const currency_id = AuthManagerGuard.getCurrencyId;
  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.SubscriptionPlanRevenus, inputs, currency_id],
    queryFn: () => FleetService.getSubscriptionPlanRevenus(inputs),
  });
  return {
    isLoading,
    data,
  };
};

export const useGetProfitableList = (inputs: ProfitableListInputs) => {
  const enable_city_id = AuthManagerGuard.getEnabledCity;
  const fleetType = AuthManagerGuard.getEnabledFleetType;
  const currency = AuthManagerGuard.getCurrency;

  const { isLoading, data } = useQueryProvider({
    queryKey: [
      FleetApiPath.ProfitableList,
      inputs,
      enable_city_id,
      fleetType,
      currency,
    ],
    queryFn: () => FleetService.getProfitableList(inputs),
  });
  return { isLoading, data };
};

export const useGetFleetByCity = (inputs: FleetByCityInputs) => {
  const { isLoading, data } = useQueryProvider({
    queryKey: [inputs, FleetApiPath.FleetByCity],
    queryFn: () => FleetService.getFleetByCity(inputs),
  });
  return { isLoading, data };
};

export const useGetOperatorsRevenus = (inputs: OperatorRevenusInputs) => {
  const enable_city_id = AuthManagerGuard.getEnabledCity;
  const fleetType = AuthManagerGuard.getEnabledFleetType;
  const currencyId = AuthManagerGuard.getCurrencyId;

  const { isLoading, data } = useQueryProvider({
    queryKey: [
      FleetApiPath.OperatorRevenus,
      enable_city_id,
      fleetType,
      currencyId,
    ],
    queryFn: () =>
      FleetService.getOratorsRevenus({
        currency_id: currencyId.toString(),
        city_id: enable_city_id,
        ...inputs,
      }),
  });
  return { isLoading, data };
};

export const useGetCurrenciesList = () => {
  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.Currency],
    queryFn: () => FleetService.getCurrencies(),
  });
  return { isLoading, data };
};

export const useGetFleetsList = (params: GetFleetsParams) => {
  const enable_city_id = AuthManagerGuard.getEnabledCity;
  const fleetType = AuthManagerGuard.getEnabledFleetType;

  const { isLoading, data, isSuccess, isFetching, isRefetching } = useQuery({
    queryKey: [
      FleetApiPath.GetFleetByCityID,
      enable_city_id,
      fleetType,
      params,
    ],
    queryFn: () => FleetService.GetFleetByCityID(params),
  });

  return { isLoading, data, isFetching, isRefetching };
};

export const useCreateFleet = () => {
  const { data, loading, isSuccess, isError, error, handleMutation } =
    useMutationProvider({
      mutationFn: FleetService.createNewFleet,
      successMessage: "Flotte ajouté avec succès.",
    });

  const onCreateFleet = (data: FleetRegisterFormData) => {
    handleMutation(data);
  };

  React.useEffect(() => {
    if (isSuccess && data) {
      void FleetService.invalidFleets();
    }
  }, [isSuccess, data]);

  return {
    data,
    loading,
    isSuccess,
    isError,
    error,
    onCreateFleet,
  };
};

export const useGetFleetAdmin = () => {
  const { parkID } = useGetParkID();

  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.GetAdminByCityID, parkID],
    queryFn: () => FleetService.getAdminsOnFleet({ park_id: parkID }),
    enabled: !!parkID,
  });

  return { isLoading, data };
};

export const useGetSubscriptionHistoryOnFleet = (
  params: FleetSubscriptionParams,
  park_id?: string,
) => {
  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.ActiveSubscriptionList, params, park_id],
    queryFn: () => FleetService.getActiveSubscriptionList(params, park_id),
    enabled: !!park_id,
  });

  return { isLoading, data };
};

export const useGetActiveSubscriptionOnFleet = (fleetID?: string) => {
  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.ActiveSubscription, fleetID],
    queryFn: () => FleetService.getActiveSubscription({ parkID: fleetID }),
    enabled: !!fleetID,
  });

  return { isLoading, data };
};

export const useGetFleetDetails = () => {
  const enable_city_id = AuthManagerGuard.getEnabledCity as string;
  const fleetType = AuthManagerGuard.getEnabledFleetType;

  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.FleetDetails, enable_city_id, fleetType],
    queryFn: () =>
      FleetService.getFleetDetails({
        fleetID: AuthManagerGuard.getEnabledCity as string,
        fleetType: AuthManagerGuard.getEnabledFleetType as string,
      }),
    enabled: !!enable_city_id,
  });

  return { isLoading, data };
};

export const useGetFleetProfilesVehiclesDetails = () => {
  const { parkID } = useGetParkID();

  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.FleetVehiclesAndProfiles, parkID],
    queryFn: () =>
      FleetService.getFleetVehiclesAndProfilesDetails({ fleetID: parkID }),
    enabled: !!parkID,
  });

  return { isLoading, data };
};

export const useGetFleetStats = () => {
  const cityID = AuthManagerGuard.getEnabledCity;
  const fleetType = AuthManagerGuard.getEnabledFleetType;

  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.FleetStats, cityID, fleetType],
    queryFn: () =>
      FleetService.getFleetStats({
        fleetID: AuthManagerGuard.getEnabledCity as string,
        fleetType: AuthManagerGuard.getEnabledFleetType as string,
      }),
    enabled: !!cityID,
  });

  return { isLoading, data };
};

export const useGetSpecificFleetStats = () => {
  const { parkID } = useGetParkID();

  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.SpecificFleetStat, parkID],
    queryFn: () =>
      FleetService.getSpecificFleetStat({ fleetID: parkID as string }),
    enabled: !!parkID,
  });

  return { isLoading, data };
};

//Fleet Graph
export const useGetCourseEvolution = (graphType: string) => {
  const { parkID } = useGetParkID();

  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.CourseEvolution, parkID, graphType],
    queryFn: () =>
      FleetService.getCourseEvolution({
        fleetID: parkID as string,
        graphType: graphType,
      }),
    enabled: !!parkID,
  });

  return { isLoading, data };
};

export const useGetActiveFleet = () => {
  const { parkID } = useGetParkID();

  const { data: data, isLoading } = useGetFleetsList({
    page: 1,
    itemPerPage: 1,
  });

  const activeFleet = useMemo(() => {
    const activeFleet = data?.fleets?.find((f) => f.id == parkID);
    return activeFleet;
  }, [data, parkID]);

  return {
    isLoading,
    activeFleet,
    activeFleetCurrency: activeFleet?.currency,
  };
};

export const useGetRevenusEvolution = (graphType: string) => {
  const { parkID } = useGetParkID();

  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.RevenusEvolution, parkID, graphType],
    queryFn: () =>
      FleetService.getRevenusEvolution({
        fleetID: parkID as string,
        graphType: graphType,
      }),
    enabled: !!parkID,
  });

  return { isLoading, data };
};

export const useGetEntretienEvolution = (graphType: string) => {
  const { parkID } = useGetParkID();

  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.EntretienEvolution, parkID, graphType],
    queryFn: () =>
      FleetService.getEntretienEvolution({
        fleetID: parkID as string,
        graphType: graphType,
        date: toIsoDate(new Date()) as unknown as Date,
      }),
    enabled: !!parkID,
  });

  return { isLoading, data };
};

//Dashboard
export const useGetParkStats = () => {
  const cityID = AuthManagerGuard.getEnabledCity;
  const type = AuthManagerGuard.getEnabledFleetType as string;
  const currency = AuthManagerGuard.getCurrency;

  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.ParkStats, cityID, currency, type],
    queryFn: () =>
      FleetService.getParkStats({
        cityID: AuthManagerGuard.getEnabledCity as string,
        type: AuthManagerGuard.getEnabledFleetType as string,
        currency: AuthManagerGuard.getCurrency,
      }),
    enabled: !!AuthManagerGuard.getEnabledCity,
  });

  return { isLoading, data };
};

export const useGetBestAndLestOnCity = () => {
  const cityID = AuthManagerGuard.getEnabledCity;
  const type = AuthManagerGuard.getEnabledFleetType as string;

  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.BestAndLeastOnCity, cityID, type],
    queryFn: () =>
      FleetService.getBestAndLestOnCity({
        city_id: AuthManagerGuard.getEnabledCity as string,
        type: AuthManagerGuard.getEnabledFleetType as string,
      }),
    enabled: !!cityID,
  });

  return { isLoading, data };
};

export const useGetDashboardActivities = (start_date: Date, end_date: Date) => {
  const cityID = AuthManagerGuard.getEnabledCity as string;
  const type = AuthManagerGuard.getEnabledFleetType as string;

  const { isLoading, data } = useQueryProvider({
    queryKey: [
      FleetApiPath.DashboardActivities,
      cityID,
      type,
      start_date,
      end_date,
    ],
    queryFn: () =>
      FleetService.getDashboardActivities({
        city_id: AuthManagerGuard.getEnabledCity as string,
        type: AuthManagerGuard.getEnabledFleetType as string,
        start_date: start_date,
        end_date: end_date,
      }),
    enabled: !!cityID,
  });

  return { isLoading, data };
};

export const useGetDashboardSubscriptionEvolution = (graphType: string) => {
  const cityID = AuthManagerGuard.getEnabledCity;
  const fleetType = AuthManagerGuard.getEnabledFleetType as string;

  const { isLoading, data } = useQueryProvider({
    queryKey: [
      FleetApiPath.DashboardSubscriptionEvolution,
      cityID,
      fleetType,
      graphType,
    ],
    queryFn: () =>
      FleetService.getDashboardSubscriptionEvolution({
        cityID: AuthManagerGuard.getEnabledCity as string,
        type: AuthManagerGuard.getEnabledFleetType as string,
        graphType: graphType,
      }),
    enabled: !!cityID,
  });

  return { isLoading, data };
};

export const useActiveSubscription = () => {
  const $router = useRouter();

  const { data, loading, isSuccess, isError, handleMutation } =
    useMutationProvider({
      mutationFn: FleetService.activeSubscription,
      successMessage: "Souscription activée",
      updateMessage: "Souscription activée",
    });

  const parkID = useGetParkID();

  const onActiveSubscription = (subscriptionID: string) => {
    handleMutation({
      subscriptionID: subscriptionID,
      parkID: parkID.parkID,
    });
  };

  React.useEffect(() => {
    if (data && isSuccess) {
      void FleetService.invalidActiveSubscription();
    }
  }, [data, isSuccess]);

  return {
    data,
    loading,
    isSuccess,
    onActiveSubscription,
  };
};

export const useSuspendSubscription = () => {
  const $router = useRouter();

  const { data, loading, isSuccess, isError, handleMutation } =
    useMutationProvider({
      mutationFn: FleetService.cancelSubscription,
      successMessage: "Souscription supendus",
      updateMessage: "Souscription suspendus",
    });

  const parkID = useGetParkID();

  const onSuspendSubscription = () => {
    console.log(parkID.parkID);

    handleMutation({
      parkID: parkID.parkID,
    });
  };

  React.useEffect(() => {
    if (data && isSuccess) {
      void FleetService.invalidActiveSubscription();
    }
  }, [data, isSuccess]);

  return {
    data,
    loading,
    isSuccess,
    onSuspendSubscription,
  };
};

/////////////////////////////////////////////////////////////

export const useGetFleetOverview = (fleetId: string) => {
  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.GetFleetOverview, fleetId],
    queryFn: () => FleetService.getFleetOverview(fleetId),
    enabled: !!fleetId,
  });

  return {
    isLoading,
    data,
  };
};

export const useGetFleetProfile = (fleetId: string) => {
  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.GetFleetProfile, fleetId],
    queryFn: () => FleetService.getFleetProfile(fleetId),
    enabled: !!fleetId,
  });

  return {
    data,
    isLoading,
  };
};

export const useGetFleetJournal = (
  fleetId: string,
  page?: number,
  itemPerPage?: number,
) => {
  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.GetFleetJournal, fleetId, page],
    queryFn: () => FleetService.getFleetJournal(fleetId, page, itemPerPage),
    enabled: !!fleetId,
  });

  return {
    data,
    isLoading,
  };
};


////////////////////////////////////////////////////////////////////////////////
export const useGetFleetTransactionsKpi = (
  fleetId?: string, params?: {start_date?: string, end_date?: string}
) => {
  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.GetFleetTransactionsKpi, fleetId, params],
    queryFn: () => FleetService.getFleetTransactionsKpi(fleetId, params),
    enabled: !!fleetId,
  });

  return {
    data,
    isLoading,
  };
};

export const useGetFleetTransactions = (params: TransactionHistoryParams) => {
  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.GetFleetJournal, params],
    queryFn: () => FleetService.getFleetTransactions(params),
  });

  return {
    data,
    isLoading,
  };
};

export const useGetFleetsKpi = (params: DashboardParams) => {
  const { isLoading, data } = useQueryProvider({
    queryKey: [FleetApiPath.GetFleetsKpi, params],
    queryFn: () => FleetService.getFleetsKpi(params),
  });

  return {
    data,
    isLoading,
  };
};

export const useSuspendFleet = () => {
  const { data, loading, isSuccess, isError, error, handleMutation } =
    useMutationProvider({
      mutationFn: FleetService.suspendFleet,
      successMessage: "La flotte a ete suspendu.",
    });

  const onSuspendFleet = (data: SuspendFleetData) => {
    handleMutation(data);
  };

  React.useEffect(() => {
    if (isSuccess && data) {
      void FleetService.invalidFleets();
    }
  }, [isSuccess, data]);

  return {
    data,
    loading,
    isSuccess,
    isError,
    error,
    onSuspendFleet,
  };
};

export const useDeleteFleet = () => {
  const { data, loading, isSuccess, isError, error, handleMutation } =
    useMutationProvider({
      mutationFn: FleetService.deleteFleet,
      successMessage: "La flotte a ete suprimer.",
    });

  const onDeleteFleet = (data: SuspendFleetData) => {
    handleMutation(data);
  };

  React.useEffect(() => {
    if (isSuccess && data) {
      void FleetService.invalidFleets();
    }
  }, [isSuccess, data]);

  return {
    data,
    loading,
    isSuccess,
    isError,
    error,
    onDeleteFleet,
  };
};