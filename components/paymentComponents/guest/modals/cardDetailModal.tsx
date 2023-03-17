import { cardNumber, money } from "@/lib/helper";
import { UserAccount } from "@/lib/interfaces";
import { deleteAccount } from "@/redux/Actions/payment/userAccount";
import { Button, Col, Container, Modal, Row, Text } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";

export default function CardDetailModal({ modalOpen, setModalOpen, data }: {
    modalOpen: boolean;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    data: UserAccount
}) {
    const dispatch = useDispatch()

    const deleteCard = () => {
        setModalOpen(!modalOpen)
        dispatch(deleteAccount(data))
    }

    return (
        <>
            <Modal
                animated={false}
                open={modalOpen}
                onClose={() => setModalOpen(modalOpen)}>
                <Modal.Body className="p-7 pb-0 mt-5">
                    <Container className="border rounded-md h-[200px] bg-blue-50 p-10">
                        <Text size={26}>
                            {cardNumber(data.accountNumber)}
                        </Text>
                        <Row>
                            <Col>
                                <Text size={18} className="w-[200px]">
                                    {data.cardHolderName} </Text>
                                <Text size={14}> Balance: {money(data.balance)} </Text>
                            </Col>
                            <Col id="card-exp-date" className="text-right">
                                <Text size={12}> EXP DATE </Text>
                                <Text size={18}> {data.expMonth} / {data.expYear} </Text>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer className="p-3">
                    <Button
                        color="error"
                        rounded
                        bordered
                        onPress={deleteCard}
                    >
                        Delete Card
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}