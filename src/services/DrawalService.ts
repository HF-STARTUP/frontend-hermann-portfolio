import Service from "@/services/Service";
import DrawalModeModel, {DashboardInfos, ParkAmount, PaymentInfoModel} from "@/model/drawal/Drawal";
import {
    AddDrawalInputs,
    DashboardInfosResponseType,
    DrawalModeType,
    ParkAmontResponseType,
    PaymentInfoType,
    RemoveMoneyInputs
} from "@/types/drawal.types";

export enum WithdrawApiRoutes {
    RequestWithdrawMode = "/vtc-withdraw",
    RequestMyDrawals = "/mean-withdraw-on-park",
    AddDrawalMode = "/mean-withdraw-on-park",
    RemoveMoney = "/transaction/withdraw",
    ParkAmount = "/park/amount",
    MyTransactions = "/park/transactions",
    DashboardInfos = "/dashboard/fleet/details",
}


class DrawalService extends Service {
    private static instance: DrawalService = new DrawalService();

    private constructor() {
        super();
    }

    public static getInstance(): DrawalService {
        return DrawalService.instance;
    }

    public static async requestParkAmount(parkID: string): Promise<ParkAmount> {
        const uri = WithdrawApiRoutes.ParkAmount + "/" + parkID
        const amount = await DrawalService.makeRequest<ParkAmontResponseType>(uri, 'GET');
        return new ParkAmount(amount)
    }

    public static async dahsboarInfos(parkID: string): Promise<DashboardInfos> {
        const uri = WithdrawApiRoutes.DashboardInfos + "?park_id=" + parkID
        const amount = await DrawalService.makeRequest<DashboardInfosResponseType>(uri, 'GET');
        return new DashboardInfos(amount)
    }

    public static async requestParkTransaction(parkID: string): Promise<PaymentInfoModel[]> {
        const uri = WithdrawApiRoutes.MyTransactions + "?park_id=" + parkID
        const modes = await DrawalService.makeRequest<PaymentInfoType[]>(uri, 'GET');
        return PaymentInfoModel.toArrays(modes)
    }

    public static async requestWithdrawModes({country_iso_code}: {
        country_iso_code: string
    }): Promise<DrawalModeModel[]> {
        const uri = WithdrawApiRoutes.RequestWithdrawMode + `?country_iso_code=${country_iso_code}`
        const modes = await DrawalService.makeRequest<DrawalModeType[]>(uri, 'GET');
        return DrawalModeModel.toArrays(modes)
    }

    public static async requestMyDrawals(parkID: string): Promise<PaymentInfoModel[]> {
        const uri = WithdrawApiRoutes.RequestMyDrawals + "?park_id=" + parkID
        const modes = await DrawalService.makeRequest<PaymentInfoType[]>(uri, 'GET');
        return PaymentInfoModel.toArrays(modes)
    }

    public static async refreshMyDrawals() {
        return DrawalService.getInstance().queryClient.invalidateQueries({queryKey: [WithdrawApiRoutes.RequestMyDrawals]})
    }

    public static async addDrawalMode(drawel: AddDrawalInputs): Promise<DrawalModeModel> {
        const uri = WithdrawApiRoutes.AddDrawalMode
        const mode = await DrawalService.makeRequest<DrawalModeType>(uri, 'POST', drawel);
        return new DrawalModeModel(mode)
    }

    public static async requestRemoveMoney(inputs: RemoveMoneyInputs) {
        const uri = WithdrawApiRoutes.RemoveMoney
        const mode = await DrawalService.makeRequest(uri, 'POST', inputs);
        return mode
    }

    protected static async makeRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT', body?: any): Promise<T> {
        return this.getInstance().execHttpRequest<T>({url, method, body});
    }
}

export default DrawalService

