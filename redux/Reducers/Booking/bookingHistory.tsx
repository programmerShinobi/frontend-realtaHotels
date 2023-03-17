import { AnyAction } from "redux";
import ActionTypes from "../../Constant/Booking/actionType"

const initialState ={
    booking_history:[]
};

function bookingHistoryReducer(state = initialState, action:any):any{
    switch (action.type){
        case ActionTypes.GET_HISTORY_BOOKING:
            return{...state};
        case ActionTypes.GET_HISTORY_BOOKING_SUCCED:
            return {...state, booking_history:action.payload};
        case ActionTypes.GET_HISTORY_BOOKING_FAILED:
            return {...state, booking_history:action.payload};
        case ActionTypes.UPDATE_STATUS_BOOKING:
            return{...state};
        case ActionTypes.UPDATE_STATUS_BOOKING_SUCCED:
            return applyUpdatebooking_history (state, action);
        case ActionTypes.UPDATE_STATUS_BOOKING_FAILED:
            return applyUpdatebooking_history (state, action);
        default:
            return{...state}
        }
    }
    
export default bookingHistoryReducer;

const applyUpdatebooking_history = (state:any, action:any) =>{
    //mapping data pada state.booking_history dan mengecek jika data.regionId sama dengan action.payload.regionId maka data akan diupdate dengan data yang diterima dari action.payload
    return state.regions.map((booking_history:any) =>{
    if (booking_history.Id === action.payload.boor_Id){
    return {
    ...state,
    ...action.payload
    }
    }else{
    //jika tidak sama maka data tidak diubah
    return state
    }
    })
    }