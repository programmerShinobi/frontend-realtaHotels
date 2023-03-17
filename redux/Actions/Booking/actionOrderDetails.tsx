import ActionTypes from "@/redux/Constant/Booking/actionType"

export const orderDetailRequest=()=>{
    return {
        type: ActionTypes.GET_ORDER_DETAILS
    }
}

export const orderDetailRequestSecced=(payload:any)=>{
    return {
        type: ActionTypes.GET_ORDER_DETAILS_SUCCED,
        payload
    }
}

export const orderDetailRequestFailed=(payload:any)=>{
    return {
        type: ActionTypes.GET_ORDER_DETAILS_FAILED,
        payload
    }
}
