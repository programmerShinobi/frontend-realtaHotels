import { money } from "@/lib/helper";
import { Transaction } from "@/lib/interfaces";
import { Col, Modal, Row, Text } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

export default function TransactionDetailModal({ data, modalOpen, setModalOpen }: {
    data: Transaction,
    modalOpen: boolean,
    setModalOpen: Dispatch<SetStateAction<boolean>>
}) {
    
    return (
        <Modal
            closeButton
            open={modalOpen}
            onClose={() => setModalOpen(!modalOpen)}
            className="h-[500px] p-5">
            <Modal.Header className="border rounded-md">
                <Col>
                    <Text size={22}> {data.credit == 0 ? money(data.debit) : money(data.credit)} </Text>
                    <Text size={14}> {data.transactionNote}</Text>
                </Col>
            </Modal.Header>
            <Modal.Body className="mt-6 border rounded-md px-4">
                <Row justify="space-between" className="my-0">
                    <Text> {data.transactionType == "TP " ? "Added to" : "Payment method"}</Text>
                    <Text> {data.transactionType == "TP " ? data.targetPaymentName : data.sourcePaymentName} </Text>
                </Row>
                <Row justify="space-between" className="my-0">
                    <Text> Status </Text>
                    <Text> {data.status} </Text>
                </Row>
                <Row justify="space-between" className="my-0">
                    <Text> Time </Text>
                    <Text> {data.trxTime} </Text>
                </Row>
                <Row justify="space-between" className="my-0">
                    <Text> Date </Text>
                    <Text> {data.trxDate} </Text>
                </Row>
                <Row justify="space-between" className="my-0">
                    <Text> Transaction ID </Text>
                    <Text> {data.transactionNumber} </Text>
                </Row>
                <Row justify="space-between" className="my-0">
                    <Text> Order ID </Text>
                    <Text> {data.orderNumber} </Text>
                </Row>
                <Row justify="space-between" className="my-0">
                    <Text> Transaction Ref </Text>
                    <Text> {data.transactionRef} </Text>
                </Row>
            </Modal.Body>
        </Modal>
    )
}