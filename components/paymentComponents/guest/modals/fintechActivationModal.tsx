import { Text, Button, Input, Modal, } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SetPinNumber from "../setPinNumber";
import { createAccount } from "@/redux/Actions/payment/userAccount";

export default function FintechActivationModal({ modalOpen, setModalOpen, setFintechActive, userid, type }: {
    modalOpen: any,
    setModalOpen: any,
    setFintechActive?: any,
    userid: number,
    type: string
}) {
    const dispatch = useDispatch()

    const [validInput, setValidInput] = useState("")
    const [activateFintechData, setActivateFintechData] = useState({
        userId: userid,
        paymentType: 'Fintech',
        paymentName: type,
        securedKey: "",
        balance: 0
    })

    useEffect(() => {
        setActivateFintechData({
            ...activateFintechData,
            userId: userid,
            securedKey: validInput,
        })
    }, [validInput])

    const handlePinValid = (validInput: string) => {
        setValidInput(validInput)
    }

    const activate = () => {
        if (validInput) {
            dispatch(createAccount(activateFintechData))
            setModalOpen(!modalOpen)
            setFintechActive ? setFintechActive(true) : null
        }
    }

    return (
        <>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                blur
                closeButton>
                <Modal.Header >
                    <Text>
                        Set your {type} PIN number! :)
                    </Text>
                </Modal.Header>
                <Modal.Body className="h-20">
                    {type == 'GoTo' ?
                        (<Input
                            label="Balance"
                            type="number"
                            onChange={(e: any) => setActivateFintechData({ ...activateFintechData, balance: +e.target?.value })}
                        />
                        ) : null}
                    <SetPinNumber setValidInput={handlePinValid} />
                </Modal.Body>
                <Modal.Footer>
                    <Button className="bg-black" onPress={activate}> Set PIN </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}