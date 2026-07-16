import Service from "@/services/Service";
import {
    AdminOnFleetResponseType,
    BestDiverAndVehicleResponseType,
    CarburantEvolution,
    DashboardBestAndLeastProfilableResponseType,
    FleetByCityInputs,
    FleetJournalData,
    FleetListResponseType,
    FleetOverviewData,
    FleetProfileData,
    FleetRegisterFormData,
    FleetResponseType,
    FleetsKpiData,
    FleetSubscriptionParams,
    FleetSubscriptionsResponseData,
    GetFleetsParams,
    OperatorRevenueResponse,
    OperatorRevenusInputs,
    ParkDetailsResponseType,
    ProfitableListInputs,
    ProfitableListResponseType,
    RevenusEvolution,
    SubscriptionPlanRevenusInputs,
    SuspendFleetData,
    TransactionHistoryData,
    TransactionHistoryItem,
    TransactionHistoryParams,
    TransactionKpiData
} from "@/types/admin/fleet.type";
import { AbonResponseModel, AdminOnFleetModel, FleetModel, ParkStatResponseType } from "@/model/ADMIN/fleet";
import { ResponseWithPagination } from "@/types/generic";
import { endOfDay, format, startOfDay } from "date-fns";
import { toQueriesString } from "@/lib/utils";
import { CurencyResponseType } from "@/types/vehicule.type";
import { FleetByCityResponseType, RevenusRepartitionResponseType } from "@/types/dashboard.schedule.type";
import FleetOverview from "@/model/ADMIN/FleetOverview";
import FleetProfileDetail from "@/model/ADMIN/FleetProfile";
import FleetJournalModel from "@/model/ADMIN/FleetJournalModel";
import TransactionKpiModel from "@/model/ADMIN/FleetTransactionsKpi";
import TransactionHistoryModel from "@/model/ADMIN/TransactionHistory";
import { DashboardParams } from "@/types/dashboard.type";
import FleetsKpiModel from "@/model/ADMIN/FleetsKpi";

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
    Currency = "/currency",
    OperatorRevenus = "/dashboard/operator-revenue",
    FleetByCity = "/dashboard/fleet-by-city",
    SubscriptionPlanRevenus = "/dashboard/subscription-plan-revenue",
    ProfitableList = "/dashboard/city/park/profitable-list",
    GetFleetOverview = "/admin/fleets/{park_id}/overview",
    GetFleetProfile = "/admin/fleets/{park_id}/profile",
    GetFleetJournal = "/admin/fleets/{park_id}/journal",
    GetFleetTransactions = "/park/admin/transactions",
    GetFleetTransactionsKpi = "/admin/fleets/{park_id}/transactions-kpis",
    CreateFleet = "/register",
    GetFleetsKpi = "/admin-dashboard/fleets/kpis",
    SuspendFleet = "/admin/suspend-park",
    DeleteFleet = "/admin/deactivate-park"
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
        return FleetService.getInstance().queryClient.invalidateQueries({ queryKey: [FleetApiPath.GetFleetByCityID] });
    }

    public static async createNewFleet(formData: FleetRegisterFormData) {
        return await FleetService.getInstance().execHttpRequest({
            url: FleetApiPath.CreateFleet,
            method: FleetService.getInstance().httpMethods.post,
            body: formData,
            toFormdata: true
        });
    }

    public static async GetFleetByCityID(params: GetFleetsParams) {

        const baseUri = FleetApiPath.GetFleetByCityID + (params.city_id && params.city_id!=="all"?`/${params.city_id}`:"")

        const uri = toQueriesString(baseUri, params)

        const { data, ...meta } = await FleetService.makeRequest<ResponseWithPagination<FleetListResponseType[]>>(
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

    public static async getAdminsOnFleet({ park_id }: { park_id: string }): Promise<AdminOnFleetModel[]> {

        const uri = FleetApiPath.GetAdminByCityID + "/" + park_id

        const data = await FleetService.makeRequest<AdminOnFleetResponseType[]>(
            uri,
            'GET',
            undefined,
            true
        )

        return AdminOnFleetModel.fromArray(data)
    }

    public static async getActiveSubscriptionList(params: FleetSubscriptionParams, park_id?: string){
        const url = toQueriesString( FleetApiPath.ActiveSubscriptionList + "/" + park_id, params)

        const response = await FleetService.getInstance().execHttpRequest<FleetSubscriptionsResponseData>({
            url: url,
            method: FleetService.getInstance().httpMethods.get,
        })

        return {
            subscriptions: AbonResponseModel.fromArray(response.data),
            totalPages: response.totalPages,
            totalRecords: response.totalRecords,
            currentPage: response.currentPage,
            itemPerPage: response.itemPerPage
        }

    }

    static invalidActiveSubscription() {
        return FleetService.getInstance().queryClient.invalidateQueries({ queryKey: [FleetApiPath.ActiveSubscription] })
    }

    public static async getActiveSubscription({ parkID }: { parkID?: string }): Promise<AbonResponseModel> {

        const uri = FleetApiPath.ActiveSubscription + "/" + parkID

        const abonn = await FleetService.makeRequest<FleetResponseType>(
            uri,
            'GET',
            undefined,
            true
        )

        return new AbonResponseModel(abonn)
    }

    public static async getFleetDetails({ fleetID, fleetType }: {
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

    public static async getFleetStats({ fleetID, fleetType }: {
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

    public static async activeSubscription({ parkID, subscriptionID }: {
        parkID: string,
        subscriptionID: string
    }) {


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


    public static async getParkStats({ cityID, type, currency }: {
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

    public static async getFleetVehiclesAndProfilesDetails({ fleetID }: {
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

    public static async getSpecificFleetStat({ fleetID }: { fleetID: string }): Promise<ParkStatResponseType> {

        const uri = FleetApiPath.SpecificFleetStat + "?park_id=" + fleetID

        return await FleetService.makeRequest<ParkStatResponseType>(
            uri,
            'GET',
            undefined,
            true
        )
    }

    public static async getCourseEvolution({ fleetID, graphType }: {
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

    public static async getEntretienEvolution({ fleetID, graphType, date }: {
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

    public static async getRevenusEvolution({ fleetID, graphType }: {
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

    public static async getBestAndLestOnCity({ city_id, type }: {
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

    public static async getDashboardSubscriptionEvolution({ cityID, graphType, type }: {
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


    public static async cancelSubscription({ parkID }: {
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
        return this.getInstance().execHttpRequest<T>({ url, method, body, secure });
    }


    // ////////////////////////////////////////////////////////

    // Get fleet overview
    public static async getFleetOverview(fleetId: string) {

        const url = FleetApiPath.GetFleetOverview.replace("{park_id}", fleetId)

        const response = await FleetService.getInstance().execHttpRequest<FleetOverviewData>({
            url: url,
            method: FleetService.getInstance().httpMethods.get,
        });

        return new FleetOverview(response)
    }

    // Invalidate fleet overview query
    static invalidateFleetOverview() {
        return FleetService.getInstance().queryClient.invalidateQueries({ queryKey: [FleetApiPath.GetFleetOverview] })
    }



    // get fleet profile details

    public static async getFleetProfile(fleetId: string) {

        const url = FleetApiPath.GetFleetProfile.replace("{park_id}", fleetId)

        const response = await FleetService.getInstance().execHttpRequest<FleetProfileData>({
            url: url,
            method: FleetService.getInstance().httpMethods.get,
        });

        return new FleetProfileDetail(response)
    }

    // Invalidate fleet profile query
    static invalidateFleetProfile() {
        return FleetService.getInstance().queryClient.invalidateQueries({ queryKey: [FleetApiPath.GetFleetProfile] })
    }





    // get fleet journal data
    public static async getFleetJournal(fleetId: string, page?: number, itemPerPage?: number) {
        const url = toQueriesString(FleetApiPath.GetFleetJournal.replace("{park_id}", fleetId), { itemPerPage: itemPerPage, page: page })

        const response = await FleetService.getInstance().execHttpRequest<FleetJournalData>({
            url: url,
            method: FleetService.getInstance().httpMethods.get,
        });

        return {
            journals: FleetJournalModel.toArrays(response.data),
            totalPages: response.totalPages,
            totalRecords: response.totalRecords,
            currentPage: response.currentPage,
            itemPerPage: response.itemPerPage
        }
    }

    // Invalidate fleet journal query
    static invalidateFleetJournal() {
        return FleetService.getInstance().queryClient.invalidateQueries({ queryKey: [FleetApiPath.GetFleetJournal] })
    }


    // get fleet transactions history Kpi
     public static async getFleetTransactionsKpi(fleetId?: string, params?: {start_date?: string, end_date?: string}) {
        const url = toQueriesString(FleetApiPath.GetFleetTransactionsKpi.replace("{park_id}", fleetId??""), params)

        const response = await FleetService.getInstance().execHttpRequest<TransactionKpiData>({
            url: url,
            method: FleetService.getInstance().httpMethods.get,
        });

        return TransactionKpiModel.fromData(response)
    }

    // Invalidate fleet journal query
    static invalidateTransactionsKpi() {
        return FleetService.getInstance().queryClient.invalidateQueries({ queryKey: [FleetApiPath.GetFleetTransactionsKpi] })
    }

    // get fleet transactions data
    public static async getFleetTransactions(params: TransactionHistoryParams) {
        const url = toQueriesString(FleetApiPath.GetFleetTransactions, params)

        const response = await FleetService.getInstance().execHttpRequest<TransactionHistoryData>({
            url: url,
            method: FleetService.getInstance().httpMethods.get,
        });

        return {
            transaction: TransactionHistoryModel.toArray(response.data),
            totalPages: response.totalPages,
            totalRecords: response.totalRecords,
            currentPage: response.currentPage,
            itemPerPage: response.itemPerPage
        }
    }

    // Invalidate fleet transactions query
    static invalidateFleetTransactions() {
        return FleetService.getInstance().queryClient.invalidateQueries({ queryKey: [FleetApiPath.GetFleetTransactions] })
    }

    // get fleet transactions history Kpi
    public static async getFleetsKpi(params: DashboardParams) {
        const url = toQueriesString(FleetApiPath.GetFleetsKpi, params)

        const response = await FleetService.getInstance().execHttpRequest<FleetsKpiData>({
            url: url,
            method: FleetService.getInstance().httpMethods.get,
        });

        return new FleetsKpiModel(response)
    }



    public static async suspendFleet(formData: SuspendFleetData) {
        return await FleetService.getInstance().execHttpRequest({
            url: FleetApiPath.SuspendFleet,
            method: FleetService.getInstance().httpMethods.post,
            body: formData,
        });
    }

    public static async deleteFleet(formData: SuspendFleetData) {
        return await FleetService.getInstance().execHttpRequest({
            url: FleetApiPath.DeleteFleet,
            method: FleetService.getInstance().httpMethods.post,
            body: formData,
        });
    }

}
export default FleetService;
