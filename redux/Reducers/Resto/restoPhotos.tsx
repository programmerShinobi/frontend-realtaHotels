import ActionTypeResto from "@/redux/Constant/Resto/ActionType";
import { stat } from "fs";

const initialState = {
  restoPhotos: [],
};

function restoPhotosReducers(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypeResto.GET_FOTO_RESTO_MENUS:
      return { ...state };
    case ActionTypeResto.GET_FOTO_RESTO_MENUS_SUCCEED:
      return { ...state, restoPhotos: action.payload };
    case ActionTypeResto.GET_FOTO_RESTO_MENUS_FAILED:
      return { ...state, restoPhotos: action.payload };

    case ActionTypeResto.ADD_FOTO_RESTO_MENUS:
      return { ...state };
    case ActionTypeResto.ADD_FOTO_RESTO_MENUS_SUCCEED:
      return { ...state, restoPhotos: [...state.restoPhotos, action.payload] };
    case ActionTypeResto.ADD_FOTO_RESTO_MENUS_FAILED:
      return { ...state, restoPhotos: action.payload };

    case ActionTypeResto.DEL_RESTOMENUS_PHOTOS:
      return { ...state };
    case ActionTypeResto.DEL_RESTOMENUS_PHOTOS_SUCCEED:
      return { ...state, restoPhotos: state.restoPhotos.filter((restoPhotos: any) => restoPhotos.id !== action.payload.id) };

    default:
      return state;
  }
}

export default restoPhotosReducers;
