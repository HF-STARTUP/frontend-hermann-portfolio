import Service from "@/services/Service";
import {
    AdminOnFleetResponseType,
    BestDiverAndVehicleResponseType, CarburantEvolution, DashboardBestAndLeastProfilableResponseType,
    FleetListResponseType,
    FleetResponseType, ParkDetailsResponseType, RevenusEvolution
} from "@/types/admin/fleet";
import {AbonResponseModel, AdminOnFleetModel, FleetModel, ParkStatResponseType} from "@/model/ADMIN/fleet";
import {ResponseWithPagination} from "@/types/generic";
import {format, startOfDay, endOfDay} from "date-fns";

export enum FleetApiPath {
    GetFleetByCityID = '/park/by',
    GetAdminByCityID = '/admin/by',
    ActiveSubscriptionList = "/subscription/history/by",
    ActiveSubscription = "/subscription/active-subscription",
    FleetDetails = "/dashboard/city/park/best-and-least-profitable",
    FleetVehiclesAndProfiles = "/dashboard/park/best-vehicle-and-profile",
    FleetStats = "/dashboard/city/details",
    ParkStats = "/dashboard/city/details",
    SpecificFleetStat = "/dashboard/park/details",
    CourseEvolution = "/dashboard/park/course/evolution",
    RevenusEvolution = "/dashboard/park/revenue/evolution",
    EntretienEvolution = "/dashboard/park/entretien/evolution",
    BestAndLeastOnCity = "/dashboard/city/park/best-and-least-profitable",
    DashboardActivities = "/dashboard/city/activity",
    DashboardSubscriptionEvolution = "/dashboard/city/subscription/evolution",
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

    public static async getFleetDetails({fleetID, fleetType}: {
        fleetID: string,
        fleetType: string
    }): Promise<AdminOnFleetModel[]> {

        const uri = FleetApiPath.FleetDetails + "?city_id=" + fleetID + `&type=${fleetType}`

        const data = await FleetService.makeRequest<AdminOnFleetResponseType[]>(
            uri,
            'GET',
            undefined,
            true
        )

        return AdminOnFleetModel.fromArray(data)
    }

    public static async getFleetStats({fleetID, fleetType}: {
        fleetID: string,
        fleetType: string
    }): Promise<AdminOnFleetModel[]> {

        const uri = FleetApiPath.FleetStats + "?city_id=" + fleetID + `&type=${fleetType}`

        const data = await FleetService.makeRequest<AdminOnFleetResponseType[]>(
            uri,
            'GET',
            undefined,
            true
        )

        return AdminOnFleetModel.fromArray(data)
    }

    public static async getParkStats({cityID, type}: {
        cityID: string,
        type: string
    }): Promise<ParkDetailsResponseType> {
        const uri = FleetApiPath.ParkStats + "?city_id=" + cityID + "&type=" + type
        const data = await FleetService.makeRequest<ParkDetailsResponseType>(
            uri,
            'GET',
            undefined,
            true
        )
        return data
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

    public static async getCourseEvolution({fleetID, graphType}: {
        fleetID: string,
        graphType: string
    }): Promise<RevenusEvolution[]> {

        const uri = FleetApiPath.CourseEvolution + "?park_id=" + fleetID + "&graph=" + graphType

        return await FleetService.makeRequest<RevenusEvolution[]>(
            uri,
            'GET',
            undefined,
            true
        )
    }

    public static async getEntretienEvolution({fleetID, graphType, date}: {
        fleetID: string,
        graphType: string,
        date: Date
    }): Promise<CarburantEvolution[]> {

        const uri = FleetApiPath.EntretienEvolution + "?park_id=" + fleetID + "&graph=" + graphType + "&date=" + date

        return await FleetService.makeRequest<CarburantEvolution[]>(
            uri,
            'GET',
            undefined,
            true
        )
    }

    public static async getRevenusEvolution({fleetID, graphType}: {
        fleetID: string,
        graphType: string
    }): Promise<RevenusEvolution[]> {

        const uri = FleetApiPath.RevenusEvolution + "?park_id=" + fleetID + "&graph=" + graphType

        return await FleetService.makeRequest<RevenusEvolution[]>(
            uri,
            'GET',
            undefined,
            true
        )
    }

    public static async getBestAndLestOnCity({city_id, type}: {
        city_id: string,
        type: string
    }): Promise<DashboardBestAndLeastProfilableResponseType> {

        const uri = FleetApiPath.BestAndLeastOnCity + "?city_id=" + city_id + "&type=" + type

        return await FleetService.makeRequest<DashboardBestAndLeastProfilableResponseType>(
            uri,
            'GET',
            undefined,
            true
        )
    }

    public static async getDashboardActivities({
                                                   start_date,
                                                   end_date,
                                                   city_id,
                                                   type
                                               }: {
        start_date: Date,
        end_date: Date,
        city_id: string,
        type: string,
    }): Promise<DashboardBestAndLeastProfilableResponseType> {

        const formattedStartDate = format(startOfDay(new Date(start_date)), "yyyy-MM-dd'T'HH:mm:ss");
        const formattedEndDate = format(endOfDay(new Date(end_date)), "yyyy-MM-dd'T'HH:mm:ss");

        const uri = `${FleetApiPath.DashboardActivities}?start_date=${formattedStartDate}&end_date=${formattedEndDate}&city_id=${city_id}&type=${type}`;

        return await FleetService.makeRequest<DashboardBestAndLeastProfilableResponseType>(
            uri,
            'GET',
            undefined,
            true
        )
    }

    public static async getDashboardSubscriptionEvolution({cityID, graphType, type}: {
        cityID: string,
        graphType: string,
        type: string
    }): Promise<RevenusEvolution[]> {

        const uri = FleetApiPath.DashboardSubscriptionEvolution + "?city_id=" + cityID + "&graph=" + graphType + "&type=" + type

        return await FleetService.makeRequest<RevenusEvolution[]>(
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
