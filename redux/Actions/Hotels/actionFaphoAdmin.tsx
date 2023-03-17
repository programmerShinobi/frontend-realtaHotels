import ActionTypes from "../../Constant/Hotels/actionType";

export const doGetFapho = () => {
  return {
    type: ActionTypes.GET_FAPHO,
  };
};

export const doGetFaphoSucced = (payload: any) => {
  return {
    type: ActionTypes.GET_FAPHO_SUCCED,
    payload,
  };
};

export const doGetFaphoFaied = (payload: any) => {
  return {
    type: ActionTypes.GET_FAPHO_FAILED,
    payload,
  };
};
// UPLOAD
export const doUploadFapho = (payload: any) => {
  return {
    type: ActionTypes.UPLOAD_FAPHO,
    payload,
  };
};
export const doUploadFaphoSucced = (payload: any) => {
  return {
    type: ActionTypes.UPLOAD_FAPHO_SUCCED,
    payload,
  };
};
export const doUploadFaphoFailed = (payload: any) => {
  return {
    type: ActionTypes.UPLOAD_FAPHO_FAILED,
    payload,
  };
};
