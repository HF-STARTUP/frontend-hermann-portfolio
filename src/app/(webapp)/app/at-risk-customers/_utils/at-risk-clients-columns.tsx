import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, Phone, CalendarClock, Trash2, MapPin, Clock } from "lucide-react";
import Badge from "@/components/display/Badge";
import {
    Column,
    DataTableRef,
    ExportConfig,
    ExportFormat,
    GroupConfig,
    RowAction,
    SelectionConfig,
} from "@/components/display/CustomTableDisplay";
import { useARCHook } from "../_hook/useARCHook";
import ARCClientDetailModel from "@/model/at-risk-customers/ARCClientDetailModel";
import { cn } from "@/lib/utils";
import { getAvatarColor, getAvatarInitials } from "@/lib/initials.avatar.util";
import { PackageType } from "../../subscriptions/_hooks/usePackageList";
import { Cell, PieChart, ResponsiveContainer, Pie } from "recharts";
import { Button } from "@/components/ui/button";
import { toIsoDate } from "@/services/Service";
import { ARCGroupBy } from "@/types/at-risk-customers.type";

export const useARCClientsColumns = () => {
    const router = useRouter();
    const [selectedClients, setSelectedClients] = useState<string[]>([]);
    const tableRef = useRef<DataTableRef>(null);

    const [isActionFormVisible, setIsActionFormVisible] = useState(false);
    const [selectedParkId, setSelectedParkId] = useState<string>();
    const [initTab, setInitTab] = useState<'interaction' | 'retarget'>("interaction");

    const {
        clients,
        currentPage,
        isLoadingCustomers,
        totalPages,
        totalRecords,
        filteredCountLabel,
        setParams,
        params,
    } = useARCHook();

    const handleContact = (parkId: string) => {
        setSelectedParkId(parkId)
        setInitTab("interaction")
        setIsActionFormVisible(true)
    }

    const handleScheduleFollowUp = (parkId: string) => {
        setSelectedParkId(parkId)
        setInitTab("retarget")
        setIsActionFormVisible(true)
    }

    const columns: Column<ARCClientDetailModel>[] = [
        {
            header: "Client",
            accessor: (client) => (
                <div className="flex items-center gap-3">
                    <div className={cn("relative size-10 rounded-xl overflow-hidden shrink-0 flex items-center justify-center", client.logo ? "bg-muted" : getAvatarColor(client.name))}>
                        {client.logo ? (
                            <Image
                                src={client.logo}
                                alt={client.name}
                                fill
                                sizes="32px"
                                className="object-cover size-full"
                            />
                        ) : (
                            <div className="text-white font-bold text-base">
                                {getAvatarInitials(client.name)}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-foreground font-semibold">{client.name}</span>
                        <span className="flex items-center gap-2 text-xs"> <MapPin size={14} /> {client.city} </span>
                    </div>
                </div>
            ),
            exportValue: (client) => `${client.name} (${client.city})`,
            sortKey: "name",
            minWidth: "220px",
        },
        {
            header: "Flotte",
            accessor: (client) => <div className="flex items-center gap-1 text-sm font-bold text-foreground">
                {client.vehicleCount}
                <span className="font-normal text-xs text-muted-foreground">
                    véh.
                </span>
            </div>,
            exportValue: (client) => `${client.vehicleCount} véh.`,
            sortKey: "vehicleCount",
            width: "100px",
            className: "text-center",
        },
        {
            header: "Abonnement",
            accessor: (client) => <div className="">
                {client.planName
                    ? <div className="">
                        <Badge type={client.planName as PackageType} />
                        {client.renewalLabel && <p className={cn("text-xs flex items-center gap-2 mt-1 text-muted-foreground", client.renewalLabel.toLowerCase().includes("expiré") ? "text-vaRed" : "")}>
                            <Clock size={16} />
                            <span>
                                {client.renewalLabel}
                            </span>
                        </p>}
                    </div>
                    : "---"}
            </div>,
            exportValue: (client) =>
                client.planName
                    ? `${client.planName}${client.expiredDaysAgo ? ` (expiré depuis ${client.expiredDaysAgo}j)` : ""}`
                    : "---",
            sortKey: "planName",
            width: "120px",
        },
        {
            header: "Statut",
            accessor: (client) =>
                client.subscriptionStatus ?
                    <Badge type={client.subscriptionStatus} />
                    : "---"
            ,
            exportValue: (client) => client.subscriptionStatus ?? "---",
            sortKey: "subscriptionStatus",
            width: "120px",
        },
        {
            header: "Score de risque",
            accessor: (client) => {
                const score = client.riskScore ?? 0;
                const remainder = Math.max(0, 100 - score);
                const data = [
                    { name: "Risk", value: score },
                    { name: "Remainder", value: remainder },
                ];

                return (
                    <div className="flex items-center gap-3">
                        <div className="relative size-16 flex items-center justify-center shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={"65%"}
                                        outerRadius={"95%"}
                                        paddingAngle={0}
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={-270}
                                    >
                                        <Cell fill={client.riskLevelHexColor} />
                                        <Cell fill="var(--muted-foreground, #e2e8f0)" opacity={0.2} />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <span className={cn("absolute text-sm font-bold bg-transparent", client.riskLevelClassName)}>
                                {score}
                            </span>
                        </div>
                    </div>
                );
            },
            exportValue: (client) => `${client.riskScore ?? 0}`,
            sortKey: "riskScore",
            width: "160px",
        },
        {
            header: "Problème principal",
            accessor: (client) => (
                <p className="max-w-36 line-clamp-2 whitespace-normal" title={client.mainProblem}>
                    {client.mainProblem}
                </p>
            ),
            exportValue: (client) => client.mainProblem,
            sortKey: "mainProblem",
            minWidth: "120px",
        },
        {
            header: "Besoin client",
            accessor: (client) => <Button variant="outline" className="rounded-full text-xs p-2 py-1 h-fit">
                {client.clientNeedLabel}
            </Button>,
            exportValue: (client) => client.clientNeedLabel,
            sortKey: "clientNeed",
            minWidth: "180px",
        },
        {
            header: "Dernière activité",
            accessor: (client) => client.lastActivityAt,
            exportValue: (client) => client.lastActivityAt,
            sortKey: "lastActivityAt",
            minWidth: "150px",
        },
        {
            header: "Dernier contact",
            accessor: (client) => client.lastContactAt,
            exportValue: (client) => client.lastContactAt,
            sortKey: "lastContactAt",
            minWidth: "150px",
        },
        {
            header: "Prochaine action",
            accessor: (client) => client.nextAction?.display_label ?? "---",
            exportValue: (client) => client.nextAction?.display_label ?? "---",
            sortKey: "renewalInDays",
            minWidth: "150px",
        }
    ];

    const GROUP_KEY_MAP: Record<ARCGroupBy, keyof ARCClientDetailModel | null> = {
        [ARCGroupBy.NONE]: null,
        [ARCGroupBy.RISK_LEVEL]: "riskLevelLabel",
        [ARCGroupBy.RISK_CAUSE]: "alertLabel",
        [ARCGroupBy.CLIENT_NEED]: "clientNeedLabel",
        [ARCGroupBy.ACCOUNT_MANAGER]: "accountManagerId",
    };

    const groupConfig: GroupConfig<ARCClientDetailModel> | undefined = (() => {
        const groupKey = GROUP_KEY_MAP[params.group_by as ARCGroupBy];
        if (!groupKey) return undefined;

        return {
            groupKey,
            groupLabel: (value, items) => `${value ?? "Non renseigné"} — ${items.length} client(s)`,
            defaultExpanded: true,
        };
    })();

    const rowActions = (client: ARCClientDetailModel): RowAction<ARCClientDetailModel>[] => [
        {
            id: "contact",
            label: "Contacter",
            icon: <Phone className="size-4" />,
            onClick: () => handleContact(client.parkId),
        },
        {
            id: "schedule",
            label: "Planifier une relance",
            icon: <CalendarClock className="size-4" />,
            onClick: () => handleScheduleFollowUp(client.parkId),
        },
    ];

    const selection: SelectionConfig = {
        selectedItems: selectedClients,
        onSelectionChange: setSelectedClients,
        selectionKey: "parkId",
    };

    const exportConfig: ExportConfig<ARCClientDetailModel> = {
        hideTrigger: true,
        fileName: "clients_a_risque_vtcc_" + toIsoDate(new Date())
    };

    return {
        clients,
        columns,
        rowActions,
        selection,
        exportConfig,
        selectedClients,
        pagination: {
            currentPage: currentPage ?? 1,
            totalPages: totalPages ?? 1,
            totalEntries: totalRecords ?? 0,
            pageSize: params.itemPerPage ?? 20,
            onPageChange: (p: number) => setParams({ ...params, page: p }),
            onPageSizeChange: (p: number) => setParams({ ...params, itemPerPage: p }),
        },
        isLoadingCustomers,
        filteredCountLabel,
        tableRef,
        params,
        setParams,
        groupConfig,
        isActionFormVisible,
        setIsActionFormVisible,
        selectedParkId,
        initTab,
    };
};