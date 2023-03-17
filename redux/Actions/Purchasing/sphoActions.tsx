import purchasingTypes from "@/redux/Constant/Purchasing/purchasingTypes";

export const doGetStockPhoto = () => {
  return {
    type: purchasingTypes.GET_STOCK_PHOTO,
  };
};

export const doGetStockPhotoSucceed = (payload: any) => {
  return {
    type: purchasingTypes.GET_STOCK_PHOTO_SUCCEED,
    payload,
  };
};

export const doGetStockPhotoFailed = (payload: any) => {
  return {
    type: purchasingTypes.GET_STOCK_PHOTO_FAILED,
    payload,
  };
};

export const doAddStockPhoto = (payload: any) => {
  return {
    type: purchasingTypes.ADD_STOCK_PHOTO,
    payload,
  };
};

export const doAddStockPhotoSucceed = (payload: any) => {
  return {
    type: purchasingTypes.ADD_STOCK_PHOTO_SUCCEED,
    payload,
  };
};

export const doAddStockPhotoFailed = (payload:any) =>{
  return{
    type: purchasingTypes.ADD_STOCK_PHOTO_FAILED,
    payload
  }
}

export const doGetPhotoDashboard = () => {
  return {
    type: purchasingTypes.GET_STOCK_PHOTO_DASHBOARD,
  };
};

export const doGetPhotoDashboardSucceed = (payload:any) =>{
    return{
        type:purchasingTypes.GET_STOCK_PHOTO_DASHBOARD_SUCCEED,
        payload
    }
}

export const doGetPhotoDashboardFailed = (payload:any) =>{
    return{
        type: purchasingTypes.GET_STOCK_PHOTO_DASHBOARD_FAILED,
        payload
    }
}