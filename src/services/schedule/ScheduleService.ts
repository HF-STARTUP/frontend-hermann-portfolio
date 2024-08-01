import Service from "@/services/Service";
import {useMutation, useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "@/utils/const/queryKeys";
import {HourResponseType, RotationGroupType} from "@/types/schedule/schedule.type";
import Hour from "@/model/schedule/Hour";
import {RotationGroupInputs} from "@/stores/protected/dashboard/schedule/useRotationGroupStore";
import {RegionID} from "@/types/generic";
import RotationGroup from "@/model/schedule/RotationGroup";

const scheduleServiceRoutes = {
    getHours: 'hour',
    setRotationGroup: 'rotation',
    getRotationGroups: 'rotation/by',
}

class ScheduleService extends Service {

    private static instance: ScheduleService = new ScheduleService();

    constructor() {
        super()
    }

    private static getInstance() {
        return ScheduleService.instance;
    }


    private static async getHours() {
        const response = await ScheduleService.getInstance().execHttpRequest<HourResponseType[]>({
            url: scheduleServiceRoutes.getHours,
            method: ScheduleService.getInstance().httpMethods.get,
        })
        return Hour.toHours(response)
    }

    static getHoursQuery() {
        return useQuery({
            queryKey: [QUERY_KEYS.shedule.getHours],
            queryFn: ScheduleService.getHours
        })
    }

    private static async getRotationsGroup(parkID: RegionID) {
        const response = await ScheduleService.getInstance().execHttpRequest<RotationGroupType[]>({
            url: scheduleServiceRoutes.getRotationGroups + '/' + parkID,
            method: ScheduleService.getInstance().httpMethods.get,
        })
        return RotationGroup.toRotationGroups(response)
    }

    static getRotationsGroupQuery(parkID: RegionID) {
        return useQuery({
            queryKey: [QUERY_KEYS.shedule.getRotationGroup],
            queryFn: () => ScheduleService.getRotationsGroup(parkID)
        })
    }

    static invalidRotationGroups() {
        return ScheduleService.getInstance().queryClient.invalidateQueries({queryKey: [QUERY_KEYS.shedule.getRotationGroup]})
    }

    private static async setRotationGroup({region_id, ...config}: RotationGroupInputs) {
        const response = await ScheduleService.getInstance().execHttpRequest<HourResponseType[]>({
            url: scheduleServiceRoutes.setRotationGroup,
            method: ScheduleService.getInstance().httpMethods.post,
            body: {...config, planingType: undefined, park_id: region_id}
        })
        return response
    }

    static setRotationGroupMutation() {
        return useMutation({mutationFn: ScheduleService.setRotationGroup})
    }

}

export default ScheduleService
