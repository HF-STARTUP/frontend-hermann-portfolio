import {StaticImageData} from "next/image";

export type ProductType = {
    cover: StaticImageData
    title: string
    color: string
    description: string
}

export type ResponseWithPagination<T> = {
    data: T
    totalRecords: number
    totalPages: number
    currentPage: number
    itemPerPage: number
}

export type RegionID = string
