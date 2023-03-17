import ActionTypes from "../../Constant/Hotels/actionType";

interface InitialState {
  fph: any[];
}

const initialState: InitialState = {
  fph: [],
};

function FaciPriceHistoryReducer(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.GET_FACIPRICEHISTORY:
      return { ...state };
    case ActionTypes.GET_FACIPRICEHISTORY_SUCCED:
      return { ...state, fph: action.payload };
    case ActionTypes.GET_FACIPRICEHISTORY_FAILED:
      return { ...state, fph: action.payload };
    default:
      return { ...state };
  }
}

export default FaciPriceHistoryReducer;
