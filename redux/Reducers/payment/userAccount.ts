import {
	FETCH_ACCOUNTS,
	FETCH_ACCOUNTS_FAILED,
	FETCH_ACCOUNTS_SUCCEED,
	FETCH_ACCOUNT,
	FETCH_ACCOUNT_FAILED,
	FETCH_ACCOUNT_SUCCEED,
	CREATE_ACCOUNT,
	CREATE_ACCOUNT_FAILED,
	CREATE_ACCOUNT_SUCCEED,
	UPDATE_ACCOUNT,
	UPDATE_ACCOUNT_FAILED,
	UPDATE_ACCOUNT_SUCCEED,
	DELETE_ACCOUNT,
	DELETE_ACCOUNT_FAILED,
	DELETE_ACCOUNT_SUCCEED,
	CHECK_SECURED_KEY,
	CHECK_SECURED_KEY_FAILED,
	CHECK_SECURED_KEY_SUCCEED,
} from "@/redux/Constant/payment/userAccount";
import { UserAccount } from "@/lib/interfaces";

const initialState: {
	accounts: UserAccount[];
	status: any;
	message: string;
} = {
	accounts: [],
	status: 0,
	message: "",
};

export default function userAccountReducer(state = initialState, action: any) {
	switch (action.type) {
		// FETCH ALL
		case FETCH_ACCOUNTS:
			return { ...state };
		case FETCH_ACCOUNTS_FAILED:
			return {
				...state,
				accounts: action.data.result,
				message: action.data.message,
				status: action.data.status,
			};
		case FETCH_ACCOUNTS_SUCCEED:
			return {
				...state,
				accounts: action.data,
				message: action.data.message,
				status: action.data.status,
			};

		// FETCH BY USER
		case FETCH_ACCOUNT:
			return { ...state };
		case FETCH_ACCOUNT_FAILED:
			return {
				...state,
				accounts: action.data.result,
				message: action.data.message,
				status: action.data.status,
			};
		case FETCH_ACCOUNT_SUCCEED:
			return {
				...state,
				accounts: action.data.result,
				message: action.data.message,
				status: action.data.status,
			};

		// CREATE
		case CREATE_ACCOUNT:
			return { ...state };
		case CREATE_ACCOUNT_FAILED:
			return {
				...state,
				message: action.data.message,
			};
		case CREATE_ACCOUNT_SUCCEED:
			return {
				...state,
				accounts: action.data.result,
				message: action.data.message,
				status: action.data.status,
			};

		// UPDATE
		case UPDATE_ACCOUNT:
			return { ...state };
		case UPDATE_ACCOUNT_FAILED:
			return {
				...state,
				message: action.data?.message,
				status: action.data?.status,
			};
		case UPDATE_ACCOUNT_SUCCEED:
			return {
				...state,
				accounts: state.accounts.map((account: UserAccount) =>
					account.accountNumber === action.data.accountNumber
						? { ...account, securedKey: action.data.securedKey }
						: account
				),
				message: action.data.message,
				status: action.data.status,
			};

		// DELETE
		case DELETE_ACCOUNT:
			return { ...state };
		case DELETE_ACCOUNT_FAILED:
			return {
				...state,
				message: action.message,
			};
		case DELETE_ACCOUNT_SUCCEED:
			return {
				...state,
				accounts: state.accounts.filter(
					(items: UserAccount) =>
						items.accountNumber !== action.data.accountnumber
				),
				message: action.message,
				status: action.status,
			};

		// CHECK SECURED KEY
		case CHECK_SECURED_KEY:
			return { ...state };
		case CHECK_SECURED_KEY_FAILED:
			return {
				...state,
				result: action.data.result,
				message: action.data.message,
				status: action.data.status,
			};
		case CHECK_SECURED_KEY_SUCCEED:
			return {
				...state,
				result: action.data.result,
				message: action.data.message,
				status: action.data.status,
			};

		default:
			return { ...state };
	}
}
