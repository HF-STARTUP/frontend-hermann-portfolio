import Model from "@/model/Model";
import { ARCInteractionDetailResponseType, ARCInteractionSource } from "@/types/at-risk-customers.type";

class ARCInteractionDetailModel extends Model {
    private _instance: ARCInteractionDetailResponseType;

    constructor(data: ARCInteractionDetailResponseType) {
        super();
        this._instance = data;
    }

    static fromResponse(data: ARCInteractionDetailResponseType): ARCInteractionDetailModel {
        return new ARCInteractionDetailModel(data);
    }

    get id() { return this._instance.id; }
    get parkId() { return this._instance.park_id; }
    get source(): ARCInteractionSource { return this._instance.source; }
    get editable() { return this._instance.editable; }

    get isSystemGenerated(): boolean {
        return this._instance.source === "system";
    }

    get clientName() { return this._instance.header.client_name; }
    get locationLabel() { return this._instance.header.location_label; }
    get vehicleCount() { return this._instance.header.vehicle_count; }
    get vehicleCountLabel() { return this._instance.header.vehicle_count_label; }
    get riskScore() { return this._instance.header.risk_score; }

    get communicationChannel() { return this._instance.communication_channel; }
    get communicationChannelLabel() { return this._instance.communication_channel_label ?? "----"; }
    get contactReason() { return this._instance.contact_reason; }
    get contactReasonLabel() { return this._instance.contact_reason_label ?? "----"; }
    get exchangeSummary() { return this._instance.exchange_summary ?? "----"; }
    get identifiedNeeds() { return this._instance.identified_needs.length > 0 ? this._instance.identified_needs : undefined; }
    get identifiedNeedsLabels() { return this._instance.identified_needs_labels; }
    get proposedSolution() { return this._instance.proposed_solution ?? "----"; }
    get assignedTo() { return this._instance.assigned_to; }

    get assignedToFirstName() {
        return this.assignedTo?.first_name ?? ""
    }

    get assignedToLastName() {
        return this.assignedTo?.last_name ?? ""
    }

    get assignedToFullName() {
        if(!this.assignedTo) return "----"
        return this.toName(`${this.assignedToFirstName} ${this.assignedTo?.last_name}`)
    }

    get assignedToImage() {
        return this.assignedTo?.avatar_url ? this.resolveImage(this.assignedTo?.avatar_url) : undefined
    }
    
    get result() { return this._instance.result; }
    get resultLabel() { return this._instance.result_label ?? "----"; }
    get nextSteps() { return this._instance.next_steps ?? "----"; }
    get status() { return this._instance.status; }
    get statusLabel() { return this._instance.status_label ?? "----"; }

    get hasNextFollowUp(): boolean {
        return !!this._instance.next_follow_up_at;
    }

    get nextFollowUpAt() {
        return this._instance.next_follow_up_at
            ? this.formatDateTime(this._instance.next_follow_up_at)
            : "----";
    }

    get occurredAt() {
        return this.formatDateTime(this._instance.occurred_at);
    }

    get createdAt() {
        return this.formatDateTime(this._instance.created_at);
    }

    get updatedAt() {
        return this.formatDateTime(this._instance.updated_at);
    }
}

export default ARCInteractionDetailModel;