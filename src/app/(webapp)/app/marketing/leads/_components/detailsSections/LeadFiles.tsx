import { LeadStep } from "../../../campagnes/_hook/useCampagneLeadsHook";

export interface LeadFileItem{
    name: string;
    type: string;
    size: string;
    addedAt: string;
    addedBy: string;
    status: LeadStep
}

export const LeadFileRow = ({leadFile}:{leadFile: LeadFileItem})=>{

}