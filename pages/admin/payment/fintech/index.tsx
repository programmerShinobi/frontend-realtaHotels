import LayoutAdmin from "@/components/Layout/admin";
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
    }, [    ]);

    return (
        <div>
            <Head>
                <title>Payment/Fintech</title>
            </Head>
            <LayoutAdmin>
                <FintechTable data={fintech} />
            </LayoutAdmin>
        </div>
    );
}