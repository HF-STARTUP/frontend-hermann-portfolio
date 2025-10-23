import Service from "@/services/Service";
import {
    AdminOnFleetResponseType,
    BestDiverAndVehicleResponseType,
    CarburantEvolution,
    DashboardBestAndLeastProfilableResponseType,
    FleetListResponseType,
    FleetResponseType,
    ParkDetailsResponseType,
    ProfitableListResponseType,
    RevenusEvolution
} from "@/types/admin/fleet";
import {AbonResponseModel, AdminOnFleetModel, FleetModel, ParkStatResponseType} from "@/model/ADMIN/fleet";
import {ResponseWithPagination} from "@/types/generic";
import {endOfDay, format, startOfDay} from "date-fns";
import { toQueriesString } from "@/lib/utils";
import {CurencyResponseType} from "@/types/vehicule.type";
import {FleetByCityResponseType, RevenusRepartitionResponseType} from "@/types/dashboard.schedule.type";

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
    ActivateSubscription = "/subscription/activate-subscription",
    CancelSubscription = "/subscription/cancel-active-subscription",
    Currency = "currency",
    OperatorRevenus = "/dashboard/operator-revenue",
    FleetByCity = "/dashboard/fleet-by-city",
    SubscriptionPlanRevenus = "/dashboard/subscription-plan-revenue",
    ProfitableList = "/dashboard/city/park/profitable-list"
}

export type GetFleetByCityIDParams = {
    city_id?: string;
    type?: string;
    page?: number;
    itemPerPage?: number;
    limit?: number;
    // Filtres de recherche et dates
    name?: string;
    subscription_name?: string;
    created_from?: string; // ISO datetime
    created_to?: string; // ISO datetime
    start_date?: string; // ISO datetime
    end_date?: string; // ISO datetime
    // Filtres de compteurs
    vehicles_count_min?: number;
    vehicles_count_max?: number;
    drivers_count_min?: number;
    drivers_count_max?: number;
}

export type OperatorRevenusInputs = {
    start_date: string
    end_date: string
    currency_id?: string
    type?: string
    city_id?: string
}

export type FleetByCityInputs = {
    country_id?: string
}


export type SubscriptionPlanRevenusInputs = {
    start_date: string
    end_date: string
    currency_id?: string
}

export type ProfitableListInputs = {
    type: string
    city_id: string
    currency_id?: string
}

export interface OperatorRevenueResponse {
    operator_id: string;
    operator_name: string;
    country_name: string;
    total_amount: number;
    currency: string;
    path?: string
}
class FleetService extends Service {
    private static instance: FleetService = new FleetService();

    private constructor() {
        super()
    }

    public static getInstance(): FleetService {
        return FleetService.instance;
    }

    public static async getProfitableList(inputs: ProfitableListInputs) {
        const [data] = await Promise.all([FleetService.makeRequest<ProfitableListResponseType[]>(
            FleetService.instance.toQueryString(inputs, FleetApiPath.ProfitableList),
            'GET'
        )])
        return data
    }

    public static async getSubscriptionPlanRevenus(inputs: SubscriptionPlanRevenusInputs) {
        const [data] = await Promise.all([FleetService.makeRequest<RevenusRepartitionResponseType>(
            FleetService.instance.toQueryString(inputs, FleetApiPath.SubscriptionPlanRevenus),
            'GET'
        )])
        return data
    }

    public static async getFleetByCity(inputs: FleetByCityInputs) {
        const [data] = await Promise.all([FleetService.makeRequest<FleetByCityResponseType[]>(
            FleetService.instance.toQueryString(inputs, FleetApiPath.FleetByCity),
            'GET'
        )])
        return data
    }

    public static async getOratorsRevenus(inputs: OperatorRevenusInputs) {
        const [data] = await Promise.all([FleetService.makeRequest<OperatorRevenueResponse[]>(
            FleetService.instance.toQueryString(inputs, FleetApiPath.OperatorRevenus),
            'GET'
        )])
        return data
    }

    public static async getCurrencies() {
        const [data] = await Promise.all([FleetService.makeRequest<CurencyResponseType[]>(
            FleetApiPath.Currency,
            'GET',
        )])
        return data
    }

    static invalidFleets() {
        return FleetService.getInstance().queryClient.invalidateQueries({queryKey: [FleetApiPath.GetFleetByCityID]});
    }

    public static async GetFleetByCityID({city_id, ...params}: GetFleetByCityIDParams) {
       
        const uri = toQueriesString(FleetApiPath.GetFleetByCityID + "/" + city_id, params)
      
        const {data, ...meta} = await FleetService.makeRequest<ResponseWithPagination<FleetListResponseType[]>>(
            uri,
            'GET',
            undefined,
            true
        )

        return {
            fleets: FleetModel.fromArray(data),
            ...meta
        }
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

    static invalidActiveSubscription() {
        return FleetService.getInstance().queryClient.invalidateQueries({queryKey: [FleetApiPath.ActiveSubscription]})
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


    // {
    //     "park_id": "string",
    //     "subscription_id": "string",
    //     "apple_code": "string",
    //     "google_code": "string"
    // }

    public static async activeSubscription({parkID, subscriptionID}: {
        parkID: string,
        subscriptionID: string
    }) {

        console.log(`Exec request: ${parkID}, ==> ${subscriptionID}`)

        const uri = FleetApiPath.ActivateSubscription

        const data = await FleetService.makeRequest(
            uri,
            'POST',
            {
                park_id: parkID,
                subscription_id: subscriptionID
            },
            true
        )

        return data
    }


    public static async getParkStats({cityID, type, currency}: {
        cityID: string,
        type: string,
        currency?: string
    }): Promise<ParkDetailsResponseType> {
        const uri = FleetApiPath.ParkStats + "?city_id=" + cityID + "&type=" + type + (currency ? ("&currency=" + currency) : "")
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
    }) {

        const uri = FleetApiPath.DashboardSubscriptionEvolution + "?city_id=" + cityID + "&graph=" + graphType + "&type=" + type

        return await FleetService.makeRequest<RevenusEvolution>(
            uri,
            'GET',
            undefined,
            true
        )
    }


    public static async cancelSubscription({parkID}: {
        parkID: string,
    }) {


        const uri = FleetApiPath.CancelSubscription + "/" + parkID

        const data = await FleetService.makeRequest(
            uri,
            'DELETE',
            {
                park_id: parkID
            },
            false
        )

        return data
    }


    protected static async makeRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any, secure: boolean = true): Promise<T> {
        return this.getInstance().execHttpRequest<T>({url, method, body, secure});
    }

}
export default FleetService;
