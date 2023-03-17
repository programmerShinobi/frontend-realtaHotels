import ActionTypes from "../../Constant/Booking/actionType"

const initialState ={
    special_offers:[]
};

function SpecialoffersReducer(state = initialState, action:any):any{
    switch (action.type){
        //GetAll
        case ActionTypes.GET_SPECIAL_OFFERS:
            return{...state};
        case ActionTypes.GET_SPECIAL_OFFERS_SUCCED:
            return {...state, special_offers:action.payload};
        case ActionTypes.GET_SPECIAL_OFFERS_FAILED:
            return {...state, special_offers:action.payload};
        default:
            return{...state}
        }
    }
    
export default SpecialoffersReducer;