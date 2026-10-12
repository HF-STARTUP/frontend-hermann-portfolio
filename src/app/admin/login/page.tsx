"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { ArrowLeft, Lock, LogIn, Mail } from "lucide-react";
import { useLogin } from "@/hooks/portfolio/usePortfolioAuthContact";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

/** Route #13 — POST /auth/login */

const loginSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.empty": "L'adresse email est requise.",
            "string.email": "Veuillez saisir une adresse email valide.",
        }),
    password: Joi.string().required().messages({
        "string.empty": "Le mot de passe est requis.",
    }),
});

type LoginInputs = {
    email: string;
    password: string;
};

const AdminLoginPage = () => {
    const router = useRouter();
    const { toast } = useToast();
    const logoInitials = usePortfolioStore(
        (state) => state.siteContent.profile.logoInitials
    );
    /* Erreurs (401 identifiants, 429 throttling…) toastées par le provider */
    const { login, loading: isSubmitting } = useLogin();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>({
        resolver: joiResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            const payload = await login(data);
            toast({
                title: "Connexion réussie.",
                description: `Bienvenue, ${payload.user.name}.`,
            });
            router.push("/admin");
        } catch {
            /* erreur déjà toastée par le provider ; le formulaire reste rempli */
        }
    });

    return (
        <div className="relative flex min-h-dvh items-center justify-center px-4">
            <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-4 text-muted-foreground"
                leftIcon={<ArrowLeft size={16} />}
                onClick={() => router.push("/")}
            >
                Retour au site
            </Button>

            <div className="w-full max-w-md rounded-3xl border border-vaPrimary/20 bg-card/80 p-8 shadow-xl shadow-vaPrimary/5 backdrop-blur-md">
                <div className="mb-8 flex flex-col items-center gap-3 text-center">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-vaSecondary to-vaPrimary text-lg font-extrabold text-white">
                        {logoInitials}
                    </span>
                    <h1 className="text-2xl font-bold text-foreground">
                        Espace administrateur
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Connectez-vous pour gérer le contenu du portfolio.
                    </p>
                </div>

                <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                            Adresse email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            autoComplete="username"
                            placeholder="vous@exemple.com"
                            leftIcon={<Mail size={16} />}
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-xs text-destructive">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-medium text-foreground">
                            Mot de passe
                        </label>
                        <Input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="••••••••"
                            leftIcon={<Lock size={16} />}
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-xs text-destructive">{errors.password.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        loading={isSubmitting}
                        leftIcon={<LogIn size={16} />}
                        className="w-full bg-gradient-to-r from-vaSecondary to-vaPrimary text-white"
                    >
                        {isSubmitting ? "Connexion…" : "Se connecter"}
                    </Button>
                </form>
            </div>

            <Link href="/" aria-label="Accueil" className="sr-only">
                Accueil
            </Link>
        </div>
    );
};

export default AdminLoginPage;
