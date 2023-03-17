import { ColumnsType } from "antd/es/table";
import { Button, Dropdown, Form, Menu, Modal, Select, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  doEditOrderHeader,
  doGetPurchaseOrder,
} from "@/redux/Actions/Purchasing/purchaseOrderActions";
import { useRouter } from "next/router";
import LayoutManager from '@/components/Layout/manager'

interface PurchaseOrder {
  poheid: number;
  ponumber: string;
  orderdate: string;
  vendortarget: string;
  linetotal: string;
  totalamount: number;
  pohestatus: number;
}

const purchaseOrder = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { purchaseOrder } = useSelector(
    (state: any) => state.purchaseOrderReducers
  );
  useEffect(() => {
    dispatch(doGetPurchaseOrder());
  }, [purchaseOrder]);

  //Hooks For Status Modal
  const [statusModal, setStatusModal] = useState(false);
  const [switchStatus, setSwitchStatus] = useState({
    poheId: 0,
    poheStatus: 0,
  });

  const handleCloseModal = () => {
    setStatusModal(false);
  };

  const handleMenuClick = (e: any, recordKey: any) => {
    if (e.key == "Status") {
      setStatusModal(true);
      const filterID = purchaseOrder.filter(
        (item: any) => item.poheid == recordKey
      );
      setSwitchStatus({
        poheId: recordKey,
        poheStatus: filterID[0].pohestatus,
      });
    }
    if (e.key == "Details") {
      router.push(
        {
          pathname: "/Purchasing/purchaseOrderDetail",
          query: { id: recordKey },
        },
        "/Purchasing/purchaseOrderDetail"
      );
    }
  };

  const onChangeStatus = (value: number) => {
    console.log(value);
    setSwitchStatus({ ...switchStatus, poheStatus: value });
  };

  const onFinish = () => {
    console.log(switchStatus);
    dispatch(doEditOrderHeader(switchStatus));
    setStatusModal(false);
  };

  const selectForStatus = [
    {
      value: 1,
      label: "Pending",
    },
    {
      value: 2,
      label: "Approve",
    },
    {
      value: 3,
      label: "Rejected",
    },
    {
      value: 4,
      label: "Received",
    },
    {
      value: 2,
      label: "Completed",
    },
  ];

  const PoColumn: ColumnsType<PurchaseOrder> = [
    {
      title: "PO Number",
      dataIndex: "ponumber",
      key: "ponumber",
    },
    {
      title: "PO Date",
      dataIndex: "orderdate",
      key: "orderdate",
      render(orderdate, record) {
        return <span>{record.orderdate.split("T")[0]}</span>;
      },
    },
    {
      title: "Vendor Target",
      dataIndex: "vendortarget",
      key: "vendortarget",
    },
    {
      title: "Line Items",
      dataIndex: "linetotal",
      key: "linetotal",
    },
    {
      title: "Total Amount",
      dataIndex: "totalamount",
      key: "totalamount",
    },
    {
      title: "Status",
      dataIndex: "pohestatus",
      key: "pohestatus",
      render(pohestatus, record) {
        return (
          <span>
            {record.pohestatus === 1
              ? "Pending"
              : record.pohestatus === 2
              ? "Approved"
              : record.pohestatus === 3
              ? "Rejected"
              : record.pohestatus === 4
              ? "Received"
              : "Completed"}
          </span>
        );
      },
    },
    {
      title: "Actions",
      key: "x",
      render(_, record) {
        const menu = (
          <Menu onClick={(e) => handleMenuClick(e, record.poheid)}>
            <Menu.Item key="Details">Details</Menu.Item>
            <Menu.Item key="Status">Switch Status</Menu.Item>
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
  return (
    <LayoutManager>
      {/* <h1 className="text-center font-bold m-8">Purchase Order</h1> */}
      <Table columns={PoColumn} dataSource={purchaseOrder} />
      <Modal
        title="Switch Status"
        open={statusModal}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form initialValues={switchStatus} onFinish={onFinish}>
          <Form.Item label="Status" name="poheStatus">
            <Select
              style={{ width: 120 }}
              options={selectForStatus}
              onChange={onChangeStatus}
            ></Select>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="bg-[#F33C5D] text-white hover:text-white-600 px-5 py-2.5 rounded hover:bg-[#c7354f]"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </LayoutManager>
  );
};

export default purchaseOrder;
