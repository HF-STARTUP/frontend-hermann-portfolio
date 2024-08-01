import Model from "@/model/Model";
import {VSelectProp} from "@/components/form/TextField";
import {GradeResponseType, RoleResponseType} from "@/types/driver.type";

type GradeNameType = 'Intermediaire' | 'Pro' | 'Débutant'

class Grade extends Model {
    public id: number;
    public name: GradeNameType;

    constructor(grade: GradeResponseType) {
        super();
        this.id = grade.id;
        this.name = grade.name as GradeNameType;
    }

    public get getVariant(){
        switch (this.name) {
            case "Intermediaire":
                return 'intermdediaire'
            default:
                return 'pro'
        }
    }

    public static toGrades(grades: GradeResponseType[]): Grade[] {
        return grades.map(v => new Grade(v));
    }

    public static toVSelect(grades: Grade[] | undefined): VSelectProp[] {
        if (!grades) {
            return [];
        }
        return grades.map((sl) => ({
            label: sl.name,
            value: sl.id.toString(),
        }));
    }
}

export class Role extends Model {
    public id: number;
    public name: string;

    constructor(data: RoleResponseType) {
        super();
        this.id = data.id;
        this.name = data.name;
    }

    public static toGrades(datas: RoleResponseType[]): Role[] {
        return datas.map(v => new Role(v));
    }

    public static toVSelect(datas: Role[] | undefined): VSelectProp[] {
        if (!datas) {
            return [];
        }
        return datas.map((sl) => ({
            label: sl.name,
            value: sl.id.toString(),
        }));
    }
}


export default Grade;
