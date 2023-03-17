import HrActionType from "@/redux/Constant/HumanResources/HrActionType";

const initialState = {
    shift: [],
    messageError: null,
}; 
 
function shiftReducer(state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case HrActionType.GET_SHIFTS:
            return { ...state };
        case HrActionType.GET_SHIFTS_SUCCEED:
            return { ...state, shift: payload };
        case HrActionType.GET_SHIFTS_FAILED:
            return { ...state, error: payload };
            
        default:
            return state;
    }
}
export default shiftReducer;
