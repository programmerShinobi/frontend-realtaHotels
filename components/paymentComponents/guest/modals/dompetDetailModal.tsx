import { money } from "@/lib/helper";
import { UserAccount } from "@/lib/interfaces";
import { updateAccount } from "@/redux/Actions/payment/userAccount";
import { Button, Col, Container, Modal, Row, Spacer, Text } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import SetPinNumber from "../setPinNumber";
import TopUpDompet from "../topUpDompet";
export default function DompetDetailModal(props: {
    modalOpen: boolean,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    dompetdata: UserAccount | undefined,
    carddata: UserAccount[]
}) {
    const dispatch = useDispatch()

    const { modalOpen, setModalOpen, dompetdata, carddata } = props
    const [modalContent, setModalContent] = useState<"detail" | "update" | "topup">("detail")
    const [validInput, setValidInput] = useState("")

    const showCardDetail = () => {
        return (
            <Col className="flex flex-col items-center">
                <Container className="bg-blue-300 rounded-xl h-48 py-10">
                    <Text b size={18}> Dompet Realta </Text>
                    <Text size={28}> {money(dompetdata?.balance)} </Text>
                    <Text i> {dompetdata?.fullName} </Text>
                </Container>
                <Spacer />
                <Row justify="space-between">
                    <Button size="sm" color={"error"} bordered className="h-9" onClick={() => setModalContent("update")}> Update PIN </Button>
                    <Button size="sm" color={"error"} onClick={() => setModalContent("topup")}> Top Up </Button>
                </Row>
            </Col>
        )
    }
    
    const updateDompetData = () => {
        setModalOpen(false)
        dispatch(updateAccount({
            accountNumber: dompetdata?.accountNumber,
            securedKey: validInput
        }))
    }
    
    const showUpdatePin = () => {
        return (
            <>
                <SetPinNumber setValidInput={handlePinValid} />
                <Button onPress={updateDompetData}> Update </Button>
            </>
        )
    }

    const handlePinValid = (validInput: string) => {
        setValidInput(validInput)
    }

    return (
        <Modal
            blur
            open={modalOpen}
            closeButton
            onClose={() => { setModalOpen(false), setModalContent("detail") }}>
            <Modal.Body className="my-6">
                {modalContent === "detail" && showCardDetail()}
                {modalContent === "update" && showUpdatePin()}
                {modalContent === "topup" && <TopUpDompet dompetdata={dompetdata} carddata={carddata} setModalOpen={setModalOpen} />}
            </Modal.Body>
        </Modal>
    )
}