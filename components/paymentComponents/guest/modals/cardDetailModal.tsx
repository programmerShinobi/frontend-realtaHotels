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
                className="w-max"
                animated={false}
                open={modalOpen}
                onClose={() => setModalOpen(modalOpen)}>
                {/* <Modal.Body> */}
                <Modal.Body className="p-7 pb-0 mt-5">
                    <Container className="border rounded-md h-[200px] p-10 bg-gradient-to-br from-blue-300 to-blue-800 font-mono">
                        <Text size={26}>
                            {cardNumber(data.accountNumber)}
                        </Text>
                        <Row>
                            <Col>
                                <Text size={18} className="w-[200px]" transform="uppercase">
                                    {data.cardHolderName} </Text>
                                <Text size={14}> Balance: <br/> {money(data.balance)} </Text>
                            </Col>
                            <Col id="card-exp-date" className="text-right">
                                <Text size={12}> EXP DATE </Text>
                                <Text size={18}> {data.expMonth} / {data.expYear} </Text>
                            </Col>
                        </Row>
                    </Container>
                    {/* <div className="flex flex-col items-center justify-center flex-auto flex-shrink-0">
                        <div className="relative h-56 bg-gradient-to-br from-blue-300 to-blue-800 rounded-lg w-96 overflow-hidden">
                            <svg viewBox="0 0 220 192" width="220" height="192" fill="none" className="absolute -left-10 -top-16 text-blue-900 opacity-50">
                                <defs>
                                    <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
                                    </pattern>
                                </defs>
                                <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"></rect>
                            </svg>
                            <svg viewBox="0 0 220 192" width="220" height="192" fill="none" className="absolute -right-20 -bottom-32 text-blue-900 opacity-50">
                                <defs>
                                    <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
                                    </pattern>
                                </defs>
                                <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"></rect>
                            </svg>
                            <img src="https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_pos_92px_2x.png" alt="" srcset="" className="absolute right-4 bottom-2 h-24" />
                            <div className="absolute top-10 left-8 h-12 w-16 bg-gradient-to-r from-yellow-400 to-yellow-200 opacity-90 rounded-lg overflow-hidden">
                                <span className="flex absolute top-1/2 left-1 h-full w-10 bg-opacity-50 rounded-lg transform -translate-y-1/2 -translate-x-1/2 border border-gray-400"></span>
                                <span className="flex absolute top-1/2 right-1 h-full w-10 bg-opacity-50 rounded-lg transform -translate-y-1/2 translate-x-1/2 border border-gray-400"></span>
                                <span className="flex absolute top-1.5 right-0 w-full h-5 bg-opacity-50 rounded-full transform -translate-y-1/2 border border-gray-400"></span>
                                <span className="flex absolute bottom-1.5 right-0 w-full h-5 bg-opacity-50 rounded-full transform translate-y-1/2 border border-gray-400"></span>
                            </div>
                            <div className="absolute bottom-20 left-8 text-white font-semibold text-2xl space-x-1.5">
                                {cardNumber(data.accountNumber)}
                            </div>
                            <div className="absolute bottom-16 left-8 text-gray-200 font-semibold text-base">
                                {data.expMonth} / {data.expYear}
                            </div>
                            <div className="absolute bottom-6 left-8 text-gray-200 font-semibold text-xl uppercase">
                                <span>{data.cardHolderName}</span>
                            </div>
                        </div>
                    </div> */}
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