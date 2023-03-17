import purchasingTypes from "@/redux/Constant/Purchasing/purchasingTypes";

const initialState = {
  purchaseOrder: [],
  purchaseOrderDetail : []
};

export function purchaseOrderReducers(state = initialState, action: any) {
  switch (action.type) {
    case purchasingTypes.GET_PURCHASE_ORDER:
      return { ...state };
    case purchasingTypes.GET_PURCHASE_ORDER_SUCCEED:
      return { ...state, purchaseOrder: action.payload };
    case purchasingTypes.GET_PURCHASE_ORDER_DETAIL:
        return {...state};
    case purchasingTypes.GET_PURCHASE_ORDER_DETAIL_SUCCEED:
        return {...state, purchaseOrderDetail: action.payload}
    case purchasingTypes.ADD_PURCHASE_ORDER:
      return { ...state };
    case purchasingTypes.ADD_PURCHASE_ORDER_SUCCEED:
      return { ...state, purchaseOrder: action.payload };
    case purchasingTypes.EDIT_PURCHASE_ORDER:
        return{...state};
    case purchasingTypes.EDIT_PURCHASE_ORDER_SUCCEED:
        state.purchaseOrder.splice(
            state.purchaseOrder.findIndex(
              (i: any) => i.poheid == action.payload.poheid
            ),
            1,
            action.payload
          );
          return {
            ...state,
            vendors: [...state.purchaseOrder],
          };    default:
      return state;
  }
}
