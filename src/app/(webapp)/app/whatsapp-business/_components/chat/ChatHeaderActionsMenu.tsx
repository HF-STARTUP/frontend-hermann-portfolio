export const UnreadBadge = ({ count }: { count: number }) => {
    return count > 0 ? (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-vaGreen px-1.5 text-xs font-semibold text-white">
            {count > 99 ? "99+" : count}
        </span>
    ) : null;
};