import ActionTypes from "@/redux/Constant/Booking/actionType"

export const doGetHore = () => {
  return {
    type: ActionTypes.GET_HORE,
  };
};

export const doGetHoreSucced = (payload: any) => {
  return {
    type: ActionTypes.GET_HORE_SUCCED,
    payload,
  };
};

export const doGetHoreFaied = (payload: any) => {
  return {
    type: ActionTypes.GET_HORE_FAILED,
    payload,
  };
};
