"use client";

import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, Pencil, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useBlogPostsQuery } from "@/hooks/portfolio/usePortfolioQueries";
import {
    useCreateBlogPost,
    useDeleteBlogPost,
    useUpdateBlogPost,
} from "@/hooks/portfolio/useAdminBlogPosts";
import type { BlogPost } from "@/types/portfolio.type";
import { Button } from "@/components/ui/button";
import PostFormDialog from "./_components/PostFormDialog";
import ConfirmDialog from "../../_components/ConfirmDialog";
import ListSkeleton, { QueryErrorPanel } from "../_components/ListSkeleton";

const AdminBlogPage = () => {
    const { data: posts = [], isLoading, isError } = useBlogPostsQuery();

    /* Mutations : toasts succès/erreur émis par useMutationProvider */
    const { createPost } = useCreateBlogPost();
    const { updatePost } = useUpdateBlogPost();
    const { deletePost } = useDeleteBlogPost();

    const [formOpen, setFormOpen] = React.useState(false);
    const [editingPost, setEditingPost] = React.useState<BlogPost | undefined>();
    const [deletingPost, setDeletingPost] = React.useState<BlogPost | undefined>();

    /**
     * Réjette en cas d'échec → toast auto (provider), dialog laissé ouvert.
     * En cas de succès la liste est invalidée par le hook.
     */
    const handleSubmit = async (data: Omit<BlogPost, "id">, postId?: string) => {
        if (postId) {
            await updatePost({ ...data, id: postId });
        } else {
            await createPost(data);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <header className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                        Articles
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Gérez le contenu de votre blog.
                    </p>
                </div>
                <Button
                    onClick={() => {
                        setEditingPost(undefined);
                        setFormOpen(true);
                    }}
                    leftIcon={<Plus size={16} />}
                    className="bg-gradient-to-r from-vaSecondary to-vaPrimary text-white"
                >
                    Nouvel article
                </Button>
            </header>

            <div className="flex flex-col gap-3">
                {isError ? (
                    <QueryErrorPanel message="Impossible de charger les articles." />
                ) : isLoading ? (
                    <ListSkeleton rows={4} />
                ) : null}

                {!isError && !isLoading &&
                    posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.35 }}
                            className="flex flex-col gap-3 rounded-2xl border border-vaPrimary/20 bg-vaSecondary/10 p-5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="min-w-0">
                                <h2 className="font-bold text-foreground">{post.title}</h2>
                                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1.5">
                                        <CalendarDays size={13} />
                                        {format(new Date(post.publishedAt), "d MMM yyyy", {
                                            locale: fr,
                                        })}
                                    </span>
                                    <span>· {post.readTimeMinutes} min</span>
                                    <span>· /blog/{post.slug}</span>
                                </p>
                            </div>

                            <div className="flex shrink-0 items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    title="Modifier"
                                    aria-label={`Modifier ${post.title}`}
                                    onClick={() => {
                                        setEditingPost(post);
                                        setFormOpen(true);
                                    }}
                                    className="rounded-xl border-vaPrimary/30 bg-background/40 hover:bg-vaPrimary/20"
                                >
                                    <Pencil size={16} />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    title="Supprimer"
                                    aria-label={`Supprimer ${post.title}`}
                                    onClick={() => setDeletingPost(post)}
                                    className="rounded-xl border-destructive/40 bg-background/40 text-destructive hover:bg-destructive/20"
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </motion.div>
                    ))}

                {!isError && !isLoading && posts.length === 0 && (
                    <p className="rounded-2xl border border-dashed border-vaPrimary/30 p-10 text-center text-muted-foreground">
                        Aucun article. Publiez votre premier article de blog.
                    </p>
                )}
            </div>

            <PostFormDialog
                open={formOpen}
                onOpenChange={setFormOpen}
                post={editingPost}
                onSubmit={handleSubmit}
            />

            <ConfirmDialog
                open={Boolean(deletingPost)}
                onOpenChange={(open) => !open && setDeletingPost(undefined)}
                title="Supprimer cet article ?"
                description={
                    deletingPost
                        ? `« ${deletingPost.title} » sera définitivement supprimé.`
                        : ""
                }
                onConfirm={() => {
                    // Toast d'erreur auto ; le dialog se referme sur succès.
                    return deletingPost ? deletePost(deletingPost.id) : undefined;
                }}
            />
        </div>
    );
};

export default AdminBlogPage;
