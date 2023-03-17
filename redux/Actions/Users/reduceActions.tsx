import ActionType from "@/redux/Constant/Users/ActionType";

// USERS
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

// UPDATE PHOTO USER
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

// AUTH
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

export const doRegisterGuest:any = (payload:any):any => {
    return {
        type: ActionType.REGISTER_GUEST,
        payload
    }
}

export const doRegisterGuestSucceed:any = (payload:any):any => {
    return {
        type: ActionType.REGISTER_GUEST_SUCCEED,
        payload
    }
}

export const doRegisterGuestFailed:any = (payload:any):any => {
    return {
        type: ActionType.REGISTER_GUEST_FAILED,
        payload
    }
}

// ROLES
export const doRolesRequest:any = ():any => {
    return {
        type: ActionType.GET_ROLES
    }
}

export const doRolesRequestSucceed:any = (payload:any):any => {
    return {
        type: ActionType.GET_ROLES_SUCCEED,
        payload
    }
}

export const doRolesRequestFailed:any = (payload:any):any => {
    return {
        type: ActionType.GET_ROLES_SUCCEED,
        payload
    }
}

export const doRoleRequest:any = (payload:any):any => {
    return {
        type: ActionType.GET_ROLE,
        payload
    }
}

export const doRoleRequestSucceed:any = (roleId:number):any => {
    return {
        type: ActionType.GET_ROLE_SUCCEED,
        payload: roleId
    }
}

export const doRoleRequestFailed:any = (payload:any):any => {
    return {
        type: ActionType.GET_ROLE_SUCCEED,
        payload
    }
}

export const doRolesCreate:any = (payload:any):any => {
    return {
        type: ActionType.ADD_ROLES,
        payload
    }
}

export const doAddRolesSucceed:any = (payload:any):any => {
    return {
        type: ActionType.ADD_ROLES_SUCCEED,
        payload
    }

}

export const doAddRolesFailed:any = (payload:any):any => {
    return {
        type: ActionType.ADD_ROLES_FAILED,
        payload
    }
}

export const doUpdateRoles:any = (id:number, payload:any):any => {
    return {
        type: ActionType.UPDATE_ROLES,
        id,
        payload
    }
}

export const doUpdateRolesSucceed:any = (payload:any):any => {
    return {
        type: ActionType.UPDATE_ROLES_SUCCEED,
        payload
    }
}


export const doUpdateRolesFailed:any = (payload:any):any => {
    return {
        type: ActionType.UPDATE_ROLES_FAILED,
        payload
    }
}

export const doDeleteRoles:any = (payload:any):any => {
    return {
        type: ActionType.DEL_ROLES,
        payload
    }
}

export const doDeleteRolesSucceed:any = (payload:any):any => {
    return {
        type: ActionType.DEL_ROLES_SUCCEED,
        payload
    }
}

export const doDeleteRolesFailed:any = (payload:any):any => {
    return {
        type: ActionType.DEL_ROLES_FAILED,
        payload
    }
}

export const doChangePassword:any = (id:number, payload:any):any => {
    return {
        type: ActionType.CHANGE_PASSWORD,
        id,
        payload
    }
}

export const doChangePasswordSucceed: any = (payload: any): any => {
    return {
        type: ActionType.CHANGE_PASSWORD_SUCCEED,
        payload
    }
}


export const doChangePasswordFailed:any = (payload:any):any => {
    return {
        type: ActionType.CHANGE_PASSWORD_FAILED,
        payload
    }
}

// MEMBERS
export const doMembersRequest:any = ():any => {
    return {
        type: ActionType.GET_MEMBERS
    }
}

export const doMembersRequestSucceed:any = (payload:any):any => {
    return {
        type: ActionType.GET_MEMBERS_SUCCEED,
        payload
    }
}

export const doMembersRequestFailed:any = (payload:any):any => {
    return {
        type: ActionType.GET_MEMBERS_SUCCEED,
        payload
    }
}

export const doMemberRequest:any = (payload:any):any => {
    return {
        type: ActionType.GET_MEMBER,
        payload
    }
}

export const doMemberRequestSucceed:any = (memberId:number):any => {
    return {
        type: ActionType.GET_MEMBER_SUCCEED,
        payload: memberId
    }
}

export const doMemberRequestFailed:any = (payload:any):any => {
    return {
        type: ActionType.GET_MEMBER_SUCCEED,
        payload
    }
}

export const doMembersCreate:any = (payload:any):any => {
    return {
        type: ActionType.ADD_MEMBERS,
        payload
    }
}

export const doAddMembersSucceed:any = (payload:any):any => {
    return {
        type: ActionType.ADD_MEMBERS_SUCCEED,
        payload
    }

}

export const doAddMembersFailed:any = (payload:any):any => {
    return {
        type: ActionType.ADD_MEMBERS_FAILED,
        payload
    }
}

export const doUpdateMembers:any = (id:number, payload:any):any => {
    return {
        type: ActionType.UPDATE_MEMBERS,
        id,
        payload
    }
}

export const doUpdateMembersSucceed:any = (payload:any):any => {
    return {
        type: ActionType.UPDATE_MEMBERS_SUCCEED,
        payload
    }
}


export const doUpdateMembersFailed:any = (payload:any):any => {
    return {
        type: ActionType.UPDATE_MEMBERS_FAILED,
        payload
    }
}

export const doDeleteMembers:any = (payload:any):any => {
    return {
        type: ActionType.DEL_MEMBERS,
        payload
    }
}

export const doDeleteMembersSucceed:any = (payload:any):any => {
    return {
        type: ActionType.DEL_MEMBERS_SUCCEED,
        payload
    }
}

export const doDeleteMembersFailed:any = (payload:any):any => {
    return {
        type: ActionType.DEL_MEMBERS_FAILED,
        payload
    }
}


// BONUSPOINTS
export const doBonusPointsRequest:any = ():any => {
    return {
        type: ActionType.GET_BONUSPOINTS
    }
}

export const doBonusPointsRequestSucceed:any = (payload:any):any => {
    return {
        type: ActionType.GET_BONUSPOINTS_SUCCEED,
        payload
    }
}

export const doBonusPointsRequestFailed:any = (payload:any):any => {
    return {
        type: ActionType.GET_BONUSPOINTS_SUCCEED,
        payload
    }
}

export const doBonusPointRequest:any = (payload:any):any => {
    return {
        type: ActionType.GET_BONUSPOINT,
        payload
    }
}

export const doBonusPointRequestSucceed:any = (ubpoId:number):any => {
    return {
        type: ActionType.GET_BONUSPOINT_SUCCEED,
        payload: ubpoId
    }
}

export const doBonusPointRequestFailed:any = (payload:any):any => {
    return {
        type: ActionType.GET_BONUSPOINT_SUCCEED,
        payload
    }
}

export const doBonusPointsCreate:any = (payload:any):any => {
    return {
        type: ActionType.ADD_BONUSPOINTS,
        payload
    }
}

export const doAddBonusPointsSucceed:any = (payload:any):any => {
    return {
        type: ActionType.ADD_BONUSPOINTS_SUCCEED,
        payload
    }

}

export const doAddBonusPointsFailed:any = (payload:any):any => {
    return {
        type: ActionType.ADD_BONUSPOINTS_FAILED,
        payload
    }
}

export const doUpdateBonusPoints:any = (id:number, payload:any):any => {
    return {
        type: ActionType.UPDATE_BONUSPOINTS,
        id,
        payload
    }
}

export const doUpdateBonusPointsSucceed:any = (payload:any):any => {
    return {
        type: ActionType.UPDATE_BONUSPOINTS_SUCCEED,
        payload
    }
}


export const doUpdateBonusPointsFailed:any = (payload:any):any => {
    return {
        type: ActionType.UPDATE_BONUSPOINTS_FAILED,
        payload
    }
}

export const doDeleteBonusPoints:any = (payload:any):any => {
    return {
        type: ActionType.DEL_BONUSPOINTS,
        payload
    }
}

export const doDeleteBonusPointsSucceed:any = (payload:any):any => {
    return {
        type: ActionType.DEL_BONUSPOINTS_SUCCEED,
        payload
    }
}

export const doDeleteBonusPointsFailed:any = (payload:any):any => {
    return {
        type: ActionType.DEL_BONUSPOINTS_FAILED,
        payload
    }
}

export const doForgotPassword: any = (payload: any): any => {
    return {
        type: ActionType.FORGOT_PASSWORD,
        payload
    }
}

export const doForgotPasswordSucceed: any = (payload: any): any => {
    return {
        type: ActionType.FORGOT_PASSWORD_SUCCEED,
        payload
    }
}

export const doForgotPasswordFailed:any = (payload:any):any => {
    return {
        type: ActionType.FORGOT_PASSWORD_FAILED,
        payload
    }
}