import Model from "@/model/Model";
import {DiscussionMemberResponseType, DiscussionResponseType, MessageResponseType} from "@/types/chat.types";
import {MessageType} from "@/lib/socketio";


enum DiscussionType {
    General = "general"
}

export class Discussion extends Model {
    _instance: DiscussionResponseType

    constructor(datas: DiscussionResponseType) {
        super()
        this._instance = datas
    }

    public static toArrays(datas: DiscussionResponseType[] | undefined): Discussion[] {
        if (!datas) return []
        return datas.map(data => new Discussion(data));
    }

    public static filterDirectDiscussion(datas: DiscussionResponseType[] | undefined): Discussion[] {
        if (!datas) return [];
        return datas.filter(data => data.type !== DiscussionType.General).map(data => new Discussion(data));
    }

    public static filterGeneralDiscussion(datas: DiscussionResponseType[] | undefined): Discussion[] {
        if (!datas) return [];
        return datas.filter(data => data.type === DiscussionType.General).map(data => new Discussion(data));
    }



    get id() {
        return this._instance.id
    }

    get name() {
        return this._instance?.name ? this.capitalizeFirstLetter(this._instance.name) : null
    }

    get discussionName() {
        return this.isGenenal ? "Global" : this.description
    }

    get isGenenal() {

        return this._instance.type === DiscussionType.General
    }

    get description() {
        return this._instance?.description ? this.capitalizeFirstLetter(this._instance.description) : null
    }

    get ownerID() {
        return this._instance.owner_id
    }

    get lastMessage() {
        return this._instance.messages?.length ? new MessageModel(this._instance?.messages[0]) : undefined
    }



}


export class DiscussionMember extends Model {
    _instance: DiscussionMemberResponseType

    constructor(datas: DiscussionMemberResponseType) {
        super()
        this._instance = datas
    }

    public static toArrays(datas: DiscussionMemberResponseType[]): DiscussionMember[] {
        return datas.map(data => new DiscussionMember(data)).reverse();
    }

    get id() {
        return this._instance.id
    }

    get avatar() {
        return this.resolveImage(this._instance.image)
    }

    get role() {
        return this._instance.role
    }

    get role_name() {
        return this._instance.role_name
    }

    private get firstname() {
        return this._instance.fist_name
    }

    private get lastname() {
        return this._instance.last_name
    }

    get username() {
        return `${this.lastname ?? ''} ${this.firstname ?? ''}`
    }




}


export class MessageModel extends Model {
    _instance: MessageResponseType

    constructor(datas: MessageResponseType) {
        super()
        this._instance = datas
    }

    public static toArrays(datas: MessageResponseType[] | undefined): MessageModel[] {
        if (!datas) return []
        return datas.map(data => new MessageModel(data)).reverse();
    }

    get id() {
        return this._instance.id
    }

    get frontID() {
        return this._instance.front_id
    }

    set setID(id: string){
        this._instance.id = id
    }

    get senderID(){
        return this._instance.from_profile_id
    }

    get isImage(){
        return this._instance.message_type == MessageType.Image
    }

    get imagePath() {
        try {
            const imagDate = JSON.parse(this._instance.content) as {title: string, image: string}
            return this.resolveImage(imagDate.image)
        }catch (e) {
            return "https://img.freepik.com/premium-vector/stressed-parent-by-child-behaviour-premium-sketchy-icon_9206-6954.jpg?w=740"
        }
    }

    get content() {
        return this.isImage ? "" : this._instance.content
    }

    get sendedAt() {
        return this.toDate(this._instance?.created_at as Date)
    }

    private get front_id() {
        return this._instance.front_id
    }

    get isSended() {
        return !this._instance.isLocal
    }


}



