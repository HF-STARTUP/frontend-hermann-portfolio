"use client"

import { Button } from "@/components/ui/button"
import { Crumb } from "@/components/ui/custom/crumb"
import { Activity, Banknote, Calendar, ChevronLeft, CreditCard, Dot, Download, Mail, MapPin, MessageCircle, MoreVertical, Phone, Plus, ShieldAlert, Sparkles, TrendingUp, Truck, User, Zap, SearchX } from "lucide-react"
import { useClientDetailsHook } from "../hook/useClientDetailsHook"
import { cn } from "@/lib/utils"
import { getAvatarColor, getAvatarInitials } from "@/lib/initials.avatar.util"
import Image from "next/image"
import Badge from "@/components/display/Badge"
import { Doughnut, Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    ArcElement,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Filler,
    Tooltip,
} from "chart.js"
import { ResponsiveContainer } from "recharts"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { InterractionDetailsSheet } from "./_components/InterractionDetailsSheet"
import { useState } from "react"
import { AddActionFormSheet } from "../../_component/AddActionFormSheet"

ChartJS.register(ArcElement, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip)

// ─────────────────────────────────────────────
// Shimmers
// ─────────────────────────────────────────────

const ShimmerBlock = ({ className }: { className?: string }) => (
    <div className={cn("animate-pulse bg-muted-foreground/10 rounded-lg", className)} />
)

const HeaderShimmer = () => (
    <div className="py-4 flex items-start gap-4 w-full">
        <Button variant={"outline"} size={"icon"} href={"/app/at-risk-customers"}>
            <ChevronLeft />
        </Button>
        <div className="flex items-center gap-4 w-full">
            <ShimmerBlock className="size-16 rounded-xl shrink-0" />
            <div className="flex flex-col gap-2 h-16 justify-between py-1 w-full max-w-md">
                <ShimmerBlock className="h-6 w-3/4" />
                <ShimmerBlock className="h-4 w-1/2" />
            </div>
        </div>
    </div>
)

const RiskAnalysisShimmer = () => (
    <div className="rounded-2xl bg-white w-full p-4 border border-muted-foreground/20 shadow space-y-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center text-muted-foreground gap-3">
                <ShieldAlert />
                <p className="uppercase font-semibold text-lg">Analyse du risque</p>
            </div>
            <ShimmerBlock className="h-6 w-24 rounded-full" />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4 w-full">
            <ShimmerBlock className="w-32 h-[100px] shrink-0 rounded-xl" />
            <div className="flex-1 flex flex-col gap-2 w-full">
                <ShimmerBlock className="h-4 w-40" />
                <ShimmerBlock className="h-[70px] w-full rounded-xl" />
                <ShimmerBlock className="h-4 w-56" />
            </div>
        </div>
        <div className="flex flex-col gap-4">
            <h1 className="text-base uppercase font-semibold text-muted-foreground">
                Facteurs de risque
            </h1>
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <ShimmerBlock key={i} className="h-14 w-full rounded-xl" />
                ))}
            </div>
        </div>
    </div>
)

const RecommendationsShimmer = () => (
    <div className="rounded-2xl bg-white w-full p-4 border border-muted-foreground/20 shadow space-y-4">
        <div className="flex items-center justify-between">
            <div className="text-muted-foreground flex items-center gap-2">
                <Sparkles strokeWidth={1.5} />
                <p className="uppercase font-semibold text-lg">Recommandations</p>
            </div>
            <ShimmerBlock className="h-6 w-20 rounded-full" />
        </div>
        <div className="space-y-3">
            {[1, 2, 3].map((i) => (
                <ShimmerBlock key={i} className="h-16 w-full rounded-xl" />
            ))}
        </div>
    </div>
)

const ContactShimmer = () => (
    <div className="rounded-2xl bg-white w-full p-4 border border-muted-foreground/20 shadow space-y-8">
        <div className="text-muted-foreground flex items-center gap-2">
            <User strokeWidth={1.5} />
            <p className="uppercase font-semibold text-lg">Contact principal</p>
        </div>
        <div className="flex items-center gap-4">
            <ShimmerBlock className="size-14 rounded-full shrink-0" />
            <div className="flex flex-col gap-2">
                <ShimmerBlock className="h-5 w-36" />
                <ShimmerBlock className="h-3 w-24" />
            </div>
        </div>
        <ShimmerBlock className="h-5 w-full" />
        <ShimmerBlock className="h-5 w-full" />
        <div className="grid grid-cols-3 gap-2">
            <ShimmerBlock className="h-10 w-full rounded-xl" />
            <ShimmerBlock className="h-10 w-full rounded-xl" />
            <ShimmerBlock className="h-10 w-full rounded-xl" />
        </div>
    </div>
)

const FleetShimmer = () => (
    <div className="rounded-2xl bg-white w-full p-4 border border-muted-foreground/20 shadow space-y-6">
        <div className="text-muted-foreground flex items-center gap-2">
            <Truck strokeWidth={1.5} />
            <p className="uppercase font-semibold text-lg">Flotte</p>
        </div>
        <ShimmerBlock className="h-5 w-full" />
        <ShimmerBlock className="h-5 w-full" />
    </div>
)

const SubscriptionShimmer = () => (
    <div className="rounded-2xl bg-white w-full p-4 border border-muted-foreground/20 shadow space-y-6">
        <div className="text-muted-foreground flex items-center gap-2">
            <CreditCard strokeWidth={1.5} />
            <p className="uppercase font-semibold text-lg">Abonnement</p>
        </div>
        {[1, 2, 3, 4].map((i) => (
            <ShimmerBlock key={i} className="h-5 w-full" />
        ))}
    </div>
)

const TimelineShimmer = () => (
    <div className="px-6 py-4 space-y-5">
        {[1, 2, 3].map((i) => (
            <div key={i} className="pl-5 border-l-2 border-muted-foreground/30">
                <ShimmerBlock className="h-28 w-full rounded-2xl" />
            </div>
        ))}
    </div>
)

// ─────────────────────────────────────────────
// Empty state — client introuvable
// ─────────────────────────────────────────────

const ClientNotFound = () => (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <div className="rounded-full bg-muted-foreground/10 p-4 text-muted-foreground">
            <SearchX size={32} />
        </div>
        <div className="space-y-1">
            <p className="text-lg font-bold text-foreground">Client introuvable</p>
            <p className="text-sm text-muted-foreground max-w-sm">
                Ce client n'existe pas ou n'est plus disponible dans la liste des clients à risque.
            </p>
        </div>
        <Button variant={"mainBlue"} href="/app/at-risk-customers">
            <ChevronLeft size={16} className="mr-2" />
            Retour à la liste des clients
        </Button>
    </div>
)

export const ClientDetailsBody = ({ id }: { id: string }) => {
    const [selectedInteractionId, setSelectedInteractionId] = useState<string | null>(null)
    const [isActionOpen, setIsActionOpen] = useState(false)

    const {
        profile,
        isLoading,
        currentPage,
        interactions,
        isLoadingInteractions,
        totalPages,
        totalRecords,
        exportInteractions,
        isExporting
    } = useClientDetailsHook(id)

    const notFound = !isLoading && !profile

    const riskScore = profile?.riskScore ?? 0
    const sparkline = profile?.riskSparkline ?? []
    const gaugeColor = "#DC2626"

    const gaugeData = {
        labels: ["Score", "Reste"],
        datasets: [
            {
                data: [riskScore, Math.max(0, 100 - riskScore)],
                backgroundColor: [gaugeColor, "#E5E9F2"],
                borderWidth: 0,
                circumference: 180,
                rotation: 270,
            },
        ],
    }

    const trendData = {
        labels: sparkline.map((p) => p.date),
        datasets: [
            {
                data: sparkline.map((p) => p.score),
                borderColor: gaugeColor,
                backgroundColor: (ctx: any) => {
                    const chart = ctx.chart
                    const { ctx: canvasCtx, chartArea } = chart
                    if (!chartArea) return "transparent"
                    const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
                    gradient.addColorStop(0, `${gaugeColor}33`)
                    gradient.addColorStop(1, `${gaugeColor}00`)
                    return gradient
                },
                fill: true,
                tension: 0.35,
                pointRadius: 0,
                pointHoverRadius: 4,
                borderWidth: 2,
            },
        ],
    }

    if (notFound) {
        return (
            <div className="p-4 space-y-6">
                <Crumb items={[
                    { label: "Clients à risque", url: `at-risk-customers` },
                    { label: "Client introuvable", url: `at-risk-customers/${id}/details` }
                ]} />
                <ClientNotFound />
            </div>
        )
    }

    return (
        <div className="p-4 space-y-6">
            <AddActionFormSheet isOpenned={isActionOpen} onClose={() => setIsActionOpen(false)} />
            <Crumb items={[
                {
                    label: "Clients à risque",
                    url: `at-risk-customers`
                },
                {
                    label: `/${profile?.name ?? ""}`,
                    url: `at-risk-customers/${id}/details`
                }
            ]} />
            <div className="flex items-start justify-between flex-wrap">
                {isLoading ? (
                    <HeaderShimmer />
                ) : (
                    <div className="py-4 flex items-start gap-4">
                        <Button variant={"outline"} size={"icon"} href={"/app/at-risk-customers?at=list"}>
                            <ChevronLeft />
                        </Button>
                        <div className="flex items-center gap-4">
                            <div className={cn("rounded-xl overflow-hidden size-16 flex items-center justify-center shrink-0", !profile?.logo ? getAvatarColor(profile?.name) : "bg-foreground")}>
                                {
                                    profile?.logo
                                        ? <Image
                                            src={profile.logo}
                                            alt={profile.name}
                                            width={300}
                                            height={300}
                                            className="size-full object-cover"
                                        />
                                        : <span className="text-white text-2xl font-extrabold">
                                            {getAvatarInitials(profile?.name)}
                                        </span>
                                }
                            </div>
                            <div className="flex flex-col gap-1 h-16 min-h-fit items-start justify-between py-1">
                                <p className="text-xl font-extrabold text-foreground flex gap-2 items-center flex-wrap">
                                    {profile?.name}
                                    <Badge variant={profile?.riskLevelVariant} icon={<Dot size={16} className="max-w-fit" />}>
                                        {profile?.riskLevelLabel}
                                    </Badge>
                                    <Badge variant={profile?.riskLevelVariant} icon={<Banknote />}>
                                        {profile?.primaryAlertLabel}
                                    </Badge>
                                </p>
                                <p className="flex items-center text-sm font-medium text-muted-foreground gap-1">
                                    <MapPin size={12} />
                                    {profile?.locationLabel}
                                    <User size={12} className="ml-2" />
                                    {profile?.primaryContactFullName}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                <Button variant={"mainBlue"} onClick={() => setIsActionOpen(true)} className="ml-auto">
                    <Plus size={16} className="mr-3" /> Nouvelle action
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="w-full max-h-[calc(100dvh-325px)] overflow-y-auto custom-scrollbar space-y-6 p-1">
                    {isLoading ? (
                        <>
                            <RiskAnalysisShimmer />
                            <RecommendationsShimmer />
                            <ContactShimmer />
                            <FleetShimmer />
                            <SubscriptionShimmer />
                        </>
                    ) : (
                        <>
                            <div className="rounded-2xl bg-white w-full p-4 border border-muted-foreground/20 shadow space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-muted-foreground gap-3">
                                        <ShieldAlert />
                                        <p className="uppercase font-semibold text-lg">Analyse du risque</p>
                                    </div>
                                    <Badge variant={profile?.riskLevelVariant} icon={<Dot size={16} />} className="max-w-fit w-fit">
                                        {profile?.analysisRiskLevelLabel}
                                    </Badge>
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4 w-full min-w-0">
                                    <div className="w-32 shrink-0 relative h-[100px] flex items-end justify-center">
                                        <Doughnut
                                            data={gaugeData}
                                            options={{
                                                cutout: "85%",
                                                maintainAspectRatio: false,
                                                elements: {
                                                    arc: {
                                                        borderRadius: 10,
                                                    }
                                                },
                                                plugins: {
                                                    tooltip: { enabled: false },
                                                    legend: { display: false },
                                                },
                                            }}
                                        />
                                        <span className="absolute bottom-4 text-3xl font-bold" style={{ color: gaugeColor }}>
                                            {riskScore}
                                        </span>
                                    </div>

                                    <div className="flex-1 flex flex-col gap-2 w-full min-w-0">
                                        <span className="text-sm font-medium text-muted-foreground">
                                            Évolution sur 30 jours
                                        </span>
                                        <div className="w-full h-[70px] relative">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <Line
                                                    data={trendData}
                                                    options={{
                                                        responsive: true,
                                                        maintainAspectRatio: false,
                                                        plugins: {
                                                            legend: { display: false },
                                                            tooltip: {
                                                                displayColors: false,
                                                                callbacks: {
                                                                    label: (ctx: any) => `Score: ${ctx.parsed.y}`,
                                                                },
                                                            },
                                                        },
                                                        scales: {
                                                            x: { display: false },
                                                            y: { display: false },
                                                        },
                                                        elements: {
                                                            point: { hoverBackgroundColor: gaugeColor },
                                                        },
                                                    }}
                                                />
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-red-600 whitespace-nowrap">
                                            <TrendingUp className="size-4 shrink-0" />
                                            <span className="line-clamp-1 truncate text-muted-foreground" title={profile?.riskTrendLabel}>
                                                {profile?.riskTrendLabel}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <h1 className="text-base uppercase font-semibold text-muted-foreground">
                                        Facteurs de risque
                                    </h1>
                                    <div className="space-y-3">
                                        {
                                            profile?.riskFactors.map((rf) =>
                                                <div key={rf.label} className="rounded-xl p-3 border border-muted-foreground/20 shadow flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="rounded-lg border border-muted-foreground/20 shadow-1 p-1 size-8 flex items-center justify-center text-vaRed shrink-0">
                                                            <Banknote size={16} />
                                                        </div>
                                                        <span className="text-sm text-foreground line-clamp-1" title={rf.label}>
                                                            {rf.label}
                                                        </span>
                                                    </div>
                                                    <span className="font-semibold text-vaRed">
                                                        {rf.points}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl bg-white w-full p-4 border border-muted-foreground/20 shadow space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="text-muted-foreground flex items-center gap-2">
                                        <Sparkles strokeWidth={1.5} />
                                        <p className="uppercase font-semibold text-lg">Recommandations</p>
                                    </div>
                                    <Badge variant="blue">
                                        <Zap size={16} />
                                        Suggéré
                                    </Badge>
                                </div>
                                <div className="space-y-3">
                                    {
                                        profile?.recommendations.map((r) =>
                                            <div key={r.label} className="rounded-xl w-full p-4 border border-muted-foreground/20 shadow space-y-4 flex items-center justify-between gap-2">
                                                <div className="flex items-start space-x-4">
                                                    <Badge variant="blue" iconOnly>
                                                        <Banknote size={16} />
                                                    </Badge>
                                                    <div className="font-bold text-foreground">
                                                        <p>
                                                            {r.label}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button variant={"mainBlueOutline"} className="shrink-0">
                                                    {r.cta_label}
                                                </Button>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="rounded-2xl bg-white w-full p-4 border border-muted-foreground/20 shadow space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="text-muted-foreground flex items-center gap-2">
                                        <User strokeWidth={1.5} />
                                        <p className="uppercase font-semibold text-lg">Contact principal</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className={cn("rounded-full overflow-hidden size-14 flex items-center justify-center", getAvatarColor(profile?.primaryContactFullName))}>
                                        <span className="text-white font-extrabold text-lg">
                                            {getAvatarInitials(profile?.primaryContactFullName)}
                                        </span>
                                    </div>
                                    <p className="flex flex-col gap-1">
                                        <span className="text-foreground font-bold text-lg">
                                            {profile?.primaryContactFullName}
                                        </span>
                                        <span className="text-muted-foreground font-bold text-xs">
                                            {profile?.primaryContactRoleLabel}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex text-sm items-center justify-between">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Phone size={16} />
                                        Téléphone
                                    </div>
                                    <Link href={`tel:${profile?.primaryContactPhone}`} className="font-semibold hover:underline text-foreground transition-all duration-300">
                                        {profile?.primaryContactPhone}
                                    </Link>
                                </div>
                                <div className="flex text-sm items-center justify-between">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail size={16} />
                                        E-mail
                                    </div>
                                    <Link href={`mailto:${profile?.primaryContactEmail}`} target="_blank" className="font-semibold hover:underline text-foreground transition-all duration-300">
                                        {profile?.primaryContactEmail}
                                    </Link>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <Button variant={"outline"} href={`tel:${profile?.primaryContactPhone}`} className="border-foreground bg-transparent text-foreground">
                                        <Phone size={16} className="mr-2 shrink-0" />
                                        Appeler
                                    </Button>
                                    <Button variant={"outline"} href={`https://wa.me/${profile?.primaryContactPhone}`} className="border-foreground bg-transparent text-foreground">
                                        <MessageCircle size={16} className="mr-2 shrink-0" />
                                        WhatsApp
                                    </Button>
                                    <Button variant={"outline"} href={`mailto:${profile?.primaryContactEmail}`} className="border-foreground bg-transparent text-foreground">
                                        <Mail size={16} className="mr-2 shrink-0" />
                                        E-mail
                                    </Button>

                                </div>
                            </div>
                            <div className="rounded-2xl bg-white w-full p-4 border border-muted-foreground/20 shadow space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="text-muted-foreground flex items-center gap-2">
                                        <Truck strokeWidth={1.5} />
                                        <p className="uppercase font-semibold text-lg">
                                            Flotte
                                        </p>
                                    </div>
                                </div>
                                <div className="flex text-sm items-center justify-between">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        Véhicules
                                    </div>
                                    <p className="font-semibold hover:underline text-foreground transition-all duration-300">
                                        {profile?.vehicleCount}
                                    </p>
                                </div>
                                <div className="flex text-sm items-center justify-between">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        Palier
                                    </div>
                                    <p className="font-semibold flex flex-col items-end hover:underline text-foreground transition-all duration-300">
                                        <span> {profile?.fleetTierLabel}</span>
                                        <span className="font-normal text-muted-foreground text-xs">véhicule(s)</span>
                                    </p>
                                </div>
                            </div>
                            <div className="rounded-2xl bg-white w-full p-4 border border-muted-foreground/20 shadow space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="text-muted-foreground flex items-center gap-2">
                                        <CreditCard strokeWidth={1.5} />
                                        <p className="uppercase font-semibold text-lg">
                                            Abonnement
                                        </p>
                                    </div>
                                </div>
                                <div className="flex text-sm items-center justify-between">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        Forfait
                                    </div>
                                    <Badge variant="light-blue">
                                        {profile?.planName}
                                    </Badge>
                                </div>
                                <div className="flex text-sm items-center justify-between">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        Annuel
                                    </div>
                                    <p className="font-semibold hover:underline text-foreground transition-all duration-300">
                                        {profile?.annualAmount}
                                    </p>
                                </div>
                                <div className="flex text-sm items-center justify-between">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        Renouvellement
                                    </div>
                                    <p className="font-semibold hover:underline text-foreground transition-all duration-300">
                                        {profile?.renewalDate}
                                    </p>
                                </div>
                                <div className="flex text-sm items-center justify-between">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        Statut
                                    </div>
                                    <Badge type={profile?.subscriptionStatus}>

                                    </Badge>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="xl:col-span-2 rounded-2xl bg-white w-full border border-muted-foreground/20 shadow space-y-2 max-h-[calc(100dvh-325px)] overflow-y-auto custom-scrollbar pb-4">
                    <header className="sticky top-0 z-20 border-b p-4 flex items-center justify-between gap-8 bg-white/30 backdrop-blur-md">
                        <div className="flex items-center gap-4 text-foreground text-lg font-bold flex-wrap">
                            <Activity />
                            <h1>
                                Historique client
                            </h1>
                            <span className="text-sm text-muted-foreground font-normal">
                                {totalRecords} interaction(s)
                            </span>
                        </div>
                        <Button variant={"outline"} onClick={exportInteractions} loading={isExporting}>
                            <Download size={16} className="mr-3" />
                            Exporter
                        </Button>
                    </header>

                    {isLoadingInteractions ? (
                        <TimelineShimmer />
                    ) : interactions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center px-6">
                            <div className="rounded-full bg-muted-foreground/10 p-3 text-muted-foreground">
                                <Activity size={24} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-foreground">Aucune interaction pour le moment</p>
                                <p className="text-xs text-muted-foreground max-w-xs">
                                    L'historique de ce client apparaîtra ici dès qu'une action ou un événement sera enregistré.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <main className="px-6 py-4">
                            {
                                interactions.map((int) =>
                                    <div key={int.id} className="pl-5 pb-5 border-l-2 last:border-l-0 border-muted-foreground/50 relative cursor-pointer hover:scale-[.99] transition-all duration-300" onClick={() => { if (!int.isSystemGenerated) setSelectedInteractionId(int.id) }}>
                                        <div className="border p-4 rounded-2xl shadow bg-muted-foreground/10 backdrop-blur-lg flex flex-col space-y-4">
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="space-y-2">
                                                    <p className="font-bold text-base text-foreground">
                                                        {int.title}
                                                    </p>
                                                    {
                                                        (int.priority || int.status) && (
                                                            <div className="flex items-center gap-4">
                                                                <Badge variant={int.priorityBadgeVariant} icon={<int.priorityIcon />}>
                                                                    {int.priorityLabel}
                                                                </Badge>
                                                                <Badge variant={int.statusBadgeVariant} icon={<int.statusIcon />}>
                                                                    {int.statusLabel}
                                                                </Badge>
                                                            </div>
                                                        )
                                                    }
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <p className="text-xs text-muted-foreground">
                                                        {int.occurredAt}
                                                    </p>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <MoreVertical size={16} className="text-muted-foreground" />
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent className="rounded-2xl p-2">
                                                            <DropdownMenuItem
                                                                onClick={() => { if (!int.isSystemGenerated) setSelectedInteractionId(int.id) }}
                                                                className="rounded-xl text-muted-foreground cursor-pointer hover:bg-muted-foreground/10 hover:font-medium"
                                                            >
                                                                Voir les détails
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                            {int.hasNotes && <div className="w-full rounded-xl text-muted-foreground font-medium bg-vaBlue/10 p-2">
                                                {int.notes}
                                            </div>}

                                            {
                                                int.isSystemGenerated
                                                    ? <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="size-6 text-white rounded-full bg-foreground flex items-center justify-center">
                                                                S
                                                            </div>
                                                            <span className="text-muted-foreground">
                                                                Système
                                                            </span>
                                                        </div>
                                                    </div>
                                                    : int.assignee ? <div className="flex items-center gap-4 flex-wrap">
                                                        <div className="flex items-center gap-2">
                                                            <div className="size-6 text-white rounded-full bg-foreground flex items-center justify-center text-sm font-semibold">
                                                                {getAvatarInitials(int.assigneeFullName)}
                                                            </div>
                                                            <span className="text-muted-foreground">
                                                                {int.assigneeFullName}
                                                            </span>
                                                        </div>
                                                        {
                                                            int.occurredAt &&
                                                            <div className="text-muted-foreground text-sm flex space-x-2 items-center">
                                                                <Calendar size={16} />
                                                                <p>Echéance le {int.occurredAt}</p>
                                                            </div>
                                                        }
                                                    </div> :
                                                        ""
                                            }
                                        </div>
                                        <div className="absolute size-6 rounded-full border-2 bg-white z-10 border-vaBlue top-0 -left-3 text-vaBlue flex items-center justify-center">
                                            <int.categorieIcon size={14} />
                                        </div>
                                        <div className="absolute top-1 right-1">
                                            <Badge variant="light-blue">
                                                {int.categoryLabel}
                                            </Badge>
                                        </div>
                                    </div>
                                )
                            }
                        </main>
                    )}
                </div>
            </div>
            <InterractionDetailsSheet
                isOpenned={selectedInteractionId !== null}
                onClose={() => setSelectedInteractionId(null)}
                interactionId={selectedInteractionId ?? ""}
                parkId={id}
            />
        </div>

    )
}