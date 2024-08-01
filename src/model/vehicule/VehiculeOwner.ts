import Model from "@/model/Model";
import {VehiculeOwnerResponseType} from "@/types/vehicule.type";
import {VSelectProp} from "@/components/form/TextField";

class VehiculeOwner extends Model {
    public id: number
    public first_name: string
    public last_name: string
    public cni_number: string
    public driver_licence_number: string

    constructor(vehiculeOwner: VehiculeOwnerResponseType) {
        super();
        this.id = vehiculeOwner.id
        this.first_name = vehiculeOwner.first_name
        this.last_name = vehiculeOwner.last_name
        this.cni_number = vehiculeOwner.cni_number
        this.driver_licence_number = vehiculeOwner.driver_licence_number
    }

    public get getUsername(){
        return this.capitalizeFirstLetter(`${this.last_name} ${this.first_name}`)
    }

    public static toVehiculeOwners(vehiculeOwners: VehiculeOwnerResponseType[]) {
        return vehiculeOwners.map(v => new VehiculeOwner(v)).reverse()
    }

    static toVSelect(vehiculeOwner: VehiculeOwner[] | undefined) {

        if (!vehiculeOwner) {
            return []
        }
        return vehiculeOwner.map((vc, i) => ({
            label: vc.getUsername,
            value: vc.id.toString()
        } as VSelectProp))

    }
}

export default VehiculeOwner
