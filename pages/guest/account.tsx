import LayoutGuest from "@/components/Layout/guest";
import AddCard from "@/components/paymentComponents/guest/AddCard";
import BankAccountCard from "@/components/paymentComponents/guest/bankAccountCard";
import FintechAccountCard from "@/components/paymentComponents/guest/fintechAccountCard";
import { UserAccount } from "@/lib/interfaces";
import { fetchBanks } from "@/redux/Actions/payment/bank";
import { createAccount, fetchUserAccountBy } from "@/redux/Actions/payment/userAccount";
import { Col, Modal, Text, Card, Button, Row, Spacer } from "@nextui-org/react";
import Head from "next/head";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

const GuestAccount = () => {
    const dispatch = useDispatch()

    // Get User ID from Local Storage.
    let userId: number = 0;
    if (typeof window !== 'undefined') {
        userId = Number(localStorage.getItem('userId'))
    }
    
    const account = useSelector((state: any) => state.userAccountReducer.accounts)
    const banks = useSelector((state: any) => state.bankReducer.banks)

    const [modalOpen, setModalOpen] = useState(false)
    const [paginationOptions, setPaginationOptions] = useState({
        page: '',
        limit: 50,
    })
    const [cardData, setCardData] = useState(
        {
            userId: userId,
            paymentType: "Debit Card",
            paymentName: "Bank Name",
            accountNumber: "",
            cardHolderName: "",
            balance: 0,
            expMonth: 0,
            expYear: 0,
            securedKey: "",
        }
    )

    useEffect(() => {
        dispatch(fetchUserAccountBy({ userId: userId }))
        dispatch(fetchBanks(paginationOptions))
    }, [dispatch])

    const fintech = account?.filter((item: UserAccount) => item.paymentType == "Fintech")
    const card = account?.filter((item: UserAccount) => item.paymentType !== "Fintech")

    const handleCardDataChange = (data: any) => {
        setCardData(data)
    }

    const addCard = () => {
        dispatch(createAccount(cardData))
        setModalOpen(false)
    }

    return (
        <div>
            <Head>
                <title>My Account</title>
            </Head>
            <LayoutGuest>
                <div className="mx-64">
                    <Col>
                        <Card variant="bordered" className="my-5">
                            <Card.Header className="pb-0">
                                <Text size={28}>
                                    Fintech
                                </Text>
                            </Card.Header>
                            <Card.Body>
                                <FintechAccountCard data={fintech} carddata={card} userid={userId} />
                            </Card.Body>
                        </Card>
                        <Spacer />
                        <Card variant="bordered" className="my-5">
                            <Card.Header className="pb-0">
                                <Row justify="space-between">
                                    <Text size={28}>
                                        Credit/Debit Card
                                    </Text>
                                    <Spacer />
                                    <Button color="error" onClick={() => setModalOpen(true)}>
                                        Add Card
                                    </Button>
                                </Row>
                            </Card.Header>
                            <Card.Body className="pt-0">
                                <BankAccountCard data={card} userid={userId} />
                            </Card.Body>
                        </Card>
                    </Col>
                </div>
                <Modal
                    aria-label="modal: add bank account"
                    animated={false}
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}>
                    <Modal.Body aria-label="modal body: add bank account">
                        <AddCard
                            userid={userId}
                            bankdata={banks}
                            cardData={cardData}
                            onCardDataChange={handleCardDataChange} />
                    </Modal.Body>
                    <Modal.Footer aria-label="modal footer: add bank account">
                        <Button color={"error"} onPress={addCard} aria-label="add card button">
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </LayoutGuest>
        </div>
    );
}

export default GuestAccount;