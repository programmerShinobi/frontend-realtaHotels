import { UserAccount } from "@/lib/interfaces";
import { checkSecuredKey } from "@/redux/Actions/payment/userAccount";
import { Button, Input, Spacer, Text, useInput } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CheckSecuredKey({ data, setData, modalOpen, setModalOpen, type, onValidationSucceed }: {
    type: string,
    data: UserAccount | any,
    modalOpen?: boolean,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    setData: Dispatch<SetStateAction<UserAccount>>,
    onValidationSucceed: any
}) {
    const dispatch = useDispatch()
    const message = useSelector((state: any) => state.userAccountReducer.message)
    
    const { value, bindings } = useInput("")

    const validatePIN = (value: any) => {
        return value.match(/^\d+$/)
    };
    const isValid = validatePIN(value)

    useEffect(() => {
        setData({
            ...data,
            securedKey: value
        })
    }, [value])

    return (
        <>
            <Text> Input {type == "Fintech" ? "PIN" : "CVV"} Number </Text>
            <Input
                {...bindings}
                className="mt-4"
                aria-label={`input field for ${type == "Fintech" ? "PIN" : "CVV"} number`}
                maxLength={6}
                shadow={false}
                status={value ? (isValid ? "default" : "error") : "default"}
                color={value ? (isValid ? "default" : "error") : "default"}
                helperColor={value ? (isValid ? "default" : "error") : "default"}
                helperText={value ? (isValid ? "" : "Input must be a number!") : ""}
                placeholder={type == "Fintech" ? "PIN" : "CVV"}
            />
            <Button
                className="bg-black my-4 mt-5"
                onClick={() => {
                    dispatch(checkSecuredKey(data)),
                        onValidationSucceed(message)
                }}> Pay </Button >
            <Text> {message} </Text>
        </>
    )
}