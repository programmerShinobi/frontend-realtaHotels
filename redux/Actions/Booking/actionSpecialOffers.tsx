import ActionTypes from "@/redux/Constant/Booking/actionType"

export const specialOffersRequest=()=>{
    return {
        type: ActionTypes.GET_SPECIAL_OFFERS
    }
}

export const specialOffersRequestSucceed=(payload:any)=>{
    return {
        type: ActionTypes.GET_SPECIAL_OFFERS_SUCCED,
        payload
    }
}

export const specialOffersRequestFailed=(payload:any)=>{
    return {
        type: ActionTypes.GET_SPECIAL_OFFERS_FAILED,
        payload
    }
}
