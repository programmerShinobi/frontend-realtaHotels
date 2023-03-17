import { FETCH_TRANSACTIONS, CREATE_TRANSACTION } from "@/redux/Constant/payment/transaction"


export const fetchTransactions = (data: any) => {
    return {
        type: FETCH_TRANSACTIONS,
        data
    }
}

export const createTransaction = (data: any) => {
    return {
        type: CREATE_TRANSACTION,
        data
    }
}