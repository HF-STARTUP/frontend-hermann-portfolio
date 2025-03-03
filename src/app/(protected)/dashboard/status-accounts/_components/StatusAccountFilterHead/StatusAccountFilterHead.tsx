"use client";

import {FieldDate, SelectField} from "@/components/form/TextField";

const StatusAccountFilterHead = () => {

    const carBrandsFilter = [{label: 'Toyota', value: 'Toyota'}, {label: 'Yaris', value: 'yaris'}]
    const carModelsFilter = [{label: 'Corolla2008', value: '1'}, {label: 'Corolla2009', value: '2'}]
    const carImatriculationFilter = [{label: 'Saisie avec proposition en liste déroulante', value: '1'}]
    const carClassFilter = [{label: 'Confort', value: '1'}]
    const driverNameFilter = [{label: 'Nom', value: '1'}]

    return (
        <div></div>
    )

  return(
      <div className={`flex gap-[29px] mb-[26px]`}>
        <FieldDate label={'Période'}  />
        <SelectField label={'Marque véhicule'} items={carBrandsFilter} />
        <SelectField label={'Modèle véhicule'} items={carModelsFilter} />
        <SelectField label={'Immatriculation véhicule'} items={carImatriculationFilter} />
        <SelectField label={'Classe véhicule'} items={carClassFilter} />
        <SelectField label={'Nom du chauffeur'} items={driverNameFilter} />
      </div>
  )
}

export default StatusAccountFilterHead
