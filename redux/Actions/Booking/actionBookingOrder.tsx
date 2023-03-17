import ActionTypes from "@/redux/Constant/Booking/actionType"

export const bookingOrderCreate=(payload:any)=>{
    return {
        type: ActionTypes.ADD_BOOKING_ORDER,
        payload
    }
}
export const bookingOrderCreateSucced=(payload:any)=>{
    return {
        type: ActionTypes.ADD_BOOKING_ORDER_SUCCED,
        payload
    }
}

export const bookingOrderCreateFailed=(payload:any)=>{
    return {
        type: ActionTypes.ADD_BOOKING_ORDER_FAILED,
        payload
    }
}