import ActionType from "@/redux/Constant/Users/ActionType"

export const doUsersRequest:any = ():any => {
    return {
        type: ActionType.GET_USERS
    }
}

export const doUsersRequestSucceed:any = (payload:any):any => {
    return {
        type: ActionType.GET_USERS_SUCCEED,
        payload
    }
}

export const doUsersRequestFailed:any = (payload:any):any => {
    return {
        type: ActionType.GET_USERS_SUCCEED,
        payload
    }
}

export const doUserRequest:any = (payload:any):any => {
    return {
        type: ActionType.GET_USER,
        payload
    }
}

export const doUserRequestSucceed:any = (userId:number):any => {
    return {
        type: ActionType.GET_USER_SUCCEED,
        payload: userId
    }
}

export const doUserRequestFailed:any = (payload:any):any => {
    return {
        type: ActionType.GET_USER_SUCCEED,
        payload
    }
}

export const doUsersCreate:any = (payload:any):any => {
    return {
        type: ActionType.ADD_USERS,
        payload
    }
}

export const doAddUsersSucceed:any = (payload:any):any => {
    return {
        type: ActionType.ADD_USERS_SUCCEED,
        payload
    }

}

export const doAddUsersFailed:any = (payload:any):any => {
    return {
        type: ActionType.ADD_USERS_FAILED,
        payload
    }
}

export const doUpdateUsers:any = (id:number, payload:any):any => {
    return {
        type: ActionType.UPDATE_USERS,
        id,
        payload
    }
}

export const doUpdateUsersSucceed:any = (payload:any):any => {
    return {
        type: ActionType.UPDATE_USERS_SUCCEED,
        payload
    }
}


export const doUpdateUsersFailed:any = (payload:any):any => {
    return {
        type: ActionType.UPDATE_USERS_FAILED,
        payload
    }
}

export const doUpdatePhotoUsers:any = (id:number, payload:any) => {
    return {
        type: ActionType.UPDATE_PHOTO_USERS,
        id,
        payload
    }
}

export const doUpdatePhotoUsersSucceed:any = (payload:any):any => { // undefined
    return {
        type: ActionType.UPDATE_PHOTO_USERS_SUCCEED,
        payload
    }
}


export const doUpdatePhotoUsersFailed:any = (payload:any):any => {
    return {
        type: ActionType.UPDATE_PHOTO_USERS_FAILED,
        payload
    }
}

export const doDeleteUsers:any = (payload:any):any => {
    return {
        type: ActionType.DEL_USERS,
        payload
    }
}

export const doDeleteUsersSucceed:any = (payload:any):any => {
    console.info(payload)
    return {
        type: ActionType.DEL_USERS_SUCCEED,
        payload
    }
}

export const doDeleteUsersFailed:any = (payload:any):any => {
    return {
        type: ActionType.DEL_USERS_FAILED,
        payload
    }
}

export const doLogin:any = (payload:any):any=> {
    return {
        type: ActionType.LOGIN,
        payload
    }
}

export const doLoginSucceed:any = (payload:any):any => {
    return {
        type: ActionType.LOGIN_SUCCEED,
        payload
    }
}

export const doLoginFailed:any = (payload:any):any => {
    return {
        type: ActionType.LOGIN_FAILED,
        payload
    }
}

export const doRegister:any = (payload:any):any => {
    return {
        type: ActionType.REGISTER,
        payload
    }
}

export const doRegisterSucceed:any = (payload:any):any => {
    return {
        type: ActionType.REGISTER_SUCCEED,
        payload
    }
}

export const doRegisterFailed:any = (payload:any):any => {
    return {
        type: ActionType.REGISTER_FAILED,
        payload
    }
}