import ActionTypes from "@/redux/Constant/Booking/actionType"

export const getInvoice=()=>{
    return {
        type: ActionTypes.GET_INVOICE
    }
}

export const getInvoiceSucceed=(payload:any)=>{
    return {
        type: ActionTypes.GET_INVOICE_SUCCED,
        payload
    }
}

export const getInvoiceFailed=(payload:any)=>{
    return {
        type: ActionTypes.GET_ADDRSEARCH_FAILED,
        payload
    }
}