"use client";

import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Loader2, Mail, MapPin, Send } from "lucide-react";
import { contactSchema, type ContactInputs } from "@/schema/contact.schema";
import { useSendContact } from "@/hooks/portfolio/usePortfolioAuthContact";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { getIconFromPreset } from "@/components/admin/iconPreset";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
    },
};

const ContactInfoItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}> = ({ icon, label, value }) => (
    <div className="flex items-center gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-vaPrimary/20 bg-vaPrimary/10 text-vaPrimary">
            {icon}
        </div>
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-medium text-foreground">{value}</p>
        </div>
    </div>
);

export const ContactSection = () => {
    const { toast } = useToast();
    const heading = usePortfolioStore(
        (state) => state.siteContent.homeSections.contact
    );
    const profile = usePortfolioStore((state) => state.siteContent.profile);
    const socialLinks = usePortfolioStore((state) => state.socialLinks);
    /* Route #12 — POST /contact ; erreurs toastées par le provider */
    const { sendContact, loading: isSubmitting } = useSendContact();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactInputs>({
        resolver: joiResolver(contactSchema),
        defaultValues: { name: "", email: "", subject: "", message: "" },
    });

    const onSubmit = async (data: ContactInputs) => {
        try {
            await sendContact({
                name: data.name,
                email: data.email,
                subject: data.subject,
                message: data.message,
            });
            reset();
            toast({
                title: "Message envoyé !",
                description:
                    "Merci pour votre message, je vous répondrai dans les plus brefs délais.",
            });
        } catch {
            /* erreur déjà toastée par le provider ; le formulaire est conservé */
        }
    };

    return (
        <section id="contact" className="flex items-center px-4 py-20">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
                {/* En-tête */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto rounded-full border border-vaPrimary/60 bg-vaPrimary/15 px-5 py-2 text-foreground backdrop-blur-md"
                >
                    {heading.badge}
                </motion.div>

                <div className="flex flex-col gap-3 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center text-4xl font-extrabold text-foreground md:text-5xl"
                    >
                        {heading.titlePrefix}{" "}
                        <span className="bg-gradient-to-br from-purple-500 via-vaPrimary to-purple-400 bg-clip-text text-transparent">
                            {heading.titleHighlight}
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="mx-auto max-w-2xl text-center text-lg text-vaTextPrimary"
                    >
                        {heading.subtitle}
                    </motion.p>
                </div>

                <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-5">
                    {/* Coordonnées */}
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="flex flex-col justify-center gap-6 rounded-3xl border border-vaPrimary/20 bg-vaSecondary/10 p-8 backdrop-blur-md lg:col-span-2"
                    >
                        <h3 className="text-xl font-bold text-foreground">
                            {heading.sideTitle}
                        </h3>
                        <p className="text-sm leading-relaxed text-vaTextPrimary">
                            {heading.sideDescription}
                        </p>

                        <div className="flex flex-col gap-5">
                            <ContactInfoItem
                                icon={<Mail size={20} />}
                                label="Email"
                                value={profile.email}
                            />
                            <ContactInfoItem
                                icon={<MapPin size={20} />}
                                label="Localisation"
                                value={
                                    profile.location.replace(/^Résident à /, "")
                                }
                            />
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            {socialLinks.map(({ id, label, url, iconName }) => {
                                const Icon = getIconFromPreset(iconName);
                                return (
                                    <a
                                        key={id}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        title={label}
                                        className="flex size-10 items-center justify-center rounded-xl border border-vaPrimary/20 bg-background/40 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-vaPrimary/50 hover:text-vaPrimary"
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Formulaire */}
                    <motion.form
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={itemVariants}
                        className="flex flex-col gap-5 rounded-3xl border border-vaPrimary/20 bg-vaSecondary/10 p-8 backdrop-blur-md lg:col-span-3"
                    >
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="name"
                                    className="text-sm font-medium text-foreground"
                                >
                                    Nom complet
                                </label>
                                <Input
                                    id="name"
                                    placeholder="Votre nom"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className="text-xs text-destructive">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium text-foreground"
                                >
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="vous@exemple.com"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-xs text-destructive">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="subject"
                                className="text-sm font-medium text-foreground"
                            >
                                Sujet
                            </label>
                            <Input
                                id="subject"
                                placeholder="De quoi souhaitez-vous parler ?"
                                {...register("subject")}
                            />
                            {errors.subject && (
                                <p className="text-xs text-destructive">
                                    {errors.subject.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="message"
                                className="text-sm font-medium text-foreground"
                            >
                                Message
                            </label>
                            <Textarea
                                id="message"
                                rows={6}
                                placeholder="Décrivez votre projet ou votre demande..."
                                {...register("message")}
                            />
                            {errors.message && (
                                <p className="text-xs text-destructive">
                                    {errors.message.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            leftIcon={
                                isSubmitting ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <Send size={16} />
                                )
                            }
                            className="mt-2 w-fit bg-gradient-to-r from-vaSecondary from-30% to-vaPrimary to-70% shadow-lg shadow-vaSecondary/30 transition-all duration-300 hover:shadow-xl hover:shadow-vaPrimary/50 hover:-translate-y-0.5"
                        >
                            {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                        </Button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};
