import HrActionType from "@/redux/Constant/HumanResources/HrActionType";

const initialState = {
    workorder: [],
    messageError: null,
}; 
 
function workorderReducer(state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case HrActionType.GET_WORKORDERS:
            return { ...state };
        case HrActionType.GET_WORKORDERS_SUCCEED:
            return { ...state, workorder: payload };
        case HrActionType.GET_WORKORDERS_FAILED:
            return { ...state, error: payload };

        case HrActionType.GET_WORKORDER:
            return { ...state };
        case HrActionType.GET_WORKORDER_SUCCEED:
            return { ...state, workorder: payload };
        case HrActionType.GET_WORKORDER_FAILED:
            return { ...state, error: payload };

        case HrActionType.ADD_WORKORDER:
            return { ...state };
        case HrActionType.ADD_WORKORDER_SUCCEED:
            return { ...state, workorder: payload };
        case HrActionType.ADD_WORKORDER_FAILED:
            return { ...state, error: payload };

        case HrActionType.UPDATE_WORKORDER:
            return { ...state };
        case HrActionType.UPDATE_WORKORDER_SUCCEED:
            return { ...state, workorder: payload };
        case HrActionType.UPDATE_WORKORDER_FAILED:
            return { ...state, messageError: payload };

        case HrActionType.DELETE_WORKORDER:
            return { ...state };
        case HrActionType.DELETE_WORKORDER_SUCCEED:
            return {
                ...state,
                workorder: state.workorder.filter(
                    (workorder: any) => workorder.woroId !== payload
                ),
            };
        case HrActionType.DELETE_WORKORDER_FAILED:
            return { ...state, messageError: payload };

        default:
            return state;
    }
}
export default workorderReducer;