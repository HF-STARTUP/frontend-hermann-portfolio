export type DisplayTableHeadProps = {
    head: string[]
}


export type DisplayTableBodyProps = {
    body?: any[][]
}

export type DisplayTableFooter = {
    footer: string[]
    footer2?: string[]
}

export type DisplayPropsUtils = {
    variant?: 'default' | 'v2'
}

export type AdminDataTableDisplayProps =
    {
        callback?: (index?: number) => void
    }
    & DisplayTableHeadProps
    & DisplayTableBodyProps
    & DisplayTableFooter
    & DisplayPropsUtils

