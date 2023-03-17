import ActionTypeResto from "@/redux/Constant/Resto/ActionType";

// get url photos

export const restoMenusPhotosUrlRequest: any = (): any => {
  return {
    type: ActionTypeResto.GET_URL_PHOTOS,
  };
};

export const restoMenusPhotosUrlRequestSucced: any = (payload: any): any => {
  return {
    type: ActionTypeResto.GET_URL_PHOTOS_SUCCED,
    payload,
  };
};

export const restoMenusPhotosUrlRequestFailed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.GET_URL_PHOTOS_FAILED,
    payload,
  };
};

//Get id terakhir

export const orderMenusIdAkhirRequest: any = (): any => {
  return {
    type: ActionTypeResto.GET_ID_AKHIR_ORDER_MENUS,
  };
};

export const orderMenusIdAkhirRequestSucced: any = (payload: any): any => {
  return {
    type: ActionTypeResto.GET_ID_AKHIR_ORDER_MENUS_SUCCED,
    payload,
  };
};

export const orderMenusIdAkhirRequestFailed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.GET_ID_AKHIR_ORDER_MENUS_FAILED,
    payload,
  };
};

// Get Akhir order manus
export const orderMenusOneAkhirRequest: any = (): any => {
  return {
    type: ActionTypeResto.GET_AKHIR_ORDER_MENUS,
  };
};

export const orderMenusOneAkhirRequestSecced: any = (payload: any): any => {
  return {
    type: ActionTypeResto.GET_AKHIR_ORDER_MENUS_SUCCEED,
    payload,
  };
};

export const orderMenusOneAkhirRequestFailed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.GET_AKHIR_ORDER_MENUS_FAILED,
    payload,
  };
};

//Get order menus
export const doOrderMenusRequest: any = (): any => {
  return {
    type: ActionTypeResto.GET_ORDER_MENUS,
  };
};

export const doOrderMenusRequestSucceed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.GET_ORDER_MENUS_SUCCEED,
    payload,
  };
};

export const doOrderMenusRequestFailed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.GET_ORDER_MENUS_FAILED,
    payload,
  };
};

// order menus create
export const doCreateOrderMenus: any = (payload: any): any => {
  return {
    type: ActionTypeResto.ADD_ORDER_MENUS,
    payload,
  };
};

export const doCreateOrderMenusSucceed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.ADD_ORDER_MENUS_SUCCEED,
    payload,
  };
};

export const doCreateOrderMenusFailed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.ADD_ORDER_MENUS_FAILED,
    payload,
  };
};

//order detail get

export const doOrderMenusDetailRequest: any = (): any => {
  return {
    type: ActionTypeResto.GET_ORDER_MENUS,
  };
};

export const doOrderMenusDetailRequestSucceed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.GET_ORDER_MENUS_SUCCEED,
    payload,
  };
};

export const doOrderMenusDetailRequestFailed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.GET_ORDER_MENUS_FAILED,
    payload,
  };
};

//Order Detail create
export const doCreateOrderMenusDetail: any = (payload: any): any => {
  return {
    type: ActionTypeResto.ADD_ORDER_DETAIL,
    payload,
  };
};

export const doCreateOrderMenusDetailSucceed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.ADD_ORDER_DETAIL_SUCCEED,
    payload,
  };
};

export const doCreateOrderMenusDetailFailed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.ADD_ORDER_DETAIL_FAILED,
    payload,
  };
};

//Get All resto foto

export const doPhotosRequest: any = (): any => {
  return {
    type: ActionTypeResto.GET_FOTO_RESTO_MENUS,
  };
};

export const doPhotosRequestSucceed: any = (): any => {
  return {
    type: ActionTypeResto.GET_FOTO_RESTO_MENUS_SUCCEED,
  };
};

export const doPhotosRequestFailed: any = (): any => {
  return {
    type: ActionTypeResto.GET_FOTO_RESTO_MENUS_FAILED,
  };
};

// CREATE FOTO RESTO

export const doAddPhotosRequest: any = (): any => {
  return {
    type: ActionTypeResto.ADD_FOTO_RESTO_MENUS,
  };
};
export const doAddPhotosRequestSucced: any = (): any => {
  return {
    type: ActionTypeResto.ADD_FOTO_RESTO_MENUS_SUCCEED,
  };
};

export const doAddPhotosRequestFailed: any = (): any => {
  return {
    type: ActionTypeResto.ADD_FOTO_RESTO_MENUS_FAILED,
  };
};

// UPDATE FOTO RESTO

export const doUpdatePhotosRequest: any = () => {
  return {
    type: ActionTypeResto.UPDATE_FOTO_RESTO_MENUS,
  };
};

export const doUpdatePhotosRequestSucced: any = () => {
  return {
    type: ActionTypeResto.UPDATE_FOTO_RESTO_MENUS_SUCCEED,
  };
};
export const doUpdatePhotosRequestFailed: any = () => {
  return {
    type: ActionTypeResto.UPDATE_FOTO_RESTO_MENUS_FAILED,
  };
};

//Get All tabel card client
export const doCardClientRequest: any = (): any => {
  return {
    type: ActionTypeResto.GET_CARDRESTOMENUS,
  };
};
export const doCardClientRequestSucceed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.GET_CARDRESTOMENUS_SUCCEED,
    payload,
  };
};
export const doCardClientRequestFailed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.GET_CARDRESTOMENUS_FAILED,
    payload,
  };
};

//all tabel menus resto
export const doRestoMenusRequest: any = (): any => {
  return {
    type: ActionTypeResto.GET_RESTOMENUS,
  };
};

export const doRestoMenusRequestSucceed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.GET_RESTOMENUS_SUCCEED,
    payload,
  };
};

export const doRestoMenusRequestFailed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.GET_RESTOMENUS_SUCCEED,
    payload,
  };
};

//Get One tabel  resto menus

export const doRestoMenuRequest: any = (payload: any): any => {
  return {
    type: ActionTypeResto.GET_RESTOMENU,
    payload,
  };
};

export const doRestoMenuRequestSucceed: any = (remeId: number): any => {
  return {
    type: ActionTypeResto.GET_RESTOMENU_SUCCEED,
    payload: remeId,
  };
};

export const doRestoMenuRequestFailled: any = (payload: any): any => {
  return {
    type: ActionTypeResto.GET_RESTOMENUS_SUCCEED,
  };
};

// Create Tabel Resto Menus

export const doCreateRestoMenus: any = (payload: any): any => {
  return {
    type: ActionTypeResto.ADD_RESTOMENUS,
    payload,
  };
};

export const doCreateRestoMenusSucceed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.ADD_RESTOMENUS_SUCCEED,
    payload,
  };
};

export const doCreateRestoMenusFailed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.ADD_RESTOMENUS_FAILED,
    payload,
  };
};

// Update Resto Menus
export const doUpdateRestoMenus: any = (payload: any): any => {
  return {
    type: ActionTypeResto.UPDATE_RESTOMENUS,
    payload,
  };
};

export const doUpdateRestoMenusSucceed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.UPDATE_RESTOMENUS_SUCCEED,
    payload,
  };
};

export const doUpdateRestoMenusFailed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.UPDATE_RESTOMENUS_FAILED,
    payload,
  };
};

//Delete Resto Menus

export const doDeleteRestoMenus: any = (payload: any): any => {
  return {
    type: ActionTypeResto.DEL_RESTOMENUS,
    payload,
  };
};

export const doDeleteRestoMenusSucceed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.DEL_RESTOMENUS_SUCCEED,

    payload,
  };
};

export const doDeleteRestoMenusFailed: any = (payload: any): any => {
  return {
    type: ActionTypeResto.DEL_RESTOMENUS_FAILED,
    payload,
  };
};
