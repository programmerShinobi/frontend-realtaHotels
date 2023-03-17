import ActionTypes from "../../Constant/Booking/actionType"

interface InitialState {
  hotel: any[];
}

const initialState: InitialState = {
  hotel: [],
};

function HotelReducer(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.GET_CARDHOTEL:
      return { ...state };
    case ActionTypes.GET_CARDHOTEL_SUCCED:
      return { ...state, hotel: action.payload };
    case ActionTypes.GET_CARDHOTEL_FAILED:
      return { ...state, hotel: action.payload };
    default:
      return { ...state };
  }
}

export default HotelReducer;
