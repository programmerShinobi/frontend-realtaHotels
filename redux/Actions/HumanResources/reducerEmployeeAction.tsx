import HrActionType from "@/redux/Constant/HumanResources/HrActionType"

export const doEmployeesRequest:any = ():any => {
    return {
        type: HrActionType.GET_EMPLOYEES
    } 
}
 
export const doEmployeesRequestSucceed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_EMPLOYEES_SUCCEED,
        payload
    }
}

export const doEmployeesRequestFailed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_EMPLOYEES_FAILED,
        payload
    }
}
export const doEmployeeRequest:any = ():any => {
    return {
        type: HrActionType.GET_EMPLOYEE
    }
}

export const doEmployeeRequestSucceed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_EMPLOYEE_SUCCEED,
        payload
    }
}

export const doEmployeeRequestFailed:any = (payload:any):any => {
    return {
        type: HrActionType.GET_EMPLOYEE_FAILED,
        payload
    }
}
 
export const doEmployeeCreate:any = (payload:any):any => {
    return {
        type: HrActionType.ADD_EMPLOYEE,
        payload
    }
}

export const doAddEmployeeSucceed:any = (payload:any):any => {
    return {
        type: HrActionType.ADD_EMPLOYEE_SUCCEED,
        payload
    }

}

export const doAddEmployeeFailed:any = (payload:any):any => {
    return {
        type: HrActionType.ADD_EMPLOYEE_FAILED,
        payload
    }
}

export const doUpdateEmployee:any = (payload:any):any => {
    return {
        type: HrActionType.UPDATE_EMPLOYEE,
        payload
    }
}

export const doUpdateEmployeeSucceed:any = (payload:any):any => {
    return {
        type: HrActionType.UPDATE_EMPLOYEE_SUCCEED,
        payload
    }
}


export const doUpdateEmployeeFailed:any = (payload:any):any => {
    return {
        type: HrActionType.UPDATE_EMPLOYEE_FAILED,
        payload
    }
}

export const doDeleteEmployee:any = (payload:any):any => {
    // console.log(payload)
    return {
        type: HrActionType.DELETE_EMPLOYEE,
        payload
    }
}

export const doDeleteEmployeeSucceed:any = (payload:any):any => {
    return {
        type: HrActionType.DELETE_EMPLOYEE_SUCCEED,
        payload
    }
}

export const doDeleteEmployeeFailed:any = (payload:any):any => {
    return {
        type: HrActionType.DELETE_EMPLOYEE_FAILED,
        payload
    }
}
