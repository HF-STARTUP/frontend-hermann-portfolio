import { toQueriesString } from "@/lib/utils";
import ARCClientDetailModel from "@/model/at-risk-customers/ARCClientDetailModel";
import ARCClientProfileModel from "@/model/at-risk-customers/ARCClientProfileModel";
import ARCInteractionDetailModel from "@/model/at-risk-customers/ARCInteractionModel";
import ARCInteractionModel from "@/model/at-risk-customers/ARCInteractionsModel";
import ARCKpiModel from "@/model/at-risk-customers/ARCKpisModel";
import ARCClientModel from "@/model/at-risk-customers/ARCPrioritiesModel";
import Service from "@/services/Service";
import { ARCClientDetailListResponseType, ARCClientPrioritiesResponseType, ARCClientProfileResponseType, ARCInteractionDetailResponseType, ARCInteractionListResponseType, ARCKpiResponseType, ARCNewActionPayload, AtRiskCustomersParams } from "@/types/at-risk-customers.type";

export enum ARCApiPath {
    GetARCKpi = "/admin/clients-at-risk/overview/kpis",
    GetARCClientsPriorities = "/admin/clients-at-risk/priorities",
    GetAtRiskCustomers = "/admin/clients-at-risk",
    GetAtRiskCustomer = "/admin/clients-at-risk/{park_id}",
    GetARCInteractions = "/admin/clients-at-risk/{park_id}/interactions",
    CreateAction = "/admin/clients-at-risk/actions"
}

class ARCService extends Service {
    private static instance: ARCService = new ARCService();

    private constructor() {
        super();
    }

    public static getInstance(): ARCService {
        return ARCService.instance;
    }

    public static async getARCKpi(): Promise<ARCKpiModel> {
        const result = await ARCService.getInstance().execHttpRequest<ARCKpiResponseType>({
            url: ARCApiPath.GetARCKpi,
            method: ARCService.getInstance().httpMethods.get
        })
        return ARCKpiModel.fromResponse(result);
    }

    public static async getARCClientsPriorities(): Promise<ARCClientModel[]> {
        const result = await ARCService.getInstance().execHttpRequest<ARCClientPrioritiesResponseType[]>(
            {
                url: ARCApiPath.GetARCClientsPriorities,
                method: ARCService.getInstance().httpMethods.get
            }
        );
        return ARCClientModel.toArrays(result);
    }

    public static async getARCClientDetails(
        params: AtRiskCustomersParams
    ): Promise<{ data: ARCClientDetailModel[]; meta: Omit<ARCClientDetailListResponseType, "data"> }> {
        const url = toQueriesString(ARCApiPath.GetAtRiskCustomers, params)
        const result = await ARCService.makeRequest<ARCClientDetailListResponseType>(
            url,
            'GET'
        );

        const { data, ...meta } = result;

        return {
            data: ARCClientDetailModel.toArrays(data),
            meta,
        };
    }

    public static async getARCClientProfile(params: AtRiskCustomersParams): Promise<ARCClientProfileModel> {
        const result = await ARCService.makeRequest<ARCClientProfileResponseType>(
            ARCApiPath.GetAtRiskCustomer.replace("{park_id}", params?.park_id ?? ""), 'GET'
        );
        return ARCClientProfileModel.fromResponse(result);
    }

    public static async getARCInteractions(
        params: AtRiskCustomersParams
    ): Promise<{ data: ARCInteractionModel[]; meta: Omit<ARCInteractionListResponseType, "data"> }> {
        const { park_id, ...otherParams } = params;

        const url = toQueriesString(ARCApiPath.GetARCInteractions.replace("{park_id}", park_id ?? ""), otherParams)
        const result = await ARCService.makeRequest<ARCInteractionListResponseType>(
            url,
            'GET'
        );

        const { data, ...meta } = result;

        return {
            data: ARCInteractionModel.toArrays(data),
            meta,
        };
    }

    public static async getARCInteractionDetail(
        params: AtRiskCustomersParams
    ): Promise<ARCInteractionDetailModel> {

        const { park_id, interraction_id, ...cleanParams } = params;

        const result = await ARCService.makeRequest<ARCInteractionDetailResponseType>(
            toQueriesString(`${ARCApiPath.GetARCInteractions.replace("{park_id}", params.park_id ?? "")}/${params.interraction_id}`, cleanParams),
            'GET'
        );
        return ARCInteractionDetailModel.fromResponse(result);
    }

    public static async addARCAction(payload: ARCNewActionPayload) {
        return await ARCService.makeRequest(
            ARCApiPath.CreateAction,
            "POST",
            payload
        )
    }










    protected static async makeRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT', body?: any): Promise<T> {
        return this.getInstance().execHttpRequest<T>({ url, method, body });
    }
}

export default ARCService;