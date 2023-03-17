import LayoutAdmin from "@/components/Layout/admin";
import Head from "next/head";
import "@/styles/payment.module.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTransactions } from "@/redux/Actions/payment/transaction";
import TransactionTable from "@/components/paymentComponents/admin/tables/transactionTable";
import { PaginationOptions } from "@/lib/interfaces";

export default function PaymentTransaction() {
    const dispatch = useDispatch()
    const { transactions, page, totalTrx, total, lastPage, message, status } = useSelector((state: any) => state.transactionReducer)
    const [paginationOptions, setPaginationOptions] = useState({
        page: page,
        limit: 10,
        keyword: {}
    })

    useEffect(() => {
        dispatch(fetchTransactions(paginationOptions))
    }, [paginationOptions])

    const handlePaginationOptions = (options: PaginationOptions) => {
        setPaginationOptions(options)
    }

    return (
        <div>
            <Head>
                <title>Payment/Transaction</title>
            </Head>
            <LayoutAdmin>
                <TransactionTable
                    data={transactions}
                    paginationOptions={paginationOptions}
                    setPaginationOptions={handlePaginationOptions}
                    totalPage={lastPage}
                />
            </LayoutAdmin>
        </div>
    );
}