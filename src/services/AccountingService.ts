import Service from "@/services/Service";
import {
    ACCOUNTING_TYPE,
    AccountingPnlResponseType,
    AccountingResponseType,
    AccountingStateResponseType,
    CreateEntryOrDenpenseInput,
    FleetDetailsResponseType,
    PnlResponseType,
    UncollectedRecipesResponseType
} from "@/types/Accounting.types";
import {AccountingModel, AccountingStateModel, UncollectedRecipesModel} from "@/model/accounting/Accounting";
import {ResponseWithPagination} from "@/types/generic";
import {DateWithPreviewsDateType} from "@/lib/utils";
import {FleetDetailsModel} from "@/model/accounting/Fleet";
import {CreateAccountingOrSubAccountingInput, CreateFundMovementInput} from "@/schema/accounting.schema";


export enum AcountingApiPath {
    RequestAcounting = '/accounting',
    AccountingPNL = '/accounting/pnl',
    AccountingState = '/accounting/state',
    FleetDetails = '/dashboard/fleet/details',
    FleetCharts = '/accounting/diagramme',
    CreateEntryOrDepense = '/accounting/create-entry-or-depense',
    UncollectedRecipes = '/transaction/unpaid/recipes/history',
    ExpectedRecipes = "/transaction/recipes/expected-today",
    PnlAccount = "/pnl-account",
    PnlSubAccount = "/pnl-sub-account",
    FundMovement = "/pnl-account/fund-movement"
}

class AccountingService extends Service {
    private static instance: AccountingService = new AccountingService();

    private constructor() {
        super();
    }

    public static getInstance(): AccountingService {
        return AccountingService.instance;
    }

    public static async requestPieChart(parkID: string): Promise<AccountingModel[]> {

        const result = await AccountingService.makeRequest<ResponseWithPagination<AccountingResponseType[]>>(
            AcountingApiPath.FleetCharts + `?park_id=` + parkID,
            'GET'
        )

        return AccountingModel.toArrays(result.data)
    }


    public static async requestAcounting(parkID: string): Promise<AccountingModel[]> {

        const result = await AccountingService.makeRequest<ResponseWithPagination<AccountingResponseType[]>>(
            AcountingApiPath.RequestAcounting + `?park_id=` + parkID,
            'GET'
        )

        return AccountingModel.toArrays(result.data)
    }

    public static async requestAcountingPNL({parkID, year}: {
        parkID: string,
        year: number
    }): Promise<AccountingPnlResponseType> {
        const result = await AccountingService.makeRequest<AccountingPnlResponseType>(
            AcountingApiPath.AccountingPNL + `?park_id=` + parkID + '&year=' + year,
            'GET'
        )


        console.log("Pnl")
        console.log(result)

        //return AccountingModel.toArrays(result)
        return result
    }

    public static async requestUncollectedRecipes({parkID}: {
        parkID: string
    }): Promise<UncollectedRecipesModel[]> {
        const result = await AccountingService.makeRequest<ResponseWithPagination<UncollectedRecipesResponseType[]>>(
            AcountingApiPath.UncollectedRecipes + `?park_id=` + parkID,
            'GET'
        )
        return UncollectedRecipesModel.fromArray(result.data)
    }

    public static async requestExpectedRecipes({parkID}: {
        parkID: string
    }): Promise<UncollectedRecipesModel[]> {
        const result = await AccountingService.makeRequest<ResponseWithPagination<UncollectedRecipesResponseType[]>>(
            AcountingApiPath.ExpectedRecipes + `?park_id=` + parkID,
            'GET'
        )
        return UncollectedRecipesModel.fromArray(result.data)
    }

    public static async createEntryOrDepense(data: CreateEntryOrDenpenseInput) {
        const result = await AccountingService.makeRequest(
            AcountingApiPath.CreateEntryOrDepense,
            'POST',
            data
        )

        console.log(result)

        //return AccountingModel.toArrays(result.data)
        return result
    }

    public static async requestFleetDetails({parkID}: {
        parkID: string
    }): Promise<FleetDetailsModel> {
        const result = await AccountingService.makeRequest<FleetDetailsResponseType>(
            AcountingApiPath.FleetDetails + `?park_id=` + parkID,
            'GET'
        )

        return new FleetDetailsModel(result)
    }

    public static async requestAccountingState({parkID, dates}: {
        parkID: string,
        dates: DateWithPreviewsDateType
    }): Promise<AccountingStateModel> {
        const result = await AccountingService.makeRequest<AccountingStateResponseType>(
            AcountingApiPath.AccountingState
            + `?park_id=` + parkID
            + `&start_date=` + dates.startCurrentMonth
            + `&end_date=` + dates.endCurrentMonth
            + `&start_date_last_month=` + dates.startPreviousMonth
            + `&end_date_last_month=` + dates.endPreviousMonth
            ,
            'GET'
        )

        return new AccountingStateModel(result)
    }

    public static async requestAllPnlAccount({
                                                 parkID,
                                                 account_id, type = ACCOUNTING_TYPE.PROFIT
                                             }: {
        parkID?: string,
        account_id?: string,
        type?: ACCOUNTING_TYPE
    }): Promise<PnlResponseType[]> {


        const uri = (account_id && account_id.length)
            ? AcountingApiPath.PnlSubAccount + `?category_id=` + account_id
            : AcountingApiPath.PnlAccount + `?park_id=` + parkID + `&type=` + type

        const result = await AccountingService.makeRequest<PnlResponseType[]>(
            uri,
            'GET'
        )

        return result
    }


    public static async createPnlAccountOrSubAccount(data: CreateAccountingOrSubAccountingInput): Promise<any> {

        const {park_id, type, ...subdata} = data
        const isSubAccount = data.account_id && data.account_id.length
        const body = isSubAccount ? subdata : data

        console.log(body)

        const result = await AccountingService.makeRequest(
            isSubAccount ? AcountingApiPath.PnlSubAccount : AcountingApiPath.PnlAccount,
            'POST',
            body
        )

        return result
    }

    static refreshPnlAccounting() {
        return this.getInstance().queryClient.invalidateQueries({
            queryKey: [AcountingApiPath.PnlAccount]
        })
    }

    static refreshPnlDataTable() {
        return this.getInstance().queryClient.invalidateQueries({
            queryKey: [AcountingApiPath.AccountingPNL]
        })
    }


    protected static async makeRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT', body?: any): Promise<T> {
        return this.getInstance().execHttpRequest<T>({url, method, body});
    }

    public static async createFundMovement(data: CreateFundMovementInput): Promise<any> {

        const result = await AccountingService.makeRequest(
            AcountingApiPath.FundMovement,
            'POST',
            data
        )

        return result
    }


}

export default AccountingService;


// {
//     id: true,
//         status:
//     true, created_at
// :
//     true, amount
// :
//     true, transaction_type
// :
//     true,
//         operator
// :
//     {
//         select: {
//             id: true, name
//         :
//             true, title
//         :
//             true, image
//         :
//             true
//         }
//     }
// ,
//     withdraw_on_park: {
//         select: {
//             vct_withdraw: {
//                 select: {
//                     id: true, type
//                 :
//                     true, title
//                 :
//                     true, name
//                 :
//                     true, image
//                 :
//                     true
//                 }
//             }
//         ,
//             phone_number: true, title
//         :
//             true, account_number
//         :
//             true, last4Digit
//         :
//             true, card_processor
//         :
//             true, card_type
//         :
//             {
//                 select: {
//                     id: true, name
//                 :
//                     true
//                 }
//             }
//         }
//     }
// }