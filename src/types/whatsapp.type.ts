export enum WaConversationStatus {
    OPEN = "OPEN",
    PENDING = "PENDING",
    ASSIGNED = "ASSIGNED",
    CLOSED = "CLOSED",
    BOT = "BOT",
}

export enum WaMessageStatus {
    PENDING = "PENDING",
    SENT = "SENT",
    DELIVERED = "DELIVERED",
    READ = "READ",
    FAILED = "FAILED",
}

export enum WaDirection {
    INBOUND = "INBOUND",
    OUTBOUND = "OUTBOUND",
}

export enum WaMessageType {
    TEXT = "text",
}

export interface WaContactResponseType {
    wa_id: string;
    profile_name: string;
    profile_id: string | null;
}

export interface WaLastMessageResponseType {
    direction: WaDirection;
    body: string;
    created_at: string;
}

export interface WaConversationResponseType {
    id: string;
    status: WaConversationStatus;
    unread_count: number;
    session_window_open: boolean;
    last_message_at: string;
    assigned_to: string | null;
    contact: WaContactResponseType;
    last_message: WaLastMessageResponseType;
}

export interface WaConversationListResponseType {
    page: number;
    limit: number;
    total: number;
    items: WaConversationResponseType[];
}

export interface WaMessageResponseType {
    id: string;
    direction: WaDirection;
    type: WaMessageType;
    body: string;
    wamid: string;
    status: WaMessageStatus;
    agent_profile_id: string | null;
    is_auto_reply: boolean;
    error_message?: string;
    created_at: string;
}

export interface WaMessageListResponseType {
    page: number;
    limit: number;
    total: number;
    items: WaMessageResponseType[];
}

export interface WhatsAppConversationsParams {
    status?: WaConversationStatus;
    assigned_to?: "me" | string;
    search?: string;
    page?: number;
    limit?: number;
}

export interface WhatsAppMessagesParams {
    conversation_id: string;
    page?: number;
    limit?: number;
}

export interface SendWaMessagePayload {
    type?: WaMessageType;
    body: string;
}

export interface AssignConversationPayload {
    assigned_to: string | null;
}