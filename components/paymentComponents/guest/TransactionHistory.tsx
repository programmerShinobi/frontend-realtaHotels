import { money } from "@/lib/helper";
import { PaginationOptions, Transaction } from "@/lib/interfaces";
import { Card, Col, Dropdown, Row, Spacer, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import TransactionDetailModal from "./modals/TransactionDetailModal";
import { ServiceType } from "@/lib/payment/enum";

export default function TransactionHistory({
    userId,
    data,
    total,
    paginationOptions,
    setPaginationOptions
}: {
    userId: number,
    data: Transaction[],
    total: number,
    paginationOptions: any,
    setPaginationOptions: (options: PaginationOptions) => void
}) {
    const [selectedDateRange, setSelectedDateRange] = useState("date")
    const [selectedService, setSelectedService] = useState("service")
    const [showTrxDetail, setShowTrxDetail] = useState(false)
    const [trxDetailData, setTrxDetailData] = useState<Transaction>({
        transactionId: 0,
        transactionNumber: "",
        status: "",
        trxDate: "",
        trxTime: "",
        debit: 0,
        credit: 0,
        transactionType: "",
        transactionNote: "",
        orderNumber: "",
        sourceNumber: 0,
        targetNumber: 0,
        sourcePaymentName: "",
        targetPaymentName: "",
        transactionRef: "",
        userId: 0,
        userFullName: "",
    })

    useEffect(() => {
        selectedDateRange !== "date" ?
            setPaginationOptions({
                ...paginationOptions,
                keyword: {
                    userId: userId,
                    timestamp: selectedDateRange
                }
            }) : 
            setPaginationOptions({
                ...paginationOptions,
                keyword: {
                    userId: userId,
                }
            })
        
        selectedService !== "service" ?
            setPaginationOptions({
                ...paginationOptions,
                keyword: {
                    userId: userId,
                    transactionType: selectedService,
                }
            }) : 
            setPaginationOptions({
                ...paginationOptions,
                keyword: {
                    userId: userId,
                }
            })
        
    }, [selectedDateRange, selectedService])
    console.log(paginationOptions)
    return (
        <div className="text-center">
            <Text b size={"$3xl"}> Transaction History </Text>
            <Spacer />
            <div className="flex justify-center h-max">
                <div className="p-3 w-[30%] rounded-3xl border-2 border-[#E31260] h-max">
                    <Row justify="space-evenly">
                        <Dropdown disableAnimation>
                            <Dropdown.Button rounded color="error" className="capitalize">
                                {selectedDateRange !== "date" ? `Last ${selectedDateRange}` : "date"}
                            </Dropdown.Button>
                            <Dropdown.Menu
                                color="default"
                                aria-label="Single selection actions"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedDateRange}
                                onSelectionChange={(value: any) => setSelectedDateRange(value.currentKey)}>
                                <Dropdown.Item key="30 days"> Last 30 days </Dropdown.Item>
                                <Dropdown.Item key="60 days"> Last 60 days </Dropdown.Item>
                                <Dropdown.Item key="90 days"> Last 90 days </Dropdown.Item>
                                <Dropdown.Item key="date" color="error" withDivider> Reset selection </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown disableAnimation>
                            <Dropdown.Button rounded color="error" className="capitalize">
                                {selectedService !== "service" ? ServiceType[selectedService as keyof typeof ServiceType] : "service"}
                            </Dropdown.Button>
                            <Dropdown.Menu
                                color="default"
                                aria-label="Single selection actions"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedService}
                                onSelectionChange={(value: any) => setSelectedService(value.currentKey)}>
                                <Dropdown.Item key="TP "> Top Up </Dropdown.Item>
                                <Dropdown.Item key="TRB"> Hotel </Dropdown.Item>
                                <Dropdown.Item key="ORM"> Restaurant </Dropdown.Item>
                                <Dropdown.Item key="service" color="error" withDivider> Reset filter </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
                </div>
            </div>
            <Spacer />
            <Text> Your total transaction: {total} </Text>
            <Spacer />
            <div className="mx-48">
                {data.map((transaction: Transaction) => (
                    <>
                        <Spacer y={0.5} />
                        <Card
                            isPressable
                            onClick={() => {
                                setShowTrxDetail(true),
                                    setTrxDetailData({
                                        ...transaction
                                    })
                            }}
                            variant="bordered"
                            key={transaction.transactionNumber}
                            className="h-[50%] my-2">
                            <Card.Header className="pb-0">
                                <Text size={14}> {transaction?.trxDate} </Text>
                            </Card.Header>
                            <Card.Body className="pt-0 pb-4">
                                <Row justify="space-between">
                                    <Text> {transaction.transactionNote} </Text>
                                    <div className="w-[150px] text-right">
                                        <Col>
                                            <Text size={17} color={transaction.debit == 0 ? "red" : "green"}>
                                                {transaction.debit == 0 ? `- ${money(transaction.credit)}` : `+ ${money(transaction.debit)}`}
                                            </Text>
                                            <Text size={12} b   > {transaction.transactionType == "TP " ? transaction.targetPaymentName : transaction.sourcePaymentName}</Text>
                                        </Col>
                                    </div>
                                </Row>
                            </Card.Body>
                        </Card>
                    </>
                ))}
            </div>
            <TransactionDetailModal data={trxDetailData} modalOpen={showTrxDetail} setModalOpen={setShowTrxDetail} />
        </div>
    )
}