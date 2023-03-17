import HrActionType from "@/redux/Constant/HumanResources/HrActionType"

export const doWorkordersRequest:any = ():any => {
    return {
        type: HrActionType.GET_WORKORDERS
    }
}
 
export const doWorkordersRequestSucceed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_WORKORDERS_SUCCEED,
        payload
    }
}

export const doWorkordersRequestFailed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_WORKORDERS_FAILED,
        payload
    }
}
export const doWorkorderRequest: any = (payload: any):any => {
    return {
        type: HrActionType.GET_WORKORDER,
        payload
    }
}

export const doWorkorderRequestSucceed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_WORKORDER_SUCCEED,
        payload
    }
}

export const doWorkorderRequestFailed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_WORKORDER_FAILED,
        payload
    }
}
 
export const doWorkorderCreate:any = (payload:any):any => {
    return {
        type: HrActionType.ADD_WORKORDER,
        payload
    }
}

export const doAddWorkorderSucceed:any = (payload:any):any => {
    return {
        type: HrActionType.ADD_WORKORDER_SUCCEED,
        payload
    }

}

export const doAddWorkorderFailed:any = (payload:any):any => {
    return {
        type: HrActionType.ADD_WORKORDER_FAILED,
        payload
    }
}

export const doUpdateWorkorder:any = (payload:any):any => {
    return {
        type: HrActionType.UPDATE_WORKORDER,
        payload
    }
}

export const doUpdateWorkorderSucceed:any = (payload:any):any => {
    return {
        type: HrActionType.UPDATE_WORKORDER_SUCCEED,
        payload
    }
}


export const doUpdateWorkorderFailed:any = (payload:any):any => {
    return {
        type: HrActionType.UPDATE_WORKORDER_FAILED,
        payload
    }
}

export const doDeleteWorkorder:any = (payload:any):any => {
    return {
        type: HrActionType.DELETE_WORKORDER,
        payload
    }
}

export const doDeleteWorkorderSucceed:any = (payload:any):any => {
    return {
        type: HrActionType.DELETE_WORKORDER_SUCCEED,
        payload
    }
}

export const doDeleteWorkorderFailed:any = (payload:any):any => {
    return {
        type: HrActionType.DELETE_WORKORDER_FAILED,
        payload
    }
}
