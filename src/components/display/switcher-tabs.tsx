import { LucideIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { ReactNode } from "react"
import { motion } from "framer-motion"

interface SwitcherTabsProps {
    tabs: {
        label: string,
        value: string,
        icon: LucideIcon,
        content: ReactNode
    }[]
    onSelect: (value: string) => void // On le passe en requis puisque ton composant est contrôlé
    value: string
}

export const SwitcherTabs = ({ onSelect, tabs, value }: SwitcherTabsProps) => {
    return (
        <Tabs
            value={value}
            onValueChange={onSelect}
            className="w-full"
        >
            <TabsList className="w-fit border justify-start bg-muted-foreground/10 relative rounded-2xl overflow-x-auto custom-scrollbar p-1">
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive = value === tab.value // Basé sur la prop du parent maintenant

                    return (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="relative z-10 data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:rounded-xl rounded-xl text-muted-foreground"
                        >
                            <div className="flex items-center gap-2 z-20">
                                {Icon && <Icon className="w-4 h-4" />}
                                <span>{tab.label}</span>
                            </div>

                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-background rounded-xl shadow-sm z-0"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </TabsTrigger>
                    )
                })}
            </TabsList>

            <div className="mt-4 overflow-hidden">
                {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} forceMount>
                        {value === tab.value && ( // Basé sur la prop du parent aussi
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                                {tab.content}
                            </motion.div>
                        )}
                    </TabsContent>
                ))}
            </div>
        </Tabs>
    )
}