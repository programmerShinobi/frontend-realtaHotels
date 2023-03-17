import { useState, useMemo, ChangeEvent, Dispatch, SetStateAction, useEffect } from "react"
import { useDispatch } from "react-redux";
import { Button, Col, Container, Row, Table, Tooltip, Spacer, Input, FormElement, Text, Pagination, Modal } from "@nextui-org/react";
import { IconButton } from "../icon/iconbutton";
import { DeleteIcon } from "../icon/deleteIcon";
import { EditIcon } from "../icon/editIcon";
import { deleteBank, fetchBanks } from "@/redux/Actions/payment/bank";
import { Bank, PaginationOptions } from "@/lib/interfaces";
import { bankColumns } from "@/lib/columns";
import BankModal from "../modals/BankModal";

export default function BankTable({ data, totalPage, paginationOptions, setPaginationOptions }: {
    data: Bank[],
    totalPage: number,
    paginationOptions: any,
    setPaginationOptions: (options: PaginationOptions) => void
}) {
    const dispatch = useDispatch()

    const [page, setPage] = useState(1)
    const [searchValue, setSearchValue] = useState("")
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [modalData, setModalData] = useState<Bank>(
        {
            bankEntityId: 0,
            bankCode: "",
            bankName: "",
            bankModifiedDate: ""
        })

    useEffect(() => {
        setPaginationOptions({
            ...paginationOptions,
            keyword: searchValue,
            page: page,
        })
    }, [searchValue, page])

    const renderCell = (item: any, columnKey: React.Key) => {
        const cellValue = item[columnKey]
        if (columnKey == "actions") {
            return (
                <Row align="center" justify="center">
                    <Tooltip
                        animated={false}
                        shadow={false}
                        content="Edit">
                        <IconButton onClick={() => { setEditModalVisible(true), setModalData(item) }} >
                            <EditIcon size={20} fill="#979797" />
                        </IconButton>
                    </Tooltip>
                    <Spacer />
                    <Tooltip
                        animated={false}
                        shadow={false}
                        content="Delete"
                        color="error">
                        <IconButton onClick={() => dispatch(deleteBank(item))}>
                            <DeleteIcon size={20} fill="#FF0080" />
                        </IconButton>
                    </Tooltip>
                </Row>
            )
        }
        return (
            <Row>
                {cellValue}
            </Row>
        )
    }

    return (
        <div className="w-[100%]">
            <Row justify="space-between">
                <Input
                    className="h-10"
                    color="default"
                    shadow={false}
                    type="search"
                    onChange={(e: ChangeEvent<FormElement>) => setSearchValue(e.target.value)}
                    labelPlaceholder="Search" />
                <Button onPress={() => setAddModalVisible(true)}> Add </Button>
            </Row>
            <Spacer />
            <Table
                aria-label="All banks"
                className="table-fixed"
                shadow={false}
                animated={false}>
                <Table.Header columns={bankColumns}>
                    {
                        (column: any) => (
                            <Table.Column
                                key={column.uid}>
                                {column.uid == "actions" ? "" : column.name}
                            </Table.Column>
                        )
                    }
                </Table.Header>
                <Table.Body items={data}>
                    {(item: Bank) => (
                        <Table.Row
                            key={item.bankCode}
                            css={{
                                wordWrap: "break-word"
                            }}>
                            {
                                (columnKey: any) =>
                                    <Table.Cell css={{ whiteSpace: "normal", fontSize: "$sm" }}>
                                        {renderCell(item, columnKey)}
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

            <BankModal
                type="Add"
                modalOpen={addModalVisible}
                setModalOpen={setAddModalVisible}
            />
            <BankModal
                type="Edit"
                modalOpen={editModalVisible}
                setModalOpen={setEditModalVisible}
                data={modalData}
            />
        </div >
    )
}