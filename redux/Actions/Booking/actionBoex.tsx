import ActionTypes from "@/redux/Constant/Booking/actionType"

export const boexCreate=(payload:any)=>{
    return {
        type: ActionTypes.ADD_BOEX,
        payload
    }
}
export const boexCreateSucced=(payload:any)=>{
    return {
        type: ActionTypes.ADD_BOEX_SUCCED,
        payload
    }
}

export const boexCreateFailed=(payload:any)=>{
    return {
        type: ActionTypes.ADD_BOEX_FAILED,
        payload
    }
}