import Model from "@/model/Model";
import { WaDirection, WaMessageResponseType, WaMessageStatus } from "@/types/whatsapp.type";

class WaMessageModel extends Model {
    private _instance: WaMessageResponseType;

    constructor(data: WaMessageResponseType) {
        super();
        this._instance = data;
    }

    static fromResponse(data: WaMessageResponseType): WaMessageModel {
        return new WaMessageModel(data);
    }

    static fromResponseArray(data: WaMessageResponseType[]): WaMessageModel[] {
        return data.map((item) => new WaMessageModel(item));
    }

    get id() {
        return this._instance.id;
    }

    get body() {
        return this._instance.body;
    }

    get direction(): WaDirection {
        return this._instance.direction;
    }

    get isOutbound() {
        return this._instance.direction === WaDirection.OUTBOUND;
    }

    get status(): WaMessageStatus {
        return this._instance.status;
    }

    get errorMessage() {
        return this._instance.error_message;
    }

    get isAutoReply() {
        return this._instance.is_auto_reply;
    }

    get timeLabel() {
        return new Date(this._instance.created_at).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    }
}

export default WaMessageModel;