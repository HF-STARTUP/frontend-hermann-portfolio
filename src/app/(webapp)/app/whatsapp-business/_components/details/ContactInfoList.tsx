interface ContactInfoItem {
    label: string;
    value: string;
}

interface ContactInfoListProps {
    items?: ContactInfoItem[];
}

const defaultItems: ContactInfoItem[] = [
    { label: "Premier contact", value: "12 juillet 2026" },
    { label: "Numéro", value: "+225 07 00 00 00 01" },
    { label: "Parc", value: "VTC-4521" },
];

export function ContactInfoList({ items = defaultItems }: ContactInfoListProps) {
    return (
        <div className="space-y-3 px-4 py-4">
            {items.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-vaTextPrimary">{item.label}</span>
                    <span className="font-medium text-foreground">{item.value}</span>
                </div>
            ))}
        </div>
    );
}