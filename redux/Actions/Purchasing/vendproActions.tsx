import purchasingTypes from "@/redux/Constant/Purchasing/purchasingTypes"

export const doGetVendrpo = ()=>{
    return{
        type:purchasingTypes.GET_VENDPRO,

    }
}

export const doGetVendrpoSucceed = (payload:any) =>{
    return{
        type: purchasingTypes.GET_VENDPRO_SUCCEED,
        payload
    }
}
export const doGetVendrpoFailed = (payload:any) =>{
    return{
        type: purchasingTypes.GET_VENDPRO_FAILED,
        payload
    }
}

export const doAddVendpro = (payload:any) =>{
    return{
        type:purchasingTypes.ADD_VENDPRO,
        payload
    }
}

export const doAddVendproSucceed = (payload:any) =>{
    return{
        type: purchasingTypes.ADD_VENDPRO_SUCCEED,
        payload
    }
}

export const doAddVendproFailed = (payload:any) =>{
    return{
        type: purchasingTypes.ADD_VENDPRO_FAILED,
        payload
    }
}