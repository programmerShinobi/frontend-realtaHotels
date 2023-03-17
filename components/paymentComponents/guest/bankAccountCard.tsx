import { useState } from "react";
import { Card, Col, Row, Spacer, Text } from "@nextui-org/react";
import { UserAccount } from "@/lib/interfaces";
import { maskCardNumber } from "@/lib/helper";
import CardDetailModal from "./modals/cardDetailModal";

const BankAccountCard = (props: {
    data: UserAccount[];
    userid: number;
}) => {
    const { data, userid } = props
    const [cardDetailVisible, setCardDetailVisible] = useState(false)
    const [cardDetail, setCardDetail] = useState({
        userId: userid,
        fullName: "",
        paymentType: "",
        paymentName: "",
        accountNumber: "",
        cardHolderName: "",
        balance: 0,
        expMonth: 0,
        expYear: 0,
        securedKey: "",
    })

    return (
        <>
            {
                data?.map((item: UserAccount) => {
                    return (
                        <>
                            <Card
                                className="mt-3"
                                variant="bordered"
                                key={item.accountNumber}
                                isPressable
                                onClick={() => {
                                    setCardDetailVisible(!cardDetailVisible),
                                        setCardDetail({
                                            ...item,
                                        })
                                }}>
                                <Card.Header>
                                    <Row className="justify-between">
                                        <Col id="card-det">
                                            <Text b size={18}>
                                                {maskCardNumber(item.accountNumber)}
                                            </Text>
                                            <Text size={14}>
                                                {item.cardHolderName}
                                            </Text>
                                        </Col>
                                        <div id="card-type" className="w-64 text-right">
                                            <Text>
                                                {item.paymentName}
                                            </Text>
                                            <Text>
                                                {item.paymentType}
                                            </Text>
                                        </div>
                                    </Row>
                                </Card.Header>
                                <CardDetailModal
                                    modalOpen={cardDetailVisible}
                                    setModalOpen={setCardDetailVisible}
                                    data={cardDetail} />
                            </Card>
                            <Spacer y={0.5} />
                        </>
                    )
                })
            }
        </>
    )
}

export default BankAccountCard