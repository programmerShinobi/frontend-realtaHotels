import ActionTypes from "../../Constant/Booking/actionType"

const InitialState = {
    booking:[]
}

function BookingOrderReducer(state= InitialState, action:any){
    switch (action.type){
        case ActionTypes.ADD_BOOKING_ORDER:
            return {...state};
        case ActionTypes.ADD_BOOKING_ORDER_SUCCED:
            return {...state, booking:[...state.booking,action.payload]};
        case ActionTypes.ADD_BOOKING_ORDER_FAILED:
            return {...state, booking: action.payload};
        default:
            return {...state}
    }
}

export default BookingOrderReducer;