import ActionTypeResto from "@/redux/Constant/Resto/ActionType";

const initialState = {
  orderMenusIdAkhir: [],
};

function orderMenusIdAkhirReducers(state = initialState, action: any): any {
  switch (action.type) {
    //GetAll
    case ActionTypeResto.GET_ID_AKHIR_ORDER_MENUS:
      return { ...state };
    case ActionTypeResto.GET_ID_AKHIR_ORDER_MENUS_SUCCED:
      return { ...state, orderMenusIdAkhir: action.payload };
    case ActionTypeResto.GET_ID_AKHIR_ORDER_MENUS_FAILED:
      return { ...state, orderMenusIdAkhir: action.payload };
    default:
      return state;
  }
}

export default orderMenusIdAkhirReducers;
