import {useQuery} from "@tanstack/react-query";
import {useGetParkID} from "@/hooks/__globlal/useGlobalHook";
import AccountingService, {AcountingApiPath} from "@/services/AccountingService";
import {DateWithPreviewsDateType} from "@/lib/utils";
import {useMutationProvider} from "@/hooks/hooksProvider";
import {ACCOUNTING_TYPE, CreateEntryOrDenpenseInput} from "@/types/Accounting.types";
import {CreateAccountingOrSubAccountingInput, CreateFundMovementInput} from "@/schema/accounting.schema";
import React from "react";

export const useRequestAccounting = () => {

    const {parkID} = useGetParkID()

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [AcountingApiPath.RequestAcounting],
        queryFn: () => AccountingService.requestAcounting(parkID as string),
        enabled: !!parkID
    })


    return {isLoading, data}
}

export const useRequestUncollectedRecipes = (isExpected?: boolean) => {

    const {parkID} = useGetParkID()

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [AcountingApiPath.UncollectedRecipes],
        queryFn: () => isExpected
            ? AccountingService.requestExpectedRecipes({parkID: parkID})
            : AccountingService.requestUncollectedRecipes({parkID: parkID}),
        enabled: !!parkID
    })


    return {isLoading, data}
}

export const useRequestAccountingPNL = () => {

    const {parkID} = useGetParkID()
    const year = 2024

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [AcountingApiPath.AccountingPNL],
        queryFn: () => AccountingService.requestAcountingPNL({parkID, year}),
        enabled: !!parkID
    })


    return {isLoading, data}
}

export const useRequestAccountingState = (dates: DateWithPreviewsDateType) => {

    const {parkID} = useGetParkID()

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [AcountingApiPath.AccountingState, JSON.stringify(dates)],
        queryFn: () => AccountingService.requestAccountingState({parkID, dates: dates}),
        enabled: !!parkID
    })


    return {isLoading, data}
}

export const useRequestFleetDetails = () => {

    const {parkID} = useGetParkID()

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [AcountingApiPath.FleetDetails],
        queryFn: () => AccountingService.requestFleetDetails({parkID}),
        enabled: !!parkID
    })

    return {isLoading, data}
}

export const useRequestFleetChatData = () => {

    const {parkID} = useGetParkID()

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [AcountingApiPath.FleetCharts],
        queryFn: () => AccountingService.requestPieChart(parkID),
        enabled: !!parkID
    })

    return {isLoading, data}
}

export const useCreateEntryOrDepense = () => {

    const {
        data,
        loading,
        handleMutation,
        isSuccess,
        isError
    } = useMutationProvider({
        mutationFn: AccountingService.createEntryOrDepense,
        successMessage: "Encaissement effectué"
    })

    const {parkID} = useGetParkID()

    const onCreateEntry = (inputs: CreateEntryOrDenpenseInput) => {
        const data: CreateEntryOrDenpenseInput = {
            park_id: parkID
        }

        handleMutation({...inputs, park_id: parkID})
    }

    return {
        isSuccess,
        isError,
        data,
        onCreateEntry,
        loading
    }
}

export const useCreatePnlCategory = () => {

    const {data, loading, handleMutation, isSuccess} = useMutationProvider({
        mutationFn: AccountingService.createPnlAccountOrSubAccount,
        successMessage: "Catégorie ajoutée",
    })

    const {parkID} = useGetParkID()

    React.useEffect(() => {
        if (isSuccess && data) {
            void AccountingService.refreshPnlAccounting()
            void AccountingService.refreshPnlDataTable()
        }
    }, [isSuccess, data])

    const onCreatePnlCtg = (inputs: CreateAccountingOrSubAccountingInput) => {
        handleMutation({...inputs, park_id: parkID})
    }

    return {
        data,
        isSuccess,
        onCreatePnlCtg,
        loading
    }
}

export const useGetPnlAccounts = (accountingType?: ACCOUNTING_TYPE) => {

    const {parkID} = useGetParkID()

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [AcountingApiPath.PnlAccount, accountingType],
        queryFn: () => AccountingService.requestAllPnlAccount({
            parkID: parkID,
            type: accountingType
        }),
        enabled: !!parkID
    })

    return {isLoading, data}
}


export const useGetPnlSubAccounts = (ctgID?: string) => {

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [AcountingApiPath.PnlSubAccount, ctgID],
        queryFn: () => AccountingService.requestAllPnlAccount({account_id: ctgID}),
        enabled: !!ctgID
    })

    return {isLoading, data}
}


export const useCreateFundMovement = () => {

    const {data, loading, handleMutation, isSuccess} = useMutationProvider({
        mutationFn: AccountingService.createFundMovement,
        successMessage: "Mouvement de fond crée",
    })


    React.useEffect(() => {
        if (isSuccess && data) {
            void AccountingService.refreshPnlDataTable()
        }
    }, [isSuccess, data])

    const onCreateFundMovement = (inputs: CreateFundMovementInput) => {
        handleMutation({...inputs})
    }

    return {
        data,
        isSuccess,
        onCreateFundMovement,
        loading
    }
}
