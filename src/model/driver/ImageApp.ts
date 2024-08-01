import Model from "@/model/Model";
import {ImageType} from "@/types/driver.type";
import Image from "next/image";

class ImageApp extends Model{
    private id: number;
    public path: string;
    private width: number;
    private height: number;
    private size: number;
    private format: string;
    private maintenance_id: number | null;


    constructor(imageApp: ImageType) {
        super()
        this.id = imageApp.id;
        this.path = imageApp.path;
        this.height = imageApp.height;
        this.width = imageApp.width;
        this.size = imageApp.size;
        this.format = imageApp.format;
        this.maintenance_id = imageApp.maintenance_id;
    }

    public get getPath(){
        return this.resolveImage(this.path)
    }

    public static toImageApps(imageDataArray: ImageType[]): ImageApp[] {
        return imageDataArray.map(data => new ImageApp(data));
    }
}

export default ImageApp
