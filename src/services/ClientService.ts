import Service from "@/services/Service";
import Entretien from "@/model/entretien/Entretien";
import {EntretienResponseType} from "@/types/entretien.types";
import {ResponseWithPagination} from "@/types/generic";
import {AddClientInputs} from "@/schema/supplier.schema";
import ClientModel from "@/model/client/ClientModel";
import {ClientResponseType} from "@/types/client.types";

export enum ClientApiPath {
    CreateClient = '/client',
    GetClient = '/client',
}

class ClientService extends Service {
    private static instance: ClientService = new ClientService();

    private constructor() {
        super();
    }

    public static getInstance(): ClientService {
        return ClientService.instance;
    }


    public static async createNewClient({id, park_id, ...formData}: AddClientInputs): Promise<Entretien> {


        const createClientResult = await ClientService.makeRequest<EntretienResponseType>(
            id ? ClientApiPath.CreateClient + `/${id}` : ClientApiPath.CreateClient, id ? "PUT" : 'POST',
            id ? {...formData} : {park_id, ...formData}
        );

        return new Entretien(createClientResult)
    }

    public static async getClients(parkID: string): Promise<ClientModel[]> {
        const clientUril = ClientApiPath.GetClient + '?park_id=' + parkID
        const clients = await ClientService.makeRequest<ResponseWithPagination<ClientResponseType[]>>(clientUril, 'GET');
        return ClientModel.toArrays(clients.data)
    }


    public static async getClient(clientID: string): Promise<ClientModel> {
        const clientUril = ClientApiPath.GetClient + '/' + clientID
        const client = await ClientService.makeRequest<ClientResponseType>(clientUril, 'GET');
        return new ClientModel(client)
    }


    static refreshClients() {
        return ClientService.getInstance().queryClient.invalidateQueries({queryKey: [ClientApiPath.GetClient]})
    }

    protected static async makeRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT', body?: any): Promise<T> {
        return this.getInstance().execHttpRequest<T>({url, method, body});
    }


}

export default ClientService;
