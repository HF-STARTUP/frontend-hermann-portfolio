"use client"

import { Crumb } from "@/components/ui/custom/crumb";
import IncomingBody from "./IcomingBody";

export default function TransactionPage() {

    return (
        <div>
            <Crumb
                items={[
                    {
                        label: "Transactions Entrantes",
                        url: "transactions/incoming",
                    }
                ]}
            />
            <div className={"mt-2"}>
                <IncomingBody />
            </div>
        </div>
    )
}

