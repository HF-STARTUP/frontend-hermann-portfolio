import Service from "@/services/Service";
import {FleetListResponseType} from "@/types/admin/fleet";
import {FleetModel} from "@/model/ADMIN/fleet";

export enum FleetApiPath {
    GetFleetByCityID = '/park/by',
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

    protected static async makeRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT', body?: any, secure: boolean = true): Promise<T> {
        return this.getInstance().execHttpRequest<T>({url, method, body, secure});
    }


}

export default FleetService;
