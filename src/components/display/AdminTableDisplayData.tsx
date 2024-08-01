import React from "react";
import {
    TableContainer,
    TableHead,
    TBody,
    TFoot,
    TFootOption,
    ThHeadOption,
    ThOption,
    TrBody,
    TrFoot,
    TrHead
} from "@/components/display/DefaultAdminTable";
import {
    AdminDataTableDisplayProps, DisplayPropsUtils,
    DisplayTableBodyProps,
    DisplayTableFooter,
    DisplayTableHeadProps
} from "@/types/dataDisplayTable";


const AdminTableDisplay: React.FC<{data: AdminDataTableDisplayProps}> = ({data}) => {

    const {head, body, footer, footer2} = data

    return (
        <TableContainer>
            <DisplayTableHead variant={data.variant} head={head}/>
            <DisplayTableBody callback={data.callback} body={body}/>
            {footer2 && <DisplayTableFooter footer={footer2}/>}
            <DisplayTableFooter variant={data.variant}  footer={footer}/>
        </TableContainer>
    )
}


const DisplayTableHead: React.FC<DisplayTableHeadProps & DisplayPropsUtils> = ({head, variant}) => {
    return (
        <TableHead>
            <TrHead>
                {head.map((headOption, key) => (<ThHeadOption variant={variant} name={headOption} key={key}/>))}
            </TrHead>
        </TableHead>
    )
}


const DisplayTableBody: React.FC<DisplayTableBodyProps & DisplayPropsUtils & {callback?: ()=>void}> = ({body, callback}) => {
    return (
        <TBody>
            {
                body?.map((row, key) => (
                    <TrBody callback={callback}  key={key} >
                        {row.map((item, index) => (<ThOption name={item} key={index}/>))}
                    </TrBody>
                ))
            }
        </TBody>
    )
}

const DisplayTableFooter: React.FC<DisplayTableFooter & DisplayPropsUtils> = ({footer, variant, }) => {
    return (
        <TFoot>
            <TrFoot variant={variant}>
                {footer.map((item, key) => (
                    <TFootOption variant={variant}  name={item} key={key}/>
                ))}
            </TrFoot>
        </TFoot>
    )
}

export const DataTableActionBtnGroup:React.FC<{children: React.ReactNode}> = ({ children })=> {
    return(
        <div className={`flex gap-[22px] justify-center items-center`}> { children } </div>
    )
}


export default AdminTableDisplay
