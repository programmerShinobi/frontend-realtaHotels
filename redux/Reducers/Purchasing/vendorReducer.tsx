import purchasingTypes from '../../Constant/Purchasing/purchasingTypes';

const initialState = {
  vendors: [],
};

function vendorReducers(state = initialState, action: any) {
  switch (action.type) {
    case purchasingTypes.GET_VENDORS:
      return { ...state };
    case purchasingTypes.GET_VENDORS_SUCCEED:
      return { ...state, vendors: action.payload };
    case purchasingTypes.ADD_VENDOR:
      return { ...state };
    case purchasingTypes.ADD_VENDOR_SUCCEED:
      return { ...state, vendors: action.payload.result };
    case purchasingTypes.UPDATE_VENDOR:
      return { ...state };
    case purchasingTypes.UPDATE_VENDOR_SUCCEED:
      state.vendors.splice(
        state.vendors.findIndex(
          (i: any) => i.vendorEntityId == action.payload.vendorEntityId
        ),
        1,
        action.payload
      );
      return {
        ...state,
        vendors: [...state.vendors],
      };
    case purchasingTypes.DELETE_VENDOR:
      return{...state};
    case purchasingTypes.DELETE_VENDOR_SUCCEED:
      return {
        ...state,
        vendors : state.vendors.filter((items:any) => items.vendorEntityId !== +action.payload)
      }
    default:
      return state;
  }
}

const applyUpdateVendor = (state: any, action: any) => {
  return state.vendors.map((vendors: any) => {
    if (vendors.id === action.payload.id) {
      return {
        ...state,
        ...action.payload,
      };
    } else {
      return state;
    }
  });
};

export default vendorReducers;
