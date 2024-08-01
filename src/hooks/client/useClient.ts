import {AddClientInputs} from "@/schema/supplier.schema";
import ClientService, {ClientApiPath} from "@/services/ClientService";
import {useGetParkID} from "@/hooks/__globlal/useGlobalHook";
import useClientStore from "@/app/(protected)/dashboard/clients/store/useAddClientStore";
import {useMutationProvider, useQueryProvider} from "@/hooks/hooksProvider";

export const useCreateClient = () => {
    const {parkID} = useGetParkID();
    const {activeAddress} = useClientStore();

    const {
        data,
        loading,
        isSuccess,
        isError,
        handleMutation,
    } = useMutationProvider({
        mutationFn: ClientService.createNewClient,
        successMessage: "Client ajouté avec succès",
        updateMessage: "Client mis à jour avec succès",
    });

    const handleCreateClient = (client: AddClientInputs) => {
        handleMutation({
                ...client,
                park_id: parkID,
                address: activeAddress.length ? activeAddress : undefined,
                email: client.email?.length ? client.email : undefined
            },
            !!client.id
        );
    };

    return {
        data,
        loading,
        isSuccess,
        isError,
        handleCreateClient,
    };
};


export const useGetClients = () => {
    const {parkID} = useGetParkID();

    const {isLoading, data} = useQueryProvider({
        queryKey: [ClientApiPath.GetClient],
        queryFn: () => ClientService.getClients(parkID),
        enabled: !!parkID
    });

    return {isLoading, data};
};

export const useGetClient = (clientID: string) => {
    const {parkID} = useGetParkID();

    const {isLoading, data} = useQueryProvider({
        queryKey: [`new:${ClientApiPath.GetClient}`, clientID],
        queryFn: () => ClientService.getClient(clientID),
        enabled: !!clientID
    });

    return {isLoading, data};
};