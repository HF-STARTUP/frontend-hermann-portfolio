import Service from "@/services/Service";
import {ResponseWithPagination} from "@/types/generic";
import {
    CreateDiscussionInput,
    DiscussionMemberResponseType,
    DiscussionResponseType,
    MessageResponseType
} from "@/types/chat.types";
import {Discussion, DiscussionMember, MessageModel} from "@/model/message/Message";
import {queryClient} from "@/app/_utils/network/reactQuery";

export enum ChatEpiRoutes {
    MyDiscussions = "/discussion/my-discussions",
    DiscussionMembers = "/discussion/members",
    DiscussionMessages = "/message",
    CreateDiscussion = "/discussion"
}


class ChatService extends Service {
    private static instance: ChatService = new ChatService();

    private constructor() {
        super();
    }

    public static getInstance(): ChatService {
        return ChatService.instance;
    }

    public static async getMyDiscussions(parkID: string): Promise<Discussion[]> {
        const uri = ChatEpiRoutes.MyDiscussions + '?park_id=' + parkID
        const discussions = await ChatService.makeRequest<DiscussionResponseType[]>(uri, 'GET');
        return Discussion.toArrays(discussions)
    }

    public static async createDiscussion(discussion: CreateDiscussionInput): Promise<Discussion> {
        const uri = ChatEpiRoutes.CreateDiscussion
        const discussionResponse = await ChatService.makeRequest<DiscussionResponseType>(uri, 'POST', discussion);
        return new Discussion(discussionResponse)
    }

    public static refreshDiscussion() {
        return queryClient.invalidateQueries({queryKey: [ChatEpiRoutes.MyDiscussions]})
    }


    public static async getDiscussionsMembers(discussionID: string): Promise<DiscussionMember[]> {
        const uri = ChatEpiRoutes.DiscussionMembers + '?discussion_id=' + discussionID
        const discussionResult = await ChatService.makeRequest<DiscussionMemberResponseType[]>(uri, 'GET');

        return DiscussionMember.toArrays(discussionResult)
    }

    public static async getDiscussionMessages(discussionID: string): Promise<MessageModel[]> {
        const uri = ChatEpiRoutes.DiscussionMessages + '?discussion_id=' + discussionID
        const result = await ChatService.makeRequest<ResponseWithPagination<MessageResponseType[]>>(uri, 'GET');
        return MessageModel.toArrays(result.data)
    }


    protected static async makeRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT', body?: any): Promise<T> {
        return this.getInstance().execHttpRequest<T>({url, method, body});
    }


}

export default ChatService

