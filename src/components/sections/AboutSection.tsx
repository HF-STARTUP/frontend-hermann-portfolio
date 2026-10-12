"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { getIconFromPreset } from "@/components/admin/iconPreset";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export const AboutSection = () => {
    const aboutSection = usePortfolioStore(
        (s) => s.siteContent.homeSections.about
    );
    const skills = usePortfolioStore((s) => s.siteContent.skills);

    return (
        <section className="min-h-screen flex items-center py-20 px-4">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-full border border-vaPrimary/60 bg-vaPrimary/15 px-5 py-2 text-foreground backdrop-blur-md"
                >
                    {aboutSection.badge}
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl text-center text-4xl font-extrabold text-foreground md:text-5xl xl:text-6xl"
                >
                    {aboutSection.titlePrefix}{" "}
                    <span className="bg-gradient-to-br from-purple-500 via-vaPrimary to-purple-400 bg-clip-text text-transparent">
                        {aboutSection.titleHighlight}
                    </span>{" "}
                    {aboutSection.titleSuffix}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    className="max-w-4xl text-center text-lg leading-8 text-vaTextPrimary"
                >
                    {aboutSection.subtitle}
                </motion.p>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    className="grid w-full grid-cols-1 gap-6 rounded-3xl border border-vaPrimary/20 bg-vaSecondary/15 p-12 backdrop-blur-md sm:grid-cols-2 xl:grid-cols-4 justify-center"
                >
                    {skills.map((skill) => {
                        const Icon = getIconFromPreset(skill.iconName);

                        return (
                            <motion.div
                                key={skill.id}
                                variants={itemVariants}
                                whileHover={{
                                    y: -8,
                                    scale: 1.02,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 250,
                                    damping: 18,
                                }}
                                className="group relative overflow-hidden rounded-2xl border border-vaPrimary/10 bg-vaSecondary/10 p-6 transition-colors hover:border-vaPrimary/40"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-vaPrimary/5 via-transparent to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                <motion.div
                                    whileHover={{ rotate: 10, scale: 1.15 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 350,
                                    }}
                                    className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-vaPrimary/20 bg-vaPrimary/10 text-vaPrimary"
                                >
                                    <Icon size={28} />
                                </motion.div>

                                <h3 className="relative mb-5 text-xl font-bold text-foreground">
                                    {skill.name}
                                </h3>

                                <ul className="relative space-y-3">
                                    {skill.features.map((feature, index) => (
                                        <motion.li
                                            key={feature}
                                            initial={{ opacity: 0, x: -15 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                delay: index * 0.05,
                                                duration: 0.35,
                                            }}
                                            className="flex items-center gap-3 text-sm text-vaTextPrimary"
                                        >
                                            <span className="h-2 w-2 rounded-full bg-vaPrimary" />
                                            {feature}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                    <div className="sm:col-span-2 xl:col-span-4 border-t pt-12 border-vaPrimary/20 flex items-center justify-center">
                        <Button
                            href="/about"
                            rightIcon={
                                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                            }
                            className="group bg-gradient-to-r from-vaSecondary/10 from-30% to-vaPrimary/10 to-70% shadow-lg shadow-vaSecondary/10 transition-all border duration-300 hover:shadow-xl hover:shadow-vaPrimary/50 hover:-translate-y-0.5 border-vaPrimary/50"
                        >
                            {aboutSection.ctaLabel}
                        </Button>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};