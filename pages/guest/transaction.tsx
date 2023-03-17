import Head from "next/head";
import LayoutGuest from "@/components/Layout/guest";
import TransactionHistory from "@/components/paymentComponents/guest/TransactionHistory";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { fetchUserAccountBy } from "@/redux/Actions/payment/userAccount";
import { fetchTransactions } from "@/redux/Actions/payment/transaction";

export default function GuestTransaction() {
    const dispatch = useDispatch()
    let userId: number = 0;
    if (typeof window !== 'undefined') {
        userId = Number(localStorage.getItem('userId'))
    }
    
    const { transactions, page, totalTrx, total, lastPage, message, status } = useSelector((state: any) => state.transactionReducer)
    
    const [paginationOptions, setPaginationOptions] = useState({
        page: page,
        limit: 50,
        keyword: {
            userId: userId,
        }
    })

    useEffect(() => {
        dispatch(fetchTransactions(paginationOptions))
    }, [paginationOptions])

    const handlePaginationOptions = (options: any) => {
        setPaginationOptions(options)
    }
    
    return (
        <>
            <Head>
                <title> My Transactions </title>
            </Head>
            <LayoutGuest>
                <TransactionHistory
                    userId={userId}
                    data={transactions}
                    paginationOptions={paginationOptions}
                    setPaginationOptions={handlePaginationOptions}
                    total={total} />
            </LayoutGuest>
        </>
    )
}