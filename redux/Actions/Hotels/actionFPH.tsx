import ActionTypes from "../../Constant/Hotels/actionType";

export const doGetFaciPriceHistory = () => {
  return {
    type: ActionTypes.GET_FACIPRICEHISTORY,
  };
};

export const doGetFaciPriceHistorySucced = (payload: any) => {
  return {
    type: ActionTypes.GET_FACIPRICEHISTORY_SUCCED,
    payload,
  };
};

export const doGetFaciPriceHistoryFaied = (payload: any) => {
  return {
    type: ActionTypes.GET_FACIPRICEHISTORY_FAILED,
    payload,
  };
};
