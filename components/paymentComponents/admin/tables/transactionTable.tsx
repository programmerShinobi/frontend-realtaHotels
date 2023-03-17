import { Container, FormElement, Table, Text, Input, Spacer, Dropdown, Row, Pagination } from "@nextui-org/react";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { transactionColumns } from "@/lib/columns";
import { PaginationOptions, Transaction } from "@/lib/interfaces";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "@/redux/Actions/payment/transaction";

export default function TransactionTable({ data, totalPage, paginationOptions, setPaginationOptions }: {
    data: Transaction[],
    totalPage: number,
    paginationOptions: any,
    setPaginationOptions: (options: PaginationOptions) => void
}) {
    const [page, setPage] = useState(1)
    const [searchValue, setSearchValue] = useState("")
    const [selectedDateRange, setSelectedDateRange] = useState("date")
    const [selectedTransactionType, setSelectedTransactionType] = useState("transaction type")

    useEffect(() => {
        setPaginationOptions({
            ...paginationOptions,
            page: page,
        })
    }, [page])

    useEffect(() => {
        selectedTransactionType !== "transaction type" ?
            setPaginationOptions({
                ...paginationOptions,
                keyword: {
                    transactionType: selectedTransactionType,
                }
            }) :
            setPaginationOptions({
                ...paginationOptions,
                keyword: {
                    transactionNumber: searchValue,
                    orderNumber: searchValue,
                    userFullName: searchValue
                }
            })

        selectedDateRange !== "date" ?
            setPaginationOptions({
                ...paginationOptions,
                keyword: {
                    timestamp: selectedDateRange
                }
            }) : null
    }, [selectedTransactionType, searchValue, selectedDateRange])

    return (
        <div className="w-[100%]">
            <Row justify="space-between">
                <Input
                    bordered
                    className="h-10"
                    color="default"
                    shadow={false}
                    type="search"
                    onChange={(e: ChangeEvent<FormElement>) => setSearchValue(e.target.value)}
                    labelPlaceholder="Search" />
                <Dropdown disableAnimation>
                    <Dropdown.Button flat color="default" className="h-10 w-[200px] capitalize">
                        {selectedDateRange !== "date" ? `Last ${selectedDateRange}` : "date"}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        variant="solid"
                        aria-label="Single selection actions"
                        color="primary"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedDateRange}
                        onSelectionChange={(value: any) => setSelectedDateRange(value.currentKey)}>
                        <Dropdown.Item key="30 days"> Last 30 days </Dropdown.Item>
                        <Dropdown.Item key="60 days"> Last 60 days </Dropdown.Item>
                        <Dropdown.Item key="90 days"> Last 90 days </Dropdown.Item>
                        <Dropdown.Item key="date" color="error" withDivider> Reset selection </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown disableAnimation>
                    <Dropdown.Button flat color="default" className="h-10 w-[200px] capitalize">
                        {selectedTransactionType}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        variant="solid"
                        aria-label="Single selection actions"
                        color="primary"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedTransactionType}
                        onSelectionChange={(value: any) => setSelectedTransactionType(value.currentKey)}>
                        <Dropdown.Item key="TP "> Top Up </Dropdown.Item>
                        <Dropdown.Item key="ORM"> Order Menu </Dropdown.Item>
                        <Dropdown.Item key="TRB"> Booking Order </Dropdown.Item>
                        <Dropdown.Item key="RPY"> Repayment </Dropdown.Item>
                        <Dropdown.Item key="RF "> Refund </Dropdown.Item>
                        <Dropdown.Item key="transaction type" color="error" withDivider> Reset selection </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Row>
            <Spacer />
            <Table
                className="table-fixed"
                shadow={false}
                animated={false}
                aria-label="All user's transactions">
                <Table.Header columns={transactionColumns}>
                    {
                        (column: any) => (
                            <Table.Column
                                key={column.uid}>
                                {column.name} </Table.Column>
                        )
                    }
                </Table.Header>
                <Table.Body items={data}>
                    {(item: any) => (
                        <Table.Row
                            key={item.transactionId}
                            css={{
                                wordWrap: "break-word"
                            }}>
                            {
                                (columnKey: any) =>
                                    <Table.Cell css={{ whiteSpace: "normal", fontSize: "$sm" }}>
                                        {item[columnKey]}
                                    </Table.Cell>
                            }
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
            <Spacer />
            <Pagination
                onChange={(page) => setPage(page)}
                animated={false}
                total={totalPage}
                initialPage={1} />
            <Spacer />
        </div>
    );
}
