import HrActionType from "@/redux/Constant/HumanResources/HrActionType"

export const doUsersRequest:any = ():any => {
    return {
        type: HrActionType.GET_USERS
    }
}


export const doUsersRequestSucceed: any = (payload: any): any => {
    return {
        type: HrActionType.GET_USERS_SUCCEED,
        payload
    }
}

export const doUsersRequestFailed: any = (payload: any): any => {
    return {
        type: HrActionType.GET_USERS_FAILED,
        payload
    }
}