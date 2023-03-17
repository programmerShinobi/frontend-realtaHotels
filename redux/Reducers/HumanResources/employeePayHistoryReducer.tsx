import HrActionType from "@/redux/Constant/HumanResources/HrActionType";

const initialState = {
    employeePayHistory: [],
    messageError: null,
}; 
 
function employeePayHistoryReducer(state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case HrActionType.GET_EMPLOYEEPAYHISTORYS:
            return { ...state };
        case HrActionType.GET_EMPLOYEEPAYHISTORYS_SUCCEED:
            return { employeePayHistory: payload };
        case HrActionType.GET_EMPLOYEEPAYHISTORYS_FAILED:
            return { ...state, error: payload };

        case HrActionType.GET_EMPLOYEEPAYHISTORY:
            return { ...state };
        case HrActionType.GET_EMPLOYEEPAYHISTORY_SUCCEED:
            return { employeePayHistory: payload };
        case HrActionType.GET_EMPLOYEEPAYHISTORY_FAILED:
            return { ...state, error: payload };

        case HrActionType.ADD_EMPLOYEEPAYHISTORY:
            return { ...state };
        case HrActionType.ADD_EMPLOYEEPAYHISTORY_SUCCEED:
            return { employeePayHistory: payload };
        case HrActionType.ADD_EMPLOYEEPAYHISTORY_FAILED:
            return { ...state, messageError: payload };

        case HrActionType.UPDATE_EMPLOYEEPAYHISTORY:
            return { ...state };
        case HrActionType.UPDATE_EMPLOYEEPAYHISTORY_SUCCEED:
            return { employeePayHistory: payload };
        case HrActionType.UPDATE_EMPLOYEEPAYHISTORY_FAILED:
            return { ...state, messageError: payload };

        case HrActionType.DELETE_EMPLOYEEPAYHISTORY:
            return { ...state };
        case HrActionType.DELETE_EMPLOYEEPAYHISTORY_SUCCEED:
            return { employeePayHistory: payload };
        case HrActionType.DELETE_EMPLOYEEPAYHISTORY_FAILED:
            return { ...state, messageError: payload };

        default:
            return state;
    }
}
export default employeePayHistoryReducer;