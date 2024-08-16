import Service from "@/services/Service";
import {AdminOnFleetResponseType, FleetListResponseType} from "@/types/admin/fleet";
import {AdminOnFleetModel, FleetModel} from "@/model/ADMIN/fleet";

export enum FleetApiPath {
    GetFleetByCityID = '/park/by',
    GetAdminByCityID = '/admin/by',
}

class FleetService extends Service {
    private static instance: FleetService = new FleetService();

    private constructor() {
        super();
    }

    public static getInstance(): FleetService {
        return FleetService.instance;
    }

    static invalidFleets() {
        return FleetService.getInstance().queryClient.invalidateQueries({queryKey: [FleetApiPath.GetFleetByCityID]});
    }

    public static async GetFleetByCityID({city_id, fleet_type}: { city_id: string, fleet_type: string }) {

        const uri = FleetApiPath.GetFleetByCityID + "/" + city_id + `?type=${fleet_type}`

        const data = await FleetService.makeRequest<FleetListResponseType[]>(
            uri,
            'GET',
            undefined,
            true
        )

        return FleetModel.fromArray(data)

    }

    public static async getAdminsOnFleet({park_id}: { park_id: string }): Promise<AdminOnFleetModel[]> {

        const uri = FleetApiPath.GetAdminByCityID + "/" + park_id

        const data = await FleetService.makeRequest<AdminOnFleetResponseType[]>(
            uri,
            'GET',
            undefined,
            true
        )

        return AdminOnFleetModel.fromArray(data)

    }

    protected static async makeRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT', body?: any, secure: boolean = true): Promise<T> {
        return this.getInstance().execHttpRequest<T>({url, method, body, secure});
    }


}

export default FleetService;
