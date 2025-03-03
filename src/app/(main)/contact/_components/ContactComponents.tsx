"use client";

import FormGroup from "@/components/box/FormGroup";
import TextField, {SelectField, TextArea} from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";

export const ContactInfo = () => {
    return (
        <div className={`relative mb-[24px] lg:mb-0`}>
            <div className="flex flex-col gap-[15px] lg:gap-[27px] ">
                <div className="text-white text-2xl lg:text-6xl font-bold leading-7  lg:leading-[45px]">Prenez contact<br/>avec
                    nous
                </div>
                <div className="text-white text-sm lg:text-[32px] font-medium lg:leading-[30px]">Nous prenons
                    toujours le temps<br/>de vous lire
                </div>
            </div>
        </div>
    )
}

export const ContactForm = () => {

    const FLOAT_SIZES = [
        {
            label: '12',
            value: '12'
        },
        {
            label: '35',
            value: '5'
        },
    ]

    return (
        <div className={``}>
            <div className={`px-4 py-[18px] bg-white rounded-md border border-neutral-400 border-opacity-60`}>
                <div className={`w-full`}>
                    <FormGroup>
                        <TextField label={'Nom et prénom*'} placeholder={'Wilfried Tchamba'}/>
                        <TextField label={'Numéro de téléphone'} placeholder={'+237698455215'}/>
                        <TextField label={'Adresse email*'} placeholder={'wilfriedtchamba@gmail.com'}/>
                        <SelectField label={'Taille de la flotte'} items={FLOAT_SIZES}/>
                        <TextArea label={'Question*'} placeholder={'Saisir votre question ici'}/>
                    </FormGroup>
                </div>
            </div>
           <div className={`mt-[27px] flex justify-start items-start w-full`}>
               <BtnBase fit={true} color={'yellow'} variant={'contained'} to={''}>Soumettre</BtnBase>
           </div>
        </div>
    )
}
