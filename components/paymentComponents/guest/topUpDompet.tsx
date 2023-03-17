import { Col, Grid, Button, Input, Dropdown, Text, Spacer } from "@nextui-org/react"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import CheckSecuredKey from "./checkSecuredKey"
import { UserAccount } from "@/lib/interfaces"
import { createTransaction } from "@/redux/Actions/payment/transaction"
import { cardNumber, money } from "@/lib/helper"

const TopUpDompet = ({ dompetdata, carddata, setModalOpen }: any) => {
    // TODO: SHOW ERROR KALO VALUE BELOM KEISI
    // TODO: SHOW ERROR DI MODAL IF BALANCE INSUFFICIENT
    const dispatch = useDispatch()
    const [modalContent, setModalContent] = useState<"topup" | "auth">("topup")
    const [topUpData, setTopUpData] = useState({
        userId: 0,
        transactionType: "TP",
        amount: 0,
        sourceNumber: "",
        targetNumber: "",
        securedKey: ""
    })
    const [selectedPaymentData, setSelectedPaymentData] = useState<UserAccount>({
        userId: 0,
        fullName: "",
        paymentType: "",
        paymentName: "",
        accountNumber: "",
        cardHolderName: "",
        balance: 0,
        expMonth: 0,
        expYear: 0,
        securedKey: ""
    })

    const topUpAmount: number[] = [10000, 25000, 50000, 100000, 250000, 500000]

    useEffect(() => {
        setTopUpData({
            ...topUpData,
            userId: dompetdata?.userId,
            targetNumber: dompetdata?.accountNumber
        })
    }, [dompetdata])

    const checkIfSufficientBalance = () => {
        const selectedCardData: UserAccount = carddata.find((item: UserAccount) => item.accountNumber == topUpData.sourceNumber)
        if (+selectedCardData?.balance >= topUpData.amount) {
            setSelectedPaymentData(selectedCardData)
            return true
        } else {
            alert(`Unsufficient balance!`)
            return false
        }
    }

    const handleValidationSucceed = (message: string) => {
        message == 'Correct!' ? dispatch(createTransaction(topUpData)) && setModalOpen(false): setModalOpen(true)
    }

    return (
        <>
            {modalContent === "topup" ?
                (<Col className="flex flex-col items-center">
                    <Text> Choose top up amount </Text>
                    <Grid.Container gap={1} justify="center">
                        {
                            topUpAmount.map((amount: number) => (
                                <Grid>
                                    <Button value={amount} size="sm" bordered color={"error"}
                                        onClick={(e: any) => setTopUpData({ ...topUpData, amount: +e.target.value })}>
                                        {money(amount)}
                                    </Button>
                                </Grid>
                            ))
                        }
                    </Grid.Container>
                    <Input label="Or input manually..." type="number" value={topUpData.amount} onChange={(e: any) => setTopUpData({ ...topUpData, amount: +e.target.value })} />

                    <Spacer />
                    <Text> Payment Account </Text>
                    <Dropdown>
                        <Dropdown.Button
                            flat color="error">
                            {topUpData.sourceNumber == "" ? "Choose Account" : topUpData.sourceNumber}
                        </Dropdown.Button>
                        <Dropdown.Menu
                            className="w-[600px]"
                            aria-label="single selection actions"
                            color="secondary"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={topUpData.sourceNumber}
                            onSelectionChange={(value: any) => setTopUpData({ ...topUpData, sourceNumber: value.currentKey })}>
                            {
                                carddata.map((item: UserAccount) => (
                                    <Dropdown.Item
                                        className="text-sm"
                                        key={item.accountNumber}
                                        description={`${item.paymentType == 'Debit Card'? 'DC' : 'CC'} ${item.paymentName} (${money(item.balance)})`}>
                                        {cardNumber(item.accountNumber)}
                                    </Dropdown.Item>
                                ))
                            }
                        </Dropdown.Menu >
                    </Dropdown>
                    <Spacer />
                    <Button
                        color={"error"}
                        onPress={() => topUpData.amount > 0 && checkIfSufficientBalance() ? setModalContent("auth") : null}
                    > Top Up </Button>
                </Col >)
                : <CheckSecuredKey
                    type="Card"
                    data={selectedPaymentData}
                    setData={setSelectedPaymentData}
                    onValidationSucceed={handleValidationSucceed}
                    setModalOpen={setModalOpen} />
            }
        </>
    )
}

export default TopUpDompet