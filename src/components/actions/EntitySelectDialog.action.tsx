"use client";

import React from 'react';
import DialogBase, {
    AdminDialogHead,
    DefaultDialogMainBody,
    DefaultDialogSearch,
    DialogActions
} from "@/components/dialog/Dialog";
import useAppStore from "@/stores/global/useAppStore";
import {useDynamicSearch} from "@/hooks/__globlal/useGlobalHook";
import {EmptyDialog} from "@/components/box/PageNetworkState";
import BtnBase from "@/components/elements/BtnBase";

interface Entity {
    getFindToken: string
}

interface EntitySelectProps<T extends Entity, U extends React.ComponentType<{
    item: T,
    selectable?: boolean,
    handleSelect?: (item: T) => void
}>> {
    title: string
    emptyMessage: string
    actionLabel?: string
    isOpen: boolean
    onClose: () => void
    onValidate?: () => void
    handleSelectItems?: (items: T[]) => void
    isSelect?: boolean,
    isValid?: boolean,
    closeAfterSelectOne?: boolean,
    selectMultiple?: boolean
    getData: () => T[] | undefined
    DisplayItem: U
    loading?: boolean
}

const EntitySelectDialog = <T extends Entity, U extends React.ComponentType<{
    item: T,
    selectable?: boolean,
    handleSelect?: (item: T, remove?: boolean) => void
}>>({
        title,
        emptyMessage,
        isOpen,
        onClose,
        isSelect = false,
        selectMultiple = true,
        closeAfterSelectOne = true,
        getData,
        DisplayItem,
        actionLabel,
        onValidate,
        loading,
       handleSelectItems,
        isValid = true,
    }: EntitySelectProps<T, U>) => {

    const {getFindToken, getFilterToken, getSortAsc} = useAppStore()
    const [itemsSelected, setItemsSelected] = React.useState<T[]>([])
    const items = getData();

    const dataFiltered = useDynamicSearch<T>(items || [], getFindToken('dialog'), getFilterToken() as keyof T, getSortAsc());


    React.useEffect(()=>{
        if(items) {
            setItemsSelected([]);
        }
    }, [items]);

    React.useEffect(()=>{
        if(itemsSelected){
            handleSelectItems && handleSelectItems(itemsSelected)
        }
    }, [itemsSelected]);


    return (
        <div>
            <DialogBase variant={'sm'} isOpenned={isOpen} onClose={onClose} bgType={'whited'}>
                <AdminDialogHead
                    withBack={isSelect}
                    title={title}
                    handleToggle={onClose}
                />
                <DefaultDialogSearch/>
                <DefaultDialogMainBody>
                    {dataFiltered.map((item, index) => {

                        const handelSelect = (item: T, remove?: boolean)=> {

                            if(!selectMultiple){
                                setItemsSelected([item])
                                closeAfterSelectOne&&onClose()
                                return;
                            }

                            if(remove){
                                setItemsSelected(itemsSelected.filter(selectedItem => selectedItem.getFindToken !== item.getFindToken));
                                return
                            }
                            setItemsSelected([...itemsSelected, item])
                        }

                            const childItem = React.createElement(DisplayItem, {item, selectable: isSelect, handleSelect: handelSelect})

                            return (
                                <div key={index}>
                                    {childItem}
                                </div>
                            )
                        }
                    )}
                    {!dataFiltered.length && items && (
                        <EmptyDialog message={`Aucune donnée ne correspondant à votre recheche.`}/>
                    )
                    }

                    {!dataFiltered.length && !items && (
                        <EmptyDialog message={`Aucune donnée ne correspondant à votre recheche.`}/>
                    )
                    }
                </DefaultDialogMainBody>
                <DialogActions>
                    {onValidate && <BtnBase
                        type={"submit"}
                        color={'blue'}
                        variant={'contained'}
                        fullwidth={true}
                        shape={'square'}
                        loading={loading}
                        disabled={loading || !isValid}
                        onClick={() => {
                            onValidate()
                        }}
                        to={''}>{actionLabel ?? 'Confirmer'}</BtnBase>}
                </DialogActions>
            </DialogBase>
        </div>
    );
};

export default EntitySelectDialog;
