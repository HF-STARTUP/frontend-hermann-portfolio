export type DisplayTableHeadProps = {
    head: string[]
}


export type DisplayTableBodyProps = {
    body?: string[][]
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
        callback?: () => void
    }
    & DisplayTableHeadProps
    & DisplayTableBodyProps
    & DisplayTableFooter
    & DisplayPropsUtils

