import ActionTypes from "@/redux/Constant/Booking/actionType"

export const doAllFaciHotelReq = () => {
  return {
    type: ActionTypes.GET_FACIALLHOTEL,
  };
};

export const doAllFaciHotelReqSuccess = (payload: any) => {
  return {
    type: ActionTypes.GET_FACIALLHOTEL_SUCCED,
    payload: payload,
  };
};

export const doAllFaciHotelReqFailed = (payload: any) => {
  return {
    type: ActionTypes.GET_FACIALLHOTEL_FAILED,
    payload,
  };
};
