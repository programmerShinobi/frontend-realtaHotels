import LayoutManager from "@/components/Layout/manager";
import InfoChart from "@/components/paymentComponents/admin/InfoChart";
import FintechTable from "@/components/paymentComponents/admin/tables/fintechTable";
import { Row } from "@nextui-org/react";
import Head from "next/head";
import { fetchFintech } from "@/redux/Actions/payment/fintech"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function PaymentFintech() {
    const dispatch = useDispatch()
    const { fintech } = useSelector((state: any) => state.fintechReducer)

    useEffect(() => {
        dispatch(fetchFintech());
    }, [fintech]);

    return (
        <div>
            <Head>
                <title>Payment/Fintech</title>
            </Head>
            <LayoutManager>
                <Row>
                    <FintechTable data={fintech} />
                    <InfoChart data={fintech} name="Fintech" />
                </Row>
            </LayoutManager>
        </div>
    );
}