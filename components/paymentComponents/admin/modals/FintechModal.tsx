import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal, Input, Row, Checkbox, Button, Text, FormElement } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { insertFintech, updateFintech } from "@/redux/Actions/payment/fintech";
import { Fintech } from "@/lib/interfaces";

export default function FintechModal({ type, modalOpen, setModalOpen, data }: {
    type: string,
    modalOpen: boolean,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    data?: Fintech | any
}) {
    /** For improvements..
     * TODO: Show alert after saving data => user checks inputted data
    */
    const dispatch = useDispatch()
    const [fintechData, setFintechData] = useState({
        pagaEntityId: 0,
        pagaName: "",
        pagaCode: "",
        pagaModifiedDate: ""
    })

    useEffect(() => {
        setFintechData({
            ...fintechData,
            pagaEntityId: data?.pagaEntityId,
            pagaModifiedDate: new Date().toISOString()
        })
    }, [])

    const updateData = (data: Fintech) => {
        setModalOpen(!modalOpen)
        dispatch(updateFintech(data))
    }

    const addData = (data: Fintech) => {
        setModalOpen(!modalOpen)
        dispatch(insertFintech(data))
    }

    return (
        <Modal
            closeButton
            blur
            aria-labelledby="modal-title"
            open={modalOpen}
            onClose={() => setModalOpen(false)}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    {type} <span />
                    <Text b size={18}>
                        Fintech
                    </Text>
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="default"
                    size="lg"
                    label="Fintech code"
                    placeholder={data ? data?.pagaCode : "Fintech code"}
                    onChange={(e: ChangeEvent<FormElement>) => setFintechData({
                        ...fintechData,
                        pagaCode: e.target.value
                    })}
                />
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="default"
                    size="lg"
                    label="Fintech name"
                    placeholder={data ? data?.pagaName : "Fintech name"}
                    onChange={(e: ChangeEvent<FormElement>) => setFintechData({
                        ...fintechData,
                        pagaName: e.target.value
                    })}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    auto
                    flat
                    color="error"
                    onPress={() => data ? updateData(fintechData) : addData(fintechData)}>
                    {data ? "Save" : "Add"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
