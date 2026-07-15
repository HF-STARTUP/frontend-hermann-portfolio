export default function CardTitle({ title }: { title: string }) {
    return (
        <div className="text-lg font-semibold text-vaTextPrimary mb-6">
            {title}
        </div>
    )
}