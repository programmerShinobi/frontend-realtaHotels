import ActionType from "redux/Constant/Masters/ActionType";

const initialState = {
    // Location
    mAddr: [],
  

};

function AddrReducer(state = initialState, action: any) {

    switch (action.type) {



        // ======= country ======//
        case ActionType.GET_ADDR:
            return { ...state };
        case ActionType.GET_ADDR_SUCCEED:
            return { ...state, mAddr: action.payload };

        case ActionType.ADD_ADDR:
            return { ...state };
        case ActionType.ADD_ADDR_SUCCEED:
            return { ...state, mAddr: [...state.mAddr, action.payload] };
        case ActionType.ADD_ADDR_FAILED:
            return { ...state, mAddr: action.payload };

            case ActionType.UPDATE_ADDR_SUCCEED:
            return { ...state, mAddr: [...state.mAddr, action.payload] };
        case ActionType.UPDATE_ADDR_FAILED:
            return { ...state, mAddr: [...state.mAddr, action.payload] };


        case ActionType.DEL_ADDR:
            return { ...state };
        case ActionType.DEL_ADDR_SUCCEED:
            return {
                ...state,
                mAddr: state.mAddr.filter((mAddr: any) => mAddr.addrId !== action.payload.addrId)
            }
            default:
                return { ...state}
        }}
        
export default AddrReducer