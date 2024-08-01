import {EmojiIcon, FileAddIcon, WarningIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import React, {LegacyRef, useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import EmojiPicker from "emoji-picker-react";
import usePrompStore from "@/app/(protected)/dashboard/chat/_store/usePrompStore";
import {useChatSocket} from "@/lib/socketio";
import Image from "next/image";
import {useUploadFile} from "@/hooks/__globlal/useMedia";
import {imageBaseUrl} from "@/model/Model";


export const ChatInputPrompt = () => {

    const {socket, sendTextMessage, } = useChatSocket()
    const {promptValue, setPromptValue} = usePrompStore()



    const onSendTextMessage = ()=> {
        if(!promptValue.length) return
        sendTextMessage(promptValue)
        setPromptValue("")
    }


    return (
        <div className={"flex gap-[24px] py-4"}>
            <InputActions/>
            <form onSubmit={(e)=>{
                e.preventDefault()
                onSendTextMessage()
            }} className={"w-full"}>
                <div className={"flex w-full bg-[#F4F4F4] rounded-xl overflow-hidden border-2 border-[#EFEFEF] p-1"}>
                    <InputText/>
                    <SendMessageBtn/>
                </div>
            </form>
        </div>
    )
}


const InputText = () => {

    const {promptValue, setPromptValue} = usePrompStore()

    return (
        <div className={" w-full"}>
            <input className={cn(
                "w-full h-12 pl-3 pr-1 py-1  rounded-l-[5px] bg-transparent focus:border-0 outline-0",
                "focus:border-transparent outline:border-transparent text-zinc-900 text-[15px] font-medium  leading-normal"
            )}
            type="text"
            placeholder={"Écrivez votre message ici"}
                   value={promptValue}
                   onChange={e=>setPromptValue(e.currentTarget.value)}
            />
        </div>
    )
}

const SendMessageBtn: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({children}) => {

    const {socket, sendTextMessage, } = useChatSocket()
    const {promptValue, setPromptValue} = usePrompStore()



    const onSendTextMessage = ()=> {
        if(!promptValue.length) return
        sendTextMessage(promptValue)
        setPromptValue("")
    }

    return (
        <SendBtnCore  onClick={onSendTextMessage}>
            Envoyer
        </SendBtnCore>
    )
}

export const SendBtnCore: React.FC<React.HTMLAttributes<HTMLButtonElement>&{disabled?: boolean}> = ({children, disabled, className, ...props})=> {
    return (
        <button
            disabled={disabled}
            className={cn(
                "px-4 py-2 hover:bg-blue-700 transition bg-blue-800 rounded-lg text-neutral-50 text-[15px] font-medium leading-normal",
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}

const InputActions = () => {

    const [file, setFile] = React.useState<File>()
    const [preview, setPreview] = React.useState<string>()
    const {promptValue, setPromptValue} = usePrompStore()
    const [menuOpen, setMenuOpen] = useState(false);

    const {onUploadFile, loading, data} = useUploadFile()
    const {sendTextMessage} = useChatSocket()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            setFile(files[0]);  // Mise à jour pour utiliser la valeur correcte
            const objectURL = URL.createObjectURL(files[0]);
            setPreview(objectURL);
            setMenuOpen(true);  // Ouvrir le menu lorsque le fichier est chargé
        }
    };

    useEffect(() => {
        // Fermer le menu lorsque la prévisualisation est retirée
        if (!preview) {
            setMenuOpen(false);
        }
    }, [preview]);

    const btnImgRef = useRef<HTMLButtonElement>()

    React.useEffect(()=>{
        if(preview){
            if(btnImgRef.current){
                console.log("before")
                console.log(btnImgRef.current)
                console.log("Show preview")
               void  btnImgRef.current.click()
            }
        }
    }, [preview])

    React.useEffect(()=>{
        if(!loading&&data){
            setMenuOpen(false)
            console.log("File uploaded")
            console.log(data)
            sendTextMessage(data.path, true)
        }
    }, [loading, data])

    return (
        <div className={"flex items-center gap-[24px]"}>
            <input className={"hidden"} id={"file-select"} type={"file"} onChange={handleFileChange}/>
            <label htmlFor="file-select" className={"cursor-pointer flex items-center justify-center"}>
                <FileAddIcon className={"text-[#6F767E]"}/>
                <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                    <DropdownMenuTrigger asChild>
                        <button className={"size-0"}>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {preview && <Image src={preview} alt={"img"} width={400} height={400}/>}
                        <div className={"py-2 flex items-end justify-end"}>
                            <SendBtnCore
                                onClick={()=>{
                                    file&&onUploadFile({file})
                                }}
                                disabled={loading}
                                children={`${loading ? "Envoie en cour..." : "Envoyer"}`}
                            />
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </label>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button>
                        <EmojiIcon className={"text-[#6F767E]"}/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <EmojiPicker
                        onEmojiClick={(e) => {
                            setPromptValue(promptValue + `${e.emoji}`)
                        }}
                    />
                </DropdownMenuContent>
            </DropdownMenu>


            {/*<InputAction>*/}
            {/*    <WarningIcon/>*/}
            {/*</InputAction>*/}
        </div>
    )
}


const InputAction: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    return (
        <button>
            {children}
        </button>
    )
}
