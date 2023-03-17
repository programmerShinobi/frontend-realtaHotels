import ActionTypes from "@/redux/Constant/Booking/actionType"

export const doCardHotelReq = () => {
  return {
    type: ActionTypes.GET_CARDHOTEL,
  };
};

export const doCardHotelReqSuccess = (payload: any) => {
  return {
    type: ActionTypes.GET_CARDHOTEL_SUCCED,
    payload: payload,
  };
};

export const doCardHotelReqFailed = (payload: any) => {
  return {
    type: ActionTypes.GET_CARDHOTEL_FAILED,
    payload,
  };
};
