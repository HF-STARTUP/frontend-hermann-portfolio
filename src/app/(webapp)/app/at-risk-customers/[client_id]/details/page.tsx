import { Crumb } from "@/components/ui/custom/crumb";
import { ClientDetailsBody } from "./ClientDetailsBody";

interface PageProps {
    params: Promise<{ client_id: string }>
}


const ClientDetailsPage = async ({ params }: PageProps) => {

    const { client_id } = await params;
    return (
        <div className="">
            <ClientDetailsBody id={client_id} />
        </div>
    )
}

export default ClientDetailsPage