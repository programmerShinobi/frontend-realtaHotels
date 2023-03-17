import ActionTypes from "../../Constant/Booking/actionType"

const initialState ={
    invoice:[]
};

function GetInvoiceReducer(state = initialState, action:any):any{
    switch (action.type){
        //GetAll
        case ActionTypes.GET_INVOICE:
            return{...state};
        case ActionTypes.GET_INVOICE_SUCCED:
            return {...state, invoice:action.payload};
        case ActionTypes.GET_INVOICE_FAILED:
            return {...state, invoice:action.payload};
        default:
            return{...state}
        }
    }
    
export default GetInvoiceReducer;