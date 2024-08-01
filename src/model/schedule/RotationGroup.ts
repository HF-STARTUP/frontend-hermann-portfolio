import Model from "@/model/Model";
import {RotationGroupType} from "@/types/schedule/schedule.type";
import {VSelectProp} from "@/components/form/TextField";

class RotationGroup extends Model {
    id: number;
    name: string | null;
    group_id: string | null;
    passationType: string;
    vehiclePrincipalDriverAssignment: string;
    vehicleInterimDriverAssignment: string;
    region_id: string;
    rotationGroup_on_Vehicles: any[];

    constructor(rotationGroupData: RotationGroupType) {
        super();
        this.id = rotationGroupData.id;
        this.name = rotationGroupData.name;
        this.group_id = rotationGroupData.group_id;
        this.passationType = rotationGroupData.passationType;
        this.vehiclePrincipalDriverAssignment = rotationGroupData.vehiclePrincipalDriverAssignment;
        this.vehicleInterimDriverAssignment = rotationGroupData.vehicleInterimDriverAssignment;
        this.region_id = rotationGroupData.region_id;
        this.rotationGroup_on_Vehicles = rotationGroupData.rotationGroup_on_Vehicles;
    }

    static toRotationGroups(rotationGroupsData: RotationGroupType[]): RotationGroup[] {
        return rotationGroupsData.map(rotationGroupData => new RotationGroup(rotationGroupData)).reverse();
    }

    get getDisplatName(){
        return this.name ?? `Group ${this.id}`
    }

    get getDriversCount(){
        return 0
    }

    get getInterimaireCount(){
        return 0
    }

    get getVehiculeCount(){
        return 0
    }

    static toVSelect(rotationGroupsData: RotationGroup[] | undefined): VSelectProp[] {
        if (!rotationGroupsData) {
            return [];
        }
        return rotationGroupsData.map(rotationGroup => ({
            label: rotationGroup.getDisplatName,
            value: ''+rotationGroup.id
        }));
    }
}

export default RotationGroup