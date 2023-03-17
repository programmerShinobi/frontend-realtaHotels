import HrActionType from "@/redux/Constant/HumanResources/HrActionType"

export const doShiftsRequest:any = ():any => {
    return {
        type: HrActionType.GET_SHIFTS
    }
}


export const doShiftsRequestSucceed: any = (payload: any): any => {
    return {
        type: HrActionType.GET_SHIFTS_SUCCEED,
        payload
    }
}

export const doShiftsRequestFailed: any = (payload: any): any => {
    return {
        type: HrActionType.GET_SHIFTS_FAILED,
        payload
    }
}