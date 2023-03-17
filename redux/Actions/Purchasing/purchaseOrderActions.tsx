import purchasingTypes from "@/redux/Constant/Purchasing/purchasingTypes"

export const doGetPurchaseOrder = () =>{
    return{
        type: purchasingTypes.GET_PURCHASE_ORDER
    }
}

export const doGetPurchaseOrderDetail = () =>{
    return{
        type : purchasingTypes.GET_PURCHASE_ORDER_DETAIL
    }
}

export const doGetPurchaseOrderDetailSucceed = (payload:any) =>{
    return{
        type: purchasingTypes.GET_PURCHASE_ORDER_DETAIL_SUCCEED,
        payload
    }
}

export const doGetPurchaseOrderDetailFailed = (payload:any) =>{
    return{
        type:purchasingTypes.GET_PURCHASE_ORDER_DETAIL_FAILED,
        payload
    }
}

export const doGetPurchaseOrderSucceed = (payload:any) =>{
    return{
        type: purchasingTypes.GET_PURCHASE_ORDER_SUCCEED,
        payload
    }
}

export const doGetPurchaseOrderFailed = (payload:any) =>{
    return{
        type: purchasingTypes.GET_PURCHASE_ORDER_FAILED,
        payload
    }
}

export const doInsertOrderHeader = (payload:any) =>{
    return{
        type: purchasingTypes.ADD_PURCHASE_ORDER,
        payload
    }
}

export const doInsertOrderHeaderSucceed = (payload:any) =>{
    return{
        type: purchasingTypes.ADD_PURCHASE_ORDER_SUCCEED,
        payload
    }
}

export const doInsertOrderHeaderFailed = (payload:any) =>{
    return{
        type:purchasingTypes.ADD_PURCHASE_ORDER_FAILED,
        payload
    }
}

export const doEditOrderHeader = (payload:any) =>{
    return{
        type:purchasingTypes.EDIT_PURCHASE_ORDER,
        payload
    }
}
export const doEditOrderHeaderSucceed = (payload:any) =>{
    return{
        type:purchasingTypes.EDIT_PURCHASE_ORDER_SUCCEED,
        payload
    }
}
export const doEditOrderHeaderFailed = (payload:any) =>{
    return{
        type:purchasingTypes.EDIT_PURCHASE_ORDER_FAILED,
        payload
    }
}