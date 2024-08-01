import React from "react";
import DialogBase, {AdminDialogHead, DialogActions} from "@/components/dialog/Dialog";
import {
    DialogCoverImage,
    DialogSuccessContent,
    DialogSuccessText,
    DialogSuccessTitle
} from "@/components/dialog/DialogContentUtils";

type SimpleSuccessDialogBaseProps = {
    fchild?: React.ReactNode,
    title: string,
    image?: string
}

export const SimpleSuccessDialog: React.FC<SimpleSuccessDialogBaseProps & React.HTMLAttributes<HTMLDivElement>> = ({children, fchild, image, title}) => {

    const [isOpen, setIsOpen] = React.useState(false)

    const handleToggleDialog = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <div onClick={handleToggleDialog}>
                {children}
            </div>
            <DialogBase isSubDialog={true} variant={'sm'} isOpenned={isOpen} onClose={handleToggleDialog}
                        bgType={'whited'}>
                <AdminDialogHead withBack={false} title={''} handleToggle={handleToggleDialog}/>
                {image&&<DialogCoverImage image={image} withSuccess={true}/>}
                <DialogSuccessContent className={`mt-[80px]`}>
                    <DialogSuccessTitle name={title}/>
                    <DialogSuccessText>
                        {fchild}
                    </DialogSuccessText>
                </DialogSuccessContent>
                <DialogActions className={`pt-[35px]`}>
                </DialogActions>
            </DialogBase>
        </div>
    )
}

export const SimpleSuccessDialogWithContent: React.FC<{
    isOpen: boolean,
    handleToggleDialog: ()=> void,
    isSubDialog?: boolean,
} & SimpleSuccessDialogBaseProps & React.HTMLAttributes<HTMLDivElement>
> = ({children, image, title, handleToggleDialog, isSubDialog = true, isOpen, fchild}) => {


    return (
        <div>
            <div onClick={handleToggleDialog}>
                {children}
            </div>
            <DialogBase isSubDialog={isSubDialog} variant={'sm'} isOpenned={isOpen} onClose={handleToggleDialog}
                        bgType={'whited'}>
                <AdminDialogHead withBack={false} title={''} handleToggle={handleToggleDialog}/>
                <DialogCoverImage image={image} withSuccess={true}/>
                <DialogSuccessContent className={`mt-[80px]`}>
                    <DialogSuccessTitle name={title}/>
                    <DialogSuccessText>
                        {fchild}
                    </DialogSuccessText>
                </DialogSuccessContent>
                <DialogActions className={`pt-[35px]`}>
                </DialogActions>
            </DialogBase>
        </div>
    )
}

