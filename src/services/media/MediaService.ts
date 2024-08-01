import Service from "@/services/Service";

export enum MediaApiPath {
    Upload = '/file/upload',
}

export type UploadResponseType = {
    id:     number;
    path:   string;
    width:  number;
    height: number;
    size:   number;
    format: string;
}



export type FileUploadInput = {
    file: File
}

class MediaService extends Service {
    private static instance: MediaService = new MediaService();

    private constructor() {
        super();
    }

    public static getInstance(): MediaService {
        return MediaService.instance;
    }

    public static async uploadFile(inputs: FileUploadInput): Promise<UploadResponseType> {
        const formData = new FormData();
        formData.append("file", inputs.file);

        const req = await MediaService.makeRequest<UploadResponseType>(MediaApiPath.Upload, 'POST', formData);

        console.log(req)

        return req;
    }


    protected static async makeRequest<T>(url: string, method: 'GET' | 'POST' | 'PUT', body?: any): Promise<T> {
        return this.getInstance().execHttpRequest<T>({url, method, body});
    }


}

export default MediaService;
