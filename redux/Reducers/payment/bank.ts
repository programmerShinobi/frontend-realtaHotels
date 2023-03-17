import { Bank } from "@/lib/interfaces";
import {
	FETCH_BANKS,
	FETCH_BANKS_SUCCEED,
	FETCH_BANKS_FAILED,
	UPDATE_BANK,
	UPDATE_BANK_SUCCEED,
	UPDATE_BANK_FAILED,
	INSERT_BANK,
	INSERT_BANK_SUCCEED,
	INSERT_BANK_FAILED,
	DELETE_BANK,
	DELETE_BANK_SUCCEED,
	DELETE_BANK_FAILED,
} from "@/redux/Constant/payment/bank";

const initialState: {
	page: number;
	banks: Bank[];
	total: number;
	message: string;
	status: number;
	lastPage: number;
} = {
	page: 1,
	banks: [],
	total: 0,
	message: "",
	status: 0,
	lastPage: 0
};

export default function bankReducer(state = initialState, action: any) {
	switch (action.type) {
		case FETCH_BANKS:
			return {
				...state,
			};
		case FETCH_BANKS_SUCCEED:
			return {
				...state,
				banks: action.data.result,
				total: action.data.total,
				page: action.data.page,
				status: action.data.status,
				message: action.data.message,
				lastPage: action.data.lastPage
			};
		case FETCH_BANKS_FAILED:
			return {
				...state,
				status: action.data.status,
				message: action.data.message
			};

		case UPDATE_BANK:
			return {
				...state,
			};
		case UPDATE_BANK_SUCCEED:
			return {
				...state,
				banks: state.banks.map((bank: Bank) =>
					bank.bankEntityId === action.data.bankEntityId
						? {
							...bank,
							bankCode: action.data.bankEntityId,
							bankName: action.data.bankName,
							bankModifiedDate: action.data.bankModifiedDate,
						} : bank
				),
				message: action.data.message,
				status: action.data.status
			}
		case UPDATE_BANK_FAILED:
			return {
				...state,
				message: action.error,
			};

		case INSERT_BANK:
			return {
				...state,
			};
		case INSERT_BANK_SUCCEED:
			return {
				...state,
				banks: [...state.banks, action.data.result],
				message: action.data.message,
				status: action.data.status
			};
		case INSERT_BANK_FAILED:
			return {
				...state,
				message: action.data.message,
				status: action.data.status
			};

		case DELETE_BANK:
			return {
				...state,
			};
		case DELETE_BANK_SUCCEED:
			return {
				...state,
				banks: state.banks.filter(
					(bank) => bank.bankEntityId != action.data.bankEntityId
				),
			};
		case DELETE_BANK_FAILED:
			return {
				...state,
				message: action.error,
			};

		default:
			return state;
	}
}
