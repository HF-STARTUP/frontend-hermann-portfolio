import * as React from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import BtnBase from "@/components/elements/BtnBase";
import TextField from "@/components/form/TextField";
import {useAddCarComponent} from "@/hooks/entretien/useCarComponent";

export const AddNewCarComponentDialog: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    const [isOpen, setIsOpen] = React.useState(false)
    const [name, setName] = React.useState('')
    const {handleCreateCarComponent, loading, data, isSuccess} = useAddCarComponent()

    const handleToggleDialog = () => {
        setIsOpen(!isOpen)
    }

    const handleCreteComponent = async ()=> {
        if(name.length > 3){
            await handleCreateCarComponent({name})
        }
    }

    React.useEffect(()=>{
        if(data && isSuccess){
            handleToggleDialog()
        }
    }, [data, isSuccess])

    return(
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
                        title={'Nouvel élément'}
                        handleToggle={handleToggleDialog}
                    />
                    <DefaultDialogMainBody>
                        <TextField
                            size={'md'}
                            label={'Nom de l’éléménr'}
                            required={true}
                            onChange={(e)=>setName(e.currentTarget.value)}
                        />
                    </DefaultDialogMainBody>
                    <DialogActions className={`pt-[30px]`}>
                        <BtnBase
                            to={''}
                            color={'blue'}
                            variant={'contained'}
                            shape={'square'}
                            type={'button'}
                            loading={loading}
                            disabled={loading}
                            onClick={handleCreteComponent}
                            fullwidth={true}>Ajouter</BtnBase>
                    </DialogActions>
                </form>
            </DialogBase>
        </div>
    )
}
