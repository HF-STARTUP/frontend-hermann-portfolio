import Model from "@/model/Model";
import { WaConversationResponseType, WaConversationStatus } from "@/types/whatsapp.type";

class WaConversationModel extends Model {
    private _instance: WaConversationResponseType;

    constructor(data: WaConversationResponseType) {
        super();
        this._instance = data;
    }

    static fromResponse(data: WaConversationResponseType): WaConversationModel {
        return new WaConversationModel(data);
    }

    static fromResponseArray(data: WaConversationResponseType[]): WaConversationModel[] {
        return data.map((item) => new WaConversationModel(item));
    }

    get id() {
        return this._instance.id;
    }

    get status(): WaConversationStatus {
        return this._instance.status;
    }

    get waId() {
        return this._instance.contact.wa_id;
    }

    get displayName() {
        return this._instance.contact.profile_name || this._instance.contact.wa_id;
    }

    get profileId() {
        return this._instance.contact.profile_id;
    }

    get unreadCount() {
        return this._instance.unread_count;
    }

    get sessionWindowOpen() {
        return this._instance.session_window_open;
    }

    get canReply() {
        return this.sessionWindowOpen;
    }

    get assignedTo() {
        return this._instance.assigned_to;
    }

    get isAssigned() {
        return Boolean(this._instance.assigned_to);
    }

    get lastMessagePreview() {
        return this._instance.last_message?.body ?? "";
    }

    get lastMessageTimeLabel() {
        return new Date(this._instance.last_message_at).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    }
}

export default WaConversationModel;