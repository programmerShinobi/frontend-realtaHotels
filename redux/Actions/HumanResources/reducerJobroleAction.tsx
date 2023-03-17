import HrActionType from "@/redux/Constant/HumanResources/HrActionType"

export const doJobrolesRequest:any = ():any => {
    return {
        type: HrActionType.GET_JOBROLES
    }
}


export const doJobrolesRequestSucceed: any = (payload: any): any => {
    return {
        type: HrActionType.GET_JOBROLES_SUCCEED,
        payload
    }
}

export const doJobrolesRequestFailed: any = (payload: any): any => {
    return {
        type: HrActionType.GET_JOBROLES_FAILED,
        payload
    }
}