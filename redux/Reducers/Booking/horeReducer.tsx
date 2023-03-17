import ActionTypes from "../../Constant/Booking/actionType"

interface InitialState {
  hore: any[];
}

const initialState: InitialState = {
  hore: [],
};

function HoreReducer(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.GET_HORE:
      return { ...state };
    case ActionTypes.GET_HORE_SUCCED:
      return { ...state, hore: action.payload };
    case ActionTypes.GET_HORE_FAILED:
      return { ...state, hore: action.payload };
    default:
      return { ...state };
  }
}

export default HoreReducer;
