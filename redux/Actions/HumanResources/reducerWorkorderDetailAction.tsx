import HrActionType from "@/redux/Constant/HumanResources/HrActionType"

export const doWorkorderdetailsRequest: any = (payload: any):any => {
    return {
        type: HrActionType.GET_WORKORDERDETAILS,
        payload
    }
}
 
export const doWorkorderdetailsRequestSucceed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_WORKORDERDETAILS_SUCCEED,
        payload
    }
}

export const doWorkorderdetailsRequestFailed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_WORKORDERDETAILS_FAILED,
        payload
    }
}
export const doWorkorderdetailRequest: any = (payload: any):any => {
    return {
        type: HrActionType.GET_WORKORDERDETAIL,
        payload
    }
}

export const doWorkorderdetailRequestSucceed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_WORKORDERDETAIL_SUCCEED,
        payload
    }
}

export const doWorkorderdetailRequestFailed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_WORKORDERDETAIL_FAILED,
        payload
    }
}
 
export const doWorkorderdetailCreate:any = (payload:any):any => {
    return {
        type: HrActionType.ADD_WORKORDERDETAIL,
        payload
    }
}

export const doAddWorkorderdetailSucceed:any = (payload:any):any => {
    return {
        type: HrActionType.ADD_WORKORDERDETAIL_SUCCEED,
        payload
    }

}

export const doAddWorkorderdetailFailed:any = (payload:any):any => {
    return {
        type: HrActionType.ADD_WORKORDERDETAIL_FAILED,
        payload
    }
}

export const doUpdateWorkorderdetail:any = (payload:any):any => {
    return {
        type: HrActionType.UPDATE_WORKORDERDETAIL,
        payload
    }
}

export const doUpdateWorkorderdetailSucceed:any = (payload:any):any => {
    return {
        type: HrActionType.UPDATE_WORKORDERDETAIL_SUCCEED,
        payload
    }
}


export const doUpdateWorkorderdetailFailed:any = (payload:any):any => {
    return {
        type: HrActionType.UPDATE_WORKORDERDETAIL_FAILED,
        payload
    }
}

export const doDeleteWorkorderdetail:any = (payload:any):any => {
    return {
        type: HrActionType.DELETE_WORKORDERDETAIL,
        payload
    }
}

export const doDeleteWorkorderdetailSucceed:any = (payload:any):any => {
    return {
        type: HrActionType.DELETE_WORKORDERDETAIL_SUCCEED,
        payload
    }
}

export const doDeleteWorkorderdetailFailed:any = (payload:any):any => {
    return {
        type: HrActionType.DELETE_WORKORDERDETAIL_FAILED,
        payload
    }
}
