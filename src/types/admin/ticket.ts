export enum TicketStatus {
    Pending = "submitted",
    Processing = "processed",
    Success = "resolved",
}

export enum TICKET_STATUS {
    RESOLVED = "resolved",
    PROCESSED = "processed",
    SUBMITTED = "submitted"
}

export type TicketType = {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    status: TicketStatus;
    profile: ProfileTicket;
    messageTickets: MessageTicket[];
}

export type MessageTicket = {
    id: number;
    ticket_id: number;
    description: string;
    sender_profile_id: string;
    created_at: Date;
    update_at: Date;
}

export type ProfileTicket = {
    id: string;
    first_name: string;
    last_name: string;
    role_id: number;
    user: UserTicket;
}

export type UserTicket = {
    id: string;
    email: string;
    phone: string;
}
