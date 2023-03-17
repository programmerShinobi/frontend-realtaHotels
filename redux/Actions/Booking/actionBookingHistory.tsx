import ActionTypes from "@/redux/Constant/Booking/actionType"

export const orderDetailHistoryRequest=(payload:any)=>{
    return {
        type: ActionTypes.GET_HISTORY_BOOKING,
        payload
    }
}

export const orderDetailHistoryRequestSecced=(payload:any)=>{
    return {
        type: ActionTypes.GET_HISTORY_BOOKING_SUCCED,
        payload
    }
}

export const orderDetailHistoryRequestFailed=(payload:any)=>{
    return {
        type: ActionTypes.GET_HISTORY_BOOKING_FAILED,
        payload
    }
}

export const bookingStatus=(payload:any)=>{
    return {
        type: ActionTypes.UPDATE_STATUS_BOOKING,
        payload
    }
}

export const bookingStatusSucced=(payload:any)=>{
    return {
        type: ActionTypes.UPDATE_STATUS_BOOKING_SUCCED,
        payload
    }
}

export const bookingStatusFailed=(payload:any)=>{
    return {
        type: ActionTypes.UPDATE_STATUS_BOOKING_FAILED,
        payload
    }
}
