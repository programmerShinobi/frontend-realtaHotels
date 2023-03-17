import ActionTypes from "../../Constant/Booking/actionType"

const InitialState = {
    boex:[]
}

function BoexReducer(state= InitialState, action:any){
    switch (action.type){
        case ActionTypes.ADD_BOEX:
            return {...state};
        case ActionTypes.ADD_BOEX_SUCCED:
            return {...state, boex: action.payload};
        case ActionTypes.ADD_BOEX_FAILED:
            return {...state, boex: action.payload};
        default:
            return {...state}
    }
}

export default BoexReducer;