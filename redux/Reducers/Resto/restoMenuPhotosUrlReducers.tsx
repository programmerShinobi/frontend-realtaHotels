import ActionTypeResto from "@/redux/Constant/Resto/ActionType";

const initialState = {
  orderMenusPhotosUrl: [],
};

function restoMenusPhotosUrlReducers(state = initialState, action: any): any {
  switch (action.type) {
    //GetAll
    case ActionTypeResto.GET_URL_PHOTOS:
      return { ...state };
    case ActionTypeResto.GET_URL_PHOTOS_SUCCED:
      return { ...state, orderMenusPhotosUrl: action.payload };
    case ActionTypeResto.GET_URL_PHOTOS_FAILED:
      return { ...state, orderMenusPhotosUrl: action.payload };
    default:
      return state;
  }
}

export default restoMenusPhotosUrlReducers;
