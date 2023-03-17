import LayoutAdmin from "@/components/Layout/admin";
import InfoChart from "@/components/paymentComponents/admin/InfoChart";
import BankTable from "@/components/paymentComponents/admin/tables/bankTable";
import Head from "next/head";
import { fetchBanks } from "@/redux/Actions/payment/bank"
import { Card, Row, Spacer, StyledCard } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaginationOptions } from "@/lib/interfaces";

export default function PaymentBank() {
    const dispatch = useDispatch()

    const { banks, page, lastPage, total } = useSelector((state: any) => state.bankReducer)

    const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>({
        page: page,
        limit: 10,
        keyword: ""
    })

    useEffect(() => {
        dispatch(fetchBanks(paginationOptions))
    }, [paginationOptions])

    const handlePaginationOptions = (options: PaginationOptions) => {
        setPaginationOptions(options)
    }

    return (
        <div>
            <Head>
                <title>Payment/Bank</title>
            </Head>
            <LayoutAdmin>
                <BankTable
                    data={banks}
                    paginationOptions={paginationOptions}
                    setPaginationOptions={handlePaginationOptions}
                    totalPage={lastPage} />
            </LayoutAdmin>
        </div>
    );
}