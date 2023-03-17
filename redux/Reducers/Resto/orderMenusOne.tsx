import ActionTypeResto from "@/redux/Constant/Resto/ActionType";

const initialState = {
  orderMenusAkhir: [],
};

function orderMenusAkhirReducers(state = initialState, action: any): any {
  switch (action.type) {
    //GetAll
    case ActionTypeResto.GET_AKHIR_ORDER_MENUS:
      return { ...state };
    case ActionTypeResto.GET_AKHIR_ORDER_MENUS_SUCCEED:
      return { ...state, orderMenusAkhir: action.payload };
    case ActionTypeResto.GET_AKHIR_ORDER_MENUS_FAILED:
      return { ...state, orderMenusAkhir: action.payload };
    default:
      return state;
  }
}

export default orderMenusAkhirReducers;
