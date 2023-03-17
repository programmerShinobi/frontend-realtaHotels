import { useState, useEffect, useMemo, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Button,
	Col,
	Container,
	Table,
	Tooltip,
	Spacer,
	Input,
	FormElement,
	Row,
} from "@nextui-org/react";
import FintechModal from "../modals/FintechModal";
import { DeleteIcon } from "../icon/deleteIcon";
import { EditIcon } from "../icon/editIcon";
import { IconButton } from "../icon/iconbutton";
import { fetchFintech, deleteFintech } from "@/redux/Actions/payment/fintech";
import { Fintech } from "@/lib/interfaces";
import { fintechColumns } from "@/lib/columns";

export default function FintechTable({ data }: {
	data: Fintech[]
}) {
	const dispatch = useDispatch();

	const [searchValue, setSearchValue] = useState("");
	const [addModalVisible, setAddModalVisible] = useState(false);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [modalData, setModalData] = useState<Fintech>({
		pagaEntityId: 0,
		pagaCode: "",
		pagaName: "",
		pagaModifiedDate: "",
	});

	const filteredData = useMemo(() => {
		if (!searchValue) return data;
		return data.filter((item: any) => {
			return Object.values(item).some((value) =>
				String(value).toLowerCase().includes(searchValue.toLowerCase())
			);
		});
	}, [data, searchValue]);

	const renderCell = (item: any, columnKey: React.Key) => {
		const cellValue = item[columnKey]
		if (columnKey == "actions") {
			return (
				<Row align="center" justify="center">
					<Tooltip
						content="Edit">
						<IconButton onClick={() => { setEditModalVisible(true), setModalData(item) }} >
							<EditIcon size={20} fill="#979797" />
						</IconButton>
					</Tooltip>
					<Spacer />
					<Tooltip
						content="Delete"
						color="error">
						<IconButton onClick={() => dispatch(deleteFintech(item))}>
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
		<Container>
			<Row justify="space-between">
				<Input
					bordered
					className="h-10"
					color="default"
					shadow={false}
					type="search"
					onChange={(e: ChangeEvent<FormElement>) => setSearchValue(e.target.value)}
					labelPlaceholder="Search" />
				<Button
					onPress={() => setAddModalVisible(true)}> Add </Button>
			</Row>
			<Spacer />
			<Table
				aria-label="All fintech"
				className="table-fixed"
				shadow={false}
				animated={false}>
				<Table.Header columns={fintechColumns}>
					{(column: any) => (
						<Table.Column
							key={column.uid}>
							{column.uid == "actions" ? "" : column.name}
						</Table.Column>
					)}
				</Table.Header>
				<Table.Body items={filteredData}>
					{(item: Fintech) => (
						<Table.Row
							key={item.pagaCode}
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
				<Table.Pagination
					animated={false}
					shadow
					noMargin
					align="center"
					rowsPerPage={10}
				/>
			</Table>
			<FintechModal
				type="Edit"
				modalOpen={editModalVisible}
				setModalOpen={setEditModalVisible}
				data={modalData}
			/>

			<FintechModal
				type="Add"
				modalOpen={addModalVisible}
				setModalOpen={setAddModalVisible}
			/>

		</Container>
	);
}
