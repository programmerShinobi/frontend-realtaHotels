import { Bank, UserAccount } from "@/lib/interfaces"
import { Dropdown, FormElement, Grid, Input, Row, Spacer, Text } from "@nextui-org/react"
import { useState, useEffect, ChangeEvent } from "react"

export default function AddCard({ userid, bankdata, cardData, onCardDataChange }: {
    userid: number,
    bankdata: Bank[],
    cardData: any
    onCardDataChange: any
}) {

    return (
        <Grid.Container gap={1} justify="space-evenly" aria-label="grid container of modal contents">
            <Grid aria-label="grid section: choose account type">
                <Text aria-label="text: account type"> Account type </Text>
                <Dropdown>
                    <Dropdown.Button
                        aria-label="dropdown-button: payment types"
                        flat color="error">
                        {cardData?.paymentType == "Fintech" ? "Debit Card" : cardData?.paymentType}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="dropdown: single selection to choose payment type"
                        color="error"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={cardData?.paymentType}
                        onSelectionChange={(value: any) => onCardDataChange({ ...cardData, paymentType: value.currentKey })}>
                        <Dropdown.Item
                            aria-label="debit card dropdown item"
                            key="Debit Card"
                        >Debit Card</Dropdown.Item>
                        <Dropdown.Item
                            aria-label="credit card dropdown item"
                            key="Credit Card"
                        >Credit Card</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Grid>

            <Grid aria-label="grid section: choose bank bane">
                <Text aria-label="text: bank name"> Bank name </Text>
                <Dropdown>
                    <Dropdown.Button aria-label="dropdown: single selection to choose bank name"
                        flat color="error">
                        {cardData?.paymentName == "Dompet Realta" ? "PT Bank" : cardData?.paymentName}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="dropdown: single selection to choose bank name"
                        color="error"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={cardData?.paymentName}
                        onSelectionChange={(value: any) => onCardDataChange({ ...cardData, paymentName: value.currentKey })}>
                        {
                            bankdata?.map((item: Bank) => (
                                <Dropdown.Item key={item.bankName}> {item.bankName} </Dropdown.Item>
                            ))
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </Grid>

            <Grid aria-label="grid section: input card number">
                <Text aria-label="text: card number"> Card number </Text>
                <Input shadow={false} width="160px" aria-label="input field for card number"
                    onChange={(e: ChangeEvent<FormElement>) => onCardDataChange({ ...cardData, accountNumber: e.target.value })} />
            </Grid>

            <Grid aria-label="grid section: input card holder name">
                <Text aria-label="text: card holder name"> Card holder name </Text>
                <Input shadow={false} width="160px" aria-label="input field for card holder name"
                    onChange={(e: ChangeEvent<FormElement>) => onCardDataChange({ ...cardData, cardHolderName: e.target.value })} />
            </Grid>

            <Grid aria-label="grid section: card expiry date">
                <Text aria-label="text: expiry date"> Expiry date </Text>
                <Row aria-label="input section: card expiry date with MM and YY format">
                    <Input shadow={false} width="60px" placeholder="MM"
                        onChange={(e: ChangeEvent<FormElement>) => onCardDataChange({ ...cardData, expMonth: +e.target.value })} />
                    <Spacer />
                    <Input shadow={false} width="60px" placeholder="YY"
                        onChange={(e: ChangeEvent<FormElement>) => onCardDataChange({ ...cardData, expYear: +e.target.value })} />
                </Row>
            </Grid>

            <Grid aria-label="grid section: card CVV">
                <Text aria-label="text: card cvv"> CVV </Text>
                <Input shadow={false} type="number" width="64px" aria-label="input field for card CVV"
                    onChange={(e: ChangeEvent<FormElement>) => onCardDataChange({ ...cardData, securedKey: e.target.value })} />
            </Grid>

            <Grid aria-label="grid section: card balance">
                <Text aria-label="text: balance"> Balance </Text>
                <Input shadow={false} type="number" width="160px" aria-label="input field for card balance"
                    onChange={(e: ChangeEvent<FormElement>) => onCardDataChange({ ...cardData, balance: +e.target.value })} />
            </Grid>
        </Grid.Container>
    )
}