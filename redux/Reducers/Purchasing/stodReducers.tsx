import purchasingTypes from "@/redux/Constant/Purchasing/purchasingTypes"

const initialState = {
    stockDetail:[],
    faciName:[]
}

function stodReducers(state = initialState, action:any){
    switch(action.type){
        case purchasingTypes.GET_STOCK_DETAIL:
            return {...state};
        case purchasingTypes.GET_STOCK_DETAIL_SUCCEED:
            return{...state, stockDetail:action.payload};
        case purchasingTypes.EDIT_STOCK_DETAIL:
            return{...state};
        case purchasingTypes.EDIT_STOCK_DETAIL_SUCCEED:
            state.stockDetail.splice(
                state.stockDetail.findIndex(
                  (i: any) => i.stodId == action.payload.stodId
                ),
                1,
                action.payload
              );
              return {
                ...state,
                stockDetail: [...state.stockDetail],
              };
        case purchasingTypes.GET_FACI_NAME_AND_ID:
            return{...state};
        case purchasingTypes.GET_FACI_NAME_AND_ID_SUCCEED:
            return{...state, faciName:action.payload}
        default:
            return state;
    }
}

export default stodReducers