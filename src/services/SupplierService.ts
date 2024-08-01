import Service from "@/services/Service";
import {VehiculeResponseType} from "@/types/vehicule.type";
import {AddNewSupplierCtgInputs, AddSupplierInputs} from "@/schema/supplier.schema";
import {useMutation, useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "@/utils/const/queryKeys";
import {SupplierCtgResponseType, SupplierResponseType} from "@/types/supplier.type";
import Supplier, {SupplierCtg} from "@/model/supplier/Supplier";
import {ResponseWithPagination} from "@/types/generic";

const supplierServiceRoutes = {
    addSupplier: '/supplier',
    addNewSupplierCtg: '/supplier/category',
    suspendSupplier: '/supplier/deactivate',
    unsuspendSupplier: '/supplier/activate',
    getSuppliersCtg: '/supplier/categories',
    getSupplier: '/supplier',
}


class SupplierService extends Service {
    private static instance: SupplierService = new SupplierService();

    constructor() {
        super('');
    }

    static getInstance() {
        return SupplierService.instance;
    }

    private static async addSupplier(formData: AddSupplierInputs) {

        const isUpdate = !!formData?.id

        const response = await SupplierService.getInstance().execHttpRequest<SupplierResponseType>({
            url: supplierServiceRoutes.addSupplier + (isUpdate ? `/${formData.id}` : ''),
            method: SupplierService.getInstance().httpMethods[isUpdate ? 'update' : 'post'],
            body: formData,
        })
        return response
    }

    static addSupplierMutation() {
        return useMutation({mutationFn: SupplierService.addSupplier})
    }

    static async invalidSuppliers() {
        return await SupplierService.getInstance().queryClient.invalidateQueries({queryKey: [QUERY_KEYS.supplier.getSuppliers]})
    }



    private static async addNewSupplierCtg(formData: AddNewSupplierCtgInputs) {
        const response = await SupplierService.getInstance().execHttpRequest<SupplierCtgResponseType>({
            url: supplierServiceRoutes.addNewSupplierCtg,
            method: SupplierService.getInstance().httpMethods.post,
            body: formData,
        })
        return new SupplierCtg(response)
    }

    static addNewSupplierCtgMutation() {
        return useMutation({mutationFn: SupplierService.addNewSupplierCtg})
    }

    private static async getSuppliersCtg() {
        const response = await SupplierService.getInstance().execHttpRequest<SupplierCtgResponseType[]>({
            url: supplierServiceRoutes.getSuppliersCtg,
            method: SupplierService.getInstance().httpMethods.get,
        })
        return SupplierCtg.toSuppliers(response)
    }

    static getSuppliersCtgQuery() {
        return useQuery({queryKey: [QUERY_KEYS.supplier.getSuppliersCtg], queryFn: SupplierService.getSuppliersCtg})
    }

    static async invalidSuppliersCtg() {
        return await SupplierService.getInstance().queryClient.invalidateQueries({queryKey: [QUERY_KEYS.supplier.getSuppliersCtg]})
    }

    private static async getSuppliers(regionID: string) {
        const response = await SupplierService.getInstance().execHttpRequest<ResponseWithPagination<SupplierResponseType[]>>({
            url: supplierServiceRoutes.getSupplier+`?park_id=${regionID}`,
            method: SupplierService.getInstance().httpMethods.get,
        })
        return Supplier.toSuppliers(response.data)
    }

    static getSuppliersQuery(regionID: string) {
        return useQuery({
            queryKey: [QUERY_KEYS.supplier.getSuppliers],
            enabled: !!regionID,
            queryFn:()=>SupplierService.getSuppliers(regionID)
        })
    }

    private static async toggleSuspension({id, mode }: {id: string, mode: 'suspend'|'unsuspend'}) {

        const isUnsuspension = mode === 'unsuspend'

        const response = await SupplierService.getInstance().execHttpRequest<SupplierCtgResponseType>({
            url: (isUnsuspension ? supplierServiceRoutes.unsuspendSupplier : supplierServiceRoutes.suspendSupplier)+`/${id}`,
            method: SupplierService.getInstance().httpMethods.update,
        })
        return new SupplierCtg(response)
    }

    static toggleSuspensionMutation() {
        return useMutation({mutationFn: SupplierService.toggleSuspension})
    }
}

export default SupplierService

