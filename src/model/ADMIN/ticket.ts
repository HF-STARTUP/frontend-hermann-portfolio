import {MessageTicket, ProfileTicket, TicketStatus, TicketType, UserTicket} from "@/types/admin/ticket";
import Model from "@/model/Model";

export class TicketModel {
    private _instance: TicketType;

    constructor(datas: TicketType) {
        this._instance = datas;
    }

    static fromArrays(datas: TicketType[]): TicketModel[] {
        return datas.map(data => new TicketModel(data)).reverse();
    }

    get isPending() {
        return this.status === TicketStatus.Pending
    }

    get id() {
        return this._instance.id;
    }

    get title() {
        return this._instance.title;
    }

    get description() {
        return this._instance.description;
    }

    get createdAt() {
        return this._instance.created_at;
    }

    get status() {
        return this._instance.status;
    }

    get profile() {
        return new ProfileModel(this._instance.profile);
    }

    get messageTickets() {
        return this._instance.messageTickets.map(mt => new MessageTicketModel(mt));
    }

    get lastMessage() {
        return this._instance.messageTickets.length ? new MessageTicketModel(this._instance.messageTickets[0]) : null
    }
}


class UserModel {
    private _instance: UserTicket;

    constructor(datas: UserTicket) {
        this._instance = datas;
    }

    get id() {
        return this._instance.id;
    }

    get email() {
        return this._instance.email;
    }

    get phone() {
        return this._instance.phone;
    }
}


class ProfileModel {
    private _instance: ProfileTicket;

    constructor(datas: ProfileTicket) {
        this._instance = datas;
    }

    get id() {
        return this._instance.id;
    }

    get firstName() {
        return this._instance.first_name;
    }

    get username() {
        return this.firstName + " " + this.lastName
    }

    get lastName() {
        return this._instance.last_name;
    }

    get roleId() {
        return this._instance.role_id;
    }

    get user() {
        return new UserModel(this._instance.user);
    }
}

export class MessageTicketModel extends Model {

    private _instance: MessageTicket;

    constructor(datas: MessageTicket) {
        super()
        this._instance = datas;
    }

    static fromArrays(datas: MessageTicket[]): MessageTicketModel[] {
        return datas.map(data => new MessageTicketModel(data));
    }

    get isSended() {
        return true
    }

    get isImage() {
        return (this.description.split("vtcImg").length > 1)
    }

    get getImage() {
        return this.resolveImage(this.description.split("vtcImg")[1])
    }

    get getImageDescription() {
        return this.description.split("vtcImg")[0]
    }

    get id() {
        return this._instance.id;
    }

    get ticketId() {
        return this._instance.ticket_id;
    }

    get description() {
        return this._instance.description;
    }

    get senderProfileId() {
        return this._instance.sender_profile_id;
    }

    get createdAt() {
        return this.toDate(this._instance.created_at);
    }

    get updatedAt() {
        return this._instance.update_at;
    }
}

export type SendMessageTicketInput = {
    ticket_id: number
    description: string
}

