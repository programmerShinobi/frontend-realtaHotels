import ActionTypes from "../../Constant/Booking/actionType"

const initialState ={
    Price_items:[]
};

function PriceItemsReducer(state = initialState, action:any):any{
    switch (action.type){
        //GetAll
        case ActionTypes.GET_PRICE_ITEMS:
            return{...state};
        case ActionTypes.GET_PRICE_ITEMS_SUCCED:
            return {...state, Price_items:action.payload};
        case ActionTypes.GET_PRICE_ITEMS_FAILED:
            return {...state, Price_items:action.payload};
        default:
            return{...state}
        }
    }
    
export default PriceItemsReducer;