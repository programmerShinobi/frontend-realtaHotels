import { Button, Card, Col, Link, Row, Spacer, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserAccount } from "@/lib/interfaces";
import { money } from "@/lib/helper";
import FintechActivationModal from "./modals/fintechActivationModal";
import DompetDetailModal from "./modals/dompetDetailModal";

const FintechAccountCard = (props: {
    data: UserAccount[];
    carddata: UserAccount[];
    userid: any;
}) => {
    const { data, carddata, userid } = props

    const [isDompetActive, setIsDompetActive] = useState(false)
    const [isGotoActive, setIsGotoActive] = useState(false)

    const [activateDompetVisible, setActivateDompetVisible] = useState(false)
    const [activateGotoVisible, setActivateGotoVisible] = useState(false)
    const [dompetDetailVisible, setDompetDetailVisible] = useState(false)

    const dompet = data?.find((item: UserAccount) => item.paymentName == 'Dompet Realta')
    const goto = data?.find((item: UserAccount) => item.paymentName == 'GoTo')

    const router = useRouter()

    useEffect(() => {
        dompet ? setIsDompetActive(true) : setIsDompetActive(false)
        goto ? setIsGotoActive(true) : setIsGotoActive(false)
    }, [dompet, goto])

    const activateButton = (type: string) => {
        return type == 'dompet' ?
            (<Button color={"error"} onPress={() => setActivateDompetVisible(true)}> Activate </Button>) :
            (<Button color={"error"} onPress={() => setActivateGotoVisible(true)}> Link account </Button>)
    }

    const showBalance = (data: any) => {
        return (
            <div id="card-amt" className="w-32">
                <Text>
                    Balance
                </Text>
                <Text>
                    {money(data?.balance)}
                </Text>
            </div>
        )
    }

    return (
        <>
            <Card
                key="dompet"
                variant="bordered"
                isPressable
                onClick={() => setDompetDetailVisible(true)}>
                <Card.Header>
                    <Row className="justify-between">
                        <Col id="card-det">
                            <Text b size={18}>
                                Dompet Realta
                            </Text>
                            <Text size={14}>
                                {dompet?.accountNumber}
                            </Text>
                        </Col>
                        {!isDompetActive ? activateButton('dompet') : showBalance(dompet)}
                    </Row>
                </Card.Header>
            </Card>
            <Spacer y={0.5} />
            <Card key="goto" variant="bordered" className="mt-3">
                <Card.Header>
                    <Row className="justify-between">
                        <Col id="card-det">
                            <Text b size={18}>
                                GoTo
                            </Text>
                            <Text size={14}>
                                {goto?.accountNumber}
                            </Text>
                        </Col>
                        {!isGotoActive ? activateButton('goto') : showBalance(goto)}
                    </Row>
                </Card.Header>
            </Card>

            {
                activateDompetVisible &&
                <FintechActivationModal
                    type='Dompet Realta'
                    modalOpen={activateDompetVisible}
                    setModalOpen={setActivateDompetVisible}
                    setFintechActive={setIsDompetActive}
                    userid={userid}
                />
            }
            {
                activateGotoVisible &&
                <FintechActivationModal
                    type='GoTo'
                    modalOpen={activateGotoVisible}
                    setModalOpen={setActivateGotoVisible}
                    setFintechActive={setIsGotoActive}
                    userid={userid}
                />
            }

            {
                isDompetActive &&
                <DompetDetailModal
                    modalOpen={dompetDetailVisible}
                    setModalOpen={setDompetDetailVisible}
                    dompetdata={dompet}
                    carddata={carddata}
                />
            }
        </>
    )
}

export default FintechAccountCard