import purchasingTypes from "@/redux/Constant/Purchasing/purchasingTypes";

const initialState = {
  stocks: [],
};

function stocksReducers(state = initialState, action: any) {
  switch (action.type) {
    case purchasingTypes.GET_STOCK:
      return { ...state };
    case purchasingTypes.GET_STOCK_SUCCEED:
      return { ...state, stocks: action.payload };
    case purchasingTypes.ADD_STOCK:
      return { ...state };
    case purchasingTypes.ADD_STOCK_SUCCEED:
      return { ...state, stocks: action.payload };
    case purchasingTypes.UPDATE_STOCK:
      return { ...state };
    case purchasingTypes.UPDATE_STOCK_SUCCEED:
        return applyUpdateVendor(state, action)
    //   state.stocks.splice(
    //     state.stocks.findIndex((i: any) => i.stockId == action.payload.stockId),
    //     1,
    //     action.payload
    //   );
    //   return {
    //     ...state,
    //     stocks: [...state.stocks],
    //   };
    default:
      return state;
  }
}

const applyUpdateVendor = (state: any, action: any) => {
    return state.stocks.map((stocks: any) => {
      if (stocks.stockId === action.payload.Id) {
        return {
          ...state,
          ...action.payload,
        };
      } else {
        return state;
      }
    });
  };
export default stocksReducers;
