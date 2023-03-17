import purchasingTypes from "@/redux/Constant/Purchasing/purchasingTypes";

export const getVendorRequest = () => {
  return {
    type: purchasingTypes.GET_VENDORS,
  };
};

export const getVendorRequestSucceed = (payload: any) => {
  return {
    type: purchasingTypes.GET_VENDORS_SUCCEED,
    payload,
  };
};

export const getVendorRequestFailed = (payload: any) => {
  return {
    type: purchasingTypes.GET_VENDORS_FAILED,
    payload,
  };
};

export const createVendor = (payload: any) => {
  return {
    type: purchasingTypes.ADD_VENDOR,
    payload,
  };
};

export const createVendorSucceed = (payload: any) => {
  return {
    type: purchasingTypes.ADD_VENDOR_SUCCEED,
    payload,
  };
};

export const createVendorFailed = (payload: any) => {
  return {
    type: purchasingTypes.ADD_VENDOR_FAILED,
    payload,
  };
};

export const updateVendor = (payload: any) => {
  return {
    type: purchasingTypes.UPDATE_VENDOR,
    payload,
  };
};
export const updateVendorSucceed = (payload: any) => {
  return {
    type: purchasingTypes.UPDATE_VENDOR_SUCCEED,
    payload,
  };
};
export const updateVendorFailed = (payload: any) => {
  return {
    type: purchasingTypes.UPDATE_VENDOR_SUCCEED,
    payload,
  };
};
export const deleteVendor = (payload: any) => {
  return {
    type: purchasingTypes.DELETE_VENDOR,
    payload,
  };
};
export const deleteVendorSucceed = (payload: any) => {
  return {
    type: purchasingTypes.DELETE_VENDOR_SUCCEED,
    payload,
  };
};
export const deleteVendorFailed = (payload: any) => {
  return {
    type: purchasingTypes.DELETE_VENDOR_FAILED,
    payload,
  };
};
