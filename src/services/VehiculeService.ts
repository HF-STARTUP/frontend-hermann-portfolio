import Service from "@/services/Service";
import {useMutation, useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "@/utils/const/queryKeys";
import {
    ContractTypeResponseType,
    CurencyResponseType,
    VehiculeBrandResponseType,
    VehiculeContratTypeResponseType,
    VehiculeGroupResponseType,
    VehiculeModelResponseType,
    VehiculeOwnerResponseType,
    VehiculeResponseType,
    VehiculeTypeResponseType
} from "@/types/vehicule.type";
import VehiculeType from "@/model/vehicule/VehiculeType";
import VehiculeBrand from "@/model/vehicule/VehiculeBrand";
import VehiculeModel from "@/model/vehicule/VehiculeModel";
import VehiculeColors from "@/model/vehicule/VehiculeColors";
import VehiculeContratsType from "@/model/vehicule/VehiculeContratsType";
import Curency from "@/model/vehicule/Curency";
import {
    AddNewContraTypeInputs,
    AddNewVehiculeGroupInputs,
    AddVehiculeInputs,
    AddVehiculeOwnerInputs,
    MakePassationTransfertInputs
} from "@/schema/vehicule.schema";
import VehiculeOwner from "@/model/vehicule/VehiculeOwner";
import Vehicule from "@/model/vehicule/Vehicule";
import Vehicle from "@/model/vehicule/Vehicule";
import VehiculeContract from "@/model/vehicule/VehiculeContrat";
import {logger} from "@/utils/func/devmode/debug";
import VehiculeGroup from "@/model/vehicule/VehiculeGroup";

const vehicleServiceRoutes = {
    getVehiculeType: 'vehicle-type',
    getVehiculeBrand: 'brand?itemPerPage=1000&page=1',
    getVehiculeModel: 'model',
    getVehiculeColors: 'color',
    getVehicle: 'vehicle',
    getCurencies: 'currency',
    getVehiculeContratsType: 'vehicle-contract',
    deactivateVehicule: 'vehicle/deactivate',
    activateVehicule: 'vehicle/activate',
    getVehiculeOwner: 'vehicle-owner',
    addVehiculeOwner: 'vehicle-owner',
    addVehicule: 'vehicle',
    updateVehicule: 'vehicle/update',
    getVehicules: 'vehicle',
    makePassationTransfert: 'make-transfer',
    addNewContratType: 'vehicle-contract',
    addNewVehiculeGroup: 'vehicle-group/add',
    getVehiculesGroup: 'vehicle-group',
    deleteVehiculeGroup: 'vehicle-group/delete',
    featuredExpiredDocument: 'vehicle-document/future-expired',
    vehicleAllData: '/vehicle/all-data',
}


class VehiculeService extends Service {

    private static instance: VehiculeService = new VehiculeService();

    constructor() {
        super('');
    }

    static getInstance() {
        return VehiculeService.instance;
    }

    static async getVehiculesFeaturedExpired(parkID: string) {
        const response = await VehiculeService.getInstance().execHttpRequest<{ data: VehiculeResponseType[] }>({
            url: vehicleServiceRoutes.featuredExpiredDocument,
            method: VehiculeService.getInstance().httpMethods.get,
        })
        return Vehicle.toVehicles(response.data)
    }


    private static async getVehiculeType() {
        const response = await VehiculeService.getInstance().execHttpRequest<VehiculeTypeResponseType[]>({
            url: vehicleServiceRoutes.getVehiculeType,
            method: VehiculeService.getInstance().httpMethods.get,
        })
        return VehiculeType.toVehiculeTypes(response)
    }


    //TODO: request all paginations
    private static async getVehiculeBrand() {
        const response = await VehiculeService.getInstance().execHttpRequest<VehiculeBrandResponseType>({
            url: vehicleServiceRoutes.getVehiculeBrand,
            method: VehiculeService.getInstance().httpMethods.get,
        })

        return VehiculeBrand.toVehiculeBrands(response.data)
    }

    private static async getVehiculeModel(brandID: number | null) {
        const response = await VehiculeService.getInstance().execHttpRequest<VehiculeModelResponseType>({
            url: vehicleServiceRoutes.getVehiculeModel + '/' + brandID,
            method: VehiculeService.getInstance().httpMethods.get,
        })
        return VehiculeModel.toVehiculeModel(response.data)
    }

    private static async getVehiculeColors() {
        const response = await VehiculeService.getInstance().execHttpRequest<VehiculeContratTypeResponseType[]>({
            url: vehicleServiceRoutes.getVehiculeColors,
            method: VehiculeService.getInstance().httpMethods.get,
        })
        return VehiculeColors.toVehiculeColors(response)
    }


    private static async getCurencies() {
        const response = await VehiculeService.getInstance().execHttpRequest<CurencyResponseType[]>({
            url: vehicleServiceRoutes.getCurencies,
            method: VehiculeService.getInstance().httpMethods.get,
            secure: false
        })
        return Curency.toCurencies(response)
    }

    private static async getVehiculeOwner() {
        const response = await VehiculeService.getInstance().execHttpRequest<VehiculeOwnerResponseType[]>({
            url: vehicleServiceRoutes.getVehiculeOwner,
            method: VehiculeService.getInstance().httpMethods.get,
        })
        return VehiculeOwner.toVehiculeOwners(response)
    }

    private static async addVehiculeOwner(formData: AddVehiculeOwnerInputs) {
        const response = await VehiculeService.getInstance().execHttpRequest<VehiculeOwnerResponseType>({
            url: vehicleServiceRoutes.addVehiculeOwner,
            method: VehiculeService.getInstance().httpMethods.post,
            body: formData,
        })

        return new VehiculeOwner(response)
    }

    private static async addVehicule(formData: AddVehiculeInputs) {

        const {id, park_id, recipes, vehicle_owner_id, ...form} = formData

        const isUpdate = !!formData.id

        const response = await VehiculeService.getInstance().execHttpRequest<VehiculeResponseType>({
            url: isUpdate ? vehicleServiceRoutes.updateVehicule + `/${formData.id}` : vehicleServiceRoutes.addVehicule,
            method: VehiculeService.getInstance().httpMethods[isUpdate ? 'update' : 'post'],
            toFormdata: true,
            body: {
                ...form,
                recipes: JSON.stringify(recipes),
                park_id: !isUpdate ? park_id : undefined,
                vehicle_owner_id: vehicle_owner_id ?? undefined
            },
        })

        console.log(`[${JSON.stringify(response)}]`)

        return new Vehicule(response)
    }

    private static async getVehicules(parkID: string) {
        const response = await VehiculeService.getInstance().execHttpRequest<{ data: VehiculeResponseType[] }>({
            url: vehicleServiceRoutes.getVehicules + `?park_id=${parkID}`,
            method: VehiculeService.getInstance().httpMethods.get,
        })
        return Vehicle.toVehicles(response.data)
    }

    static async getVehicule(vehicleID: string) {
        const response = await VehiculeService.getInstance().execHttpRequest<VehiculeResponseType>({
            url: vehicleServiceRoutes.getVehicle + `/${vehicleID}`,
            method: VehiculeService.getInstance().httpMethods.get,
        })
        return new Vehicule(response)
    }

    static async getVehiculeAllData(vehicleID: string) {
        const response = await VehiculeService.getInstance().execHttpRequest<VehiculeResponseType>({
            url: vehicleServiceRoutes.vehicleAllData + `/${vehicleID}`,
            method: VehiculeService.getInstance().httpMethods.get,
        })
        return new Vehicule(response)
    }

    static getVehiculeTypeQuery() {
        return useQuery({queryKey: [QUERY_KEYS.vehicule.getVehiculeType], queryFn: VehiculeService.getVehiculeType})
    }

    static getVehiculeBrandsQuery() {
        return useQuery({queryKey: [QUERY_KEYS.vehicule.getVehiculeBrand], queryFn: VehiculeService.getVehiculeBrand})
    }

    static getVehiculeModelsQuery(brandID: number | null) {
        return useQuery({
            queryKey: [QUERY_KEYS.vehicule.getVehiculeModel, brandID],
            queryFn: () => VehiculeService.getVehiculeModel(brandID),
            enabled: !!brandID
        })
    }

    static getVehiculeColorsQuery() {
        return useQuery({queryKey: [QUERY_KEYS.vehicule.getVehiculeColors], queryFn: VehiculeService.getVehiculeColors})
    }

    static getCurenciesQuery() {
        return useQuery({queryKey: [QUERY_KEYS.getCurencies], queryFn: VehiculeService.getCurencies})
    }

    static getVehiculeOwnerQuery() {
        return useQuery({queryKey: [QUERY_KEYS.vehicule.getVehiculeOwner], queryFn: VehiculeService.getVehiculeOwner})
    }

    static getVehiculesQuery(regionID: string) {
        return useQuery({
            queryKey: [QUERY_KEYS.vehicule.getVehicules],
            queryFn: () => VehiculeService.getVehicules(regionID),
            enabled: !!regionID,
        })
    }

    static invalidOwnerData() {
        return VehiculeService.getInstance().queryClient.invalidateQueries({queryKey: [QUERY_KEYS.vehicule.getVehiculeOwner]})
    }

    static invalidVehiculesData() {
        return VehiculeService.getInstance().queryClient.invalidateQueries({queryKey: [QUERY_KEYS.vehicule.getVehicules]})
    }

    static addVehiculeOwnerMutation() {
        return useMutation({mutationFn: VehiculeService.addVehiculeOwner})
    }

    static addVehiculeMutation() {
        return useMutation({mutationFn: VehiculeService.addVehicule})
    }

    private static async makePassationTransfer(formData: MakePassationTransfertInputs) {
        const response = await VehiculeService.getInstance().execHttpRequest<VehiculeResponseType>({
            url: vehicleServiceRoutes.makePassationTransfert,
            method: VehiculeService.getInstance().httpMethods.post,
            body: formData,
        })
        return new Vehicule(response)
    }

    static makePassationTransferMutation() {
        return useMutation({mutationFn: VehiculeService.makePassationTransfer})
    }

    private static async addNewContractType(formData: AddNewContraTypeInputs) {
        const response = await VehiculeService.getInstance().execHttpRequest<ContractTypeResponseType>({
            url: vehicleServiceRoutes.addNewContratType,
            method: VehiculeService.getInstance().httpMethods.post,
            body: formData,
        })
        return new VehiculeContract(response)
    }

    static addNewContractTypeMutation() {
        return useMutation({mutationFn: VehiculeService.addNewContractType})
    }

    private static async getVehiculeContratsType() {
        const response = await VehiculeService.getInstance().execHttpRequest<VehiculeContratTypeResponseType[]>({
            url: vehicleServiceRoutes.getVehiculeContratsType,
            method: VehiculeService.getInstance().httpMethods.get,
        })
        return VehiculeContratsType.toVehiculeContratsType(response)
    }

    static getVehiculeContratsTypeQuery() {
        return useQuery({
            queryKey: [QUERY_KEYS.vehicule.getVehiculeContratsType],
            queryFn: VehiculeService.getVehiculeContratsType
        })
    }

    static invalidContratTypes() {
        return VehiculeService.getInstance().queryClient.invalidateQueries({queryKey: [QUERY_KEYS.vehicule.getVehiculeContratsType]})
    }


    private static async toggleVehiculeDeactivation({mode, id}: { id: string, mode: 'deactivate' | 'activate' }) {

        const isActivation = mode === "activate"

        const response = await VehiculeService.getInstance().execHttpRequest<VehiculeContratTypeResponseType[]>({
            url: isActivation ? vehicleServiceRoutes.activateVehicule + '/' + id : vehicleServiceRoutes.deactivateVehicule + '/' + id,
            method: VehiculeService.getInstance().httpMethods.get,
        })
        return VehiculeContratsType.toVehiculeContratsType(response)
    }

    static toggleVehiculeDeactivationQuery() {
        return useMutation({
            mutationFn: VehiculeService.toggleVehiculeDeactivation
        })
    }

    private static async addVehiculeGroup({region_id, ...formData}: AddNewVehiculeGroupInputs) {
        const response = await VehiculeService.getInstance().execHttpRequest({
            url: vehicleServiceRoutes.addNewVehiculeGroup,
            method: VehiculeService.getInstance().httpMethods.post,
            body: {...formData, park_id: region_id},
        })
        return response
    }

    static addVehiculeGroupMutation() {
        return useMutation({mutationFn: VehiculeService.addVehiculeGroup})
    }


    private static async getVehiculesGroup(regionID: string) {
        const response = await VehiculeService.getInstance().execHttpRequest<VehiculeGroupResponseType[]>({
            url: vehicleServiceRoutes.getVehiculesGroup + `?park_id=${regionID}`,
            method: VehiculeService.getInstance().httpMethods.get,
        })

        return VehiculeGroup.toArray(response)
    }

    static getVehiculesGroupQuery(regionID: string) {
        return useQuery({
            queryKey: [QUERY_KEYS.vehicule.getVehiculesGroup],
            queryFn: () => VehiculeService.getVehiculesGroup(regionID),
            enabled: !!regionID,
        })
    }

    static invalidVehiculeGroup() {
        return VehiculeService.getInstance().queryClient.invalidateQueries({queryKey: [QUERY_KEYS.vehicule.getVehiculesGroup]})
    }


    private static async deleteVehiculeGroup({groupID, regionID}: { groupID: string, regionID: string }) {
        const response = await VehiculeService.getInstance().execHttpRequest({
            url: vehicleServiceRoutes.deleteVehiculeGroup + `/${groupID}?region_id${regionID}`,
            method: VehiculeService.getInstance().httpMethods.get,
        })

        logger.log(response)

        return response
    }

    static deleteVehiculeGroupMutattion() {
        return useMutation({mutationFn: VehiculeService.deleteVehiculeGroup})
    }

}


export default VehiculeService
