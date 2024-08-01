import {useMutation} from "@tanstack/react-query";
import MediaService, {FileUploadInput} from "@/services/media/MediaService";

export const useUploadFile = ()=>{

    const {mutate: onUploadFile} = useMutation({
        mutationFn: MediaService.uploadFile
    })

    const handleUploadFile = (fileInputs: FileUploadInput)=> {
        onUploadFile(fileInputs)
    }

    return{
        handleUploadFile
    }
}