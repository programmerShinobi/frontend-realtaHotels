import { Input, useInput } from "@nextui-org/react";
import { useEffect } from "react"

export default function SetPinNumber({ setValidInput }: any) {
    const { value, bindings } = useInput("");

    const validatePIN = (value: any) => {
        return value.match(/^\d{6}$/)
    };

    const validInput = validatePIN(value)?.toString()

    useEffect(() => {
        validInput ? setValidInput(validInput) : setValidInput(validInput)
    }, [value])

    return (
        <Input
            {...bindings}
            maxLength={6}
            shadow={false}
            status={value ? (validInput ? "default" : "error") : "default"}
            color={value ? (validInput ? "default" : "error") : "default"}
            helperColor={value ? (validInput ? "default" : "error") : "default"}
            helperText={value ? (validInput ? "" : "Input must be a 6 digits number!") : ""}
            placeholder="PIN"
        />
    )
}