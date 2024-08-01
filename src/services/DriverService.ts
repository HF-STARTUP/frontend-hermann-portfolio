import Service from "@/services/Service";
import {QUERY_KEYS} from "@/utils/const/queryKeys";
import {useMutation, useQuery} from "@tanstack/react-query";
import Grade from "@/model/driver/Grade";
import {
    DriverGroupResponseType,
    DriverObjectiveResponseType,
    DriverResponseType,
    DriverTypeResponseType,
    GradeResponseType
} from "@/types/driver.type";
import DriverType from "@/model/driver/DriverType";
import {
    AddDriverInputs,
    AddNewDriverGroupInputs,
    DriverDeactivationInputs,
    SuspendDriverInputs
} from "@/schema/driver.schema";
import Driver, {DriverRecipeModel} from "@/model/driver/Driver";
import {DriverGroup} from "@/model/driver/DriverGroup";
import {useGetParkID} from "@/hooks/__globlal/useGlobalHook";

export const driverServiceRoutes = {
    addDriver: 'driver',
    getDriver: 'driver',
    getAllDriverInfos: '/driver/all-data',
    getDriverType: 'driver-type',
    getGrade: 'grade',
    addDriverGroup: 'driver-group/add',
    getDriverGroup: 'driver-group',
    suspendDriver: 'driver/suspended',
    unSuspendDriver: 'driver/remove-suspension',
    deactivateDriver: 'driver/deactivate',
    activateDriver: 'driver/activate',
    updateDriver: 'driver/update',
    requestAgents: '/agent',
    driversToEncaiss: '/transaction/recipes/expected-today',
}


class DriverService extends Service {

    private static instance: DriverService = new DriverService();

    constructor() {
        super('');
    }

    private static getInstance() {
        return DriverService.instance;
    }

    static async getAgents(parkID: string) {
        const response = await DriverService.getInstance().execHttpRequest<DriverResponseType[]>({
            url: driverServiceRoutes.requestAgents + "?park_id=" + parkID,
            method: DriverService.getInstance().httpMethods.get,
        })
        return Driver.toDrivers(response)
    }


    private static async getGrade() {
        const response = await DriverService.getInstance().execHttpRequest<GradeResponseType[]>({
            url: driverServiceRoutes.getGrade,
            method: DriverService.getInstance().httpMethods.get,
        })
        return Grade.toGrades(response)
    }

    static getGradeQuery() {
        return useQuery({queryKey: [QUERY_KEYS.driver.getDriverGrade], queryFn: DriverService.getGrade})
    }

    private static async getDriverType() {
        const response = await DriverService.getInstance().execHttpRequest<DriverTypeResponseType[]>({
            url: driverServiceRoutes.getDriverType,
            method: DriverService.getInstance().httpMethods.get,
        })
        return DriverType.toDriverTypes(response)
    }

    static getDriverTypeQuery() {
        return useQuery({queryKey: [QUERY_KEYS.driver.getDriverType], queryFn: DriverService.getDriverType})
    }

    private static async addDriver(data: AddDriverInputs) {

        const {id, ...rest} = data

        const response = await DriverService.getInstance().execHttpRequest<DriverResponseType>({
            url: id ? driverServiceRoutes.updateDriver + '/' + id : driverServiceRoutes.addDriver,
            method: DriverService.getInstance().httpMethods[id ? 'update' : 'post'],
            body: rest,
            toFormdata: true
        })
        return response
    }

    static addDriverMutation() {
        return useMutation({mutationFn: DriverService.addDriver})
    }

    private static async getDrivers(parkID: string | undefined, toEncaiss: boolean) {
        const response = await DriverService.getInstance().execHttpRequest<{ data: DriverResponseType[] }>({
            url: toEncaiss ? driverServiceRoutes.driversToEncaiss + `?park_id=${parkID}` : driverServiceRoutes.addDriver + `?park_id=${parkID}`,
            method: DriverService.getInstance().httpMethods.get,
        })
        return Driver.toDrivers(response.data)
    }

    static async getDriver(driverID: string | undefined | null) {
        const response = await DriverService.getInstance().execHttpRequest<DriverResponseType>({
            url: driverServiceRoutes.getDriver + `/${driverID}`,
            method: DriverService.getInstance().httpMethods.get,
        })
        return new Driver(response)
    }


    static async getAllDriverInfo(driverID: string | undefined | null) {
        const response = await DriverService.getInstance().execHttpRequest<DriverResponseType>({
            url: driverServiceRoutes.getAllDriverInfos + `/${driverID}`,
            method: DriverService.getInstance().httpMethods.get,
        })
        return new Driver(response)
    }

    static getUnencassedDriversQuery() {

        const {parkID} = useGetParkID()

        //TODO: add queries {online: boolean} to request online drivers

        return useQuery({
            queryKey: [`unencaiss::${QUERY_KEYS.driver.getDrivers}`],
            enabled: !!parkID,
            queryFn: () => DriverService.getUnencassedDrivers(parkID)
        })

    }

    private static async getUnencassedDrivers(parkID: string | undefined) {
        const response = await DriverService.getInstance().execHttpRequest<{ data: DriverObjectiveResponseType[] }>({
            url: driverServiceRoutes.driversToEncaiss + `?park_id=${parkID}`,
            method: DriverService.getInstance().httpMethods.get,
        })
        return DriverRecipeModel.fromArrays(response.data)
    }


    static getDriversQuery({toEncaiss = false}: { toEncaiss?: boolean }) {

        const {parkID} = useGetParkID()

        //TODO: add queries {online: boolean} to request online drivers

        return useQuery({
            queryKey: [toEncaiss ? `unencaiss::${QUERY_KEYS.driver.getDrivers}` : QUERY_KEYS.driver.getDrivers],
            enabled: !!parkID,
            queryFn: () => DriverService.getDrivers(parkID, toEncaiss)
        })
    }


    static invalidDrivers() {
        return DriverService.getInstance().queryClient.invalidateQueries({queryKey: [QUERY_KEYS.driver.getDrivers]})
    }

    static invalidUnencassedDrivers() {
        return DriverService.getInstance().queryClient.invalidateQueries({queryKey: [`unencaiss::${QUERY_KEYS.driver.getDrivers}`]})
    }

    private static async addDriverGroup(data: AddNewDriverGroupInputs) {
        const response = await DriverService.getInstance().execHttpRequest<DriverGroupResponseType>({
            url: driverServiceRoutes.addDriverGroup,
            method: DriverService.getInstance().httpMethods.post,
            body: data
        })
        return new DriverGroup(response)
    }

    static addDriverGroupMutation() {
        return useMutation({mutationFn: DriverService.addDriverGroup})
    }

    private static async getDriversGroup() {
        const response = await DriverService.getInstance().execHttpRequest<DriverGroupResponseType[]>({
            url: driverServiceRoutes.getDriverGroup,
            method: DriverService.getInstance().httpMethods.get,
        })
        return DriverGroup.toDriverGroups(response)
    }

    static getDriversGroupQuery() {
        return useQuery({
            queryKey: [QUERY_KEYS.driver.getDriversGroup],
            queryFn: () => DriverService.getDriversGroup()
        })
    }

    static invalidDriversGroup() {
        return DriverService.getInstance().queryClient.invalidateQueries({queryKey: [QUERY_KEYS.driver.getDriversGroup]})
    }

    private static async suspendDriver(data: SuspendDriverInputs) {
        const {mode, ...body} = data
        const isUnsuspend = mode === 'unsuspend'

        const response = await DriverService.getInstance().execHttpRequest<{}>({
            url: isUnsuspend ? driverServiceRoutes.unSuspendDriver + '/' + body.id : driverServiceRoutes.suspendDriver,
            method: DriverService.getInstance().httpMethods[isUnsuspend ? "get" : "post"],
            body: isUnsuspend ? undefined : body
        })
        return response
    }

    static suspendDriverMutation() {
        return useMutation({mutationFn: DriverService.suspendDriver})
    }

    private static async deactivateDriver(data: DriverDeactivationInputs) {
        const {mode, ...body} = data
        const deactivation = mode === 'deactivate'

        const response = await DriverService.getInstance().execHttpRequest<{}>({
            url: deactivation ? driverServiceRoutes.deactivateDriver + '/' + body.id : driverServiceRoutes.activateDriver + '/' + body.id,
            method: DriverService.getInstance().httpMethods.get,
        })
        return response
    }

    static deactivateDriverMutation() {
        return useMutation({mutationFn: DriverService.deactivateDriver})
    }
}


export default DriverService
