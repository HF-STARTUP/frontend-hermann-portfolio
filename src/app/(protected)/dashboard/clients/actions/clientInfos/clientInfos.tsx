"use client";

import React, {MouseEventHandler} from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import Loading from "@/components/ui/Loader";
import MapRouteComponent from "@/app/(protected)/dashboard/geolocation/_components/map/MapRouteComponent";
import {cn} from "@/lib/utils";
import ClientModel from "@/model/client/ClientModel";
import BtnBase from "@/components/elements/BtnBase";
import {AddClientDialog} from "@/app/(protected)/dashboard/clients/actions/addClient/addClientDialog";
import {useGetClient, useGetClients} from "@/hooks/client/useClient";

export const ClientInfosDialog: React.FC<{
    client?: ClientModel,
    isOpen: boolean,
    onClose: (value: boolean) => void,
    isMain?: boolean,
    isSubDialog?: boolean
} & React.HTMLAttributes<HTMLDivElement>> = ({
                                                 isOpen,
                                                 isSubDialog = false,
                                                 client,
                                                 isMain = false,
                                                 onClose,
                                                 children,
                                                 ...props
                                             }) => {
    const [updateClientIsOpen, setUpdateClientIsOpen] = React.useState(false)
    const [clientID, setClientID] = React.useState<string>()
    const {data: lClient, isLoading} = useGetClient(clientID as string)
    //const {handleEndCourse, loading: endingCourse, isSuccess: endingCourseSuccess} = useEndCourse()

    React.useEffect(() => {
        if (isOpen) {
            setClientID(client?.id)
            console.log("Requesting course")
        }
    }, [client, isOpen])

    // React.useEffect(() => {
    //     if (!endingCourse && endingCourseSuccess) {
    //         onClose(true)
    //     }
    // }, [endingCourse, endingCourseSuccess])


    const onEndCourse = () => {
        //handleEndCourse({course_id: client?.id, status: TASK_STATUS.FINISHED})
    }

    const onCancelCourse = () => {
        // handleEndCourse({course_id: client?.id, status: TASK_STATUS.CANCELED})
    }


    return (
        <div {...props}>
            <DialogBase
                isSubDialog={isSubDialog}
                variant={'sm'}
                isOpenned={isOpen}
                onClose={onClose}
                bgType={'whited'}
                //className={"max-w-[1172px] max-h-full"}
            >
                <AdminDialogHead
                    withBack={!isMain}
                    title={'Infos Client'}
                    handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}/>
                <DefaultDialogMainBody>
                    <div className={"grid grid-cols-12 gap-8"}>
                        <div className={"col-span-12"}>
                            {isLoading && <Loading/>}
                            {lClient && <div>
                                <FormGroup adminForm={true} groupTitle={'Informations générales'}>
                                    <CourseInfoItem label={"Nom du client :"}>{lClient.username}</CourseInfoItem>
                                    <CourseInfoItem label={"Email client :"}>{lClient.email}</CourseInfoItem>
                                    <CourseInfoItem label={"Téléphone du client :"}>{lClient.phone}</CourseInfoItem>
                                    {lClient.addressList?.map((adds, i) => (
                                        <CourseInfoItem label={`Adresse ${i + 1}:`} key={i}>{adds}</CourseInfoItem>
                                    ))
                                    }
                                </FormGroup>
                            </div>}
                        </div>
                        <div className={"col-span-12"}>
                            <div
                                className={"w-full bg-slate-100 rounded-lg h-[409px] overflow-hidden"}>
                                <div>
                                    {lClient?.rawAddress && <MapRouteComponent
                                        startAddress={lClient?.rawAddress}
                                    />}
                                </div>
                                <div className={cn(
                                    "h-full w-full flex items-center justify-center",
                                )}>
                                </div>
                            </div>
                        </div>
                    </div>
                </DefaultDialogMainBody>
                {<DialogActions className={`pt-[30px]`}>
                    {/*<BtnBase*/}
                    {/*    to={""}*/}
                    {/*    type={"button"}*/}
                    {/*    color={'red'}*/}
                    {/*    variant={'outline'}*/}
                    {/*    fullwidth={true}*/}
                    {/*    shape={'square'}*/}
                    {/*>*/}
                    {/*    Desactiver le client*/}
                    {/*</BtnBase>*/}
                    <BtnBase
                        to={""}
                        type={"button"}
                        color={'blue'}
                        variant={'contained'}
                        fullwidth={true}
                        shape={'square'}
                        onClick={()=>setUpdateClientIsOpen(true)}
                    >
                        Modifier les infos du client
                    </BtnBase>
                </DialogActions>}
                {lClient&&<AddClientDialog
                    client={lClient}
                    isOpen={updateClientIsOpen}
                    onClose={() => setUpdateClientIsOpen(false)}
                />}
            </DialogBase>
        </div>
    )
}

const CourseInfoItem: React.FC<React.HTMLAttributes<HTMLDivElement> & { label: string }> = ({label, children}) => {
    return (
        <div className={"flex items-center justify-between"}>
            <div className="text-[#506D82] text-sm font-bold leading-7">{label}</div>
            <div className={"text-[#506D82] text-sm font-normal  leading-7"}>{children}</div>
        </div>
    )
}