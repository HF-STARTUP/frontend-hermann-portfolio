interface ConversationTagsSectionProps {
    tags?: string[];
}

const defaultTags = ["Client", "SAV"];

const TAG_COLORS: Record<string, string> = {
    Prospect: "bg-vaDarkPurple text-vaPurple",
    Client: "bg-vaDarkGreen text-vaGreen",
    SAV: "bg-vaDarkBlue text-blue-primary",
    Fournisseur: "bg-muted text-muted-foreground",
};

export function ConversationTagsSection({ tags = defaultTags }: ConversationTagsSectionProps) {
    return (
        <div className="border-t border-border px-4 py-4">
            <p className="mb-2 text-xs font-semibold uppercase text-vaTextPrimary">Étiquettes</p>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TAG_COLORS[tag] ?? "bg-muted text-muted-foreground"}`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}