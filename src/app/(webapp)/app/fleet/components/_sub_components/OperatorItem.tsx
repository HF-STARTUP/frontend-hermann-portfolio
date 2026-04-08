import { resolveImage } from "@/lib/utils";
import { TransactionOperator } from "@/types/admin/fleet.type";
import Image from "next/image";

export const OperationWithLogo = ({ operator }: { operator: TransactionOperator }) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <div className="rounded-full bg-vaBlue size-5 flex-shrink-0 overflow-hidden border-none shadow-sm">
                <Image
                    src={resolveImage(operator.image)}
                    width={100}
                    height={100}
                    alt={operator.title}
                    className="size-full object-cover"
                />
            </div>
            <label className="text-sm text-vaTextPrimary truncate" title={operator.title}>
                {operator.title}
            </label>
        </div>
    )
}