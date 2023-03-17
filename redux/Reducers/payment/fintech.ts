import { Fintech } from "@/lib/interfaces";
import {
	FETCH_FINTECH,
	FETCH_FINTECH_SUCCEED,
	FETCH_FINTECH_FAILED,
	UPDATE_FINTECH,
	UPDATE_FINTECH_SUCCEED,
	UPDATE_FINTECH_FAILED,
	INSERT_FINTECH,
	INSERT_FINTECH_SUCCEED,
	INSERT_FINTECH_FAILED,
	DELETE_FINTECH,
	DELETE_FINTECH_SUCCEED,
	DELETE_FINTECH_FAILED,
} from "@/redux/Constant/payment/fintech";

const initialState: { fintech: Fintech[]; error: any } = {
	fintech: [],
	error: null,
};

export default function fintechReducer(state = initialState, action: any) {
	switch (action.type) {
		case FETCH_FINTECH:
			return {
				...state,
			};
		case FETCH_FINTECH_SUCCEED:
			return {
				...state,
				fintech: action.data,
			};
		case FETCH_FINTECH_FAILED:
			return {
				...state,
				error: action.error,
			};

		case UPDATE_FINTECH:
			return {
				...state,
			};
		case UPDATE_FINTECH_SUCCEED:
			const newBankData: Fintech = {
				pagaEntityId: action.data.pagaEntityId,
				pagaCode: action.data.pagaCode,
				pagaName: action.data.pagaName,
				pagaModifiedDate: action.data.pagaModifiedDate,
			};
			state.fintech.splice(
				state.fintech.findIndex(
					(item: any) => item.pagaEntityId == action.data.pagaEntityId
				),
				1,
				newBankData
			);
		case UPDATE_FINTECH_FAILED:
			return {
				...state,
				error: action.error,
			};

		case INSERT_FINTECH:
			return {
				...state,
			};
		case INSERT_FINTECH_SUCCEED:
			return {
				...state,
				fintech: [...state.fintech, action.data],
			};
		case INSERT_FINTECH_FAILED:
			return {
				...state,
				error: action.error,
			};

		case DELETE_FINTECH:
			return {
				...state,
			};
		case DELETE_FINTECH_SUCCEED:
			return {
				...state,
				fintech: state.fintech.filter(
					(item) => item.pagaEntityId != action.pagaEntityId
				),
			};
		case DELETE_FINTECH_FAILED:
			return {
				...state,
				error: action.error,
			};

		default:
			return state;
	}
}
