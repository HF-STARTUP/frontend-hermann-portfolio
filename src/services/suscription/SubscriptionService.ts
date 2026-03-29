import Service from "@/services/Service";
import {SubscriptionModel} from "@/model/subscription/Subscription";
import {
    ActiveSubscriptionResponseType,
    CreateSubscriptType,
    InitSubscriptionResponseType,
    OperatorResponseType,
    SubscriptionPackResponseType
} from "@/types/subscription.types";
import {ActiveSubscriptionModel} from "@/model/subscription/ActiveSubscriptionModel";

export enum SubscriptionApiPath {
    GetSubscriptionPacks = '/subscription/by-country?country_code=',
    Subscribe = "/subscription/subscribe",
    Operator = "/operator",
    CheckTransaction = "/transaction/check-status",
    CheckActiveSubscriptionInfos = "/subscription/active-subscription-info",
    CheckActiveSubscription = "/subscription/active-subscription"
}

export enum TransactionStatusType {
    pending = "pending",
    success = "success"
}

class SubscriptionService extends Service {
    private static instance: SubscriptionService = new SubscriptionService();

    private constructor() {
        super();
    }

    public static getInstance(): SubscriptionService {
        return SubscriptionService.instance;
    }

    // public static async createNewCourse(formData: CreateCourseInputs): Promise<Course> {
    //     const courseResult = await SubscriptionService.makeRequest<CourseResponseType>(CourseApiPath.createCourse, 'POST', formData);
    //     return new Course(courseResult)
    // }

    public static async initSubscription(data: CreateSubscriptType): Promise<InitSubscriptionResponseType> {
        const createSubscriptionRusult = await SubscriptionService.makeRequest<InitSubscriptionResponseType>(
            SubscriptionApiPath.Subscribe,
            'POST',
            {...data}
        )

        return createSubscriptionRusult

    }

    public static async checkActiveSubscriptionInfos() {
        const checkRessult = await SubscriptionService.makeRequest<{ status: TransactionStatusType }>(
            SubscriptionApiPath.CheckActiveSubscriptionInfos,
            'GET',
        )

        return checkRessult
    }

    public static async checkActiveSubscription(): Promise<ActiveSubscriptionModel> {
        const checkRessult = await SubscriptionService.makeRequest<ActiveSubscriptionResponseType>(
            SubscriptionApiPath.CheckActiveSubscription,
            'GET',
        )

        return new ActiveSubscriptionModel(checkRessult)
    }

    public static async checkTransactionStatus({id}: { id: string }) {
        const createSubscriptionRusult = await SubscriptionService.makeRequest<{ status: TransactionStatusType }>(
            SubscriptionApiPath.CheckTransaction + "/" + id,
            'GET',
        )

        return createSubscriptionRusult
    }

    public static async getOperators({country_code}: { country_code: string }) {

        const uri = SubscriptionApiPath.Operator + "?for_subscription=" + true + "&country_iso_code=" + country_code

        return await SubscriptionService.makeRequest<OperatorResponseType[]>(
            uri,
            'GET',
            undefined,
            false
        )

        // return SubscriptionModel.fromArray(
        //     response,
        // )
    }

    public static async getSubscriptions({country_code}: { country_code?: string }): Promise<SubscriptionModel[]> {

        const uri = SubscriptionApiPath.GetSubscriptionPacks + (country_code)

        const response = await SubscriptionService.makeRequest<SubscriptionPackResponseType[]>(
            uri,
            'GET',
            undefined,
            false
        );

        return SubscriptionModel.fromArray(
            response,
        )
    }


    protected static async makeRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT', body?: any, secure: boolean = true): Promise<T> {
        return this.getInstance().execHttpRequest<T>({url, method, body, secure});
    }


}

export default SubscriptionService;
