import HrActionType from "@/redux/Constant/HumanResources/HrActionType";

const initialState = {
    employeeDepartmentHistory: [],
    messageError: null,
}; 
 
function employeeDepartmentHistoryReducer(state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case HrActionType.GET_EMPLOYEEDEPARTMENTHISTORYS:
            return { ...state };
        case HrActionType.GET_EMPLOYEEDEPARTMENTHISTORYS_SUCCEED:
            return { employeeDepartmentHistory: payload };
        case HrActionType.GET_EMPLOYEEDEPARTMENTHISTORYS_FAILED:
            return { ...state, messageError: payload };

        case HrActionType.GET_EMPLOYEEDEPARTMENTHISTORY:
            return { ...state };
        case HrActionType.GET_EMPLOYEEDEPARTMENTHISTORY_SUCCEED:
            return { employeeDepartmentHistory: payload };
        case HrActionType.GET_EMPLOYEEDEPARTMENTHISTORY_FAILED:
            return { ...state, messageError: payload };

        case HrActionType.ADD_EMPLOYEEDEPARTMENTHISTORY:
            return { ...state };
        case HrActionType.ADD_EMPLOYEEDEPARTMENTHISTORY_SUCCEED:
            return { employeeDepartmentHistory: payload };
        case HrActionType.ADD_EMPLOYEEDEPARTMENTHISTORY_FAILED:
            return { ...state, messageError: payload };

        case HrActionType.UPDATE_EMPLOYEEDEPARTMENTHISTORY:
            return { ...state };
        case HrActionType.UPDATE_EMPLOYEEDEPARTMENTHISTORY_SUCCEED:
            return { employeeDepartmentHistory: payload };
        case HrActionType.UPDATE_EMPLOYEEDEPARTMENTHISTORY_FAILED:
            return { ...state, messageError: payload };

        case HrActionType.DELETE_EMPLOYEEDEPARTMENTHISTORY:
            return { ...state };
        case HrActionType.DELETE_EMPLOYEEDEPARTMENTHISTORY_SUCCEED:
            return { employeeDepartmentHistory: payload };
        case HrActionType.DELETE_EMPLOYEEDEPARTMENTHISTORY_FAILED:
            return { ...state, messageError: payload };

        default:
            return state;
    }
}
export default employeeDepartmentHistoryReducer;