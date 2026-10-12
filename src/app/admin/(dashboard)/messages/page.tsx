"use client";

import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
    ChevronLeft,
    ChevronRight,
    Mail,
    MailOpen,
    Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMessagesQuery, useSetMessageRead, useDeleteMessage } from "@/hooks/portfolio/useAdminMessagesMedia";
import type { ContactMessage } from "@/types/portfolio.type";
import ConfirmDialog from "../../_components/ConfirmDialog";
import ListSkeleton, { QueryErrorPanel } from "../_components/ListSkeleton";

const AdminMessagesPage = () => {
    const [page, setPage] = React.useState(1);
    const { data, isLoading, isError } = useMessagesQuery({ page });
    const messages = data?.items ?? [];
    const pagination = data?.pagination;

    /* Marquage lu/non lu : silencieux (successMessage ""), invalidation auto */
    const { setRead } = useSetMessageRead();
    const { deleteMessage } = useDeleteMessage();

    // Message sélectionné : le premier non lu par défaut
    const [selectedId, setSelectedId] = React.useState<string | undefined>();
    const [deletingMessage, setDeletingMessage] = React.useState<
        ContactMessage | undefined
    >();
    const selected =
        messages.find((message) => message.id === selectedId) ?? messages[0];

    const handleSelect = (message: ContactMessage) => {
        setSelectedId(message.id);
        if (!message.read) {
            // Toast d'erreur auto en cas d'échec ; pas de toast de succès.
            void setRead(message.id, true).catch(() => undefined);
        }
    };

    const toggleRead = (message: ContactMessage) => {
        void setRead(message.id, !message.read).catch(() => undefined);
    };

    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                    Messages
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Messages reçus via le formulaire de contact.
                </p>
            </header>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                {/* Liste */}
                <div className="flex flex-col gap-2 lg:col-span-2">
                    {isError ? (
                        <QueryErrorPanel message="Impossible de charger les messages." />
                    ) : isLoading ? (
                        <ListSkeleton rows={5} />
                    ) : null}

                    {!isError && !isLoading &&
                        messages.map((message, index) => (
                            <motion.button
                                key={message.id}
                                type="button"
                                onClick={() => handleSelect(message)}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.35 }}
                                className={`flex flex-col gap-1 rounded-2xl border p-4 text-left backdrop-blur-md transition-all duration-300 ${
                                    selected?.id === message.id
                                        ? "border-vaPrimary/60 bg-vaPrimary/15"
                                        : "border-vaPrimary/20 bg-vaSecondary/10 hover:border-vaPrimary/40"
                                }`}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <p className="flex items-center gap-2 font-semibold text-foreground">
                                        {!message.read && (
                                            <span className="size-2 shrink-0 rounded-full bg-vaPrimary" />
                                        )}
                                        {message.name}
                                    </p>
                                    <span className="shrink-0 text-xs text-muted-foreground">
                                        {format(
                                            new Date(message.sentAt),
                                            "d MMM · HH:mm",
                                            { locale: fr }
                                        )}
                                    </span>
                                </div>
                                <p className="truncate text-sm text-muted-foreground">
                                    {message.subject}
                                </p>
                            </motion.button>
                        ))}

                    {!isError && !isLoading && messages.length === 0 && (
                        <p className="rounded-2xl border border-dashed border-vaPrimary/30 p-10 text-center text-muted-foreground">
                            Aucun message pour le moment.
                        </p>
                    )}

                    {/* Pagination */}
                    {pagination && pagination.lastPage > 1 && (
                        <div className="mt-2 flex items-center justify-between rounded-xl border border-vaPrimary/20 px-3 py-2 text-xs text-muted-foreground">
                            <span>
                                Page {pagination.currentPage} /{" "}
                                {pagination.lastPage} · {pagination.total}{" "}
                                message{pagination.total > 1 ? "s" : ""}
                            </span>
                            <span className="flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Page précédente"
                                    disabled={pagination.currentPage <= 1}
                                    onClick={() =>
                                        setPage((current) => current - 1)
                                    }
                                    className="size-7 rounded-lg"
                                >
                                    <ChevronLeft size={14} />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Page suivante"
                                    disabled={
                                        pagination.currentPage >=
                                        pagination.lastPage
                                    }
                                    onClick={() =>
                                        setPage((current) => current + 1)
                                    }
                                    className="size-7 rounded-lg"
                                >
                                    <ChevronRight size={14} />
                                </Button>
                            </span>
                        </div>
                    )}
                </div>

                {/* Lecture */}
                {selected ? (
                    <div className="flex flex-col gap-4 self-start rounded-2xl border border-vaPrimary/20 bg-vaSecondary/10 p-6 backdrop-blur-md lg:col-span-3">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <h2 className="text-lg font-bold text-foreground">
                                    {selected.subject}
                                </h2>
                                <p className="mt-0.5 text-sm text-muted-foreground">
                                    De{" "}
                                    <a
                                        href={`mailto:${selected.email}`}
                                        className="font-medium text-vaPrimary hover:underline"
                                    >
                                        {selected.name} &lt;{selected.email}&gt;
                                    </a>{" "}
                                    —{" "}
                                    {format(new Date(selected.sentAt), "d MMMM yyyy 'à' HH:mm", {
                                        locale: fr,
                                    })}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    title={
                                        selected.read
                                            ? "Marquer comme non lu"
                                            : "Marquer comme lu"
                                    }
                                    aria-label={
                                        selected.read
                                            ? "Marquer comme non lu"
                                            : "Marquer comme lu"
                                    }
                                    className="rounded-xl border-vaPrimary/30 bg-background/40 hover:bg-vaPrimary/20"
                                    onClick={() => toggleRead(selected)}
                                >
                                    {selected.read ? <Mail size={16} /> : <MailOpen size={16} />}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    title="Supprimer"
                                    aria-label="Supprimer le message"
                                    className="rounded-xl border-destructive/40 bg-background/40 text-destructive hover:bg-destructive/20"
                                    onClick={() => setDeletingMessage(selected)}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </div>

                        <div className="h-px bg-vaPrimary/15" />

                        <p className="whitespace-pre-line leading-relaxed text-vaTextPrimary">
                            {selected.message}
                        </p>

                        <div className="mt-auto pt-4">
                            <Button
                                leftIcon={<Mail size={16} />}
                                variant="outline"
                                className="border-vaPrimary/40 bg-background/40"
                                onClick={() =>
                                    (window.location.href = `mailto:${selected.email}?subject=RE: ${encodeURIComponent(selected.subject)}`)
                                }
                            >
                                Répondre par email
                            </Button>
                        </div>
                    </div>
                ) : (
                    !isError && !isLoading && (
                        <div className="hidden items-center justify-center rounded-2xl border border-dashed border-vaPrimary/30 p-10 text-center text-muted-foreground lg:col-span-3 lg:flex">
                            Sélectionnez un message pour le lire.
                        </div>
                    )
                )}
            </div>

            <ConfirmDialog
                open={Boolean(deletingMessage)}
                onOpenChange={(open) => !open && setDeletingMessage(undefined)}
                title="Supprimer ce message ?"
                description={
                    deletingMessage
                        ? `Le message de ${deletingMessage.name} sera définitivement supprimé.`
                        : ""
                }
                onConfirm={() => {
                    // Toast d'erreur auto ; le dialog se referme sur succès.
                    return deletingMessage
                        ? deleteMessage(deletingMessage.id)
                        : undefined;
                }}
            />
        </div>
    );
};

export default AdminMessagesPage;
