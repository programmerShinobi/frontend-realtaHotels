import HrActionType from "@/redux/Constant/HumanResources/HrActionType";

const initialState = {
    user: [],
    messageError: null,
}; 
 
function userReducer(state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case HrActionType.GET_USERS:
            return { ...state };
        case HrActionType.GET_USERS_SUCCEED:
            return { ...state, user: payload };
        case HrActionType.GET_USERS_FAILED:
            return { ...state, error: payload };
            
        default:
            return state;
    }
}
export default userReducer;
