import Model from "@/model/Model";
import {CityType} from "@/types/location/location.type";
import {VSelectProp} from "@/components/form/TextField";

class City extends Model {
    id: number;
    name: string;
    state_code: null;
    country_id: number;
    state_id: number;
    longitude: number;
    latitude: number;

    constructor(cityData: CityType) {
        super()
        this.id = cityData.id
        this.name = cityData.name
        this.state_code = cityData.state_code
        this.country_id = cityData.country_id
        this.state_id = cityData.state_id
        this.longitude = cityData.longitude
        this.latitude = cityData.latitude
    }

    get getDisplayName(){
        return this.capitalizeFirstLetter(this.name)
    }

    static toCities(cities: CityType[]): City[] {
        return cities.map(city => new City(city));
    }

    static toVSelect(cities: CityType[] | undefined){
        if(!cities){
            return []
        }
        return cities.map((c, i) => ({
            label: c.name,
            value: c.id.toString()
        } as VSelectProp))

    }
}

export default City
