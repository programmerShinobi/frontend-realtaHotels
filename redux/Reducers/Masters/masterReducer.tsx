import ActionType from "redux/Constant/Masters/ActionType";

interface InitialState {
    mRegion: any[];
  }
const initialState = {
    // Location
    mRegion: [],


};

function masterReducers(state = initialState, action: any) {

    switch (action.type) {

        case ActionType.GET_REGIONS:
            return { ...state };
        case ActionType.GET_REGIONS_SUCCEED:
            return { ...state, mRegion: action.payload };

        case ActionType.ADD_REGIONS:
            return { ...state };
        case ActionType.ADD_REGIONS_SUCCEED:
            return { ...state, mRegion: [...state.mRegion, action.payload] };
        case ActionType.ADD_REGIONS_FAILED:
            return { ...state, mRegion: [...state.mRegion, action.payload] };
        
            case ActionType.UPDATE_REGIONS:
            return { ...state };
        case ActionType.UPDATE_REGIONS_SUCCEED:
            return { ...state, mRegion: [...state.mRegion, action.payload] };
        case ActionType.UPDATE_REGIONS_FAILED:
            return { ...state, mRegion: [...state.mRegion, action.payload] };

        // case ActionType.UPDATE_REGIONS:
        //     return { ...state };
        // case ActionType.UPDATE_REGIONS_SUCCEED:
        //     return applyUpdateRegions(state, action.payload);
        // case ActionType.UPDATE_REGIONS_FAILED:
        //     return applyUpdateRegions(state, action.payload);

        case ActionType.DEL_REGIONS:
            return { ...state };
        case ActionType.DEL_REGIONS_SUCCEED:
            return {
                ...state,
                mRegion: state.mRegion.filter((item: any) => item.regionCode !== action.payload.regionCode)
            }


        default:
            return { ...state }
    }

}

const applyUpdateRegions = (state: any, action: any) => {
    return state.mRegion.result.map((mRegion: any) => {
      if (mRegion.regionCode === state.mRegion.results.regionCode) {
        return {
          ...state,
          ...state.mRegion.results,
        };
      } else {
        return state;
      }
    
// const applyUpdateRegions = (state: any, action: any) => {
//     return state.mRegion.results.map((item: any) => {
//         if (item.regionCode === state.mRegion.results.regionCode) {
//             return {
//                 ...state,
//                 ...state.mRegion.results
//             }
//         } else {
//             return state
//         }
//     });
// }
// const newUserAccountData: any = {
//     securedKey: action.data.securedKey,
// };
// state.accounts.splice(
//     state.accounts.findIndex(
//         (item: UserAccount) =>
//             item.accountNumber == action.data.accountNumber
//     ),
//     1,
//     newUserAccountData
// );
    })}

export default masterReducers