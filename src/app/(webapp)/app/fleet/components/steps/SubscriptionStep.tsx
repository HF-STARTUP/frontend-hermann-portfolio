import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { usGetSubscriptionPacks } from "@/hooks/subscription/useSubscription";
import { SubscriptionModel } from "@/model/subscription/Subscription";
import { FleetRegisterFormData } from "@/types/admin/fleet.type";
import { GetSubscriptionPlansParams } from "@/types/subscription.types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyData } from "@/components/box/PageNetworkState";

interface SubscriptionStepProps {
    formData: FleetRegisterFormData;
    updateField: (field: keyof FleetRegisterFormData, value: any) => void;
    selectedCountry?: string;
}

export default function SubscriptionStep({ formData, updateField, selectedCountry }: SubscriptionStepProps) {

    const [params, setParams] = useState<GetSubscriptionPlansParams>({
        country_code: selectedCountry || "",
        account_type: formData.owner_type as "particulier" | "professionnel" | undefined,
        period: "monthly"
    });

    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(formData.subscription_id || null);

    const { isLoading, data: subscriptionsPacks } = usGetSubscriptionPacks(params);

    const handlePeriodChange = (period: string) => {
        setParams(prev => ({ ...prev, period: period as "monthly" | "quarterly" | "yearly" }));
        setSelectedPlanId(null);
        updateField("subscription_id", null);
    };

    const handlePlanSelect = (planId: string) => {
        setSelectedPlanId(planId);
        updateField("subscription_id", planId);
    };

    const renderPlanCard = (plan: SubscriptionModel) => {
        const isSelected = selectedPlanId === plan.id;
        return (
            <Card
                key={plan.id}
                className={`cursor-pointer p-4 border-2 transition-all rounded-2xl ${isSelected ? "border-vaBlue bg-blue-50" : "border-gray-200"}`}
                onClick={() => handlePlanSelect(plan.id)}
            >
                <div className="flex items-start gap-4">
                    <Checkbox checked={isSelected} className="mt-1" />
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{plan.name}</h4>
                                {plan.isPremium && (
                                    <Badge className="bg-vaBlue">Premium</Badge>
                                )}
                                {plan.hasDiscount && (
                                    <Badge className="bg-green-500">
                                        -{plan.discountPercentage}%
                                    </Badge>
                                )}
                            </div>
                            <div className="text-right">
                                <span className="text-lg font-bold text-vaBlue">
                                    {plan.formattedPrice}
                                </span>
                                {plan.hasDiscount && (
                                    <span className="text-sm text-gray-400 line-through ml-2">
                                        {plan.formattedCrossedOutPrice}
                                    </span>
                                )}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                            <span>{plan.vehicleNumber} véhicules</span>
                            <span>{plan.driverNumber} chauffeurs</span>
                            {plan.hasFeature('gps') && <span className="text-green-600">GPS inclus</span>}
                        </div>
                    </div>
                </div>
            </Card>
        );
    };

    return (
        <div className="flex flex-col gap-4">
            <label className="text-sm font-medium">
                Plan d'abonnement <span className="text-vaRed">*</span>
            </label>

            <Tabs
                value={params.period}
                onValueChange={handlePeriodChange}
                className="w-full"
            >
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="monthly">Mensuel</TabsTrigger>
                    <TabsTrigger value="quarterly">Trimestriel</TabsTrigger>
                    <TabsTrigger value="yearly">Annuel</TabsTrigger>
                </TabsList>
            </Tabs>

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vaBlue"></div>
                </div>
            ) : !subscriptionsPacks || subscriptionsPacks.length === 0 ? (
                <div className="mt-4">
                    <EmptyData message="Aucun plan disponible pour cette période" />
                </div>
            ) : (
                <div className="space-y-3 mt-3">
                    {subscriptionsPacks.map(renderPlanCard)}
                </div>
            )}
        </div>
    );
}