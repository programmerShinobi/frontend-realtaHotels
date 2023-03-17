import ActionMasterType from "redux/Constant/Masters/ActionType"

export const doRegionsRequest: any = (): any => {
    return {
        type: ActionMasterType.GET_REGIONS
    }
}

export const doRegionsRequestSucceed: any = (payload: any): any => {
    return {
        type: ActionMasterType.GET_REGIONS_SUCCEED,
        payload
    }
}

export const doRegionsRequestFailed: any = (payload: any): any => {
    return {
        type: ActionMasterType.GET_REGIONS_SUCCEED,
        payload
    }
}

export const doRegionsCreate = (payload: any) :any => {
    return {
        type: ActionMasterType.ADD_REGIONS,
        payload
    }
}

export const doAddRegionsSucceed = (payload: any) => {
    return {
        type: ActionMasterType.ADD_REGIONS_SUCCEED,
        payload
    }

}

export const doAddRegionsFailed = (payload: any) => {
    return {
        type: ActionMasterType.ADD_REGIONS_FAILED,
        payload
    }
}

// export const doUpdateRegions: any = (id: number, payload: any): any => {
//     return {
//         type: ActionMasterType.UPDATE_REGIONS,
//         id,
//         payload
//     }
// }
// export const doUpdateRegionsSucceed: any = (payload: any): any => {
//     return {
//         type: ActionMasterType.UPDATE_REGIONS_SUCCEED,
//         payload
//     }
// }
// export const doUpdateRegionsFailed: any = (payload: any): any => {
//     return {
//         type: ActionMasterType.UPDATE_REGIONS_FAILED,
//         payload
//     }
// }
export const doUpdateRegions = (payload: any):any => {
    return {
      type: ActionMasterType.UPDATE_REGIONS,
      payload,
    };
  };
  export const doUpdateRegionsSucceed = (payload: any) => {
    return {
      type: ActionMasterType.UPDATE_REGIONS_SUCCEED,
      payload,
    };
  };
  export const doUpdateRegionsFailed = (payload: any) => {
    return {
      type: ActionMasterType.UPDATE_REGIONS_FAILED,
      payload,
    };
  };
  


export const doDeleteRegions  = (payload: any) => {
    return {
        type: ActionMasterType.DEL_REGIONS,
        payload
    }
}

export const doDeleteRegionsSucceed  = (payload: any)  => {
    console.info(payload)
    return {
        type: ActionMasterType.DEL_REGIONS_SUCCEED,
        payload
    }
}

export const doDeleteRegionsFailed  = (payload: any) => {
    return {
        type: ActionMasterType.DEL_REGIONS_FAILED,
        payload
    }
}


// ===================== country ======== //

export const doCountryRequest: any = (): any => {
    return {
        type: ActionMasterType.GET_COUNTRY
    }
}

export const doCountryRequestSucceed: any = (payload: any): any => {
    return {
        type: ActionMasterType.GET_COUNTRY_SUCCEED,
        payload
    }
}

export const doCountryRequestFailed: any = (payload: any): any => {
    return {
        type: ActionMasterType.GET_COUNTRY_SUCCEED,
        payload
    }
}

export const doCountryCreate = (payload: any) => {
    return {
        type: ActionMasterType.ADD_COUNTRY,
        payload
    }
}

export const doAddCountrySucceed = (payload: any) => {
    return {
        type: ActionMasterType.ADD_COUNTRY_SUCCEED,
        payload
    }

}

export const doAddCountryFailed = (payload: any) => {
    return {
        type: ActionMasterType.ADD_COUNTRY_FAILED,
        payload
    }
}

export const doUpdateCountry  = ( payload: any)  => {
    return {
        type: ActionMasterType.UPDATE_COUNTRY,
        payload
    }
}

export const doUpdateCountrySucceed  = (payload: any)  => {
    return {
        type: ActionMasterType.UPDATE_COUNTRY_SUCCEED,
        payload
    }
}

export const doUpdateCountryFailed  = (payload: any)  => {
    return {
        type: ActionMasterType.UPDATE_COUNTRY_FAILED,
        payload
    }
}


export const doDeleteCountry = (payload: any)  => {
    return {
        type: ActionMasterType.DEL_COUNTRY,
        payload
    }
}

export const doDeleteCountrySucceed = (payload: any) => {
    console.info(payload)
    return {
        type: ActionMasterType.DEL_COUNTRY_SUCCEED,
        payload
    }
}

export const doDeleteCountryFailed = (payload: any) => {
    return {
        type: ActionMasterType.DEL_REGIONS_FAILED,
        payload
    }
}



// ======== prov =======//
export const doProvRequest: any = (): any => {
    return {
        type: ActionMasterType.GET_PROV
    }
}

export const doProvRequestSucceed: any = (payload: any): any => {
    return {
        type: ActionMasterType.GET_PROV_SUCCEED,
        payload
    }
}

export const doProvRequestFailed: any = (payload: any): any => {
    return {
        type: ActionMasterType.GET_PROV_SUCCEED,
        payload
    }
}

export const doProvCreate =(payload: any): any => {
    return {
        type: ActionMasterType.ADD_PROV,
        payload
    }
}

export function doAddProvSucceed (payload: any) {
    return {
        type: ActionMasterType.ADD_PROV_SUCCEED,
        payload
    }

}

export const doAddProvFailed = (payload: any): any => {
    return {
        type: ActionMasterType.ADD_PROV_FAILED,
        payload
    }
}

export const doUpdateProv = ( payload: any) => {
    return {
        type: ActionMasterType.UPDATE_PROV,
        payload
    }
}

export const doUpdateProvSucceed = (payload: any) => {
    return {
        type: ActionMasterType.UPDATE_PROV_SUCCEED,
        payload
    }
}


export const doUpdateProvFailed = (payload: any) => {
    return {
        type: ActionMasterType.UPDATE_PROV_FAILED,
        payload
    }
}


export const doDeleteProv = (payload: any) => {
    return {
        type: ActionMasterType.DEL_PROV,
        payload
    }
}

export const doDeleteProvSucceed = (payload: any) => {
    console.info(payload)
    return {
        type: ActionMasterType.DEL_PROV_SUCCEED,
        payload
    }
}

export const doDeleteProvFailed = (payload: any) => {
    return {
        type: ActionMasterType.DEL_PROV_FAILED,
        payload
    }
}


// === addr
export const doAddrRequest: any = (): any => {
    return {
        type: ActionMasterType.GET_ADDR
    }
}

export const doAddrRequestSucceed: any = (payload: any): any => {
    return {
        type: ActionMasterType.GET_ADDR_SUCCEED,
        payload
    }
}

export const doAddrRequestFailed: any = (payload: any): any => {
    return {
        type: ActionMasterType.GET_ADDR_SUCCEED,
        payload
    }
}

export const doAddrCreate = (payload: any): any => {
    return {
        type: ActionMasterType.ADD_ADDR,
        payload
    }
}

export function doAddAddrSucceed (payload: any) {
    return {
        type: ActionMasterType.ADD_ADDR_SUCCEED,
        payload
    }

}

export const doAddAddrFailed = (payload: any) => {
    return {
        type: ActionMasterType.ADD_ADDR_FAILED,
        payload
    }
}

export const doUpdateAddr = ( payload: any): any => {
    return {
        type: ActionMasterType.UPDATE_ADDR,
        payload
    }
}

export const doUpdateAddrSucceed= (payload: any)=> {
    return {
        type: ActionMasterType.UPDATE_ADDR_SUCCEED,
        payload
    }
}


export const doUpdateAddrFailed= (payload: any)=> {
    return {
        type: ActionMasterType.UPDATE_ADDR_FAILED,
        payload
    }
}


export const doDeleteAddr = (payload: any) => {
    return {
        type: ActionMasterType.DEL_ADDR,
        payload
    }
}

export const doDeleteAddrSucceed = (payload: any) => {
    console.info(payload)
    return {
        type: ActionMasterType.DEL_ADDR_SUCCEED,
        payload
    }
}

export const doDeleteAddrFailed =(payload: any)  => {
    return {
        type: ActionMasterType.DEL_ADDR_FAILED,
        payload
    }
}

// === Policy
export const doPolicyRequest: any = (): any => {
    return {
        type: ActionMasterType.GET_POLICY
    }
}

export const doPolicyRequestSucceed: any = (payload: any): any => {
    return {
        type: ActionMasterType.GET_POLICY_SUCCEED,
        payload
    }
}

export const doPolicyRequestFailed: any = (payload: any): any => {
    return {
        type: ActionMasterType.GET_POLICY_SUCCEED,
        payload
    }
}

export const doPolicyCreate = (payload: any): any => {
    return {
        type: ActionMasterType.ADD_POLICY,
        payload
    }
}

export const doAddPolicySucceed = (payload: any):any =>{
    return {
        type: ActionMasterType.ADD_POLICY_SUCCEED,
        payload
    }

}

export const doAddPolicyFailed  = (payload: any)=> {
    return {
        type: ActionMasterType.ADD_POLICY_FAILED,
        payload
    }
}

export const doUpdatePolicy = (payload: any ) => {
    return {
        type: ActionMasterType.UPDATE_POLICY,
        payload
    }
}

export const doUpdatePolicySucceed = (payload: any) => {
    return {
        type: ActionMasterType.UPDATE_POLICY_SUCCEED,
        payload
    }
}


export const doUpdatePolicyFailed = (payload: any)=> {
    return {
        type: ActionMasterType.UPDATE_POLICY_FAILED,
        payload
    }
}


export const doDeletePolicy = (payload: any): any => {
    return {
        type: ActionMasterType.DEL_POLICY,
        payload
    }
}

export const doDeletePolicySucceed = (payload: any): any => {
    console.info(payload)
    return {
        type: ActionMasterType.DEL_POLICY_SUCCEED,
        payload
    }
}

export const doDeletePolicyFailed  = (payload: any) => {
    return {
        type: ActionMasterType.DEL_POLICY_FAILED,
        payload
    }
}

// === cagro
export const doCagroRequest: any = (): any => {
    return {
        type: ActionMasterType.GET_CAGRO
    }
}

export const doCagroRequestSucceed: any = (payload: any): any => {
    return {
        type: ActionMasterType.GET_CAGRO_SUCCEED,
        payload
    }
}

export const doCagroRequestFailed: any = (payload: any): any => {
    return {
        type: ActionMasterType.GET_CAGRO_SUCCEED,
        payload
    }
}

export const doCagroCreate = (payload: any): any => {
    return {
        type: ActionMasterType.ADD_CAGRO,
        payload
    }
}

export function doAddCagroSucceed(payload: any) {
    return {
        type: ActionMasterType.ADD_CAGRO_SUCCEED,
        payload
    }

}

export const doAddCagroFailed: any = (payload: any): any => {
    return {
        type: ActionMasterType.ADD_CAGRO_FAILED,
        payload
    }
}

export const doUpdateCagro = (payload: any) => {
    return {
        type: ActionMasterType.UPDATE_CAGRO,
        payload
    }
}

export const doUpdateCagroSucceed = (payload: any) => {
    return {
        type: ActionMasterType.UPDATE_CAGRO_SUCCEED,
        payload
    }
}


export const doUpdateCagroFailed = (payload: any) => {
    return {
        type: ActionMasterType.UPDATE_CAGRO_FAILED,
        payload
    }
}


export const doDeleteCagro  = (payload: any)  => {
    return {
        type: ActionMasterType.DEL_CAGRO,
        payload
    }
}

export const doDeleteCagroSucceed  = (payload: any)  => {
    console.info(payload)
    return {
        type: ActionMasterType.DEL_CAGRO_SUCCEED,
        payload
    }
}

export const doDeleteCagroFailed: any = (payload: any): any => {
    return {
        type: ActionMasterType.DEL_CAGRO_FAILED,
        payload
    }
}

// === Prit-items
export const doPritRequest: any = (): any => {
    return {
        type: ActionMasterType.GET_PRIT
    }
}

export const doPritRequestSucceed: any = (payload: any): any => {
    return {
        type: ActionMasterType.GET_PRIT_SUCCEED,
        payload
    }
}

export const doPritRequestFailed: any = (payload: any): any => {
    return {
        type: ActionMasterType.GET_PRIT_SUCCEED,
        payload
    }
}

export const doPritCreate = (payload: any) :any => {
    return {
        type: ActionMasterType.ADD_PRIT,
        payload
    }
}

export function doAddPritSucceed(payload: any) {
    return {
        type: ActionMasterType.ADD_PRIT_SUCCEED,
        payload
    }

}

export const doAddPritFailed = (payload: any) => {
    return {
        type: ActionMasterType.ADD_PRIT_FAILED,
        payload
    }
}

export const doUpdatePrit = (payload: any) => {
    return {
        type: ActionMasterType.UPDATE_PRIT,
        payload
    }
}

export const doUpdatePritSucceed = (payload:any)  => {
    return {
        type: ActionMasterType.UPDATE_PRIT_SUCCEED,
        payload
    }
}


export const doUpdatePritFailed = (payload: any) => {
    return {
        type: ActionMasterType.UPDATE_PRIT_FAILED,
        payload
    }
}


export const doDeletePrit = (payload: any ) => {
    return {
        type: ActionMasterType.DEL_PRIT,
        payload
    }
}

export const doDeletePritSucceed = (payload: any) => {
    console.info(payload)
    return {
        type: ActionMasterType.DEL_PRIT_SUCCEED,
        payload
    }
}

export const doDeletePritFailed= (payload: any) => {
    return {
        type: ActionMasterType.DEL_PRIT_FAILED,
        payload
    }
}


// === ServiceTask
export const doServiceTaskRequest: any = (): any => {
    return {
        type: ActionMasterType.GET_SERVICETASK
    }
}

export const doServiceTaskRequestSucceed: any = (payload: any): any => {
    return {
        type: ActionMasterType.GET_SERVICETASK_SUCCEED,
        payload
    }
}

export const doServiceTaskRequestFailed: any = (payload: any): any => {
    return {
        type: ActionMasterType.GET_SERVICETASK_SUCCEED,
        payload
    }
}

export const doServiceTaskCreate  = (payload: any): any => {
    return {
        type: ActionMasterType.ADD_SERVICETASK,
        payload
    }
}

export function doAddServiceTaskSucceed(payload: any) {
    return {
        type: ActionMasterType.ADD_SERVICETASK_SUCCEED,
        payload
    }

}

export const doAddServiceTaskFailed = (payload: any) => {
    return {
        type: ActionMasterType.ADD_SERVICETASK_FAILED,
        payload
    }
}

export const doUpdateServiceTask  = (payload: any):any => {
    return {
        type: ActionMasterType.UPDATE_SERVICETASK,
        payload,
    }
}

export const doUpdateServiceTaskSucceed = (payload: any)=> {
    return {
        type: ActionMasterType.UPDATE_SERVICETASK_SUCCEED,
        payload
    }
}


export const doUpdateServiceTaskFailed :any= (payload: any) => {
    return {
        type: ActionMasterType.UPDATE_SERVICETASK_FAILED,
        payload
    }
}


export const doDeleteServiceTask = (payload: any) => {
    return {
        type: ActionMasterType.DEL_SERVICETASK,
        payload
    }
}

export const doDeleteServiceTaskSucceed = (payload: any) => {
    console.info(payload)
    return {
        type: ActionMasterType.DEL_SERVICETASK_SUCCEED,
        payload
    }
}

export const doDeleteServiceTaskFailed = (payload: any)=> {
    return {
        type: ActionMasterType.DEL_SERVICETASK_FAILED,
        payload
    }
}