import HrActionType from "@/redux/Constant/HumanResources/HrActionType";

const initialState = {
    employee: [],
    messageError: null,
};

function employeeReducer(state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case HrActionType.GET_EMPLOYEES:
            return { ...state };
        case HrActionType.GET_EMPLOYEES_SUCCEED:
            return { employee: payload };
        case HrActionType.GET_EMPLOYEES_FAILED:
            return { ...state, messageError: payload };
        case HrActionType.GET_EMPLOYEE:
            return { ...state };
        case HrActionType.GET_EMPLOYEE_SUCCEED:
            return { employee: payload };
        case HrActionType.GET_EMPLOYEE_FAILED:
            return { ...state, messageError: payload };
        case HrActionType.ADD_EMPLOYEE:
            return { ...state };
        case HrActionType.ADD_EMPLOYEE_SUCCEED:
            return { employee: payload };
        case HrActionType.ADD_EMPLOYEE_FAILED:
            return { ...state, messageError: payload };
        case HrActionType.UPDATE_EMPLOYEE:
            return { ...state };
        case HrActionType.UPDATE_EMPLOYEE_SUCCEED:
            return { employee: payload };
        case HrActionType.UPDATE_EMPLOYEE_FAILED:
            return { ...state, messageError: payload };

        case HrActionType.DELETE_EMPLOYEE:
            return { ...state };
        case HrActionType.DELETE_EMPLOYEE_SUCCEED:
            return {
                ...state,
                employee: state.employee.filter(
                    (employee: any) => employee.deptId !== payload
                ),
            };
        case HrActionType.DELETE_EMPLOYEE_FAILED:
            return { ...state, messageError: payload };

        default:
            return state;
    }
}
export default employeeReducer;
