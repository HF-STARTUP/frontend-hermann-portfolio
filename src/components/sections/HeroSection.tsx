"use client"

import { ArrowRight, ChevronDown, MapPin } from "lucide-react"
import { Button } from "../ui/button"
import { motion } from "framer-motion"
import { usePortfolioStore } from "@/stores/usePortfolioStore"

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
}

export const HeroSection = () => {
    const profile = usePortfolioStore((s) => s.siteContent.profile)
    const hero = usePortfolioStore((s) => s.siteContent.hero)

    const handleScrollDown = () => {
        window.scrollTo({
            top: window.innerHeight - 80,
            behavior: "smooth",
        })
    }

    return (
        <div className="relative w-full max-w-3xl px-4 sm:px-6 mx-auto flex items-start min-h-[calc(100dvh-80px)]">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col items-center justify-center gap-6 sm:gap-8 w-full"
            >
                <motion.div
                    variants={itemVariants}
                    className="rounded-full px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 border border-vaPrimary/40 bg-vaPrimary/20 backdrop-blur-md"
                >
                    <div className="rounded-full size-4 shrink-0 animate-pulse bg-vaSecondary/20 flex items-center justify-center">
                        <div className="rounded-full size-2 bg-vaSecondary flex items-center justify-center" />
                    </div>
                    <p className="text-sm sm:text-base text-foreground font-medium text-center">
                        {hero.availabilityBadge}
                    </p>
                </motion.div>

                <div className="flex flex-col items-center gap-3 sm:gap-4 w-full">
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl sm:text-6xl md:text-7xl text-foreground font-extrabold text-center"
                    >
                        {profile.firstName}{" "}
                        <span className="bg-gradient-to-r via-vaPrimary from-10% from-purple-500 via-50% to-vaPrimary to-90% bg-clip-text text-transparent">
                            {profile.lastName}
                        </span>
                    </motion.h1>
                    <motion.div variants={itemVariants} className="w-full px-2">
                        <p className="text-vaTextPrimary font-semibold text-center w-full text-base sm:text-xl md:text-2xl leading-snug">
                            {profile.roleLine}{" "}
                            <span className="hidden sm:inline">| </span>
                            <br className="sm:hidden" />
                            <span className="text-muted-foreground font-extrabold">
                                {profile.techLine}
                            </span>
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-2 sm:gap-4"
                >
                    <MapPin className="text-vaPrimary shrink-0" size={20} />
                    <p className="text-vaTextPrimary text-sm sm:text-base text-center">
                        {profile.location}
                    </p>
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    className="text-vaTextPrimary text-center text-sm sm:text-base w-full max-w-2xl mx-auto"
                >
                    {hero.description}
                </motion.p>

                <motion.div variants={itemVariants}>
                    <Button
                        href="/projects"
                        rightIcon={
                            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        }
                        className="group bg-gradient-to-r from-vaSecondary from-30% to-vaPrimary to-70% shadow-lg shadow-vaSecondary/30 transition-all duration-300 hover:shadow-xl hover:shadow-vaPrimary/50 hover:-translate-y-0.5"
                    >
                        {hero.ctaLabel}
                    </Button>
                </motion.div>

                {/* Statistiques éditables via /admin/content */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-2 sm:flex mt-4 sm:mt-8 items-center gap-6 sm:gap-8 justify-between w-full"
                >
                    {hero.stats.map((stat) => (
                        <div
                            key={stat.id}
                            className="flex flex-col items-center justify-center"
                        >
                            <p className="text-2xl sm:text-3xl md:text-4xl text-vaPrimary font-bold">
                                {stat.value}
                            </p>
                            <span className="text-vaTextPrimary text-xs sm:text-sm text-center">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            <motion.button
                type="button"
                onClick={handleScrollDown}
                aria-label="Défiler vers le bas"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-vaTextPrimary hover:text-vaPrimary transition-colors duration-300"
            >
                <span className="text-xs sm:text-sm">{hero.scrollHint}</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <ChevronDown size={20} />
                </motion.div>
            </motion.button>
        </div>
    )
}