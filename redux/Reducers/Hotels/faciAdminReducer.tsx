import ActionTypes from "../../Constant/Hotels/actionType";

interface InitialState {
  faciAdmin: any[];
}

const initialState: InitialState = {
  faciAdmin: [],
};

function FaciAdminReducer(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.GET_FACIADMIN:
      return { ...state };
    case ActionTypes.GET_FACIADMIN_SUCCED:
      return { ...state, faciAdmin: action.payload };
    case ActionTypes.GET_FACIADMIN_FAILED:
      return { ...state, faciAdmin: action.payload };
    // insert
    case ActionTypes.ADD_FACIADMIN:
      return { ...state };
    case ActionTypes.ADD_FACIADMIN_SUCCED:
      return { ...state, faciAdmin: action.payload };
    // delete
    case ActionTypes.DEL_FACI:
      return { ...state };
    case ActionTypes.DEL_FACI_SUCCED:
      return {
        ...state,
        faciAdmin: state.faciAdmin.filter(
          (faciAdmin) => faciAdmin.faci_id !== action.payload
        ),
      };
    case ActionTypes.DEL_FACI_FAILED:
      return {
        ...state,
        faciAdmin: state.faciAdmin.filter(
          (faciAdmin) => faciAdmin.faci_id !== action.payload
        ),
      };
    // update
    case ActionTypes.UPDATE_FACI:
      return { ...state };
    case ActionTypes.UPDATE_FACI_SUCCED:
      state.faciAdmin.splice(
        state.faciAdmin.findIndex(
          (i: any) => i.faci_id == action.payload.faci_id
        ),

        action.payload
      );
      return {
        ...state,
        faciAdmin: [...state.faciAdmin],
      };
    default:
      return { ...state };
  }
}

export default FaciAdminReducer;
