import {
  createVendor,
  deleteVendor,
  getVendorRequest,
} from "@/redux/Actions/Purchasing/vendorActions";
import { MoreOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Menu,
  MenuProps,
  Modal,
  Row,
  Space,
} from "antd";
import { Dropdown, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditModals from "./editModal";
import LayoutAdmin from '@/components/Layout/admin/'
interface Vendors {
  vendorEntityId: number;
  vendorName: string;
  vendorActive: string;
  vendorPriority: string;
  vendorRegisterDate: string;
  vendorWeburl: string;
}
const { Search } = Input;
const { Option } = Select;

const Vendor = () => {
  const { vendors } = useSelector((state: any) => state.vendorReducers);
  const dateFormat = "YYYY/MM/DD";
  const dispatch = useDispatch();
  const router = useRouter();

  const [diplayModal, setDisplayModal] = useState(false);
  const [displayModalEdit, setDisplayModalEdit] = useState(false);
  const [idVendor, setIdVendor] = useState(0);
  const [dataSearched, setDataSearched] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);

  const closeModalDelete = () => {
    setModalDelete(false);
  };
  const openModal = () => {
    setDisplayModal(true);
  };

  const closeModal = () => {
    setDisplayModal(false);
    setDisplayModalEdit(false);
  };

  const handleClose = (data: boolean) => {
    setDisplayModalEdit(data);
  };

  const onSearch = (value: any) => {
    const dataFilter = vendors.filter((item: any) => {
      const values = Object.values(item).map((x: any) =>
        x.toString().toLowerCase()
      );
      return values.some((x) => x.includes(value.toLowerCase()));
    });
    setDataSearched(dataFilter);
  };
  const dataTable = dataSearched.length > 0 ? dataSearched : vendors;

  const editModal = (id: number) => {
    console.log(id);
    setDisplayModalEdit(true);
    setIdVendor(id);
  };

  useEffect(() => {
    dispatch(getVendorRequest());
  }, []);

  const onChangeSelect = (values: string) => {
    console.log(values);
  };

  const onFinish = (values: any) => {
    const value = {
      ...values,
      vendorRegisterDate: values["vendorRegisterDate"].format("YYYY-MM-DD"),
    };
    console.log(value);
    dispatch(createVendor(value));
    setDisplayModal(false);
  };

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(dateString);
  };

  const confirmDeleteVendor = () => {
    console.log(idVendor);
    dispatch(deleteVendor(idVendor));
    setModalDelete(false);
  };
  const customFormat: DatePickerProps["format"] = (value) =>
    `${value.format(dateFormat)}`;

  const vendorPriorities = [
    {
      value: "1",
      label: "Highest",
    },
    {
      value: "0",
      label: "Lowest",
    },
  ];
  const vendorStatus = [
    {
      value: "1",
      label: "Active",
    },
    {
      value: "0",
      label: "Inactive",
    },
  ];
  const vendorRow: ColumnsType<Vendors> = [
    {
      title: "ID",
      dataIndex: "vendorEntityId",
      key: "vendorEntityId",
    },
    {
      title: "Vendor",
      dataIndex: "vendorName",
      key: "vendorName",
    },
    {
      title: "Status",
      dataIndex: "vendorActive",
      key: "vendorActive",
      render(vendorActive, record) {
        return (
          <span>{record.vendorActive === "1" ? "Active" : "Inactive"}</span>
        );
      },
    },
    {
      title: "Priority",
      dataIndex: "vendorPriority",
      key: "vendorPriority",
      render(vendorPriority, record) {
        return (
          <span>{record.vendorPriority === "1" ? "Highest" : "Lowest"}</span>
        );
      },
    },
    {
      title: "Register At.",
      dataIndex: "vendorRegisterDate",
      key: "vendorRegisterDate",
      render(vendorRegisterDate, record) {
        return <span>{record.vendorRegisterDate.split("T")[0]}</span>;
      },
    },
    {
      title: "URL",
      dataIndex: "vendorWeburl",
      key: "vendorWeburl",
    },
    {
      title: "Actions",
      key: "x",
      render(_, record) {
        const menu = (
          <Menu onClick={(e) => handleMenuClick(e, record.vendorEntityId)}>
            <Menu.Item key="Edit">Edit</Menu.Item>
            <Menu.Item key="Add">Add Item Product</Menu.Item>
            <Menu.Item key="Delete">Delete</Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <MoreOutlined />
            </a>
          </Dropdown>
        );
      },
    },
  ];

  const handleMenuClick = (e: any, recordKey: any) => {
    console.log(`Clicked ${e.key} for record with key ${recordKey}`);
    if (e.key == "Edit") {
      editModal(recordKey);
    }
    if (e.key == "Add") {
      router.push(
        {
          pathname: "/admin/purchasing/addProductVendor",
          query: { id: recordKey },
        },
        "/admin/purchasing/addProductVendor"
      );
    }
    if (e.key == "Delete") {
      setModalDelete(true);
      setIdVendor(recordKey);
    }
  };

  return (
    <LayoutAdmin>
      <h5 className="font-bold text-center">Vendor List</h5>
      <div className="flex justify-between m-8">
        <button
          className="bg-[#3C6FF3] w-40 rounded text-white hover:bg-[#274799]"
          onClick={openModal}
        >
          Add New Vendors
        </button>
        <Search
          placeholder="Search Vendor Name"
          className="w-96 center"
          onSearch={onSearch}
        />
      </div>
      <Table columns={vendorRow} dataSource={dataTable} />
      <Modal
        title="New/Edit Vendor"
        open={diplayModal}
        onCancel={closeModal}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={[32, 32]}>
            <Col>
              <Form.Item label="Vendor Name" name="vendorName">
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="vendorRegisterDate" label="Register Date">
                <DatePicker onChange={onChangeDate} format={customFormat} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 32]}>
            <Col>
              <Form.Item name="vendorPriority" label="Priority">
                <Select
                  style={{ width: 120 }}
                  placeholder=""
                  options={vendorPriorities}
                  onChange={onChangeSelect}
                ></Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="vendorActive" label="Status">
                <Select
                  style={{ width: 120 }}
                  placeholder=""
                  options={vendorStatus}
                ></Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Form.Item name="vendorWeburl" label="Vendor URL">
              <Input />
            </Form.Item>
          </Row>
          <Form.Item>
            <button
              type="submit"
              className="bg-[#F33C5D] text-white hover:text-white-600 px-5 py-2.5 rounded hover:bg-[#c7354f]"
            >
              Save
            </button>
          </Form.Item>
        </Form>
      </Modal>
      {displayModalEdit ? (
        <EditModals
          show={displayModalEdit}
          onCancel={closeModal}
          handleClose={handleClose}
          id={idVendor}
          data={vendors}
        />
      ) : null}
      <Modal
        title="Delete Vendor"
        open={modalDelete}
        onCancel={closeModalDelete}
        footer={null}
      >
        <p className="mb-4">Are You Sure Want To Delete This Vendor?</p>
        <Space>
          <Row gutter={[16, 16]}>
            <Col>
              <button
                type="button"
                className="px-5 py-2.5 rounded bg-blue-600 text-white"
                onClick={confirmDeleteVendor}
              >
                Yes
              </button>
            </Col>
            <Col>
              <button
                type="button"
                className="bg-[#F33C5D] text-white hover:text-white-600 px-5 py-2.5 rounded"
                onClick={closeModalDelete}
              >
                Cancel
              </button>
            </Col>
          </Row>
        </Space>
      </Modal>
    </LayoutAdmin>
  );
};

export default Vendor;
