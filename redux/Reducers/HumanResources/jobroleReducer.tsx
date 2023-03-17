import HrActionType from "@/redux/Constant/HumanResources/HrActionType";

const initialState = {
    jobrole: [],
    messageError: null,
}; 
 
function jobroleReducer(state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case HrActionType.GET_JOBROLES:
            return { ...state };
        case HrActionType.GET_JOBROLES_SUCCEED:
            return { ...state, jobrole: payload };
        case HrActionType.GET_JOBROLES_FAILED:
            return { ...state, error: payload };
            
        default:
            return state;
    }
}
export default jobroleReducer;
