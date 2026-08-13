import { toQueriesString } from "@/lib/utils";
import WaContactModel from "@/model/whatsapp/WaContactModel";
import WaConversationModel from "@/model/whatsapp/WaConversationModel";
import WaMessageModel from "@/model/whatsapp/WaMessageModel";
import Service from "@/services/Service";
import {
    AssignConversationPayload,
    SendWaMessagePayload,
    WaContactResponseType,
    WaConversationListResponseType,
    WaConversationResponseType,
    WaMessageListResponseType,
    WaMessageResponseType,
    WhatsAppConversationsParams,
    WhatsAppMessagesParams,
} from "@/types/whatsapp.type";

export enum WhatsAppApiPath {
    GetConversations = "/whatsapp/conversations",
    GetConversation = "/whatsapp/conversations/{id}",
    GetMessages = "/whatsapp/conversations/{id}/messages",
    SendMessage = "/whatsapp/conversations/{id}/messages",
    AssignConversation = "/whatsapp/conversations/{id}/assign",
    CloseConversation = "/whatsapp/conversations/{id}/close",
    ReopenConversation = "/whatsapp/conversations/{id}/reopen",
    GetContact = "/whatsapp/contacts/{wa_id}",
}

class WhatsAppService extends Service {
    private static instance: WhatsAppService = new WhatsAppService();

    private constructor() {
        super();
    }

    public static getInstance(): WhatsAppService {
        return WhatsAppService.instance;
    }

    public static async getConversations(
        params: WhatsAppConversationsParams
    ): Promise<{ data: WaConversationModel[]; meta: Omit<WaConversationListResponseType, "items"> }> {
        const url = toQueriesString(WhatsAppApiPath.GetConversations, params);
        const result = await WhatsAppService.makeRequest<WaConversationListResponseType>(url, "GET");

        const { items, ...meta } = result;

        return {
            data: WaConversationModel.fromResponseArray(items),
            meta,
        };
    }

    public static async getConversation(conversationId: string): Promise<WaConversationModel> {
        const result = await WhatsAppService.makeRequest<WaConversationResponseType>(
            WhatsAppApiPath.GetConversation.replace("{id}", conversationId),
            "GET"
        );
        return WaConversationModel.fromResponse(result);
    }

    public static async getMessages(
        params: WhatsAppMessagesParams
    ): Promise<{ data: WaMessageModel[]; meta: Omit<WaMessageListResponseType, "items"> }> {
        const { conversation_id, ...otherParams } = params;

        const url = toQueriesString(
            WhatsAppApiPath.GetMessages.replace("{id}", conversation_id),
            otherParams,
            false
        );
        const result = await WhatsAppService.makeRequest<WaMessageListResponseType>(url, "GET");

        const { items, ...meta } = result;

        return {
            data: WaMessageModel.fromResponseArray(items),
            meta,
        };
    }

    public static async sendMessage(
        conversationId: string,
        payload: SendWaMessagePayload
    ): Promise<WaMessageModel> {
        const result = await WhatsAppService.makeRequest<WaMessageResponseType>(
            WhatsAppApiPath.SendMessage.replace("{id}", conversationId),
            "POST",
            payload
        );
        return WaMessageModel.fromResponse(result);
    }

    public static async assignConversation(
        conversationId: string,
        payload: AssignConversationPayload
    ): Promise<WaConversationModel> {
        const result = await WhatsAppService.makeRequest<WaConversationResponseType>(
            WhatsAppApiPath.AssignConversation.replace("{id}", conversationId),
            "POST",
            payload
        );
        return WaConversationModel.fromResponse(result);
    }

    public static async closeConversation(conversationId: string): Promise<WaConversationModel> {
        const result = await WhatsAppService.makeRequest<WaConversationResponseType>(
            WhatsAppApiPath.CloseConversation.replace("{id}", conversationId),
            "POST"
        );
        return WaConversationModel.fromResponse(result);
    }

    public static async reopenConversation(conversationId: string): Promise<WaConversationModel> {
        const result = await WhatsAppService.makeRequest<WaConversationResponseType>(
            WhatsAppApiPath.ReopenConversation.replace("{id}", conversationId),
            "POST"
        );
        return WaConversationModel.fromResponse(result);
    }

    public static async getContact(waId: string): Promise<WaContactModel> {
        const result = await WhatsAppService.makeRequest<WaContactResponseType>(
            WhatsAppApiPath.GetContact.replace("{wa_id}", waId),
            "GET"
        );
        return WaContactModel.fromResponse(result);
    }

    protected static async makeRequest<T>(url: string, method: "GET" | "POST" | "PUT", body?: any): Promise<T> {
        return this.getInstance().execHttpRequest<T>({ url, method, body });
    }
}

export default WhatsAppService;