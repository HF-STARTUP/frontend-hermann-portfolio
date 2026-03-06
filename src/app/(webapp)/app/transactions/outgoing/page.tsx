"use client"

import { Crumb } from "@/components/ui/custom/crumb";
import OutgoingBody from "./OutgoingBody";

export default function TransactionPage() {

    return (
        <div>
            <Crumb
                items={[
                    {
                        label: "Transactions Entrantes",
                        url: "transactions/outgoing",
                    }
                ]}
            />
            <div className={"mt-2"}>
                <OutgoingBody />
            </div>
        </div>
    )
}

