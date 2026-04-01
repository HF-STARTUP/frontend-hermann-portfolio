import Service from "@/services/Service";
import { SubscriptionModel } from "@/model/subscription/Subscription";
import {
  ActiveSubscriptionResponseType,
  AllSubscriptionsKpiData,
  CreateSubscriptType,
  GetSubscriptionsPricingParams,
  InitSubscriptionResponseType,
  OperatorResponseType,
  SubscriptionEvolutionChartData,
  SubscriptionPackResponseType,
  SubscriptionPricingData,
  SubscriptionPricingItem,
} from "@/types/subscription.types";
import { ActiveSubscriptionModel } from "@/model/subscription/ActiveSubscriptionModel";
import { toQueriesString } from "@/lib/utils";
import { AllSubscriptionsModel } from "@/model/subscription/AllSubscriptionsModel";
import { AllSubscriptionKpiModel } from "@/model/subscription/SubsKpisModel";
import { SubscriptionsEvolutionModel } from "@/model/subscription/SubscriptionEvolutionModel";
import { RenewalEvolutionData, SubscriptionsByPaymentData } from "@/types/supplier.type";
import { RenewalEvolutionModel } from "@/model/subscription/RenewalExpiredModel";
import { SubscriptionsByPaymentMethodsModel } from "@/model/subscription/SubsByPaymentMethods";

export enum SubscriptionApiPath {
  GetSubscriptionPacks = "/subscription/by-country?country_code=",
  Subscribe = "/subscription/subscribe",
  Operator = "/operator",
  CheckTransaction = "/transaction/check-status",
  CheckActiveSubscriptionInfos = "/subscription/active-subscription-info",
  CheckActiveSubscription = "/subscription/active-subscription",
  GetAllSubscriptionsPackages = "/admin/subscription-packages",
  GetAllSubscriptionsPackagesKpis = "/admin-dashboard/subscriptions/summary",
  GetAllSubscriptionsEvolution = "/admin-dashboard/subscriptions/evolution-by-plan",
  GetRenewalVsExpired= "/admin-dashboard/subscriptions/renewals-vs-expired",
  GetSubsByPaymentMethods = "/admin-dashboard/subscriptions/by-payment-method",
  GetSubscription = "/admin/subscription-packages/{subscription_id}"
}

export enum TransactionStatusType {
  pending = "pending",
  success = "success",
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

  public static async initSubscription(
    data: CreateSubscriptType,
  ): Promise<InitSubscriptionResponseType> {
    const createSubscriptionRusult =
      await SubscriptionService.makeRequest<InitSubscriptionResponseType>(
        SubscriptionApiPath.Subscribe,
        "POST",
        { ...data },
      );

    return createSubscriptionRusult;
  }

  public static async checkActiveSubscriptionInfos() {
    const checkRessult = await SubscriptionService.makeRequest<{
      status: TransactionStatusType;
    }>(SubscriptionApiPath.CheckActiveSubscriptionInfos, "GET");

    return checkRessult;
  }

  public static async checkActiveSubscription(): Promise<ActiveSubscriptionModel> {
    const checkRessult =
      await SubscriptionService.makeRequest<ActiveSubscriptionResponseType>(
        SubscriptionApiPath.CheckActiveSubscription,
        "GET",
      );

    return new ActiveSubscriptionModel(checkRessult);
  }

  public static async checkTransactionStatus({ id }: { id: string }) {
    const createSubscriptionRusult = await SubscriptionService.makeRequest<{
      status: TransactionStatusType;
    }>(SubscriptionApiPath.CheckTransaction + "/" + id, "GET");

    return createSubscriptionRusult;
  }

  public static async getOperators({ country_code }: { country_code: string }) {
    const uri =
      SubscriptionApiPath.Operator +
      "?for_subscription=" +
      true +
      "&country_iso_code=" +
      country_code;

    return await SubscriptionService.makeRequest<OperatorResponseType[]>(
      uri,
      "GET",
      undefined,
      false,
    );

    // return SubscriptionModel.fromArray(
    //     response,
    // )
  }

  public static async getSubscriptions({
    country_code,
  }: {
    country_code?: string;
  }): Promise<SubscriptionModel[]> {
    const uri = SubscriptionApiPath.GetSubscriptionPacks + country_code;

    const response = await SubscriptionService.makeRequest<
      SubscriptionPackResponseType[]
    >(uri, "GET", undefined, false);

    return SubscriptionModel.fromArray(response);
  }

  // get fleet transactions data
  public static async getAllSubscriptions(
    params?: GetSubscriptionsPricingParams,
  ) {
    const url = toQueriesString(
      SubscriptionApiPath.GetAllSubscriptionsPackages,
      params,
    );

    const response =
      await SubscriptionService.getInstance().execHttpRequest<SubscriptionPricingData>(
        {
          url: url,
          method: SubscriptionService.getInstance().httpMethods.get,
        },
      );

    return {
      packages: AllSubscriptionsModel.toArray(response.data),
      totalPages: response.totalPages,
      totalRecords: response.totalRecords,
      currentPage: response.currentPage,
      itemPerPage: response.itemPerPage,
    };
  }

  // Invalidate fleet transactions query
  static invalidateAllSubscriptionsList() {
    return SubscriptionService.getInstance().queryClient.invalidateQueries({
      queryKey: [SubscriptionApiPath.GetAllSubscriptionsPackages],
    });
  }

  public static async getAllSubscriptionsKpi(
    params?: GetSubscriptionsPricingParams,
  ) {
    const url = toQueriesString(
      SubscriptionApiPath.GetAllSubscriptionsPackagesKpis,
      params,
    );

    const response =
      await SubscriptionService.getInstance().execHttpRequest<AllSubscriptionsKpiData>(
        {
          url: url,
          method: SubscriptionService.getInstance().httpMethods.get,
        },
      );

    return new AllSubscriptionKpiModel(response)
  }

  // Invalidate fleet transactions query
  static invalidateAllSubscriptionsKpi() {
    return SubscriptionService.getInstance().queryClient.invalidateQueries({
      queryKey: [SubscriptionApiPath.GetAllSubscriptionsPackagesKpis],
    });
  }


  public static async getAllSubscriptionsEvolution(
    params?: GetSubscriptionsPricingParams,
  ) {
    const url = toQueriesString(
      SubscriptionApiPath.GetAllSubscriptionsEvolution,
      params,
    );

    const response =
      await SubscriptionService.getInstance().execHttpRequest<SubscriptionEvolutionChartData>(
        {
          url: url,
          method: SubscriptionService.getInstance().httpMethods.get,
        },
      );

    return new SubscriptionsEvolutionModel(response)
  }

  // Invalidate fleet transactions query
  static invalidateAllSubscriptionsEvolution() {
    return SubscriptionService.getInstance().queryClient.invalidateQueries({
      queryKey: [SubscriptionApiPath.GetAllSubscriptionsEvolution],
    });
  }


  public static async getRenewalVsExpired(
    params?: GetSubscriptionsPricingParams,
  ) {
    const url = toQueriesString(
      SubscriptionApiPath.GetRenewalVsExpired,
      params,
    );

    const response =
      await SubscriptionService.getInstance().execHttpRequest<RenewalEvolutionData>(
        {
          url: url,
          method: SubscriptionService.getInstance().httpMethods.get,
        },
      );

    return new RenewalEvolutionModel(response)
  }

  // Invalidate fleet transactions query
  static invalidateRenewalVsExpired() {
    return SubscriptionService.getInstance().queryClient.invalidateQueries({
      queryKey: [SubscriptionApiPath.GetRenewalVsExpired],
    });
  }


  public static async getSubsByPaymentMethods(
    params?: GetSubscriptionsPricingParams,
  ) {
    const url = toQueriesString(
      SubscriptionApiPath.GetSubsByPaymentMethods,
      params,
    );

    const response =
      await SubscriptionService.getInstance().execHttpRequest<SubscriptionsByPaymentData>(
        {
          url: url,
          method: SubscriptionService.getInstance().httpMethods.get,
        },
      );

    return new SubscriptionsByPaymentMethodsModel(response)
  }

  // Invalidate fleet transactions query
  static invalidateSubsByPayments() {
    return SubscriptionService.getInstance().queryClient.invalidateQueries({
      queryKey: [SubscriptionApiPath.GetSubsByPaymentMethods],
    });
  }

  public static async getSubsData(
    subsId?: string,
  ) {
    const url = toQueriesString(
      SubscriptionApiPath.GetSubscription.replace("{subscription_id}", subsId??""),
      {}
    );

    const response =
      await SubscriptionService.getInstance().execHttpRequest<SubscriptionPricingItem>(
        {
          url: url,
          method: SubscriptionService.getInstance().httpMethods.get,
        },
      );

    return new AllSubscriptionsModel(response)
  }

  // Invalidate fleet transactions query
  static invalidateSubscription(id?: string) {
    return SubscriptionService.getInstance().queryClient.invalidateQueries({
      queryKey: [SubscriptionApiPath.GetSubscription, id],
    });
  }

  protected static async makeRequest<T>(
    url: string,
    method: "GET" | "POST" | "PUT",
    body?: any,
    secure: boolean = true,
  ): Promise<T> {
    return this.getInstance().execHttpRequest<T>({ url, method, body, secure });
  }
}

export default SubscriptionService;
