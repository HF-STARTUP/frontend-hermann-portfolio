import {useMutation, useQuery} from "@tanstack/react-query";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import TicketService, {TicketApiPath} from "@/services/admin/ticket/ticketService";
import React from "react";
import {useRouter} from "next/navigation";
import {SendMessageTicketInput} from "@/model/ADMIN/ticket";

export const useSendMessageTicket = () => {

    const [loading, setLoading] = React.useState(false)

    const $router = useRouter()

    const {
        mutate,
        isSuccess,
        data
    } = useMutation({
        mutationFn: TicketService.SendMessage
    })

    const handleSendMessage = (data: SendMessageTicketInput) => {
        mutate(data)
    }

    React.useEffect(() => {
        void TicketService.invalidMessages()
    }, [isSuccess, data])

    return {
        data,
        loading,
        isSuccess,
        handleSendMessage,
    }

}

export const useGetTicketList = () => {

    const enable_city_id = AuthManagerGuard.getEnabledCity

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [TicketApiPath.GetTicket, enable_city_id],
        queryFn: () => TicketService.getTickets({city_id: enable_city_id as string}),
        enabled: !!enable_city_id
    })

    return {isLoading, data}
}

export const useGetTicketMessageList = (ticket_id: string) => {

    const {isLoading, data, isSuccess} = useQuery({
        queryKey: [TicketApiPath.GetTicketMessages, ticket_id],
        queryFn: () => TicketService.getTicketsMessages({ticket_id: ticket_id as string}),
        enabled: !!ticket_id
    })

    return {isLoading, data}
}


