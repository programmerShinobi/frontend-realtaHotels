import ActionType from "redux/Constant/Masters/ActionType";


const initialState = {
    // Location
    mProvinces: [],
  

};

function ProvincesReducer(state = initialState, action: any) {

    switch (action.type) {



        // ======= country ======//
        case ActionType.GET_PROV:
            return { ...state };
        case ActionType.GET_PROV_SUCCEED:
            return { ...state, mProvinces: action.payload };

        case ActionType.ADD_PROV:
            return { ...state };
        case ActionType.ADD_PROV_SUCCEED:
            return { ...state, mProvinces: [...state.mProvinces, action.payload] };
        case ActionType.ADD_PROV_FAILED:
            return { ...state, mProvinces: action.payload };

        // case ActionType.UPDATE_PROV:
        //     return { ...state };
        // case ActionType.UPDATE_PROV_SUCCEED:
        //     return applyUpdatePROV(state, action);
        // case ActionType.UPDATE_PROV_FAILED:
        //     return applyUpdatePROV(state, action);

        case ActionType.DEL_PROV:
            return { ...state };
        case ActionType.DEL_PROV_SUCCEED:
            return {
                ...state,
                mProvinces: state.mProvinces.filter((mProvinces: any) => mProvinces.id !== action.payload.id)
            }
            default:
                return { ...state}
        }}
        
export default ProvincesReducer