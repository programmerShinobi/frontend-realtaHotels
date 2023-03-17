import ActionTypes from "../../Constant/Booking/actionType"

interface InitialState {
  RoomNumber: any[];
}

const initialState: InitialState = {
  RoomNumber: [],
};

function RoomNumberReducer(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.GET_MAXIDROOM:
      return { ...state };
    case ActionTypes.GET_MAXIDROOM_SUCCED:
      return { ...state, RoomNumber: action.payload };
    case ActionTypes.GET_MAXIDROOM_FAILED:
      return { ...state, RoomNumber: action.payload };
    default:
      return { ...state };
  }
}

export default RoomNumberReducer;
