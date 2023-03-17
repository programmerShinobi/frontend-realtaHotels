import ActionType from "redux/Constant/Masters/ActionType";



const initialState = {
    // Location
    mPolicy: [],


};

function policyReducer(state = initialState, action: any) {

    switch (action.type) {

        case ActionType.GET_POLICY:
            return { ...state };
        case ActionType.GET_POLICY_SUCCEED:
            return { ...state, mPolicy: action.payload };

        case ActionType.ADD_POLICY:
            return { ...state };
        case ActionType.ADD_POLICY_SUCCEED:
            return { ...state, mPolicy: [...state.mPolicy, action.payload] };
        case ActionType.ADD_POLICY_FAILED:
            return { ...state, mPolicy: action.payload };

        case ActionType.UPDATE_POLICY:
            return { ...state };
        case ActionType.UPDATE_POLICY_SUCCEED:
            return applyUpdatePOLICY(state, action.payload);
        case ActionType.UPDATE_POLICY_FAILED:
            return applyUpdatePOLICY(state, action.payload);

        case ActionType.DEL_POLICY:
            return { ...state };
        case ActionType.DEL_POLICY_SUCCEED:
            return {
                ...state,
                mPolicy: state.mPolicy.filter((mPolicy: any) => mPolicy.poliId !== action.payload.poliId)
            }


        default:
            return { ...state }
    }

}


const applyUpdatePOLICY = (state: any, _action: any) => {
    return state.mPolicy.results.map((mPolicy: any) => {
        if (mPolicy.poliId === state.mPolicy.results.poliId) {
            return {
                ...state,
                ...state.mPolicy.results
            }
        } else {
            return state
        }
    });
}


export default policyReducer