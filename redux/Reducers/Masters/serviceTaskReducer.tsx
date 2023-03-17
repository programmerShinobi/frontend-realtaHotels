import ActionType from "redux/Constant/Masters/ActionType";

const initialState = {
    // Location
    mSerTask: [],


};

function serviceTaskReducer(state = initialState, action: any) {

    switch (action.type) {

        case ActionType.GET_SERVICETASK:
            return { ...state };
        case ActionType.GET_SERVICETASK_SUCCEED:
            return { ...state, mSerTask: action.payload };

        case ActionType.ADD_SERVICETASK:
            return { ...state };
        case ActionType.ADD_SERVICETASK_SUCCEED:
            return { ...state, mSerTask: [...state.mSerTask, action.payload] };
        case ActionType.ADD_SERVICETASK_FAILED:
            return { ...state, mSerTask: action.payload };

        case ActionType.UPDATE_SERVICETASK:
            return { ...state };
        case ActionType.UPDATE_SERVICETASK_SUCCEED:
            return applyUpdateRegions(state, action);
        case ActionType.UPDATE_SERVICETASK_FAILED:
            return applyUpdateRegions(state, action);

        case ActionType.DEL_SERVICETASK:
            return { ...state };
        case ActionType.DEL_SERVICETASK_SUCCEED:
            return {
                ...state,
                mSerTask: state.mSerTask.filter((mSerTask: any) => mSerTask.id !== action.payload.id)
            }


        default:
            return { ...state }
    }

}


const applyUpdateRegions = (state: any, action: any) => {
    return state.mSerTask.results.map((mSerTask: any) => {
        if (mSerTask.setaId === state.mSerTask.results.setaId) {
            return {
                ...state,
                ...state.mSerTask.results
            }
        } else {
            return state
        }
    });
}


export default serviceTaskReducer