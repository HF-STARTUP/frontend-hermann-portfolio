import Model from "@/model/Model";
import { ARCInteractionResponseType, ARCInteractionTag } from "@/types/at-risk-customers.type";

class ARCInteractionModel extends Model {
    private _instance: ARCInteractionResponseType;

    constructor(data: ARCInteractionResponseType) {
        super();
        this._instance = data;
    }

    static toArrays(datas: ARCInteractionResponseType[]): ARCInteractionModel[] {
        return datas.map((data) => new ARCInteractionModel(data));
    }

    get id() { return this._instance.id; }
    get source() { return this._instance.source; }
    get category() { return this._instance.category; }
    get categoryLabel() { return this._instance.category_label; }
    get title() { return this._instance.title; }
    get notes() { return this._instance.notes; }
    get tags(): ARCInteractionTag[] { return this._instance.tags; }

    get occurredAt() {
        return this.formatDateTime(this._instance.occurred_at);
    }

    get isSystemGenerated(): boolean {
        return this._instance.source === "system";
    }

    get hasNotes(): boolean {
        return !!this._instance.notes?.trim();
    }
}

export default ARCInteractionModel;