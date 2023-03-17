import { UserAccount } from "@/lib/interfaces";
import {
	FETCH_ACCOUNTS,
	FETCH_ACCOUNT,
	CREATE_ACCOUNT,
	DELETE_ACCOUNT,
	UPDATE_ACCOUNT,
	CHECK_SECURED_KEY,
} from "@/redux/Constant/payment/userAccount";

export const fetchUserAccounts = () => {
	return {
		type: FETCH_ACCOUNTS,
	};
};

export const fetchUserAccountBy = (data: any) => {
	return {
		type: FETCH_ACCOUNT,
		data,
	};
};

export const createAccount = (data: any) => {
	return {
		type: CREATE_ACCOUNT,
		data,
	};
};

export const deleteAccount = (data: any) => {
	return {
		type: DELETE_ACCOUNT,
		data,
	};
};

export const updateAccount = (data: any) => {
	return {
		type: UPDATE_ACCOUNT,
		data,
	};
};

export const checkSecuredKey = (data: UserAccount) => {
	return {
		type: CHECK_SECURED_KEY,
		data,
	};
};
