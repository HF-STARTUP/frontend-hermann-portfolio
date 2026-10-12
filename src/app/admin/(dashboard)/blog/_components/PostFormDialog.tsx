"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Pencil, Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    postFormSchema,
    type PostFormInputs,
} from "@/schema/portfolio.schema";
import TagInput from "@/components/ui/tag-input";
import ImagePicker from "@/components/admin/ImagePicker";
import {
    getYoutubeEmbedUrl,
} from "@/utils/media";
import type {
    BlogContentBlock,
    BlogCoverType,
    BlogPost,
} from "@/types/portfolio.type";
import { DialogMainBody } from "@/components/display/DialogMainBody";

/* Sérialisation simple des blocs de contenu vers/depuis du texte :
   - "## Titre"        -> heading
   - "> citation"      -> quote
   - ```lang ... ```   -> code
   - le reste          -> paragraphes (séparés par une ligne vide)      */

const serializeContent = (blocks: BlogContentBlock[]): string =>
    blocks
        .map((block) => {
            switch (block.type) {
                case "heading":
                    return `## ${block.text}`;
                case "quote":
                    return `> ${block.text}${block.author ? `\n> — ${block.author}` : ""}`;
                case "code":
                    return `\`\`\`${block.language ?? ""}\n${block.text}\n\`\`\``;
                case "paragraph":
                default:
                    return block.text;
            }
        })
        .join("\n\n");

const parseContent = (text: string): BlogContentBlock[] => {
    const blocks: BlogContentBlock[] = [];

    // Blocs de code d'abord (pour éviter que leur contenu soit parsé)
    const codePattern = /```(\w*)\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    const pushText = (raw: string) => {
        raw.split(/\n{2,}/).forEach((paragraph) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return;

            trimmed.split("\n").forEach((line) => {
                if (line.startsWith("## ")) {
                    blocks.push({ type: "heading", text: line.slice(3).trim() });
                } else if (line.startsWith("> ")) {
                    const content = line.slice(2).trim();
                    if (content.startsWith("— ")) {
                        // auteur rattaché à la dernière citation
                        const last = blocks[blocks.length - 1];
                        if (last?.type === "quote") last.author = content.slice(2);
                    } else {
                        blocks.push({ type: "quote", text: content });
                    }
                } else {
                    blocks.push({ type: "paragraph", text: line.trim() });
                }
            });
        });
    };

    while ((match = codePattern.exec(text)) !== null) {
        pushText(text.slice(lastIndex, match.index));
        blocks.push({
            type: "code",
            language: match[1] || undefined,
            text: match[2].replace(/\n$/, ""),
        });
        lastIndex = match.index + match[0].length;
    }
    pushText(text.slice(lastIndex));

    return blocks;
};

const slugify = (title: string) =>
    title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

/**
 * Dialog de création / édition d'un article.
 * La promesse `onSubmit` rejette en cas d'échec API : le dialog reste ouvert.
 */
const PostFormDialog: React.FC<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    post?: BlogPost;
    onSubmit: (data: Omit<BlogPost, "id">, postId?: string) => Promise<void>;
}> = ({ open, onOpenChange, post, onSubmit }) => {
    const isEditing = Boolean(post);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const defaultValues = React.useMemo<PostFormInputs>(
        () => ({
            title: post?.title ?? "",
            slug: post?.slug ?? "",
            excerpt: post?.excerpt ?? "",
            coverType: post?.coverType ?? "image",
            coverImageUrl: post?.coverImageUrl ?? "",
            coverVideoUrl: post?.coverVideoUrl ?? "",
            coverYoutubeUrl: post?.coverYoutubeUrl ?? "",
            tags: post?.tags ?? [],
            readTimeMinutes: post?.readTimeMinutes ?? 5,
            contentText: post ? serializeContent(post.content) : "",
        }),
        [post]
    );

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<PostFormInputs>({
        resolver: joiResolver(postFormSchema),
        defaultValues,
    });

    React.useEffect(() => {
        if (open) reset(defaultValues);
    }, [open, defaultValues, reset]);

    const submit = async (data: PostFormInputs) => {
        setIsSubmitting(true);
        try {
            const coverType = data.coverType as BlogCoverType;
            await onSubmit(
                {
                    slug: data.slug || slugify(data.title),
                    title: data.title,
                    excerpt: data.excerpt,
                    coverType,
                    coverImageUrl:
                        data.coverImageUrl ||
                        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80",
                    coverVideoUrl:
                        coverType === "video" ? data.coverVideoUrl : undefined,
                    coverYoutubeUrl:
                        coverType === "youtube"
                            ? data.coverYoutubeUrl
                            : undefined,
                    tags: data.tags,
                    publishedAt:
                        post?.publishedAt ??
                        new Date().toISOString().slice(0, 10),
                    readTimeMinutes: Number(data.readTimeMinutes),
                    content: parseContent(data.contentText),
                },
                post?.id
            );
            onOpenChange(false);
        } catch {
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex flex-col border-vaPrimary/30 bg-card sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Modifier l'article" : "Nouvel article"}
                    </DialogTitle>
                </DialogHeader>

                <form
                    noValidate
                    onSubmit={handleSubmit(submit)}
                    className="flex min-h-0 flex-1 flex-col"
                >
                    {/* Corps défilant : le header et les boutons restent figés */}
                    <DialogMainBody>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-foreground">
                                Titre
                            </label>
                            <Input
                                placeholder="Titre de l'article"
                                {...register("title")}
                                onBlur={(event) => {
                                    // Génère automatiquement le slug s'il est vide
                                    if (!watch("slug")) {
                                        setValue("slug", slugify(event.target.value));
                                    }
                                }}
                            />
                            {errors.title && (
                                <p className="text-xs text-destructive">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="flex flex-col gap-2 sm:col-span-2">
                                <label className="text-sm font-medium text-foreground">
                                    Slug (URL)
                                </label>
                                <Input placeholder="mon-article" {...register("slug")} />
                                {errors.slug && (
                                    <p className="text-xs text-destructive">
                                        {errors.slug.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-foreground">
                                    Lecture (min)
                                </label>
                                <Input
                                    type="number"
                                    min={1}
                                    {...register("readTimeMinutes", { valueAsNumber: true })}
                                />
                                {errors.readTimeMinutes && (
                                    <p className="text-xs text-destructive">
                                        {errors.readTimeMinutes.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-foreground">
                                Extrait
                            </label>
                            <Textarea
                                rows={2}
                                placeholder="Résumé de l'article..."
                                {...register("excerpt")}
                            />
                            {errors.excerpt && (
                                <p className="text-xs text-destructive">
                                    {errors.excerpt.message}
                                </p>
                            )}
                        </div>

                        {/* Couverture : type + sources média */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-foreground">
                                    Type de couverture
                                </label>
                                <input type="hidden" {...register("coverType")} />
                                <Select
                                    value={watch("coverType")}
                                    onValueChange={(value) =>
                                        setValue("coverType", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choisir un type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="image">Image</SelectItem>
                                        <SelectItem value="video">
                                            Fichier vidéo
                                        </SelectItem>
                                        <SelectItem value="youtube">
                                            Lien YouTube
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.coverType && (
                                    <p className="text-xs text-destructive">
                                        {errors.coverType.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-foreground">
                                    Image / poster
                                </label>
                                {/* Sélecteur avec aperçu (bibliothèque / import / URL) */}
                                <ImagePicker
                                    value={watch("coverImageUrl")}
                                    onChange={(src) => setValue("coverImageUrl", src)}
                                    label="Couverture de l'article"
                                />
                                {errors.coverImageUrl && (
                                    <p className="text-xs text-destructive">
                                        {errors.coverImageUrl.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {watch("coverType") === "video" && (
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-foreground">
                                    Fichier vidéo (URL mp4/webm...)
                                </label>
                                <Input
                                    placeholder="https://.../video.mp4"
                                    {...register("coverVideoUrl")}
                                />
                                {errors.coverVideoUrl && (
                                    <p className="text-xs text-destructive">
                                        {errors.coverVideoUrl.message}
                                    </p>
                                )}
                            </div>
                        )}

                        {watch("coverType") === "youtube" && (
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-foreground">
                                    Lien YouTube
                                </label>
                                <Input
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    {...register("coverYoutubeUrl")}
                                />
                                {errors.coverYoutubeUrl && (
                                    <p className="text-xs text-destructive">
                                        {errors.coverYoutubeUrl.message}
                                    </p>
                                )}
                                {getYoutubeEmbedUrl(
                                    watch("coverYoutubeUrl") ?? ""
                                ) && (
                                        <p className="text-xs text-muted-foreground">
                                            Aperçu disponible après enregistrement.
                                        </p>
                                    )}
                            </div>
                        )}

                        {/* Tags : saisie filtrante -> badges avec suppression */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-foreground">
                                Tags
                            </label>
                            <TagInput
                                options={[]}
                                value={watch("tags") ?? []}
                                onChange={(tags) => setValue("tags", tags)}
                                placeholder="Saisir un tag puis Entrée..."
                                allowFree
                                emptyMessage="Saisissez du texte puis Entrée pour ajouter"
                            />
                            {errors.tags && (
                                <p className="text-xs text-destructive">
                                    {errors.tags.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-foreground">
                                Contenu
                            </label>
                            <Textarea
                                rows={10}
                                {...register("contentText")}
                                placeholder={`Votre article...\n\n## Un titre de section\n\n> Une citation\n\nUn paragraphe.\n\n\`\`\`ts\nconst code = "supporté aussi";\n\`\`\``}
                                className="font-mono text-sm"
                            />
                            <p className="text-xs text-muted-foreground">
                                Syntaxe : « ## Titre » pour un intertitre, « {">"} »
                                pour une citation, blocs ``` pour du code, ligne vide
                                pour séparer les paragraphes.
                            </p>
                            {errors.contentText && (
                                <p className="text-xs text-destructive">
                                    {errors.contentText.message}
                                </p>
                            )}
                        </div>

                    </DialogMainBody>

                    <DialogFooter className="gap-2 border-t border-vaPrimary/10 p-4 pt-3 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            loading={isSubmitting}
                            leftIcon={isEditing ? <Pencil size={16} /> : <Plus size={16} />}
                            className="bg-gradient-to-r from-vaSecondary to-vaPrimary text-white"
                        >
                            {isEditing ? "Enregistrer" : "Publier l'article"}
                        </Button>
                    </DialogFooter>
                </form>


            </DialogContent>
        </Dialog>
    );
};

export default PostFormDialog;
