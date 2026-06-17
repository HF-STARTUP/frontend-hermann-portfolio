import ARCClientDetailModel from "@/model/at-risk-customers/ARCClientDetailModel";
import ARCKpiModel from "@/model/at-risk-customers/ARCKpisModel";
import ARCClientModel from "@/model/at-risk-customers/ARCPrioritiesModel";
import Service from "@/services/Service";
import { ARCClientDetailListResponseType, ARCClientPrioritiesResponseType, ARCKpiResponseType, AtRiskCustomersParams } from "@/types/at-risk-customers.type";

export enum ARCApiPath {
    GetARCKpi = "/admin/clients-at-risk/overview/kpis",
    GetARCClientsPriorities = "/admin/clients-at-risk/priorities",
    GetAtRiskCustomers = "/admin/clients-at-risk"
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

        const result = await ARCService.makeRequest<ARCClientDetailListResponseType>(
            ARCApiPath.GetAtRiskCustomers,
            'GET'
        );

        const { data, ...meta } = result;

        return {
            data: ARCClientDetailModel.toArrays(data),
            meta,
        };
    }




    protected static async makeRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT', body?: any): Promise<T> {
        return this.getInstance().execHttpRequest<T>({ url, method, body });
    }
}

export default ARCService;