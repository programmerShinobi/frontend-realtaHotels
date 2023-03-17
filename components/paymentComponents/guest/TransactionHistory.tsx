import { money } from "@/lib/helper";
import { Transaction } from "@/lib/interfaces";
import { Button, Card, Col, Container, Dropdown, Row, Spacer, StyledContainer, Table, Text } from "@nextui-org/react";
import { useState } from "react";
import TransactionDetailModal from "./modals/TransactionDetailModal";

export default function TransactionHistory({ data, total }: { data: Transaction[], total: number }) {
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

    return (
        <div className="text-center">
            <Text b size={"$3xl"}> Transaction History </Text>
            <Spacer />
            <div className="flex justify-center h-max">
                <div className="p-3 w-[50%] rounded-3xl border-2 border-[#E31260] h-max">
                    <Row justify="space-evenly">
                        <Dropdown>
                            <Dropdown.Button rounded color="error">
                                <Text color="white"> Date </Text>
                            </Dropdown.Button>
                            <Dropdown.Menu color="default">
                                <Dropdown.Item> Last 30 days </Dropdown.Item>
                                <Dropdown.Item> Last 60 days </Dropdown.Item>
                                <Dropdown.Item> Last 90 days </Dropdown.Item>
                                <Dropdown.Item color="error" withDivider> Reset filter </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>
                            <Dropdown.Button rounded color="error">
                                <Text color="white"> Service </Text>
                            </Dropdown.Button>
                            <Dropdown.Menu color="default">
                                <Dropdown.Item> Hotel </Dropdown.Item>
                                <Dropdown.Item> Restaurant </Dropdown.Item>
                                <Dropdown.Item color="error" withDivider> Reset filter </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>
                            <Dropdown.Button rounded color="error">
                                <Text color="white"> Method </Text>
                            </Dropdown.Button>
                            <Dropdown.Menu color="default">
                                <Dropdown.Item> Bank </Dropdown.Item>
                                <Dropdown.Item> Fintech </Dropdown.Item>
                                <Dropdown.Item color="error" withDivider> Reset filter </Dropdown.Item>
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
                                <Text size={14}> {transaction.trxDate} </Text>
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