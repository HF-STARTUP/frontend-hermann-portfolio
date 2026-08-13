"use client";

import { useRef, useState, KeyboardEvent, ChangeEvent } from "react";
import { Send, Paperclip, Smile, X, FileText } from "lucide-react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SessionWindowBanner } from "./SessionWindowBanner";

const ACCEPTED_TYPES = "image/*,application/pdf";
const MAX_FILE_SIZE_MB = 10;
const MAX_ATTACHMENTS = 10;

interface PendingAttachment {
    id: string;
    file: File;
    previewUrl: string | null;
}

interface ComposerProps {
    canReply: boolean;
    sending: boolean;
    onSend: (text: string, attachments?: File[]) => void;
}

function buildAttachment(file: File): PendingAttachment {
    return {
        id: `${file.name}-${file.size}-${file.lastModified}`,
        file,
        previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
    };
}

export function Composer({ canReply, sending, onSend }: ComposerProps) {
    const [value, setValue] = useState("");
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [attachments, setAttachments] = useState<PendingAttachment[]>([]);
    const [attachmentError, setAttachmentError] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleSend() {
        const text = value.trim();
        if ((!text && attachments.length === 0) || !canReply || sending) return;
        onSend(text, attachments.length > 0 ? attachments.map((item) => item.file) : undefined);
        setValue("");
        clearAttachments();
    }

    function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    }

    function insertText(text: string) {
        const textarea = textareaRef.current;

        if (!textarea) {
            setValue((prev) => prev + text);
            return;
        }

        const start = textarea.selectionStart ?? value.length;
        const end = textarea.selectionEnd ?? value.length;
        const nextValue = value.slice(0, start) + text + value.slice(end);

        setValue(nextValue);

        requestAnimationFrame(() => {
            textarea.focus();
            const cursor = start + text.length;
            textarea.setSelectionRange(cursor, cursor);
        });
    }

    function handleEmojiClick(emojiData: EmojiClickData) {
        insertText(emojiData.emoji);
        setEmojiOpen(false);
    }

    function clearAttachments() {
        attachments.forEach((item) => {
            if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
        });
        setAttachments([]);
        setAttachmentError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    function removeAttachment(id: string) {
        setAttachments((prev) => {
            const target = prev.find((item) => item.id === id);
            if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
            return prev.filter((item) => item.id !== id);
        });
    }

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const files = Array.from(event.target.files ?? []);
        if (files.length === 0) return;

        const availableSlots = MAX_ATTACHMENTS - attachments.length;

        if (availableSlots <= 0) {
            setAttachmentError(`Maximum ${MAX_ATTACHMENTS} pièces jointes par message`);
            return;
        }

        const oversized = files.some((file) => file.size > MAX_FILE_SIZE_MB * 1024 * 1024);
        if (oversized) {
            setAttachmentError(`Chaque fichier doit faire moins de ${MAX_FILE_SIZE_MB} Mo`);
            return;
        }

        const nextFiles = files.slice(0, availableSlots);
        setAttachmentError(
            files.length > availableSlots ? `Maximum ${MAX_ATTACHMENTS} pièces jointes par message` : null
        );
        setAttachments((prev) => [...prev, ...nextFiles.map(buildAttachment)]);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    return (
        <div className="border-t border-border bg-background">
            {!canReply && <SessionWindowBanner />}

            {attachmentError && (
                <p className="px-4 pt-2 text-xs text-vaRed">{attachmentError}</p>
            )}

            {attachments.length > 0 && (
                <div className="flex gap-2 overflow-x-auto border-b border-border px-4 py-2">
                    {attachments.map((item) => (
                        <div
                            key={item.id}
                            className="relative flex w-32 shrink-0 flex-col gap-1 rounded-md border border-border p-1.5"
                        >
                            <button
                                type="button"
                                onClick={() => removeAttachment(item.id)}
                                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background"
                            >
                                <X className="h-3 w-3" />
                            </button>
                            {item.previewUrl ? (
                                <img
                                    src={item.previewUrl}
                                    alt={item.file.name}
                                    className="h-16 w-full rounded object-cover"
                                />
                            ) : (
                                <div className="flex h-16 w-full items-center justify-center rounded bg-vaDarkBlue">
                                    <FileText className="h-5 w-5 text-blue-primary" />
                                </div>
                            )}
                            <p className="truncate text-[11px] text-vaTextPrimary">{item.file.name}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex items-end gap-2 px-4 py-3">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={ACCEPTED_TYPES}
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                />
                <Button
                    variant="ghost"
                    size="icon"
                    disabled={!canReply || attachments.length >= MAX_ATTACHMENTS}
                    onClick={() => fileInputRef.current?.click()}
                    className="text-vaLightGray"
                >
                    <Paperclip className="h-5 w-5" />
                </Button>

                <Popover open={emojiOpen} onOpenChange={setEmojiOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={!canReply} className="text-vaLightGray">
                            <Smile className="h-5 w-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent side="top" align="start" className="w-auto border-none p-0 shadow-lg">
                        <EmojiPicker
                            onEmojiClick={handleEmojiClick}
                            theme={Theme.LIGHT}
                            width={320}
                            height={380}
                            previewConfig={{ showPreview: false }}
                            searchPlaceHolder="Rechercher un emoji"
                        />
                    </PopoverContent>
                </Popover>

                <Textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={!canReply}
                    placeholder={canReply ? "Écrire un message..." : "Réponse indisponible"}
                    rows={1}
                    className="max-h-32 min-h-10 flex-1 resize-none rounded-2xl border-border bg-muted focus-visible:ring-blue-primary"
                />
                <Button
                    size="icon"
                    disabled={!canReply || (!value.trim() && attachments.length === 0) || sending}
                    onClick={handleSend}
                    className="rounded-full bg-blue-primary text-white hover:bg-blue-primary/90 shrink-0"
                >
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}