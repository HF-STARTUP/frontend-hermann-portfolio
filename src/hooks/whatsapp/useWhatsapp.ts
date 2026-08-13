import WhatsAppService, { WhatsAppApiPath } from "@/services/WhatsappService";
import {
    AssignConversationPayload,
    SendWaMessagePayload,
    WhatsAppConversationsParams,
    WhatsAppMessagesParams,
} from "@/types/whatsapp.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutationProvider } from "../hooksProvider";

export const useGetWhatsAppConversations = (params: WhatsAppConversationsParams) => {
    const { isLoading, data } = useQuery({
        queryKey: [WhatsAppApiPath.GetConversations, params],
        queryFn: () => WhatsAppService.getConversations(params),
        refetchInterval: 6000,
    });

    return {
        conversations: data?.data ?? [],
        total: data?.meta.total ?? 0,
        page: data?.meta.page ?? 1,
        limit: data?.meta.limit ?? 20,
        isLoading,
    };
};

export const useGetWhatsAppConversation = (conversationId: string) => {
    const { isLoading, data } = useQuery({
        queryKey: [WhatsAppApiPath.GetConversation, conversationId],
        queryFn: () => WhatsAppService.getConversation(conversationId),
        enabled: !!conversationId,
    });

    return { isLoading, conversation: data };
};

export const useGetWhatsAppMessages = (params: WhatsAppMessagesParams) => {
    const { isLoading, data } = useQuery({
        queryKey: [WhatsAppApiPath.GetMessages, params],
        queryFn: () => WhatsAppService.getMessages(params),
        enabled: !!params.conversation_id,
        refetchInterval: 4000,
    });

    return {
        messages: data?.data ?? [],
        total: data?.meta.total ?? 0,
        isLoading,
    };
};

export const useSendWhatsAppMessage = (conversationId: string) => {
    const queryClient = useQueryClient();

    return useMutationProvider({
        mutationFn: (payload: SendWaMessagePayload) => WhatsAppService.sendMessage(conversationId, payload),
        successMessage: "Message envoyé",
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [WhatsAppApiPath.GetMessages] });
            await queryClient.invalidateQueries({ queryKey: [WhatsAppApiPath.GetConversations] });
        },
    });
};

export const useAssignWhatsAppConversation = () => {
    const queryClient = useQueryClient();

    return useMutationProvider({
        mutationFn: ({ conversationId, payload }: { conversationId: string; payload: AssignConversationPayload }) =>
            WhatsAppService.assignConversation(conversationId, payload),
        successMessage: "Conversation assignée avec succès",
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [WhatsAppApiPath.GetConversations] });
        },
    });
};

export const useCloseWhatsAppConversation = () => {
    const queryClient = useQueryClient();

    return useMutationProvider({
        mutationFn: (conversationId: string) => WhatsAppService.closeConversation(conversationId),
        successMessage: "Conversation clôturée",
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [WhatsAppApiPath.GetConversations] });
        },
    });
};

export const useReopenWhatsAppConversation = () => {
    const queryClient = useQueryClient();

    return useMutationProvider({
        mutationFn: (conversationId: string) => WhatsAppService.reopenConversation(conversationId),
        successMessage: "Conversation rouverte",
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [WhatsAppApiPath.GetConversations] });
        },
    });
};

export const useGetWhatsAppContact = (waId: string) => {
    const { isLoading, data } = useQuery({
        queryKey: [WhatsAppApiPath.GetContact, waId],
        queryFn: () => WhatsAppService.getContact(waId),
        enabled: !!waId,
    });

    return { isLoading, contact: data };
};