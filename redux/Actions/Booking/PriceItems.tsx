import ActionTypes from "@/redux/Constant/Booking/actionType"

export const priceItemsRequest=()=>{
    return {
        type: ActionTypes.GET_PRICE_ITEMS
    }
}

export const priceItemsRequestSucceed=(payload:any)=>{
    return {
        type: ActionTypes.GET_PRICE_ITEMS_SUCCED,
        payload
    }
}

export const priceItemsRequestFailed=(payload:any)=>{
    return {
        type: ActionTypes.GET_PRICE_ITEMS_FAILED,
        payload
    }
}