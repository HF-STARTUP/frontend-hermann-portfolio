import { BadgeVariant } from "@/components/display/Badge";
import Model from "@/model/Model";
import { ARCActionPriority, ARCActionSource, ARCActionStatus, ARCCategory, ARCInteractionResponseType, ARCInteractionTag } from "@/types/at-risk-customers.type";
import { AlertTriangle, ArrowDown, ArrowUp, Banknote, Calendar, Check, Clock, Dot, Loader, LucideIcon, Minus, NotepadTextDashed, Phone, RefreshCcw, X } from "lucide-react";

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
    get status() { return this._instance.status }
    get statusLabel() { return this._instance.status_label }
    get priority() { return this._instance.priority }
    get priorityLabel() { return this._instance.priority_label }
    get assignee() { return this._instance.assignee }

    get assigneeFirstName(): string {
        return this.assignee?.first_name?.trim() ?? "";
    }

    get assigneeLastName(): string {
        return this.assignee?.last_name?.trim() ?? "";
    }

    get assigneeFullName(): string {
        if (!this.assignee) return "-";
        return this.toName(`${this.assigneeFirstName} ${this.assigneeLastName}`);
    }
    get statusIcon(): LucideIcon {
        switch (this.status) {
            case ARCActionStatus.CANCELLED:
                return X
            case ARCActionStatus.COMPLETED:
                return Check
            case ARCActionStatus.DRAFT:
                return NotepadTextDashed
            case ARCActionStatus.IN_PROGRESS:
                return Loader
            case ARCActionStatus.TODO:
                return Clock
            default:
                return Dot;
        }
    }

    get statusBadgeVariant(): BadgeVariant {
        switch (this.status) {
            case ARCActionStatus.CANCELLED:
                return "red"
            case ARCActionStatus.COMPLETED:
                return "green"
            case ARCActionStatus.DRAFT:
                return "purple"
            case ARCActionStatus.IN_PROGRESS:
                return "blue"
            case ARCActionStatus.TODO:
                return "orange"
            default:
                return "default";
        }
    }

    get priorityIcon(): LucideIcon {
        switch (this.priority) {
            case ARCActionPriority.LOW:
                return ArrowDown
            case ARCActionPriority.MEDIUM:
                return Minus
            case ARCActionPriority.HIGH:
                return ArrowUp
            case ARCActionPriority.URGENT:
                return AlertTriangle
            default:
                return Dot;
        }
    }

    get priorityBadgeVariant(): BadgeVariant {
        switch (this.priority) {
            case ARCActionPriority.LOW:
                return "default"
            case ARCActionPriority.MEDIUM:
                return "orange"
            case ARCActionPriority.HIGH:
                return "purple"
            case ARCActionPriority.URGENT:
                return "red"
            default:
                return "default";
        }
    }

    get categorieIcon(): LucideIcon {
        switch (this.category) {
            case ARCCategory.CONTACT:
                return Phone
            case ARCCategory.FOLLOW_UP:
                return Calendar
            case ARCCategory.PAYMENT_OVERDUE:
                return Banknote
            case ARCCategory.SUBSCRIPTION:
                return RefreshCcw
            default:
                return Dot
        }
    }

    get occurredAt() {
        return this.formatDateTime(this._instance.occurred_at);
    }

    get deadlineAt() {
        if (!this._instance.deadline_at) return undefined
        return this.formatDateTime(this._instance.deadline_at);
    }

    get isSystemGenerated(): boolean {
        return this._instance.source === ARCActionSource.SYSTEM;
    }

    get hasNotes(): boolean {
        return !!this._instance.notes?.trim();
    }
}

export default ARCInteractionModel;