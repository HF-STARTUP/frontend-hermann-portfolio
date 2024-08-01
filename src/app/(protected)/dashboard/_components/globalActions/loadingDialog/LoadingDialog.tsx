import React from "react";
import DialogBase, {AdminDialogHead, DialogActions} from "@/components/dialog/Dialog";
import {RotatingLines} from "react-loader-spinner";

export const LoadingDialog: React.FC<{
    handleToggleDialog: ()=> void,
    isOpen: boolean,
} & React.HTMLAttributes<HTMLDivElement>> = ({handleToggleDialog, isOpen}) => {

    return (
        <div>
            <DialogBase contentBgType={'transparent'} isSubDialog={true} variant={'sm'} isOpenned={isOpen} onClose={handleToggleDialog}
                        bgType={'whited'}>
                    <div className={`flex flex-col items-center justify-center gap-[20px] font-bold text-[28px] text-black text-center leading-[28px] tracking-[-2%] h-[600px]`}>
                        <GafaAppLoader />
                        <div className={`max-w-[372px]`}>En attente de confirmation du chauffeur</div>
                    </div>
                <DialogActions className={`pt-[30px]`}>
                </DialogActions>
            </DialogBase>
        </div>
    )
}

const GafaAppLoader: React.FC = () => {

    return (
        <RotatingLines
            visible={true}
            width={"137"}
            strokeWidth="3"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            strokeColor={'currentcolor'}
        />
    )
}
