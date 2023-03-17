import ActionType from "@/redux/Constant/Users/ActionType";

const initialState = {
    users: [],
    user: [],
    members: [],
    member: [],
    bonusPoints: [],
    bonusPoint:[]
    
};

function usersReducers(state = initialState, action:any) {

    switch (action.type) {
        // USERS
        case ActionType.GET_USERS:
            return { ...state };
        case ActionType.GET_USERS_SUCCEED:
            return { ...state, users: action.payload };

        case ActionType.GET_USER:
            return { ...state };
        case ActionType.GET_USER_SUCCEED:
            return {
                ...state,
                user: action.payload
            }

        case ActionType.ADD_USERS:
            return { ...state };
        case ActionType.ADD_USERS_SUCCEED:
            return { ...state, users: [...state.users, action.payload] };
        case ActionType.ADD_USERS_FAILED:
            return { ...state, users: action.payload };

        case ActionType.UPDATE_USERS:
            return { ...state };
        case ActionType.UPDATE_USERS_SUCCEED:
            return applyUpdateUsers(state, action);
        case ActionType.UPDATE_USERS_FAILED:
            return applyUpdateUsers(state, action);

        case ActionType.UPDATE_PHOTO_USERS:
            return { ...state };
        case ActionType.UPDATE_PHOTO_USERS_SUCCEED:
            return applyUpdatePhotoUsers(state, action);
        case ActionType.UPDATE_PHOTO_USERS_FAILED:
            return applyUpdatePhotoUsers(state, action);

        case ActionType.DEL_USERS:
            return { ...state };
        case ActionType.DEL_USERS_SUCCEED:
            return {
                ...state,
                users: state.users.filter((users:any) => users.id !== action.payload.id)
            }

        // AUTH
        case ActionType.LOGIN:
            return { ...state };
        case ActionType.LOGIN_SUCCEED:
            return { ...state, users: action.payload, };
        case ActionType.LOGIN_FAILED:
            return { ...state, users: action.payload };

        case ActionType.REGISTER:
            return { ...state };
        case ActionType.REGISTER_SUCCEED:
            return { ...state, users: action.payload, };
        case ActionType.REGISTER_FAILED:
            return { ...state, users: action.payload };
        
        case ActionType.REGISTER_GUEST:
            return { ...state };
        case ActionType.REGISTER_GUEST_SUCCEED:
            return { ...state, users: action.payload, };
        case ActionType.REGISTER_GUEST_FAILED:
            return { ...state, users: action.payload };
        
        // ROLES
        case ActionType.GET_ROLES:
            return { ...state };
        case ActionType.GET_ROLES_SUCCEED:
            return { ...state, users: action.payload };

        case ActionType.GET_ROLE:
            return { ...state };
        case ActionType.GET_ROLE_SUCCEED:
            return {
                ...state,
                user: action.payload
            }

        case ActionType.ADD_ROLES:
            return { ...state };
        case ActionType.ADD_ROLES_SUCCEED:
            return { ...state, users: [...state.users, action.payload] };
        case ActionType.ADD_ROLES_FAILED:
            return { ...state, users: action.payload };

        case ActionType.UPDATE_ROLES:
            return { ...state };
        case ActionType.UPDATE_ROLES_SUCCEED:
            return applyUpdateRoles(state, action);
        case ActionType.UPDATE_ROLES_FAILED:
            return applyUpdateRoles(state, action);

        case ActionType.DEL_ROLES:
            return { ...state };
        case ActionType.DEL_ROLES_SUCCEED:
            return {
                ...state,
                users: state.users.filter((users:any) => users.id !== action.payload.id)
            }

        // CHANGE PASSWORD
        case ActionType.CHANGE_PASSWORD:
            return { ...state };
        case ActionType.CHANGE_PASSWORD_SUCCEED:
            return applyChangePassword(state, action);
        case ActionType.CHANGE_PASSWORD_FAILED:
            return applyChangePassword(state, action);
        
        // MEMBERS
        case ActionType.GET_MEMBERS:
            return { ...state };
        case ActionType.GET_MEMBERS_SUCCEED:
            return { ...state, members: action.payload };

        case ActionType.GET_MEMBER:
            return { ...state };
        case ActionType.GET_MEMBER_SUCCEED:
            return {
                ...state,
                user: action.payload
            }

        case ActionType.ADD_MEMBERS:
            return { ...state };
        case ActionType.ADD_MEMBERS_SUCCEED:
            return { ...state, members: [...state.members, action.payload] };
        case ActionType.ADD_MEMBERS_FAILED:
            return { ...state, members: action.payload };

        case ActionType.UPDATE_MEMBERS:
            return { ...state };
        case ActionType.UPDATE_MEMBERS_SUCCEED:
            return applyUpdateMembers(state, action);
        case ActionType.UPDATE_MEMBERS_FAILED:
            return applyUpdateMembers(state, action);

        case ActionType.DEL_MEMBERS:
            return { ...state };
        case ActionType.DEL_MEMBERS_SUCCEED:
            return {
                ...state,
                members: state.members.filter((members:any) => members.id !== action.payload.id)
            }
        
        // BONUSPOINTS
        case ActionType.GET_BONUSPOINTS:
            return { ...state };
        case ActionType.GET_BONUSPOINTS_SUCCEED:
            return { ...state, bonusPoints: action.payload };

        case ActionType.GET_BONUSPOINT:
            return { ...state };
        case ActionType.GET_BONUSPOINT_SUCCEED:
            return {
                ...state,
                user: action.payload
            }

        case ActionType.ADD_BONUSPOINTS:
            return { ...state };
        case ActionType.ADD_BONUSPOINTS_SUCCEED:
            return { ...state, bonusPoints: [...state.bonusPoints, action.payload] };
        case ActionType.ADD_BONUSPOINTS_FAILED:
            return { ...state, bonusPoints: action.payload };

        case ActionType.UPDATE_BONUSPOINTS:
            return { ...state };
        case ActionType.UPDATE_BONUSPOINTS_SUCCEED:
            return applyUpdateBonusPoints(state, action);
        case ActionType.UPDATE_BONUSPOINTS_FAILED:
            return applyUpdateBonusPoints(state, action);

        case ActionType.DEL_BONUSPOINTS:
            return { ...state };
        case ActionType.DEL_BONUSPOINTS_SUCCEED:
            return {
                ...state,
                bonusPoints: state.bonusPoints.filter((bonusPoints: any) => bonusPoints.id !== action.payload.id)
            }
        
        // FORGOT PASSWORD
        case ActionType.FORGOT_PASSWORD:
            return { ...state };
        case ActionType.FORGOT_PASSWORD_SUCCEED:
            return applyForgotPassword(state, action);
        case ActionType.FORGOT_PASSWORD_FAILED:
            return applyForgotPassword(state, action);
        
        // DEFAULT
        default:
            return state
    }
}

// UPDATE USERS
const applyUpdateUsers = (state: any, action: any) => {
    return state.user.results.map((user:any) => {
        if (user.user_id === state.user.results.user_id) {
            return {
                ...state,
                ...state.user.results
            }
        } else {
            return state
        }
    });
}

// UPDATE PHOTO USER
const applyUpdatePhotoUsers = (state: any, action: any) => {
    return state.user.results.map((user:any) => {
        if (user.usproId === action.payload.data.results.usproId) {
            return {
                ...state,
                ...state.user.results
            }
        } else {
            return state
        }
    });
}

// UPDATE ROLES
const applyUpdateRoles = (state:any, action:any) => {
    return state.users.results.map((users: any) => {
        if (users.roleId == state.user.results.roleId) {
            return {
                ...state,
                ...state.user.results
            }
        } else {
            return state
        }
    });
}

// UPDATE CHANGE PASSWORD
const applyChangePassword = (state:any, action:any) => {
    return state.user.results.map((user: any) => {
        if (user.user_id === state.user.results.user_id) {
            return {
                ...state,
                ...state.user.results
            }
        } else {
            return state
        }
    });
}

// UPDATE MEMBERS
const applyUpdateMembers = (state: any, action: any) => {
    return state.members.results.map((member:any) => {
        if (member.usmeId === state.members.results.usmeId) {
            return {
                ...state,
                ...state.member.results
            }
        } else {
            return state
        }
    });
}

// UPDATE BONUSPOINTS
const applyUpdateBonusPoints = (state: any, action: any) => {
    return state.bonusPoints.results.map((bonusPoint: any) => {
        if (bonusPoint.ubpoId === state.bonusPoints.results.ubpoId) {
            return {
                ...state,
                ...state.bonusPoints.results
            }
        } else {
            return state
        }
    });
}

// UPDATE FORGOT PASSWORD
const applyForgotPassword = (state: any, action: any) => {
    if (action.payload.data.results) {
        return {
            ...action,
            ...action.payload.data.results
        }
    }

    return action;
}


export default usersReducers