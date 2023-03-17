import ActionTypes from "../../Constant/Hotels/actionType";

export const doMaxRoomIdReq = () => {
  return {
    type: ActionTypes.GET_MAXIDROOM,
  };
};

export const doMaxRoomIdReqSucced = (payload: any) => {
  return {
    type: ActionTypes.GET_MAXIDROOM_SUCCED,
    payload,
  };
};

export const doMaxRoomIdReqFailed = (payload: any) => {
  return {
    type: ActionTypes.GET_MAXIDROOM_FAILED,
    payload,
  };
};
