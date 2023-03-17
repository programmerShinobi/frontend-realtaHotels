import LayoutManager from "@/components/Layout/manager";
import Head from "next/head";
import "@/styles/payment.module.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTransactions } from "@/redux/Actions/payment/transaction";
import { Col, Row } from "@nextui-org/react";
import TransactionTable from "@/components/paymentComponents/admin/tables/transactionTable";
import InfoChart from "@/components/paymentComponents/admin/InfoChart";

export default function PaymentTransaction() {
    const dispatch = useDispatch()
    const { transactions, page, totalTrx, total, lastPage, message, status } = useSelector((state: any) => state.transactionReducer)
    const [paginationOptions, setPaginationOptions] = useState({
        page: page,
        limit: 10,
        keyword: {}
    })

    console.log(paginationOptions, "PaymentTransaction")

    useEffect(() => {
        dispatch(fetchTransactions(paginationOptions))
    }, [transactions])

    return (
        <div>
            <Head>
                <title>Payment/Transaction</title>
            </Head>
            <LayoutManager>
                <Row>
                    <TransactionTable
                        data={transactions}
                        paginationOptions={paginationOptions}
                        setPaginationOptions={setPaginationOptions}
                        totalPage={lastPage}
                        />
                    <div>
                        <InfoChart data={totalTrx} name={"Transaction"} />
                        {/* <CategoryChart data={transactions} name={"Transaction"} /> */}
                    </div>
                </Row>
            </LayoutManager>
        </div>
    );
}