import React from "react";
import DialogBase, {AdminDialogHead, DialogActions} from "@/components/dialog/Dialog";
import {DialogCoverImage} from "@/components/dialog/DialogContentUtils";
import Chip from "@/components/box/Chip";
import BtnBase from "@/components/elements/BtnBase";
import {
    SimpleSuccessDialog, SimpleSuccessDialogWithContent
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";
import Driver from "@/model/driver/Driver";
import {useSuspendDriver} from "@/hooks/driver/useDriver";
import {toast} from "react-toastify";
import loading = toast.loading;
import notify from "@/utils/func/notification";


export const SuspendDriverDialog: React.FC<{
    isOpen: boolean,
    driver: Driver,
    mode?: 'suspend' | 'unsuspend',
    handleToggleDialog: () => void,
} & React.HTMLAttributes<HTMLDivElement>> = ({children, handleToggleDialog, isOpen, driver, mode}) => {

    const isUnsuspend = mode === 'unsuspend'

    const [successIsOpen, setSuccessIsOpen] = React.useState(false)
    const [suspendDays, setSuspendDays] = React.useState<number>(1)
    const {isLoading, refresh, isSuccess, isError, error, mutate} = useSuspendDriver()

    const initialDays = 1

    React.useEffect(()=>{
        if(isSuccess && !isLoading){
            const timout = setTimeout(()=>{
                handleToggleDialog()
                clearTimeout(timout)
            }, 1000)
            refresh().then()
            setSuccessIsOpen(true)
            notify(isUnsuspend ? 'Suspension levé avec success' : 'Suspension effectué avec success', 'success')
        }
        if(isError && !isLoading){
            notify('Une erreur est survenus lors de l\'opération', 'error')
        }
    }, [isSuccess, isError, error])

    const handleSuspendDriver = ()=> {
        if(isUnsuspend){
            mutate({id: driver.id, days: suspendDays, mode: 'unsuspend'})
        }else {
            mutate({id: driver.id, days: suspendDays})
        }
    }

    return (
        <div>
            <DialogBase isSubDialog={false} variant={'sm'} isOpenned={isOpen} onClose={handleToggleDialog}
                        bgType={'whited'}>
                <AdminDialogHead withBack={false} title={'Suspendre chauffeur '} handleToggle={handleToggleDialog}/>
                <DialogCoverImage image={driver.getAvatar} withSuccess={false}>
                    <Chip name={driver.getGrade}/>
                </DialogCoverImage>
                <div className={`flex flex-col gap-[5px] py-[40px]`}>
                    {!isUnsuspend&&<h4
                        className={`font-medium text-admin-primary text-[24.64px] leading-[32.82px] tracking-[-1.07px] text-center`}>
                        {driver.getUsername}
                    </h4>}

                    {/*{isUnsuspend&&<div className="max-w-[368px] text-admin-primary m-auto text-center text-lg font-medium font-['DM Sans'] leading-[23.04px]">*/}
                    {/*    <span className="font-bold">{driver.getUsername} </span>*/}
                    {/*    <span className="">est encore en suspension<br/>jours restants : {driver.getSuspendRestDays}</span>*/}
                    {/*</div>}*/}
                    {/*<p*/}
                    {/*    className={`font-normal text-admin-primary text-[16px] leading-[28px] tracking-[-1.07px] text-center`}*/}
                    {/*>*/}
                    {/*    {isUnsuspend ? 'Prolonger la durée de la suspension' : 'Définir la durée de la suspension'}*/}
                    {/*</p>*/}
                    <SuspendCount initial={initialDays} onUpdateDay={(d)=>setSuspendDays(d)}/>
                </div>
                <DialogActions className={`pt-[10px]`}>
                    <BtnBase
                        color={'blue'}
                        variant={'contained'}
                        fullwidth={true}
                        shape={'square'}
                        to={''}
                        loading={isLoading}
                        disabled={isLoading}
                        onClick={handleSuspendDriver}
                    >
                        {isUnsuspend ? 'Reactiver le chauffeur' : 'Désactiver le chauffeur'}
                    </BtnBase>
                </DialogActions>
            </DialogBase>
            <>
                <SimpleSuccessDialogWithContent
                    isSubDialog={false}
                    isOpen={successIsOpen}
                    handleToggleDialog={()=>{
                        setSuccessIsOpen(false)

                    }}
                    fchild={
                    <div>
                        {!isUnsuspend && <div>
                            La suspension du chauffeur <b>{driver.getUsername}</b> a été levée.
                        </div>}


                        {isUnsuspend && <div>
                            <b>{driver.getUsername}</b> a été suspendu pour une durée de <b>{suspendDays} Jours.</b>
                        </div>}

                    </div>
                }
                    title={!isUnsuspend ? `Suspension levé avec succès.` : `Suspension effectuée avec succès.`}
                    image={driver.getAvatar}>

                </SimpleSuccessDialogWithContent>
            </>
        </div>
    )
}

const SuspendCount: React.FC<{initial:number, onUpdateDay:(v:number)=>void}&React.HTMLAttributes<HTMLDivElement>> = ({onUpdateDay, initial}) => {

    const [day, setDay] = React.useState(initial)

    React.useEffect(()=>{
        if(day){
            onUpdateDay(day)
        }
    }, [setDay, day])

    return (
        <div className={`flex items-center justify-center gap-[7px]`}>
            <CountBtn value={'-'} onClick={()=>day > 1 && setDay(day - 1)} />
            <CountValue value={day} suffix={'Jours'} />
            <CountBtn value={'+'} onClick={()=>setDay(day + 1)} />
        </div>
    )
}

const CountBtn: React.FC<{ value: '-' | '+' } & React.HTMLAttributes<HTMLButtonElement>> = ({value, ...props}) => {

    return (
        <button className={`size-[33px] text-center border-[0.39px] border-admin-primary align-middle 
            flex items-center justify-center bg-white text-admin-primary rounded-[7.86px] hover:bg-slate-200 transition duration-200 select-none`} {...props}>{value}</button>
    )
}

const CountValue: React.FC<{ value: number, suffix: string }> = ({value, suffix}) => {

    return (
        <div className={`text-[16px] font-bold leading-[20.48px] tracking-[-1.68px] flex items-center gap-2`}>
            <div>{value}</div>
            <div>{suffix}</div>
        </div>
    )
}

