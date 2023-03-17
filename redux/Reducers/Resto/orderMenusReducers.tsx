import ActionTypeResto from "@/redux/Constant/Resto/ActionType";

const initialState = {
  orderMenus: [],
  orderMenu: [],
};

function orderMenusReducers(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypeResto.GET_ORDER_MENUS:
      return { ...state };
    case ActionTypeResto.GET_ORDER_MENUS_SUCCEED:
      return { ...state, orderMenus: action.payload };

    case ActionTypeResto.ADD_ORDER_MENUS:
      return { ...state };
    case ActionTypeResto.ADD_ORDER_MENUS_SUCCEED:
      return { ...state, orderMenus: [...state.orderMenus, action.payload] };
    case ActionTypeResto.ADD_ORDER_MENUS_FAILED:
      return { ...state, orderMenus: action.payload };

    default:
      return state;
  }
}

export default orderMenusReducers;
