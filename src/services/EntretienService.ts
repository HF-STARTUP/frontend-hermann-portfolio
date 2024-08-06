import Service from "@/services/Service";
import Entretien, {CarComponent, RepairType} from "@/model/entretien/Entretien";
import {
    CarComponentResponse,
    CreateCarComponentInputs,
    CreateEntretienInputs,
    EntretienResponseType,
    RepaitTypeResponse,
    TASK_STATUS
} from "@/types/entretien.types";
import {ResponseWithPagination} from "@/types/generic";
import {FinishEntretienInterface} from "@/schema/vehicule.schema";

export enum EntretienApiPath {
    CreateEntretien = '/entretien',
    UpdateEntretien = '/entretien',
    GetEntretien = '/entretien',
    RepairType = '/repair-type',
    CarComponent = '/car-component'
}

class EntretienService extends Service {
    private static instance: EntretienService = new EntretienService();

    private constructor() {
        super();
    }

    public static getInstance(): EntretienService {
        return EntretienService.instance;
    }

    public static async finishEntretien({id, amount, description}: FinishEntretienInterface): Promise<Entretien> {
        const finishEntretienResult = await EntretienService.makeRequest<EntretienResponseType>(EntretienApiPath.UpdateEntretien + `/${id}`, 'PUT', {
            amount: `${amount}`,
            description: description,
            status: TASK_STATUS.FINISHED
        });
        return new Entretien(finishEntretienResult)
    }


    public static async cancelEntretien(id: number): Promise<Entretien> {
        const finishEntretienResult = await EntretienService.makeRequest<EntretienResponseType>(EntretienApiPath.UpdateEntretien + `/${id}`, 'PUT', {status: TASK_STATUS.CANCELED});
        return new Entretien(finishEntretienResult)
    }


    public static async createNewEntretien(formData: CreateEntretienInputs): Promise<Entretien> {
        const entretienCreateResult = await EntretienService.makeRequest<EntretienResponseType>(EntretienApiPath.CreateEntretien, 'POST', formData);
        return new Entretien(entretienCreateResult)
    }


    public static async getEntretiens(parkID: string): Promise<Entretien[]> {
        const entretiensUri = EntretienApiPath.GetEntretien + '/by/' + parkID
        const createEntretienRequestResult = await EntretienService.makeRequest<ResponseWithPagination<EntretienResponseType[]>>(entretiensUri, 'GET');
        return Entretien.toArrays(createEntretienRequestResult.data)
    }

    public static async getRepairsType(): Promise<RepairType[]> {
        const response = await EntretienService.makeRequest<RepaitTypeResponse[]>(EntretienApiPath.RepairType, 'GET');
        return RepairType.toArrays(response)
    }

    public static async getCarComponents(): Promise<CarComponent[]> {
        const response = await EntretienService.makeRequest<CarComponentResponse[]>(EntretienApiPath.CarComponent, 'GET');
        return CarComponent.toArrays(response)
    }

    static invalidCarComponent() {
        return EntretienService.getInstance().queryClient.invalidateQueries({queryKey: [EntretienApiPath.CarComponent]})
    }

    static invalidEntretiens() {
        return EntretienService.getInstance().queryClient.invalidateQueries({queryKey: [EntretienApiPath.GetEntretien]})
    }

    public static async addCarComponent(formData: CreateCarComponentInputs): Promise<CarComponent> {
        const response = await EntretienService.makeRequest<CarComponentResponse>(EntretienApiPath.CarComponent, 'POST', formData);
        return new CarComponent(response)
    }

    protected static async makeRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT', body?: any): Promise<T> {
        return this.getInstance().execHttpRequest<T>({url, method, body});
    }


}

export default EntretienService;
