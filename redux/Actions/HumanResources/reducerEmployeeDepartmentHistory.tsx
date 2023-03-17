import HrActionType from "@/redux/Constant/HumanResources/HrActionType"

export const doEmployeeDepartmentHistorysRequest: any = (payload: any):any => {
    return {
        type: HrActionType.GET_EMPLOYEEDEPARTMENTHISTORYS,
        payload
    }
}
 
export const doEmployeeDepartmentHistorysRequestSucceed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_EMPLOYEEDEPARTMENTHISTORYS_SUCCEED,
        payload
    }
}

export const doEmployeeDepartmentHistorysRequestFailed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_EMPLOYEEDEPARTMENTHISTORYS_FAILED,
        payload
    }
}
export const doEmployeeDepartmentHistoryRequest:any = ():any => {
    return {
        type: HrActionType.GET_EMPLOYEEDEPARTMENTHISTORY
    }
}

export const doEmployeeDepartmentHistoryRequestSucceed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_EMPLOYEEDEPARTMENTHISTORY_SUCCEED,
        payload
    }
}

export const doEmployeeDepartmentHistoryRequestFailed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_EMPLOYEEDEPARTMENTHISTORY_FAILED,
        payload
    }
}
 
export const doEmployeeDepartmentHistoryCreate:any = (payload:any):any => {
    return {
        type: HrActionType.ADD_EMPLOYEEDEPARTMENTHISTORY,
        payload
    }
}

export const doAddEmployeeDepartmentHistorySucceed:any = (payload:any):any => {
    return {
        type: HrActionType.ADD_EMPLOYEEDEPARTMENTHISTORY_SUCCEED,
        payload
    }

}

export const doAddEmployeeDepartmentHistoryFailed:any = (payload:any):any => {
    return {
        type: HrActionType.ADD_EMPLOYEEDEPARTMENTHISTORY_FAILED,
        payload
    }
}

export const doUpdateEmployeeDepartmentHistory:any = (payload:any):any => {
    return {
        type: HrActionType.UPDATE_EMPLOYEEDEPARTMENTHISTORY,
        payload
    }
}

export const doUpdateEmployeeDepartmentHistorySucceed:any = (payload:any):any => {
    return {
        type: HrActionType.UPDATE_EMPLOYEEDEPARTMENTHISTORY_SUCCEED,
        payload
    }
}


export const doUpdateEmployeeDepartmentHistoryFailed:any = (payload:any):any => {
    return {
        type: HrActionType.UPDATE_EMPLOYEEDEPARTMENTHISTORY_FAILED,
        payload
    }
}

export const doDeleteEmployeeDepartmentHistory:any = (payload:any):any => {
    return {
        type: HrActionType.DELETE_EMPLOYEEDEPARTMENTHISTORY,
        payload
    }
}

export const doDeleteEmployeeDepartmentHistorySucceed:any = (payload:any):any => {
    return {
        type: HrActionType.DELETE_EMPLOYEEDEPARTMENTHISTORY_SUCCEED,
        payload
    }
}

export const doDeleteEmployeeDepartmentHistoryFailed:any = (payload:any):any => {
    return {
        type: HrActionType.DELETE_EMPLOYEEDEPARTMENTHISTORY_FAILED,
        payload
    }
}
