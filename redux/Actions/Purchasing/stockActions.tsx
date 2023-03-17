import purchasingTypes from "@/redux/Constant/Purchasing/purchasingTypes"

export const doGetStocks = () =>{
    return{
        type:purchasingTypes.GET_STOCK
    }
}

export const doGetStocksSucceed = (payload:any) =>{
    return{
        type:purchasingTypes.GET_STOCK_SUCCEED,
        payload
    }
}
export const doGetStocksFailed = (payload:any) =>{
    return{
        type:purchasingTypes.GET_STOCK_FAILED,
        payload
    }
}

export const doAddStocks = (payload:any) =>{
    return{
        type:purchasingTypes.ADD_STOCK,
        payload
    }
}
export const doAddStocksSucceed = (payload:any) =>{
    return{
        type:purchasingTypes.ADD_STOCK_SUCCEED,
        payload
    }
}
export const doAddStocksFailed = (payload:any) =>{
    return{
        type:purchasingTypes.ADD_STOCK_FAILED,
        payload
    }
}

export const doEditStocks = (payload:any) =>{
    return{
        type:purchasingTypes.UPDATE_STOCK,
        payload
    }
}
export const doEditStocksSucceed = (payload:any) =>{
    return{
        type:purchasingTypes.UPDATE_STOCK_SUCCEED,
        payload
    }
}
export const doEditStocksFailed = (payload:any) =>{
    return{
        type:purchasingTypes.UPDATE_STOCK_FAILED,
        payload
    }
}