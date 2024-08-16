import Service from "@/services/Service";
import {
    AdminOnFleetResponseType,
    BestDiverAndVehicleResponseType,
    FleetListResponseType,
    FleetResponseType
} from "@/types/admin/fleet";
import {AbonResponseModel, AdminOnFleetModel, FleetModel, ParkStatResponseType} from "@/model/ADMIN/fleet";
import {ResponseWithPagination} from "@/types/generic";

export enum FleetApiPath {
    GetFleetByCityID = '/park/by',
    GetAdminByCityID = '/admin/by',
    ActiveSubscriptionList = "/subscription/history/by",
    ActiveSubscription = "/subscription/active-subscription",
    FleetDetails = "/dashboard/city/park/best-and-least-profitable",
    FleetVehiclesAndProfiles = "/dashboard/park/best-vehicle-and-profile",
    FleetStats = "/dashboard/city/details",
    SpecificFleetStat = "/dashboard/park/details"
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

    public static async getActiveSubscriptionList({park_id}: { park_id: string }): Promise<AbonResponseModel[]> {

        const uri = FleetApiPath.ActiveSubscriptionList + "/" + park_id

        const abonnList = await FleetService.makeRequest<ResponseWithPagination<FleetResponseType[]>>(
            uri,
            'GET',
            undefined,
            true
        )

        return AbonResponseModel.fromArray(abonnList.data)

    }

    public static async getActiveSubscription({parkID}: { parkID: string }): Promise<AbonResponseModel> {

        const uri = FleetApiPath.ActiveSubscription + "/" + parkID

        const abonn = await FleetService.makeRequest<FleetResponseType>(
            uri,
            'GET',
            undefined,
            true
        )

        return new AbonResponseModel(abonn)
    }

    public static async getFleetDetails({fleetID}: { fleetID: string }): Promise<AdminOnFleetModel[]> {

        const uri = FleetApiPath.FleetDetails + "?city_id=" + fleetID + "&type=particulier"

        const data = await FleetService.makeRequest<AdminOnFleetResponseType[]>(
            uri,
            'GET',
            undefined,
            true
        )

        return AdminOnFleetModel.fromArray(data)
    }

    public static async getFleetStats({fleetID}: { fleetID: string }): Promise<AdminOnFleetModel[]> {

        const uri = FleetApiPath.FleetStats + "?city_id=" + fleetID + "&type=particulier"

        const data = await FleetService.makeRequest<AdminOnFleetResponseType[]>(
            uri,
            'GET',
            undefined,
            true
        )

        return AdminOnFleetModel.fromArray(data)
    }

    public static async getFleetVehiclesAndProfilesDetails({fleetID}: {
        fleetID: string
    }): Promise<BestDiverAndVehicleResponseType> {

        const uri = FleetApiPath.FleetVehiclesAndProfiles + "?park_id=" + fleetID

        return await FleetService.makeRequest<BestDiverAndVehicleResponseType>(
            uri,
            'GET',
            undefined,
            true
        )
    }


    public static async getSpecificFleetStat({fleetID}: { fleetID: string }): Promise<ParkStatResponseType> {

        const uri = FleetApiPath.SpecificFleetStat + "?park_id=" + fleetID

        return await FleetService.makeRequest<ParkStatResponseType>(
            uri,
            'GET',
            undefined,
            true
        )

    }


    protected static async makeRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT', body?: any, secure: boolean = true): Promise<T> {
        return this.getInstance().execHttpRequest<T>({url, method, body, secure});
    }


}

export default FleetService;
