"use client";

import React from "react";
import { ImagePlus, Link2, Loader2, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
    useMediaLibraryQuery,
    useUploadMedia,
} from "@/hooks/portfolio/useAdminMessagesMedia";
import { DialogMainBody } from "@/components/display/DialogMainBody";

/**
 * Sélecteur d'image avec aperçu : médiathèque de l'API (GET /admin/media),
 * import local (POST /admin/media multipart → URL hébergée) ou collage d'URL.
 */
interface ImagePickerProps {
    /** Source actuelle (URL https) */
    value?: string;
    onChange: (src: string) => void;
    label?: string;
}

const MAX_UPLOAD_BYTES = 3 * 1024 * 1024; // 3 Mo (contrôle client ; 413 côté API)

const ImagePicker: React.FC<ImagePickerProps> = ({
    value,
    onChange,
    label = "Image",
}) => {
    const { toast } = useToast();
    const { data: mediaLibrary = [], isLoading: libraryLoading } =
        useMediaLibraryQuery();
    /* Upload : succès toasté + invalidation de la bibliothèque par le hook */
    const { uploadMedia, loading: uploading } = useUploadMedia();

    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string | undefined>(value);
    const [urlValue, setUrlValue] = React.useState("");

    // Resynchronise la sélection à chaque ouverture
    React.useEffect(() => {
        if (open) setSelected(value);
    }, [open, value]);

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast({
                title: "Fichier invalide",
                description: "Veuillez choisir un fichier image.",
                variant: "destructive",
            });
            return;
        }

        if (file.size > MAX_UPLOAD_BYTES) {
            toast({
                title: "Image trop lourde",
                description: "La taille maximale est de 3 Mo.",
                variant: "destructive",
            });
            return;
        }

        uploadMedia(file)
            .then((item) => {
                setSelected(item.src);
                toast({ title: "Image importée", description: item.name });
            })
            .catch(() => {
                /* erreur API déjà toastée par le provider (413/415…) */
            });
    };

    const confirmSelection = () => {
        if (selected) onChange(selected);
        setOpen(false);
    };

    return (
        <>
            {/* Déclencheur avec vignette d'aperçu */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="group flex w-full items-center gap-4 rounded-xl border border-neutral-300/60 bg-transparent p-3 text-left transition-all hover:border-vaPrimary/50 dark:border-neutral-600/60"
            >
                <span className="flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-vaPrimary/20 bg-background/60">
                    {value ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={value}
                            alt={label}
                            className="size-full object-cover"
                        />
                    ) : (
                        <ImagePlus size={22} className="text-muted-foreground" />
                    )}
                </span>
                <span className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-foreground">
                        {label}
                    </span>
                    <span className="text-xs text-muted-foreground group-hover:text-vaPrimary">
                        {value ? "Changer l'image" : "Choisir une image"}
                    </span>
                </span>
            </button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="flex flex-col border-vaPrimary/30 bg-card sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>{label}</DialogTitle>
                    </DialogHeader>

                    {/* Corps défilant : le header et les boutons restent figés */}
                    <DialogMainBody>
                    <Tabs defaultValue="library" className="gap-4">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="library">
                                Bibliothèque
                            </TabsTrigger>
                            <TabsTrigger value="upload">Importer</TabsTrigger>
                            <TabsTrigger value="url">URL</TabsTrigger>
                        </TabsList>

                        {/* Bibliothèque de médias du site */}
                        <TabsContent value="library">
                            {libraryLoading ? (
                                <p className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
                                    <Loader2 size={16} className="animate-spin" />
                                    Chargement de la bibliothèque…
                                </p>
                            ) : mediaLibrary.length === 0 ? (
                                <p className="py-8 text-center text-sm text-muted-foreground">
                                    La bibliothèque est vide — importez une
                                    première image.
                                </p>
                            ) : (
                                <div className="grid grid-cols-3 gap-3 rounded-xl p-1 sm:grid-cols-4">
                                    {mediaLibrary.map((item) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            title={item.name}
                                            onClick={() => setSelected(item.src)}
                                            className={
                                                selected === item.src
                                                    ? "overflow-hidden rounded-xl ring-2 ring-vaPrimary ring-offset-2 ring-offset-card"
                                                    : "overflow-hidden rounded-xl ring-1 ring-vaPrimary/20 transition-all hover:ring-vaPrimary/60"
                                            }
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={item.src}
                                                alt={item.name}
                                                className="aspect-[4/3] w-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        {/* Import local : POST /admin/media puis sélection */}
                        <TabsContent value="upload">
                            <label className={`flex min-h-40 ${uploading ? "" : "cursor-pointer"} flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-vaPrimary/30 bg-vaSecondary/5 px-6 py-8 text-center transition-colors hover:border-vaPrimary/60`}>
                                {uploading ? (
                                    <Loader2 size={28} className="animate-spin text-vaPrimary" />
                                ) : (
                                    <ImagePlus size={28} className="text-vaPrimary" />
                                )}
                                <span className="text-sm font-medium text-foreground">
                                    {uploading
                                        ? "Import en cours…"
                                        : "Cliquer pour importer une image"}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    JPG, PNG, WebP ou SVG — 3 Mo maximum
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    disabled={uploading}
                                    onChange={handleFileChange}
                                />
                            </label>
                        </TabsContent>

                        {/* Collage d'URL externe */}
                        <TabsContent value="url" className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <Link2 size={16} className="text-muted-foreground" />
                                <Input
                                    placeholder="https://..."
                                    value={urlValue}
                                    onChange={(e) => setUrlValue(e.target.value)}
                                />
                            </div>
                            {urlValue && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setSelected(urlValue)}
                                >
                                    Utiliser cette URL
                                </Button>
                            )}
                        </TabsContent>
                    </Tabs>

                    {/* Aperçu de la sélection */}
                    {selected && (
                        <div className="flex flex-col gap-2">
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Aperçu
                            </p>
                            <div className="overflow-hidden rounded-xl border border-vaPrimary/20">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={selected}
                                    alt={`Aperçu ${label}`}
                                    className="max-h-56 w-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                    </DialogMainBody>

                    <DialogFooter className="gap-2 border-t border-vaPrimary/10 p-4 pt-3 sm:gap-0">
                        <Button
                            type="button"
                            variant="ghost"
                            leftIcon={<Trash2 size={16} />}
                            onClick={() => {
                                onChange("");
                                setOpen(false);
                            }}
                            className="text-destructive hover:text-destructive"
                        >
                            Retirer
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="button"
                            leftIcon={<ImagePlus size={16} />}
                            disabled={!selected || selected === value}
                            onClick={confirmSelection}
                            className="bg-gradient-to-r from-vaSecondary to-vaPrimary text-white"
                        >
                            Valider
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ImagePicker;
