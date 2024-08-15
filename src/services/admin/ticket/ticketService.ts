import Service from "@/services/Service";
import {MessageTicketModel, SendMessageTicketInput, TicketModel} from "@/model/ADMIN/ticket";
import {MessageTicket, TicketType} from "@/types/admin/ticket";

export enum TicketApiPath {
    GetTicket = '/ticket',
    CreateTicket = '/ticket/send-message',
    GetTicketMessages = '/ticket/messages'
}

class TicketService extends Service {
    private static instance: TicketService = new TicketService();

    private constructor() {
        super();
    }

    public static getInstance(): TicketService {
        return TicketService.instance;
    }

    static invalidTickets() {
        return TicketService.getInstance().queryClient.invalidateQueries({queryKey: [TicketApiPath.GetTicket]});
    }

    static invalidMessages() {
        return TicketService.getInstance().queryClient.invalidateQueries({queryKey: [TicketApiPath.GetTicketMessages]});
    }

    public static async SendMessage(formData: SendMessageTicketInput): Promise<TicketModel> {
        const messageResult = await TicketService.makeRequest<TicketType>(TicketApiPath.CreateTicket, 'POST', formData);
        return new TicketModel(messageResult)
    }

    public static async getTickets({city_id}: { city_id: string }): Promise<TicketModel[]> {

        const uri = TicketApiPath.GetTicket + "/city/" + city_id

        const data = await TicketService.makeRequest<TicketType[]>(
            uri,
            'GET',
            undefined,
            true
        )

        return TicketModel.fromArrays(data)
    }

    public static async getTicketsMessages({ticket_id}: { ticket_id: string }): Promise<MessageTicketModel[]> {

        const uri = TicketApiPath.GetTicketMessages + "/" + ticket_id

        const data = await TicketService.makeRequest<MessageTicket[]>(
            uri,
            'GET',
            undefined,
            true
        )

        return MessageTicketModel.fromArrays(data)

    }

    protected static async makeRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT', body?: any, secure: boolean = true): Promise<T> {
        return this.getInstance().execHttpRequest<T>({url, method, body, secure});
    }

}

export default TicketService;
