import purchasingTypes from "@/redux/Constant/Purchasing/purchasingTypes";

export const doGetStockDetail = () => {
  return {
    type: purchasingTypes.GET_STOCK_DETAIL,
  };
};

export const doGetStockDetailSucceed = (payload: any) => {
  return {
    type: purchasingTypes.GET_STOCK_DETAIL_SUCCEED,
    payload,
  };
};

export const doGetStockDetailFailed = (payload: any) => {
  return {
    type: purchasingTypes.GET_STOCK_DETAIL_FAILED,
    payload,
  };
};

export const doUpdateStockDetail = (payload:any) =>{
  return{
    type: purchasingTypes.EDIT_STOCK_DETAIL,
    payload
  }
}

export const doUpdateStockDetailSucceed = (payload:any) =>{
  return{
    type: purchasingTypes.EDIT_STOCK_DETAIL_SUCCEED,
    payload
  }
}

export const doUpdateStockDetailFailed = (payload:any) =>{
  return{
    type: purchasingTypes.EDIT_STOCK_DETAIL_SUCCEED,
    payload
  }
}

export const doGetFaciNameAndId = () =>{
  return{
    type:purchasingTypes.GET_FACI_NAME_AND_ID
  }
}

export const doGetFaciNameAndIdSucceed = (payload:any) =>{
  return{
    type:purchasingTypes.GET_FACI_NAME_AND_ID_SUCCEED,
    payload
  }
}

export const doGetFaciNameAndIdFailed = (payload:any) =>{
  return{
    type:purchasingTypes.GET_FACI_NAME_AND_ID_FAILED,
    payload
  }
}