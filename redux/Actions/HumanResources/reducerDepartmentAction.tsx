import HrActionType from "@/redux/Constant/HumanResources/HrActionType"

export const doDepartmentsRequest: any = (): any => {
    return {
        type: HrActionType.GET_DEPARTMENTS
    }
}

export const doDepartmentsRequestSucceed: any = (payload: any): any => {
    return {
        type: HrActionType.GET_DEPARTMENTS_SUCCEED,
        payload
    }
}

export const doDepartmentsRequestFailed: any = (payload: any): any => {
    return {
        type: HrActionType.GET_DEPARTMENTS_FAILED,
        payload
    }
}
export const doDepartmentRequest: any = (): any => {
    return {
        type: HrActionType.GET_DEPARTMENT
    }
}

export const doDepartmentRequestSucceed: any = (payload: any): any => {
    return {
        type: HrActionType.GET_DEPARTMENT_SUCCEED,
        payload
    }
}

export const doDepartmentRequestFailed: any = (payload: any): any => {
    return {
        type: HrActionType.GET_DEPARTMENT_FAILED,
        payload
    }
}

export const doDepartmentCreate: any = (payload: any): any => {
    return {
        type: HrActionType.ADD_DEPARTMENT,
        payload
    }
}

export const doAddDepartmentSucceed: any = (payload: any): any => {
    return {
        type: HrActionType.ADD_DEPARTMENT_SUCCEED,
        payload
    }

}

export const doAddDepartmentFailed: any = (payload: any): any => {
    return {
        type: HrActionType.ADD_DEPARTMENT_FAILED,
        payload
    }
}

export const doUpdateDepartment: any = (payload: any): any => {
    return {
        type: HrActionType.UPDATE_DEPARTMENT,
        payload
    }
}

export const doUpdateDepartmentSucceed: any = (payload: any): any => {
    return {
        type: HrActionType.UPDATE_DEPARTMENT_SUCCEED,
        payload
    }
}


export const doUpdateDepartmentFailed: any = (payload: any): any => {
    return {
        type: HrActionType.UPDATE_DEPARTMENT_FAILED,
        payload
    }
}

export const doDeleteDepartment: any = (payload: any): any => {
    return {
        type: HrActionType.DELETE_DEPARTMENT,
        payload
    }
}

export const doDeleteDepartmentSucceed: any = (payload: any): any => {
    return {
        type: HrActionType.DELETE_DEPARTMENT_SUCCEED,
        payload
    }
}

export const doDeleteDepartmentFailed: any = (payload: any): any => {
    return {
        type: HrActionType.DELETE_DEPARTMENT_FAILED,
        payload
    }
}
