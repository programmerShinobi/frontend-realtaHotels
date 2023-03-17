import HrActionType from "@/redux/Constant/HumanResources/HrActionType";

const initialState = {
    department: [],
    messageError: null,
}; 
 
function departmentReducer(state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case HrActionType.GET_DEPARTMENTS:
            return { ...state };
        case HrActionType.GET_DEPARTMENTS_SUCCEED:
            return { ...state, department: payload };
        case HrActionType.GET_DEPARTMENTS_FAILED:
            return { ...state, error: payload };

        case HrActionType.GET_DEPARTMENT:
            return { ...state };
        case HrActionType.GET_DEPARTMENT_SUCCEED:
            return { ...state, department: payload };
        case HrActionType.GET_DEPARTMENT_FAILED:
            return { ...state, error: payload };

        case HrActionType.ADD_DEPARTMENT:
            return { ...state };
        case HrActionType.ADD_DEPARTMENT_SUCCEED:
            return { ...state, department: payload };
        case HrActionType.ADD_DEPARTMENT_FAILED:
            return { ...state, messageError: payload };

        case HrActionType.UPDATE_DEPARTMENT:
            return { ...state };
        case HrActionType.UPDATE_DEPARTMENT_SUCCEED:
            return { ...state, department: payload };
        case HrActionType.UPDATE_DEPARTMENT_FAILED:
            return { ...state, messageError: payload };

        case HrActionType.DELETE_DEPARTMENT:
            return { ...state };
        case HrActionType.DELETE_DEPARTMENT_SUCCEED:
            return { ...state, department: payload };
        case HrActionType.DELETE_DEPARTMENT_FAILED:
            return { ...state, messageError: payload };

        default:
            return state;
    }
}
export default departmentReducer;