import ActionType from "redux/Constant/Masters/ActionType";

const initialState = {
    // Location
    mCagro: [],


};

function cagroReducer(state = initialState, action: any) {

    switch (action.type) {

        case ActionType.GET_CAGRO:
            return { ...state };
        case ActionType.GET_CAGRO_SUCCEED:
            return { ...state, mCagro: action.payload };

        case ActionType.ADD_CAGRO:
            return { ...state };
        case ActionType.ADD_CAGRO_SUCCEED:
            return { ...state, mCagro: [...state.mCagro, action.payload] };
        case ActionType.ADD_CAGRO_FAILED:
            return { ...state, mCagro: action.payload };

        case ActionType.UPDATE_CAGRO:
            return { ...state };
        case ActionType.UPDATE_CAGRO_SUCCEED:
            return applyUpdateCagro(state, action);
        case ActionType.UPDATE_CAGRO_FAILED:
            return applyUpdateCagro(state, action);

        case ActionType.DEL_CAGRO:
            return { ...state };
        case ActionType.DEL_CAGRO_SUCCEED:
            return {
                ...state,
                mCagro: state.mCagro.filter((mCagro: any) => mCagro.cagroId !== action.payload)
            }


        default:
            return { ...state }
    }

}


const applyUpdateCagro = (state: any, action: any) => {
    return state.mCagro.results.map((mCagro: any) => {
        if (mCagro.cagroId === state.mCagro.results.cagroId) {
            return {
                ...state,
                ...state.mCagro.results
            }
        } else {
            return state
        }
    });
}


export default cagroReducer