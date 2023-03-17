import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    Button,
    Card,
    Checkbox,
    Collapse,
    Container,
    Modal,
    Radio,
    Row,
    Spacer,
    Text
} from "@nextui-org/react"
import styles from "@/styles/payment.module.css"
import AddCard from "./AddCard"
import { UserAccount } from "@/lib/interfaces"
import { fetchBanks } from "@/redux/Actions/payment/bank"
import { REALTA_BANK_ACCOUNT, REALTA_FINTECH_ACCOUNT } from "@/lib/payment/const"
import { money } from "@/lib/helper"
import CheckSecuredKey from "./checkSecuredKey"
import { PaymentType } from "@/lib/payment/enum"
import FintechActivationModal from "./modals/fintechActivationModal"

const PaymentMethod = (props: {
    clickedPayNowData: any,
    setClickedPayNowData: any,
    setProceedBooking: Dispatch<SetStateAction<boolean>>
    canPayOrder: boolean,
    setCanPayOrder: Dispatch<SetStateAction<boolean>>,
    setBookingButtonAvailable: Dispatch<SetStateAction<boolean>>
    transactionData: any,
    bookingData: any,
    setTransactionData: Dispatch<SetStateAction<any>>,
    setBookingData: Dispatch<SetStateAction<any>>,
    userAccounts: UserAccount[],
    userId: number,
    setPopOverMessage: Dispatch<SetStateAction<string>>
}) => {
    const {
        clickedPayNowData,
        setClickedPayNowData,
        setProceedBooking,
        canPayOrder, // Can pay order for paynow method
        setCanPayOrder,
        setBookingButtonAvailable,
        setPopOverMessage,
        transactionData,
        bookingData,
        setTransactionData,
        setBookingData,
        userAccounts,
        userId } = props

    const dispatch = useDispatch()

    // const accounts = useSelector((state: any) => state.userAccountReducer.accounts)
    const dompet = userAccounts?.filter((item: UserAccount) => item.paymentName == "Dompet Realta")
    const fintech = userAccounts?.filter((item: UserAccount) => item.paymentType == "Fintech")
    const cards = userAccounts?.filter((item: UserAccount) => item.paymentType !== "Fintech")

    const { banks } = useSelector((state: any) => state.bankReducer)

    const [paginationOptions, setPaginationOptions] = useState({
        page: '',
        limit: 50,
    })

    useEffect(() => {
        dispatch(fetchBanks({ paginationOptions }))
    }, [])

    // Whether dompet is activated. Button will be visible if dompet has not been activated.
    const [activateDompetVisible, setActivateDompetVisible] = useState(false)
    // Whether save new card checkbox is selected
    const [isSaveNewCardSelected, setIsSaveNewCardSelected] = useState(false)
    // Whether the payment method [pay now or cash] is selected
    const [checked, setChecked] = useState("");
    // // Collapse for add bank clicked
    const [addBankCollapseClicked, setAddBankCollapseClicked] = useState(false)

    useEffect(() => {
        /**
         * Set the availability of pay button.
         * Conditions:
         * 1. `Pay with Dompet Realta or cards` is clicked and payment method is clicked (fintech / card),
         * 2. `Cash` is clicked.
         */
        // Check whether radio button has been clicked
        checked ?
            // Check whether paynow has been clicked
            checked == "paynow" ? (
                // If paynow card has been clicked,
                clickedPayNowData.paymentName !== "" ?
                    // Enable booking button
                    setBookingButtonAvailable(true)
                    // Disable booking button
                    : setBookingButtonAvailable(false)
            )
                // If payment method is cash, user can proceed booking
                : setBookingButtonAvailable(true)
            // Disable booking button if no payment method has been clicked
            : setBookingButtonAvailable(false)

        /**
         * Set data for payment transaction.
         */
        setTransactionData({
            ...transactionData,
            sourceNumber: checked ? (
                checked == "cash" ? 0 : clickedPayNowData.accountNumber)
                : 0,
            targetNumber: checked ? (
                checked == "cash" ?
                    0 : (
                        clickedPayNowData.paymentType == 'Fintech' ? REALTA_FINTECH_ACCOUNT : REALTA_BANK_ACCOUNT))
                : 0
        })

        /**
         * Set data for booking order.
         */
        setBookingData({
            ...bookingData,
            boor_cardnumber: checked == "cash" ? null : clickedPayNowData.accountNumber,
            boor_pay_type: checked == "cash" ? "C" : PaymentType[clickedPayNowData.paymentType as keyof typeof PaymentType], // TODO: Kalo click paynow, pake paymenttype else cash
        })
    }, [clickedPayNowData, checked])

    console.log(bookingData)
    const handleValidationSucceed = (value: any) => {
        /**
         * Action: after secured key validation.
         * Create transaction based on selected payment method if inputted secured key is correct.
         */
        if (value == 'Correct!') {
            setProceedBooking(true);
        }
    }

    const handleCardDataChange = (data: any) => {
        /**
         * Set new inputted card data as payment data.
         */
        addBankCollapseClicked ? setClickedPayNowData(data) : null
    }

    const showAccounts = (data: UserAccount[]) => {
        /**
         * Show user's accounts card.
         */
        return (
            <div className="ml-6">
                {
                    data.map((account: UserAccount) => (
                        <div className="mt-2">
                            <Card
                                aria-label=""
                                key={account.accountNumber}
                                isPressable
                                variant={clickedPayNowData.accountNumber == account.accountNumber ? "bordered" : "flat"}
                                onClick={() => {
                                    setClickedPayNowData({
                                        ...account
                                    })
                                }} >
                                <Card.Body
                                    aria-label=""
                                    className={styles.payment_method__card_body}>
                                    <Row
                                        aria-label=""
                                        justify="space-between">
                                        <Text size={14} b>
                                            {account.paymentType == "Fintech" ?
                                                account.paymentName : account.accountNumber}
                                        </Text>
                                        <Text size={14}>
                                            {account.paymentType !== "Fintech" ?
                                                `${account.paymentType} - ${account.paymentName}` : `${money(account.balance)}`}
                                        </Text>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                }
                {
                    data[0].cardHolderName ? showNoBankAccount() : null
                }
            </div>
        )
    }

    const showNoDompetAccount = () => {
        /**
         * Will show card with `Activate` button if user does not have Dompet account.
         */
        return (
            <div className="ml-6">
                <Card
                    className="h-3"
                    variant="flat">
                    <Card.Body>
                        <Row justify="space-between">
                            <Text> Dompet Realta </Text>
                            <Button
                                auto
                                onClick={() => setActivateDompetVisible(true)}> Activate </Button>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        )
    }

    const showNoBankAccount = () => {
        /**
         * Will show a collapse, show forms to add card data when collapse clicked.
         * Action: when user wants to add the new card into their account, will add into user accounts when click `Proceed Payment` button. 
         */
        return (
            <Collapse
                bordered
                arrowIcon
                animated={false}
                onChange={() => setAddBankCollapseClicked(!addBankCollapseClicked)}
                className={`mt-2 w-auto border-[#ECEDEE] ${addBankCollapseClicked ? "" : "bg-[#ECEDEE]"}`}
                title="Add bank account">
                <AddCard userid={userId} bankdata={banks} cardData={clickedPayNowData} onCardDataChange={handleCardDataChange} />
                <Checkbox
                    disableAnimation
                    isSelected={isSaveNewCardSelected}
                    onChange={setIsSaveNewCardSelected}
                    size="xs"> Save payment method </Checkbox>
            </Collapse>
        )
    }

    return (
        <>
            <Container className="h-max p-3" >
                <Radio.Group
                    aria-label="payment method"
                    value={checked}
                    onChange={setChecked}>
                    <Radio key="paynow" value="paynow" size="sm">
                        Pay with Dompet Realta or cards
                    </Radio>
                    <Spacer y={0.5} />
                    {
                        // Show fintech accounts. If there's no dompet account, show no-dompet-account-card
                        checked == "paynow" ?
                            dompet.length > 0 ? showAccounts(fintech) : showNoDompetAccount()
                            : null
                    }
                    {
                        // Show user's bank accounts.
                        checked == "paynow" ?
                            cards.length > 0 ? showAccounts(cards) : showNoBankAccount()
                            : null
                    }
                    <Radio key="cash" value="cash" size="sm">
                        Cash
                    </Radio>
                </Radio.Group >
                <Spacer />
            </Container >

            <Modal
                open={canPayOrder}
                className="p-4"
                onClose={() => setCanPayOrder(false)}>
                <CheckSecuredKey
                    type={clickedPayNowData.paymentType}
                    data={clickedPayNowData}
                    setData={setClickedPayNowData}
                    onValidationSucceed={handleValidationSucceed}
                    modalOpen={canPayOrder}
                    setModalOpen={setCanPayOrder} />
            </Modal>
            <FintechActivationModal
                type="Dompet Realta"
                userid={userId}
                modalOpen={activateDompetVisible}
                setModalOpen={setActivateDompetVisible} />
        </>
    )
}

export default PaymentMethod