"use client";

import React from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import BtnBase from "@/components/elements/BtnBase";
import {useGetEntretiens} from "@/hooks/entretien/useEntretien";
import {AddIcon, CheckStatusIcon, UncheckStatusIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {CarComponent} from "@/model/entretien/Entretien";
import {useGetCarComponent} from "@/hooks/entretien/useCarComponent";
import Loading from "@/components/ui/Loader";
import {
    AddNewCarComponentDialog
} from "@/app/(protected)/dashboard/maintenance/actions/drainProgramming/actions/elementsConcerneds/actions/addNewCarComponentDialog/AddNewCarComponentDialog";
import useEntretienStore from "@/stores/protected/dashboard/entretien/useEntretienStore";
import {useGetCurrency} from "@/hooks/__globlal/useGlobalHook";

export const ElementConcernedDialog: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    const [isOpen, setIsOpen] = React.useState(false)
    const { data: entretiens, isLoading} = useGetEntretiens()
    const { updateEditingMaintenance, editingMaintenance, addMaintenceCar } = useEntretienStore()


    const handleToggleDialog = () => {

        if(editingMaintenance.compID && editingMaintenance.value > 0){
            addMaintenceCar({
                amount: +editingMaintenance.value,
                component_id: editingMaintenance.compID, //TODO: put prev_id here
                uid: `${editingMaintenance.compID}`
            })
        }

        setIsOpen(!isOpen)
    }

    return (
        <div>
            <div onClick={handleToggleDialog}>
                {children}
            </div>
            <DialogBase
                isSubDialog={true}
                variant={'sm'}
                isOpenned={isOpen}
                onClose={handleToggleDialog}
                bgType={'whited'}>
                <form>
                    <AdminDialogHead
                        withBack={true}
                        title={'Éléments concernés'}
                        handleToggle={handleToggleDialog}
                    />
                    <DefaultDialogMainBody>
                        <Elements/>
                    </DefaultDialogMainBody>
                    <DialogActions className={`pt-[30px]`}>
                        <BtnBase
                            to={''}
                            color={'blue'}
                            variant={'contained'}
                            shape={'square'}
                            type={'button'}
                            onClick={handleToggleDialog}
                            fullwidth={true}>Ajouter</BtnBase>
                    </DialogActions>
                </form>
            </DialogBase>
        </div>
    )
}


const Elements = () => {

    const {data: components, isLoading} = useGetCarComponent()
    const [prevID, setPrevID] = React.useState(0)
    const [activeID, setActiveID] = React.useState(0)
    const [activeAmount, setActiveValue] = React.useState('')
    const {addMaintenceCar, maintencesCar, updateEditingMaintenance, editingMaintenance} = useEntretienStore()

    React.useEffect(() => {
        if (activeAmount.length) {
            setActiveValue('')
            addMaintenceCar({
                amount: +activeAmount,
                component_id: prevID, //TODO: put prev_id here
                uid: `${activeID}`
            })
        }
    }, [activeID])

    return (
        <div className={"flex flex-col gap-[22.43px]"}>
            <AddElementButton/>
            {isLoading && <Loading/>}
            {components?.map((_c, i) => (
                <OneElement
                    key={i}
                    carComponent={_c}
                    onValueChange={(value) => {
                        setActiveValue(value)
                        setPrevID(activeID)
                        updateEditingMaintenance({compID: activeID, value: +value})
                    }}
                    onIdChange={(id) => {
                        setActiveID(id)
                    }}
                />
            ))}
        </div>
    )
}


const OneElement: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    carComponent: CarComponent,
    onIdChange: (id: number) => void,
    onValueChange: (v: string) => void
}> = ({
          children,
          carComponent,
          onValueChange,
          onIdChange,
          ...props
      }) => {

    const [checked, setCChecked] = React.useState(false)
    const {currency} = useGetCurrency()

    return (
        <div className={"flex justify-between items-center overflow-hidden"}>
            <div className={"flex items-center gap-[11.22px]"}>
                <button type={"button"} onClick={() => {
                    onIdChange(carComponent.id)
                    setCChecked(!checked)
                }}
                        className={"cursor-pointer opacity-85 hover:opacity-100 transition ease-in"}>
                    {checked && <CheckStatusIcon/>}
                    {!checked && <UncheckStatusIcon/>}
                </button>
                <div className="text-slate-500 text-[16.82px] font-medium leading-7">{carComponent.name}</div>
            </div>
            {checked && <div className={"flex items-center gap-[5.6px]"}>
                <div
                    className={"w-[78px] overflow-hidden border-b border-slate-500 text-slate-600 text-[16.82px] font-medium leading-7"}>
                    <input
                        autoFocus={true}
                        type={"number"}
                        onChange={(e) => onValueChange(e.currentTarget.value)}
                        className={"bg-transparent focus:outline-0 focus:border-0"}
                    />
                </div>
                <div className="w-[29.44px] h-[22.43px] text-slate-500 text-sm font-medium leading-7">{currency}</div>
            </div>}
        </div>
    )
}

const AddElementButton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {

    return (
        <AddNewCarComponentDialog>
            <div
                className={"flex items-center gap-[22px] text-blue-800 font-medium leading-7 hover:opacity-75 group transition ease-in cursor-pointer"}
                {...props}
            >
            <span className={"flex items-center justify-center size-[32px] bg-[#F4F7FE] rounded-[11px]"}>
                <AddIcon className={"group-hover:scale-105"}/>
            </span>
                <span className={"block"}>Ajouter un élément</span>
            </div>
        </AddNewCarComponentDialog>
    )
}