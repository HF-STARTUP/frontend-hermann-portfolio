"use client";

import TextField, {SelectField, VSelectProp} from "@/components/form/TextField";
import CardDefault from "@/components/box/Card";
import FormGroup from "@/components/box/FormGroup";
import React from "react";

const DemoPersonalInfoForm = ()=>{

    const floatSizeSelect = [
        {label: '05', value: '05'},
        {label: '08', value: '08'},
    ] satisfies VSelectProp[]

    const fonctionalities = [
        {value: 'all', label: 'Toutes'},
        {value: 'limit', label: 'Limité'},
    ] satisfies VSelectProp[]

    return(
        <CardDefault>
            <FormGroup>
                <TextField label={'Nom et prénom*'} placeholder={'Wilfried Tchamba'} />
                <TextField label={'Adresse email*'} placeholder={'Wilfried Tchamba@gmail.com'} />
                <TextField label={'Nom de la société*'} placeholder={'Nom de la société'} />
                <TextField label={'Site web*'} placeholder={'www.site.com'} />
                <SelectField label={'Taille de la flotte'} items={floatSizeSelect} />
                <SelectField label={'Fonctionnalité souhaitée'} items={fonctionalities} />
            </FormGroup>
        </CardDefault>
    )
}

export default DemoPersonalInfoForm
