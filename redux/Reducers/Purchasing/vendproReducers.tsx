import purchasingTypes from'../../Constant/Purchasing/purchasingTypes';

const initialState = {
    vendpro :[],
}

function vendproReducers(state = initialState, action:any){
    switch(action.type){
        case purchasingTypes.GET_VENDPRO:
            return {...state};
        case purchasingTypes.GET_VENDPRO_SUCCEED:
            return {...state, vendpro:action.payload}
        case purchasingTypes.ADD_VENDPRO:
            return {...state};
        case purchasingTypes.ADD_VENDPRO_SUCCEED:
            return {...state, vendpro:action.payload}
        default:
            return state;
    }
}

export default vendproReducers