import ActionType from "@/redux/Constant/Users/ActionType";

const initialState = {
    users: [],
    user: []
};

function usersReducers(state = initialState, action:any) {

    switch (action.type) {

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

        default:
            return { ...state, users: action.payload }
    }
}

const applyUpdateUsers = (state:any, action:any) => {
    return state.users.results.map((users:any) => {
        if (users.userId === state.user.results.userId) {
            return {
                ...state,
                ...state.user.results
            }
        } else {
            return state
        }
    });
}

const applyUpdatePhotoUsers = (state:any, action:any) => {
    return state.users.results.map((users:any) => {
        if (users.userId === state.user.results.userId) {
            return {
                ...state,
                ...state.user.results
            }
        } else {
            return state
        }
    });
}

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


export default usersReducers