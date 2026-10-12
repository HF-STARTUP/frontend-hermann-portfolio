"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Maximize2, Minimize2 } from "lucide-react";
import type { BlogPost } from "@/types/portfolio.type";
import { getYoutubeEmbedUrl } from "@/utils/media";

/**
 * Couverture d'article de blog : image, fichier vidéo ou embed YouTube.
 * Bouton plein écran basé sur la Fullscreen API du navigateur.
 */
const BlogCover: React.FC<{
    post: Pick<
        BlogPost,
        | "title"
        | "coverImageUrl"
        | "coverType"
        | "coverVideoUrl"
        | "coverYoutubeUrl"
    >;
    priority?: boolean;
    className?: string;
}> = ({ post, priority = false, className = "" }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const coverType = post.coverType ?? "image";

    // Synchronise l'état avec les changements plein écran (y compris Échap)
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement === containerRef.current);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () =>
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
    }, []);

    const toggleFullscreen = useCallback(async () => {
        if (!containerRef.current) return;
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else {
                await containerRef.current.requestFullscreen();
            }
        } catch {
            // Plein écran refusé par le navigateur : on ignore silencieusement
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className={`group/cover relative overflow-hidden ${
                isFullscreen
                    ? "flex items-center justify-center bg-black"
                    : "aspect-video w-full rounded-3xl border border-vaPrimary/20"
            } ${className}`}
        >
            {coverType === "video" && post.coverVideoUrl ? (
                <video
                    src={post.coverVideoUrl}
                    poster={post.coverImageUrl || undefined}
                    controls
                    playsInline
                    preload="metadata"
                    className={
                        isFullscreen
                            ? "h-full w-full object-contain"
                            : "absolute inset-0 size-full object-cover"
                    }
                />
            ) : coverType === "youtube" && getYoutubeEmbedUrl(post.coverYoutubeUrl ?? "") ? (
                <iframe
                    src={`${getYoutubeEmbedUrl(post.coverYoutubeUrl ?? "")}?rel=0`}
                    title={post.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className={
                        isFullscreen
                            ? "h-full w-full"
                            : "absolute inset-0 size-full"
                    }
                />
            ) : (
                <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    fill={!isFullscreen}
                    width={isFullscreen ? 1920 : undefined}
                    height={isFullscreen ? 1080 : undefined}
                    sizes="(max-width: 896px) 100vw, 896px"
                    priority={priority}
                    className={
                        isFullscreen
                            ? "h-full w-full object-contain"
                            : "object-cover"
                    }
                />
            )}

            {/* Bouton plein écran */}
            <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={
                    isFullscreen
                        ? "Quitter le plein écran"
                        : "Afficher en plein écran"
                }
                title={
                    isFullscreen
                        ? "Quitter le plein écran"
                        : "Afficher en plein écran"
                }
                className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-xl border border-white/20 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/70"
            >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
        </div>
    );
};

export default BlogCover;
