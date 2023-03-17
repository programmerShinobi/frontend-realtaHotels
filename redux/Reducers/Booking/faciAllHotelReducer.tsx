import ActionTypes from "../../Constant/Booking/actionType"

interface InitialState {
  facihotel: any[];
}

const initialState: InitialState = {
  facihotel: [],
};

function FaciAllHotelReducer(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.GET_FACIALLHOTEL:
      return { ...state };
    case ActionTypes.GET_FACIALLHOTEL_SUCCED:
      return { ...state, facihotel: action.payload };
    case ActionTypes.GET_FACIALLHOTEL_FAILED:
      return { ...state, facihotel: action.payload };
    default:
      return { ...state };
  }
}

export default FaciAllHotelReducer;
