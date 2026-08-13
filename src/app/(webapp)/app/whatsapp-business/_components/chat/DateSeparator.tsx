interface DateSeparatorProps {
    label: string;
}

export function DateSeparator({ label }: DateSeparatorProps) {
    return (
        <div className="my-3 flex items-center justify-center">
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-vaTextPrimary">
                {label}
            </span>
        </div>
    );
}