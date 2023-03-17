import ActionTypes from "../../Constant/Booking/actionType"

const initialState ={
    order_details:[]
};

function OrderDetailsReducer(state = initialState, action:any):any{
    switch (action.type){
        //GetAll
        case ActionTypes.GET_ORDER_DETAILS:
            return{...state};
        case ActionTypes.GET_ORDER_DETAILS_SUCCED:
            return {...state, order_details:action.payload};
        case ActionTypes.GET_ORDER_DETAILS_FAILED:
            return {...state, order_details:action.payload};
        default:
            return{...state}
        }
    }
    
export default OrderDetailsReducer;