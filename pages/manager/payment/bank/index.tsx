
import LayoutManager from "@/components/Layout/manager";
import InfoChart from "@/components/paymentComponents/admin/InfoChart";
import BankTable from "@/components/paymentComponents/admin/tables/bankTable";
import Head from "next/head";
import { fetchBanks } from "@/redux/Actions/payment/bank"
import { Row } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PaymentBank() {
    const dispatch = useDispatch()
    const prevDataRef = useRef([])
    const { banks, page, lastPage, total } = useSelector((state: any) => state.bankReducer)

    const [paginationOptions, setPaginationOptions] = useState({
        page: page,
        limit: 10,
        keyword: ""
    })
    
    useEffect(() => {
        /**
         * Compare the current value of data to the previous value stored in `prevDataRef.current`.
         * If the two values are not equal, dispatch the `fetchBanks()` action with the current value of data,
         * and update `prevDataRef.current` to the new value of data.
         */
        if (banks !== prevDataRef.current) {
            dispatch(fetchBanks(paginationOptions))
            prevDataRef.current = banks
        }
    }, [banks, dispatch])

    return (
        <div>
            <Head>
                <title>Payment/Bank</title>
            </Head>
            <LayoutManager>
                <Row>
                    <BankTable
                        data={banks}
                        paginationOptions={paginationOptions}
                        setPaginationOptions={setPaginationOptions}
                        totalPage={lastPage} />
                    <InfoChart data={total} name="Bank" />
                </Row>
            </LayoutManager>
        </div>
    );
}