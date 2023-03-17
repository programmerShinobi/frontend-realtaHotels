import ActionTypeResto from "@/redux/Constant/Resto/ActionType";

const initialState = {
  restoCardClient: [],
  restoCardId: [],
};

function restoCardClientReducers(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypeResto.GET_CARDRESTOMENUS:
      return { ...state };
    case ActionTypeResto.GET_CARDRESTOMENUS_SUCCEED:
      return { ...state, restoCardClient: action.payload };
    case ActionTypeResto.GET_CARDRESTOMENUS_FAILED:
      return { ...state, restoCardClient: action.payload };
    default:
      return state;
  }
}

export default restoCardClientReducers;
