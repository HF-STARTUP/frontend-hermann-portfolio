"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Award, Briefcase, Download, GraduationCap, MapPin } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { getIconFromPreset } from "@/components/admin/iconPreset";

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
};

const formatDate = (value: string) => {
    const [year, month] = value.split("-");
    const monthLabels = [
        "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
        "Juil", "Août", "Sep", "Oct", "Nov", "Déc",
    ];
    return `${monthLabels[Number(month) - 1] ?? ""} ${year}`;
};

const TimelineItem: React.FC<{
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    period: string;
    description?: string;
    isLast?: boolean;
}> = ({ icon, title, subtitle, period, description, isLast }) => (
    <motion.div
        variants={itemVariants}
        className="relative flex gap-5 pb-10 last:pb-0"
    >
        {/* Ligne verticale */}
        {!isLast && (
            <div className="absolute left-6 top-14 h-[calc(100%-3rem)] w-px bg-vaPrimary/25" />
        )}

        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-vaPrimary/20 bg-vaPrimary/10 text-vaPrimary">
            {icon}
        </div>

        <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-vaPrimary">
                {period}
            </span>
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
            <p className="text-sm font-medium text-muted-foreground">{subtitle}</p>
            {description && (
                <p className="mt-1 text-sm leading-relaxed text-vaTextPrimary">
                    {description}
                </p>
            )}
        </div>
    </motion.div>
);

const AboutContent = () => {
    const aboutPage = usePortfolioStore((s) => s.siteContent.pages.about);
    const profile = usePortfolioStore((s) => s.siteContent.profile);
    const skills = usePortfolioStore((s) => s.siteContent.skills);
    const experiences = usePortfolioStore((s) => s.experiences);
    const education = usePortfolioStore((s) => s.education);
    const certifications = usePortfolioStore((s) => s.certifications);

    return (
        <div className="pb-10">
            {/* En-tête éditable via /admin/content > À propos */}
            <PageHeader
                badge={aboutPage.badge}
                title={
                    <>
                        {aboutPage.titlePrefix}{" "}
                        <span className="bg-gradient-to-br from-purple-500 via-vaPrimary to-purple-400 bg-clip-text text-transparent">
                            {aboutPage.titleHighlight}
                        </span>
                    </>
                }
                description={aboutPage.description}
                breadcrumb={[{ label: "A propos" }]}
            />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-4">
                {/* Bio */}
                <motion.section
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3"
                >
                    <div className="flex justify-center lg:justify-start">
                        {aboutPage.photoDesktopUrl ? (
                            <picture>
                                <source
                                    media="(min-width: 1024px)"
                                    srcSet={aboutPage.photoDesktopUrl}
                                />
                                <source
                                    media="(max-width: 1023px)"
                                    srcSet={
                                        aboutPage.photoMobileUrl ||
                                        aboutPage.photoDesktopUrl
                                    }
                                />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={aboutPage.photoDesktopUrl}
                                    alt={profile.fullName}
                                    className="size-48 rounded-3xl object-cover shadow-xl sm:size-56 lg:size-64 lg:rounded-[2rem]"
                                />
                            </picture>
                        ) : (
                            <div className="relative flex size-48 items-center justify-center rounded-3xl border border-vaPrimary/30 bg-gradient-to-br from-vaSecondary/30 to-vaPrimary/30 text-6xl font-extrabold text-white backdrop-blur-md sm:size-56">
                                {profile.logoInitials}
                            </div>
                        )}
                    </div>
                    {/* Bio éditable via /admin/content > À propos */}
                    <div className="flex flex-col gap-4 lg:col-span-2">
                        <h2 className="text-2xl font-bold text-foreground">
                            {aboutPage.bioTitle}
                        </h2>
                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin size={16} className="text-vaPrimary" />
                            {profile.location.replace(/^Résident à /, "")}
                        </p>
                        {aboutPage.bioParagraphs.map((paragraph, index) => (
                            <p
                                key={index}
                                className="leading-relaxed text-vaTextPrimary"
                            >
                                {paragraph}
                            </p>
                        ))}
                        <div className="flex flex-wrap gap-3 pt-2">
                            {/* CV éditable via /admin/content > Profil */}
                            <Button
                                leftIcon={<Download size={16} />}
                                variant="outline"
                                title={aboutPage.cvCtaLabel}
                                onClick={() => {
                                    if (profile.cvUrl) {
                                        window.open(profile.cvUrl, "_blank", "noopener,noreferrer");
                                    }
                                }}
                            >
                                {aboutPage.cvCtaLabel}
                            </Button>
                            <Button
                                href="/#contact"
                                rightIcon={
                                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                                }
                                className="group bg-gradient-to-r from-vaSecondary from-30% to-vaPrimary to-70%"
                            >
                                {aboutPage.contactCtaLabel}
                            </Button>
                        </div>
                    </div>
                </motion.section>

                {/* Parcours */}
                <section className="grid grid-cols-1 gap-14 lg:grid-cols-2">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {/* Parcours (store) */}
                        <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold text-foreground">
                            <Briefcase className="text-vaPrimary" size={24} />
                            {aboutPage.experienceTitle}
                        </h2>
                        <div className="flex flex-col">
                            {experiences.map((experience, index) => (
                                <TimelineItem
                                    key={experience.id}
                                    icon={<Briefcase size={20} />}
                                    title={experience.position}
                                    subtitle={`${experience.company}${experience.location ? ` · ${experience.location}` : ""}`}
                                    period={`${formatDate(experience.startDate)} — ${experience.endDate ? formatDate(experience.endDate) : "Aujourd'hui"}`}
                                    description={experience.description}
                                    isLast={index === experiences.length - 1}
                                />
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold text-foreground">
                            <GraduationCap className="text-vaPrimary" size={24} />
                            {aboutPage.educationTitle}
                        </h2>
                        <div className="flex flex-col">
                            {education.map((item, index) => (
                                <TimelineItem
                                    key={item.id}
                                    icon={<GraduationCap size={20} />}
                                    title={item.degree}
                                    subtitle={item.school}
                                    period={`${formatDate(item.startDate)} — ${item.endDate ? formatDate(item.endDate) : "Aujourd'hui"}`}
                                    description={item.description}
                                    isLast={index === education.length - 1}
                                />
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Certifications */}
                <motion.section
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="flex flex-col gap-8"
                >
                    <h2 className="text-center text-3xl font-extrabold text-foreground md:text-4xl">
                        {aboutPage.certificationTitle}
                    </h2>
                    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {certifications.map((cert) => (
                            <motion.div
                                key={cert.id}
                                variants={itemVariants}
                                whileHover={{ y: -4 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 250,
                                    damping: 18,
                                }}
                                className="rounded-2xl border border-vaPrimary/20 bg-vaSecondary/10 p-6 backdrop-blur-md transition-colors duration-300 hover:border-vaPrimary/40"
                            >
                                <div className="flex items-start gap-4">
                                    {cert.imageUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={cert.imageUrl}
                                            alt={cert.name}
                                            className="size-12 shrink-0 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-vaPrimary/20 bg-vaPrimary/10 text-vaPrimary">
                                            <Award size={24} />
                                        </div>
                                    )}
                                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                                        <h3 className="font-bold text-foreground">
                                            {cert.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {cert.issuer}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {cert.dateObtained
                                                ? new Date(
                                                        cert.dateObtained,
                                                    ).toLocaleDateString("fr-FR", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })
                                                : ""}
                                        </p>
                                        {cert.description && (
                                            <p className="mt-1 text-sm leading-relaxed text-vaTextPrimary line-clamp-2">
                                                {cert.description}
                                            </p>
                                        )}
                                        {cert.url && (
                                            <a
                                                href={cert.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-2 text-xs font-medium text-vaPrimary hover:underline"
                                            >
                                                Vérifier la certification
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Compétences détaillées */}
                <motion.section
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.05 }}
                    className="flex flex-col gap-8"
                >
                    {/* Compétences éditables via /admin/content > Accueil */}
                    <h2 className="text-center text-3xl font-extrabold text-foreground md:text-4xl">
                        {aboutPage.skillsTitlePrefix}{" "}
                        <span className="bg-gradient-to-br from-purple-500 via-vaPrimary to-purple-400 bg-clip-text text-transparent">
                            {aboutPage.skillsTitleHighlight}
                        </span>
                    </h2>
                    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {skills.map((skill) => {
                            const Icon = getIconFromPreset(skill.iconName);
                            return (
                                <motion.div
                                    key={skill.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -6 }}
                                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                                    className="rounded-2xl border border-vaPrimary/20 bg-vaSecondary/10 p-6 backdrop-blur-md transition-colors duration-300 hover:border-vaPrimary/40"
                                >
                                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-vaPrimary/20 bg-vaPrimary/10 text-vaPrimary">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="mb-3 text-lg font-bold text-foreground">
                                        {skill.name}
                                    </h3>
                                    <ul className="flex flex-wrap gap-2">
                                        {skill.features.slice(0, 6).map((feature) => (
                                            <li
                                                key={feature}
                                                className="rounded-full border border-vaPrimary/20 bg-background/40 px-3 py-1 text-xs text-muted-foreground"
                                            >
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default AboutContent;
