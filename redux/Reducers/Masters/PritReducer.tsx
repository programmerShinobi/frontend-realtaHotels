import ActionType from "redux/Constant/Masters/ActionType";

const initialState = {
    // Location
    mPrit: [],


};

function PritReducer(state = initialState, action: any) {

    switch (action.type) {

        case ActionType.GET_PRIT:
            return { ...state };
        case ActionType.GET_PRIT_SUCCEED:
            return { ...state, mPrit: action.payload };

        case ActionType.ADD_PRIT:
            return { ...state };
        case ActionType.ADD_PRIT_SUCCEED:
            return { ...state, mPrit: [...state.mPrit, action.payload] };
        case ActionType.ADD_PRIT_FAILED:
            return { ...state, mPrit: action.payload };

        case ActionType.UPDATE_PRIT:
            return { ...state };
        case ActionType.UPDATE_PRIT_SUCCEED:
            return applyUpdatePrit(state, action);
        case ActionType.UPDATE_PRIT_FAILED:
            return applyUpdatePrit(state, action);

        case ActionType.DEL_PRIT:
            return { ...state };
        case ActionType.DEL_PRIT_SUCCEED:
            return {
                ...state,
                mPrit: state.mPrit.filter((mPrit: any) => mPrit.pritId !== action.payload)
            }


        default:
            return { ...state }
    }

}


const applyUpdatePrit = (state: any, action: any) => {
    return state.mPrit.results.map((mPrit: any) => {
        if (mPrit.pritId === state.mPrit.results.pritId) {
            return {
                ...state,
                ...state.mPrit.results
            }
        } else {
            return state
        }
    });
}


export default PritReducer