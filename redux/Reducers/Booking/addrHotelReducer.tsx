import ActionTypes from "../../Constant/Booking/actionType"

interface InitialState {
  HotelAddr: any[];
}

const initialState: InitialState = {
  HotelAddr: [],
};

function AddrHotelReducer(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.GET_ADDRSEARCH:
      return { ...state };
    case ActionTypes.GET_ADDRSEARCH_SUCCED:
      return { ...state, HotelAddr: action.payload };
    case ActionTypes.GET_ADDRSEARCH_FAILED:
      return { ...state, HotelAddr: action.payload };
    default:
      return { ...state };
  }
}

export default AddrHotelReducer;
