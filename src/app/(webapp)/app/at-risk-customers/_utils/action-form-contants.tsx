import { ARCNewActionPayload } from "@/types/at-risk-customers.type"
import { SelectableChipProps } from "../_component/SelectableChip"
import { Mail, Phone, User, RefreshCcw, Wrench, Tag, Puzzle, ClipboardList, TrendingDown, BarChart2, HeadphonesIcon, BookOpen, Box, PhoneCall, Megaphone, MonitorPlay, FileSearch, GraduationCap, Hammer } from "lucide-react"
import { PiWhatsappLogo } from "react-icons/pi"
import { Dispatch, SetStateAction } from "react"

export const ActionFormConstants = ({
    payload,
    setPayload
}
    : {
        payload: ARCNewActionPayload;
        setPayload: Dispatch<SetStateAction<ARCNewActionPayload>>
    }) => {

    const CommunicationChannels: SelectableChipProps[] = [
        {
            isSelected: payload.communication_channel == "call",
            label: "Appel",
            onSelect: () => setPayload({ ...payload, communication_channel: "call" }),
            value: "call",
            icon: <Phone size={16} className="shrink-0" />
        },
        {
            isSelected: payload.communication_channel == "whatsapp",
            label: "WhatsApp",
            onSelect: () => setPayload({ ...payload, communication_channel: "whatsapp" }),
            value: "whatsapp",
            icon: <PiWhatsappLogo size={16} className="shrink-0" />
        },
        {
            isSelected: payload.communication_channel == "email",
            label: "E-mail",
            onSelect: () => setPayload({ ...payload, communication_channel: "email" }),
            value: "email",
            icon: <Mail size={16} className="shrink-0" />
        },
        {
            isSelected: payload.communication_channel == "person",
            label: "En personne",
            onSelect: () => setPayload({ ...payload, communication_channel: "person" }),
            value: "person",
            icon: <User size={16} className="shrink-0" />
        },
    ]

    const ContactReasons: SelectableChipProps[] = [
        {
            isSelected: payload.contact_reason == "renewal",
            label: "Renouvellement",
            onSelect: () => setPayload({ ...payload, contact_reason: "renewal" }),
            value: "renewal",
            icon: <RefreshCcw size={16} className="shrink-0" />
        },
        {
            isSelected: payload.contact_reason == "technical_issue",
            label: "Problème technique",
            onSelect: () => setPayload({ ...payload, contact_reason: "technical_issue" }),
            value: "technical_issue",
            icon: <Wrench size={16} className="shrink-0" />
        },
        {
            isSelected: payload.contact_reason == "plan_change",
            label: "Changement de forfait",
            onSelect: () => setPayload({ ...payload, contact_reason: "plan_change" }),
            value: "plan_change",
            icon: <Tag size={16} className="shrink-0" />
        },
        {
            isSelected: payload.contact_reason == "late_payment",
            label: "Paiement en retard",
            onSelect: () => setPayload({ ...payload, contact_reason: "late_payment" }),
            value: "late_payment",
            icon: <ClipboardList size={16} className="shrink-0" />
        },
        {
            isSelected: payload.contact_reason == "integration",
            label: "Intégration",
            onSelect: () => setPayload({ ...payload, contact_reason: "integration" }),
            value: "integration",
            icon: <Puzzle size={16} className="shrink-0" />
        },
        {
            isSelected: payload.contact_reason == "discount_request",
            label: "Demande de remise",
            onSelect: () => setPayload({ ...payload, contact_reason: "discount_request" }),
            value: "discount_request",
            icon: <TrendingDown size={16} className="shrink-0" />
        },
        {
            isSelected: payload.contact_reason == "general_followup",
            label: "Suivi général",
            onSelect: () => setPayload({ ...payload, contact_reason: "general_followup" }),
            value: "general_followup",
            icon: <BarChart2 size={16} className="shrink-0" />
        },
        {
            isSelected: payload.contact_reason == "low_usage",
            label: "Faible utilisation",
            onSelect: () => setPayload({ ...payload, contact_reason: "low_usage" }),
            value: "low_usage",
            icon: <HeadphonesIcon size={16} className="shrink-0" />
        },
    ]

    const IdentifiedNeeds: SelectableChipProps[] = [
        {
            isSelected: payload.identified_needs?.includes("loyalty_discount"),
            label: "Remise fidélité",
            onSelect: () => setPayload({ ...payload, identified_needs: toggleMulti(payload.identified_needs, "loyalty_discount") }),
            value: "loyalty_discount",
            icon: <Tag size={16} className="shrink-0" />
        },
        {
            isSelected: payload.identified_needs?.includes("account_review"),
            label: "Revue de compte",
            onSelect: () => setPayload({ ...payload, identified_needs: toggleMulti(payload.identified_needs, "account_review") }),
            value: "account_review",
            icon: <FileSearch size={16} className="shrink-0" />
        },
        {
            isSelected: payload.identified_needs?.includes("payment_plan"),
            label: "Échéancier de paiement",
            onSelect: () => setPayload({ ...payload, identified_needs: toggleMulti(payload.identified_needs, "payment_plan") }),
            value: "payment_plan",
            icon: <ClipboardList size={16} className="shrink-0" />
        },
        {
            isSelected: payload.identified_needs?.includes("renewal_reminder"),
            label: "Rappel de renouvellement",
            onSelect: () => setPayload({ ...payload, identified_needs: toggleMulti(payload.identified_needs, "renewal_reminder") }),
            value: "renewal_reminder",
            icon: <RefreshCcw size={16} className="shrink-0" />
        },
        {
            isSelected: payload.identified_needs?.includes("training"),
            label: "Session de formation",
            onSelect: () => setPayload({ ...payload, identified_needs: toggleMulti(payload.identified_needs, "training") }),
            value: "training",
            icon: <GraduationCap size={16} className="shrink-0" />
        },
        {
            isSelected: payload.identified_needs?.includes("plan_downgrade"),
            label: "Rétrogradation de forfait",
            onSelect: () => setPayload({ ...payload, identified_needs: toggleMulti(payload.identified_needs, "plan_downgrade") }),
            value: "plan_downgrade",
            icon: <TrendingDown size={16} className="shrink-0" />
        },
        {
            isSelected: payload.identified_needs?.includes("device_replacement") ?? false,
            label: "Remplacement de boitier",
            onSelect: () => setPayload({ ...payload, identified_needs: toggleMulti(payload.identified_needs, "device_replacement") }),
            value: "device_replacement",
            icon: <Box size={16} className="shrink-0" />
        },
        {
            isSelected: payload.identified_needs?.includes("technical_support") ?? false,
            label: "Support technique",
            onSelect: () => setPayload({ ...payload, identified_needs: toggleMulti(payload.identified_needs, "technical_support") }),
            value: "technical_support",
            icon: <Hammer size={16} className="shrink-0" />
        },
    ]

    const NextActions: SelectableChipProps[] = [
        {
            isSelected: payload.action_type == "callback",
            label: "Relancer le client",
            onSelect: () => setPayload({ ...payload, action_type: "callback" }),
            value: "callback",
            icon: <PhoneCall size={16} className="shrink-0" />
        },
        {
            isSelected: payload.action_type == "send_promotion",
            label: "Envoyer une promotion",
            onSelect: () => setPayload({ ...payload, action_type: "send_promotion" }),
            value: "send_promotion",
            icon: <Megaphone size={16} className="shrink-0" />
        },
        {
            isSelected: payload.action_type == "schedule_demo",
            label: "Programmer une démo",
            onSelect: () => setPayload({ ...payload, action_type: "schedule_demo" }),
            value: "schedule_demo",
            icon: <MonitorPlay size={16} className="shrink-0" />
        },
        {
            isSelected: payload.action_type == "account_review",
            label: "Revue de compte",
            onSelect: () => setPayload({ ...payload, action_type: "account_review" }),
            value: "account_review",
            icon: <FileSearch size={16} className="shrink-0" />
        },
        {
            isSelected: payload.action_type == "training_session",
            label: "Session de formation",
            onSelect: () => setPayload({ ...payload, action_type: "training_session" }),
            value: "training_session",
            icon: <GraduationCap size={16} className="shrink-0" />
        },
        {
            isSelected: payload.action_type == "technical_intervention",
            label: "Intervention technique",
            onSelect: () => setPayload({ ...payload, action_type: "technical_intervention" }),
            value: "technical_intervention",
            icon: <Hammer size={16} className="shrink-0" />
        },
    ]

    const Priorities: SelectableChipProps[] = [
        {
            isSelected: payload.priority == "low",
            label: "Basse",
            onSelect: () => setPayload({ ...payload, priority: "low" }),
            value: "low",
        },
        {
            isSelected: payload.priority == "medium",
            label: "Moyenne",
            onSelect: () => setPayload({ ...payload, priority: "medium" }),
            value: "medium",
        },
        {
            isSelected: payload.priority == "high",
            label: "Haute",
            onSelect: () => setPayload({ ...payload, priority: "high" }),
            value: "high",
        },
        {
            isSelected: payload.priority == "urgent",
            label: "Urgente",
            onSelect: () => setPayload({ ...payload, priority: "urgent" }),
            value: "urgent",
        },
    ]

    const Statuses: SelectableChipProps[] = [
        {
            isSelected: payload.status == "todo",
            label: "À faire",
            onSelect: () => setPayload({ ...payload, status: "todo" }),
            value: "todo",
        },
        {
            isSelected: payload.status == "in_progress",
            label: "En cours",
            onSelect: () => setPayload({ ...payload, status: "in_progress" }),
            value: "in_progress",
        },
        {
            isSelected: payload.status == "done",
            label: "Réalisée",
            onSelect: () => setPayload({ ...payload, status: "done" }),
            value: "done",
        },
        {
            isSelected: payload.status == "canceled",
            label: "Annulée",
            onSelect: () => setPayload({ ...payload, status: "canceled" }),
            value: "canceled",
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
const toggleMulti = (current: string[] | undefined, value: string): string[] => {
    const list = current ?? []
    return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}