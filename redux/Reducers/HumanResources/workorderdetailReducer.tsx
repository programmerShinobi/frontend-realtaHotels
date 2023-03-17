import HrActionType from "@/redux/Constant/HumanResources/HrActionType";

const initialState = {
    workorderdetail: [],
    messageError: null,
}; 
 
function workorderdetailReducer(state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case HrActionType.GET_WORKORDERDETAILS:
            return { ...state };
        case HrActionType.GET_WORKORDERDETAILS_SUCCEED:
            return { ...state, workorderdetail: payload };
        case HrActionType.GET_WORKORDERDETAILS_FAILED:
            return { ...state, error: payload };

        case HrActionType.GET_WORKORDERDETAIL:
            return { ...state };
        case HrActionType.GET_WORKORDERDETAIL_SUCCEED:
            return { ...state, workorderdetail: payload };
        case HrActionType.GET_WORKORDERDETAIL_FAILED:
            return { ...state, error: payload };

        case HrActionType.ADD_WORKORDERDETAIL:
            return { ...state };
        case HrActionType.ADD_WORKORDERDETAIL_SUCCEED:
            return { ...state, workorderdetail: payload };
        case HrActionType.ADD_WORKORDERDETAIL_FAILED:
            return { ...state, error: payload };

        case HrActionType.UPDATE_WORKORDERDETAIL:
            return { ...state };
        case HrActionType.UPDATE_WORKORDERDETAIL_SUCCEED:
            return { ...state, workorderdetail: payload };
        case HrActionType.UPDATE_WORKORDERDETAIL_FAILED:
            return { ...state, messageError: payload };

        case HrActionType.DELETE_WORKORDERDETAIL:
            return { ...state };
        case HrActionType.DELETE_WORKORDERDETAIL_SUCCEED:
            return { ...state, workorderdetail: payload };
        case HrActionType.DELETE_WORKORDERDETAIL_FAILED:
            return { ...state, messageError: payload };

        default:
            return state;
    }
}
export default workorderdetailReducer;