
export interface JournalItem {
    label: string;
    date: string
}

export function JournalRow({ item }: { item: JournalItem }) {

    return (
        <div className="relative flex flex-col gap-2 w-full border-l px-6 pb-2">
            <p className="text-vaTextPrimary font-semibold text-sm">{item.label}</p>
            <p className="text-vaLightGray text-xs">{item.date}</p>
            <div className="absolute size-7 rounded-full bg-vaDarkGreen flex items-center justify-center -left-4">
                <div className="size-3 bg-vaLightGreen rounded-full">

                </div>
            </div>
        </div>
    )
}

export function JournalShimmer() {

}

export default function JournalList({ isLoading, items }: { isLoading: boolean, items: JournalItem[] }) {    

    return (
        <div className="flex flex-col gap-3 p-4">
            {
                items.map((item, index) =>
                    <JournalRow item={item} key={index} />
                )
            }
        </div>
    )
}