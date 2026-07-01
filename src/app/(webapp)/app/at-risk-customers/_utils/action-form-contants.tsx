import {
    ARCNewActionPayload,
    ARCCommunicationChannel,
    ARCContactReason,
    ARCClientNeed,
    ARCActionType,
    ARCActionPriority,
    ARCActionStatus,
} from "@/types/at-risk-customers.type"
import { SelectableChipProps } from "../_component/SelectableChip"
import {
    Mail, Phone, User, RefreshCcw, Wrench, Tag, ClipboardList,
    TrendingDown, BarChart2, PhoneCall, Megaphone, MonitorPlay,
    FileSearch, GraduationCap, Hammer,
} from "lucide-react"
import { PiWhatsappLogo } from "react-icons/pi"
import { Dispatch, SetStateAction } from "react"

export const ActionFormConstants = ({
    payload,
    setPayload,
}: {
    payload: ARCNewActionPayload;
    setPayload: Dispatch<SetStateAction<ARCNewActionPayload>>;
}) => {

    const CommunicationChannels: SelectableChipProps[] = [
        {
            isSelected: payload.communication_channel === ARCCommunicationChannel.CALL,
            label: "Appel",
            onSelect: () => setPayload({ ...payload, communication_channel: ARCCommunicationChannel.CALL }),
            value: ARCCommunicationChannel.CALL,
            icon: <Phone size={16} className="shrink-0" />
        },
        {
            isSelected: payload.communication_channel === ARCCommunicationChannel.WHATSAPP,
            label: "WhatsApp",
            onSelect: () => setPayload({ ...payload, communication_channel: ARCCommunicationChannel.WHATSAPP }),
            value: ARCCommunicationChannel.WHATSAPP,
            icon: <PiWhatsappLogo size={16} className="shrink-0" />
        },
        {
            isSelected: payload.communication_channel === ARCCommunicationChannel.EMAIL,
            label: "E-mail",
            onSelect: () => setPayload({ ...payload, communication_channel: ARCCommunicationChannel.EMAIL }),
            value: ARCCommunicationChannel.EMAIL,
            icon: <Mail size={16} className="shrink-0" />
        },
        {
            isSelected: payload.communication_channel === ARCCommunicationChannel.MEETING,
            label: "En personne",
            onSelect: () => setPayload({ ...payload, communication_channel: ARCCommunicationChannel.MEETING }),
            value: ARCCommunicationChannel.MEETING,
            icon: <User size={16} className="shrink-0" />
        },
    ]

    const ContactReasons: SelectableChipProps[] = [
        {
            isSelected: payload.contact_reason === ARCContactReason.SUBSCRIPTION_RENEWAL,
            label: "Renouvellement",
            onSelect: () => setPayload({ ...payload, contact_reason: ARCContactReason.SUBSCRIPTION_RENEWAL }),
            value: ARCContactReason.SUBSCRIPTION_RENEWAL,
            icon: <RefreshCcw size={16} className="shrink-0" />
        },
        {
            isSelected: payload.contact_reason === ARCContactReason.PAYMENT_OVERDUE,
            label: "Paiement en retard",
            onSelect: () => setPayload({ ...payload, contact_reason: ARCContactReason.PAYMENT_OVERDUE }),
            value: ARCContactReason.PAYMENT_OVERDUE,
            icon: <ClipboardList size={16} className="shrink-0" />
        },
        {
            isSelected: payload.contact_reason === ARCContactReason.TRAINING,
            label: "Formation",
            onSelect: () => setPayload({ ...payload, contact_reason: ARCContactReason.TRAINING }),
            value: ARCContactReason.TRAINING,
            icon: <GraduationCap size={16} className="shrink-0" />
        },
        {
            isSelected: payload.contact_reason === ARCContactReason.ACCOUNT_REVIEW,
            label: "Revue de compte",
            onSelect: () => setPayload({ ...payload, contact_reason: ARCContactReason.ACCOUNT_REVIEW }),
            value: ARCContactReason.ACCOUNT_REVIEW,
            icon: <FileSearch size={16} className="shrink-0" />
        },
        {
            isSelected: payload.contact_reason === ARCContactReason.OTHER,
            label: "Autre",
            onSelect: () => setPayload({ ...payload, contact_reason: ARCContactReason.OTHER }),
            value: ARCContactReason.OTHER,
            icon: <Wrench size={16} className="shrink-0" />
        },
    ]

    const IdentifiedNeeds: SelectableChipProps[] = [
        {
            isSelected: payload.identified_needs?.includes(ARCClientNeed.LOYALTY_DISCOUNT) ?? false,
            label: "Remise fidélité",
            onSelect: () => setPayload({ ...payload, identified_needs: toggleMulti(payload.identified_needs, ARCClientNeed.LOYALTY_DISCOUNT) }),
            value: ARCClientNeed.LOYALTY_DISCOUNT,
            icon: <Tag size={16} className="shrink-0" />
        },
        {
            isSelected: payload.identified_needs?.includes(ARCClientNeed.ACCOUNT_REVIEW) ?? false,
            label: "Revue de compte",
            onSelect: () => setPayload({ ...payload, identified_needs: toggleMulti(payload.identified_needs, ARCClientNeed.ACCOUNT_REVIEW) }),
            value: ARCClientNeed.ACCOUNT_REVIEW,
            icon: <FileSearch size={16} className="shrink-0" />
        },
        {
            isSelected: payload.identified_needs?.includes(ARCClientNeed.PAYMENT_PLAN) ?? false,
            label: "Échéancier de paiement",
            onSelect: () => setPayload({ ...payload, identified_needs: toggleMulti(payload.identified_needs, ARCClientNeed.PAYMENT_PLAN) }),
            value: ARCClientNeed.PAYMENT_PLAN,
            icon: <ClipboardList size={16} className="shrink-0" />
        },
        {
            isSelected: payload.identified_needs?.includes(ARCClientNeed.RENEWAL_CALL) ?? false,
            label: "Appel de renouvellement",
            onSelect: () => setPayload({ ...payload, identified_needs: toggleMulti(payload.identified_needs, ARCClientNeed.RENEWAL_CALL) }),
            value: ARCClientNeed.RENEWAL_CALL,
            icon: <RefreshCcw size={16} className="shrink-0" />
        },
        {
            isSelected: payload.identified_needs?.includes(ARCClientNeed.TRAINING) ?? false,
            label: "Session de formation",
            onSelect: () => setPayload({ ...payload, identified_needs: toggleMulti(payload.identified_needs, ARCClientNeed.TRAINING) }),
            value: ARCClientNeed.TRAINING,
            icon: <GraduationCap size={16} className="shrink-0" />
        },
        {
            isSelected: payload.identified_needs?.includes(ARCClientNeed.RENEWAL) ?? false,
            label: "Renouvellement",
            onSelect: () => setPayload({ ...payload, identified_needs: toggleMulti(payload.identified_needs, ARCClientNeed.RENEWAL) }),
            value: ARCClientNeed.RENEWAL,
            icon: <TrendingDown size={16} className="shrink-0" />
        },
        {
            isSelected: payload.identified_needs?.includes(ARCClientNeed.BILLING_REVIEW) ?? false,
            label: "Revue facturation",
            onSelect: () => setPayload({ ...payload, identified_needs: toggleMulti(payload.identified_needs, ARCClientNeed.BILLING_REVIEW) }),
            value: ARCClientNeed.BILLING_REVIEW,
            icon: <BarChart2 size={16} className="shrink-0" />
        },
    ]

    const NextActions: SelectableChipProps[] = [
        {
            isSelected: payload.action_type === ARCActionType.FOLLOW_UP_CLIENT,
            label: "Relancer le client",
            onSelect: () => setPayload({ ...payload, action_type: ARCActionType.FOLLOW_UP_CLIENT }),
            value: ARCActionType.FOLLOW_UP_CLIENT,
            icon: <PhoneCall size={16} className="shrink-0" />
        },
        {
            isSelected: payload.action_type === ARCActionType.SEND_PROMOTION,
            label: "Envoyer une promotion",
            onSelect: () => setPayload({ ...payload, action_type: ARCActionType.SEND_PROMOTION }),
            value: ARCActionType.SEND_PROMOTION,
            icon: <Megaphone size={16} className="shrink-0" />
        },
        {
            isSelected: payload.action_type === ARCActionType.SCHEDULE_DEMO,
            label: "Programmer une démo",
            onSelect: () => setPayload({ ...payload, action_type: ARCActionType.SCHEDULE_DEMO }),
            value: ARCActionType.SCHEDULE_DEMO,
            icon: <MonitorPlay size={16} className="shrink-0" />
        },
        {
            isSelected: payload.action_type === ARCActionType.ACCOUNT_REVIEW,
            label: "Revue de compte",
            onSelect: () => setPayload({ ...payload, action_type: ARCActionType.ACCOUNT_REVIEW }),
            value: ARCActionType.ACCOUNT_REVIEW,
            icon: <FileSearch size={16} className="shrink-0" />
        },
        {
            isSelected: payload.action_type === ARCActionType.TRAINING_SESSION,
            label: "Session de formation",
            onSelect: () => setPayload({ ...payload, action_type: ARCActionType.TRAINING_SESSION }),
            value: ARCActionType.TRAINING_SESSION,
            icon: <GraduationCap size={16} className="shrink-0" />
        },
        {
            isSelected: payload.action_type === ARCActionType.TECHNICAL_INTERVENTION,
            label: "Intervention technique",
            onSelect: () => setPayload({ ...payload, action_type: ARCActionType.TECHNICAL_INTERVENTION }),
            value: ARCActionType.TECHNICAL_INTERVENTION,
            icon: <Hammer size={16} className="shrink-0" />
        },
    ]

    const Priorities: SelectableChipProps[] = [
        {
            isSelected: payload.priority === ARCActionPriority.LOW,
            label: "Basse",
            onSelect: () => setPayload({ ...payload, priority: ARCActionPriority.LOW }),
            value: ARCActionPriority.LOW,
        },
        {
            isSelected: payload.priority === ARCActionPriority.MEDIUM,
            label: "Moyenne",
            onSelect: () => setPayload({ ...payload, priority: ARCActionPriority.MEDIUM }),
            value: ARCActionPriority.MEDIUM,
        },
        {
            isSelected: payload.priority === ARCActionPriority.HIGH,
            label: "Haute",
            onSelect: () => setPayload({ ...payload, priority: ARCActionPriority.HIGH }),
            value: ARCActionPriority.HIGH,
        },
        {
            isSelected: payload.priority === ARCActionPriority.URGENT,
            label: "Urgente",
            onSelect: () => setPayload({ ...payload, priority: ARCActionPriority.URGENT }),
            value: ARCActionPriority.URGENT,
        },
    ]

    const Statuses: SelectableChipProps[] = [
        {
            isSelected: payload.status === ARCActionStatus.TODO,
            label: "À faire",
            onSelect: () => setPayload({ ...payload, status: ARCActionStatus.TODO }),
            value: ARCActionStatus.TODO,
        },
        {
            isSelected: payload.status === ARCActionStatus.IN_PROGRESS,
            label: "En cours",
            onSelect: () => setPayload({ ...payload, status: ARCActionStatus.IN_PROGRESS }),
            value: ARCActionStatus.IN_PROGRESS,
        },
        {
            isSelected: payload.status === ARCActionStatus.COMPLETED,
            label: "Réalisée",
            onSelect: () => setPayload({ ...payload, status: ARCActionStatus.COMPLETED }),
            value: ARCActionStatus.COMPLETED,
        },
        {
            isSelected: payload.status === ARCActionStatus.CANCELLED,
            label: "Annulée",
            onSelect: () => setPayload({ ...payload, status: ARCActionStatus.CANCELLED }),
            value: ARCActionStatus.CANCELLED,
        },
    ]

    return {
        CommunicationChannels,
        ContactReasons,
        IdentifiedNeeds,
        NextActions,
        Priorities,
        Statuses,
    }
}

// helper pour la sélection multiple
const toggleMulti = (current: ARCClientNeed[] | undefined, value: ARCClientNeed): ARCClientNeed[] => {
    const list = current ?? []
    return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}