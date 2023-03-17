export interface Transaction {
	transactionId: number;
	transactionNumber: string;
	status: string;
	trxDate: string;
	trxTime: string;
	debit: number;
	credit: number;
	transactionType: string;
	transactionNote: string;
	orderNumber: string;
	sourceNumber: number;
	targetNumber: number;
	sourcePaymentName: string;
	targetPaymentName: string;
	transactionRef: string;
	userId: number;
	userFullName: string;
}

export interface Bank {
	bankEntityId: number;
	bankCode: string;
	bankName: string;
	bankModifiedDate: string;
}

export interface Fintech {
	pagaEntityId: number;
	pagaCode: string;
	pagaName: string;
	pagaModifiedDate: string;
}

export interface UserAccount {
	userId: number;
	fullName: string;
	paymentType: string;
	paymentName: string;
	accountNumber: string;
	cardHolderName: string;
	balance: number;
	expMonth: number;
	expYear: number;
	securedKey: string;
}

export interface PaginationOptions {
	page: number;
	limit: number;
	keyword: string;
}