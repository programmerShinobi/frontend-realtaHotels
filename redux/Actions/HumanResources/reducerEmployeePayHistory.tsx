import HrActionType from "@/redux/Constant/HumanResources/HrActionType"

export const doEmployeePayHistorysRequest: any = (payload: any):any => {
    return {
        type: HrActionType.GET_EMPLOYEEPAYHISTORYS,
        payload
    }
}
 
export const doEmployeePayHistorysRequestSucceed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_EMPLOYEEPAYHISTORYS_SUCCEED,
        payload
    }
}

export const doEmployeePayHistorysRequestFailed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_EMPLOYEEPAYHISTORYS_FAILED,
        payload
    }
}
export const doEmployeePayHistoryRequest:any = ():any => {
    return {
        type: HrActionType.GET_EMPLOYEEPAYHISTORY
    }
}

export const doEmployeePayHistoryRequestSucceed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_EMPLOYEEPAYHISTORY_SUCCEED,
        payload
    }
}

export const doEmployeePayHistoryRequestFailed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_EMPLOYEEPAYHISTORY_FAILED,
        payload
    }
}
 
export const doEmployeePayHistoryCreate:any = (payload:any):any => {
    return {
        type: HrActionType.ADD_EMPLOYEEPAYHISTORY,
        payload
    }
}

export const doAddEmployeePayHistorySucceed:any = (payload:any):any => {
    return {
        type: HrActionType.ADD_EMPLOYEEPAYHISTORY_SUCCEED,
        payload
    }

}

export const doAddEmployeePayHistoryFailed:any = (payload:any):any => {
    return {
        type: HrActionType.ADD_EMPLOYEEPAYHISTORY_FAILED,
        payload
    }
}

export const doUpdateEmployeePayHistory:any = (payload:any):any => {
    return {
        type: HrActionType.UPDATE_EMPLOYEEPAYHISTORY,
        payload
    }
}

export const doUpdateEmployeePayHistorySucceed:any = (payload:any):any => {
    return {
        type: HrActionType.UPDATE_EMPLOYEEPAYHISTORY_SUCCEED,
        payload
    }
}


export const doUpdateEmployeePayHistoryFailed:any = (payload:any):any => {
    return {
        type: HrActionType.UPDATE_EMPLOYEEPAYHISTORY_FAILED,
        payload
    }
}

export const doDeleteEmployeePayHistory:any = (payload:any):any => {
    return {
        type: HrActionType.DELETE_EMPLOYEEPAYHISTORY,
        payload
    }
}

export const doDeleteEmployeePayHistorySucceed:any = (payload:any):any => {
    return {
        type: HrActionType.DELETE_EMPLOYEEPAYHISTORY_SUCCEED,
        payload
    }
}

export const doDeleteEmployeePayHistoryFailed:any = (payload:any):any => {
    return {
        type: HrActionType.DELETE_EMPLOYEEPAYHISTORY_FAILED,
        payload
    }
}
