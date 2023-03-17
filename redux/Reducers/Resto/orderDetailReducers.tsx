import ActionTypeResto from "@/redux/Constant/Resto/ActionType";

const initialState = {
  orderDetails: [],
  orderDetail: [],
};

function orderDetailReducers(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypeResto.GET_ORDER_DETAIL:
      return { ...state };
    case ActionTypeResto.GET_ORDER_DETAIL_SUCCEED:
      return { ...state, orderDetails: action.payload };

    case ActionTypeResto.ADD_ORDER_DETAIL:
      return { ...state };
    case ActionTypeResto.ADD_ORDER_DETAIL_SUCCEED:
      return { ...state, orderDetails: [...state.orderDetails, action.payload] };
    case ActionTypeResto.ADD_ORDER_DETAIL_FAILED:
      return { ...state, orderDetails: action.payload };

    default:
      return state;
  }
}

export default orderDetailReducers;
