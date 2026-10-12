"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomeForm from "./_components/HomeForm";
import PagesForm from "./_components/PagesForm";
import ProfileForm from "./_components/ProfileForm";
import FooterForm from "./_components/FooterForm";

/**
 * Contenu du site : édition de tous les textes publics du portfolio.
 * Chaque onglet enregistre via PATCH /site-content/{section} (#45) ;
 * le profil met aussi à jour les liens sociaux (PUT /social-links #46).
 */
const AdminContentPage = () => {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                    Contenu du site
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Modifiez chaque texte affiché sur le portfolio public —
                    les changements sont visibles immédiatement.
                </p>
            </header>

            <Tabs defaultValue="profile" className="gap-6">
                <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
                    <TabsTrigger value="profile">Profil</TabsTrigger>
                    <TabsTrigger value="home">Accueil</TabsTrigger>
                    <TabsTrigger value="pages">À propos & Pages</TabsTrigger>
                    <TabsTrigger value="footer">Footer</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <ProfileForm />
                </TabsContent>
                <TabsContent value="home">
                    <HomeForm />
                </TabsContent>
                <TabsContent value="pages">
                    <PagesForm />
                </TabsContent>
                <TabsContent value="footer">
                    <FooterForm />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminContentPage;
