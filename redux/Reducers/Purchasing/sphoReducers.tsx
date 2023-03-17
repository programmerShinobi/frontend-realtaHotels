import purchasingTypes from "@/redux/Constant/Purchasing/purchasingTypes";

const initialState = {
  stockPhotos: [],
};

const sphoReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case purchasingTypes.GET_STOCK_PHOTO:
      return { ...state };
    case purchasingTypes.GET_STOCK_PHOTO_SUCCEED:
      return { ...state, stockPhotos: action.payload };
    case purchasingTypes.GET_STOCK_PHOTO_DASHBOARD:
      return{...state}
    case purchasingTypes.GET_STOCK_PHOTO_DASHBOARD_SUCCEED:
      return{...state, stockPhotos:action.payload}
    case purchasingTypes.ADD_STOCK_PHOTO:
      return { ...state };
    case purchasingTypes.ADD_STOCK_PHOTO_SUCCEED:
      return { ...state, stockPhotos: action.payload };
    default:
      return state;
  }
};

export default sphoReducers