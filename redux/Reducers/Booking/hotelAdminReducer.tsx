import ActionTypes from "../../Constant/Booking/actionType"

interface InitialState {
  hotelAdmin: any[];
}

const initialState: InitialState = {
  hotelAdmin: [],
};

function HotelAdminReducer(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.GET_HOTELADMIN:
      return { ...state };
    case ActionTypes.GET_HOTELADMIN_SUCCED:
      return { ...state, hotelAdmin: action.payload };
    case ActionTypes.GET_HOTELADMIN_FAILED:
      return { ...state, hotelAdmin: action.payload };
    // insert
    case ActionTypes.ADD_HOTELADMIN:
      return { ...state };
    case ActionTypes.ADD_HOTELADMIN_SUCCED:
      return { ...state, hotelAdmin: [...state.hotelAdmin, action.payload] };
    case ActionTypes.ADD_HOTELADMIN_FAILED:
      return { ...state, hotelAdmin: [...state.hotelAdmin, action.payload] };
    // delete
    case ActionTypes.DEL_HOTELADMIN:
      return { ...state };
    case ActionTypes.DEL_HOTELADMIN_SUCCED:
      return {
        ...state,
        hotelAdmin: state.hotelAdmin.filter(
          (hotelAdmin) => hotelAdmin.hotelId !== action.payload
        ),
      };
    case ActionTypes.DEL_HOTELADMIN_FAILED:
      return {
        ...state,
        hotelAdmin: state.hotelAdmin.filter(
          (hotelAdmin) => hotelAdmin.hotelId !== action.payload
        ),
      };
    // update
    case ActionTypes.UPDATE_HOTELADMIN:
      return { ...state };
    case ActionTypes.UPDATE_HOTELADMIN_SUCCED:
      return applyUpdateHotel(state, action);
    case ActionTypes.UPDATE_HOTELADMIN_FAILED:
      return applyUpdateHotel(state, action);
    default:
      return state;
  }
}

const applyUpdateHotel = async (
  state: { hotelAdmin: any[] },
  action: { payload: { hotelId: any } }
) => {
  return state.hotelAdmin.map((hotelAdmin) => {
    if (hotelAdmin.hotelId === action.payload.hotelId) {
      return {
        ...state,
        ...action.payload,
      };
    } else {
      return state;
    }
  });
};

export default HotelAdminReducer;
