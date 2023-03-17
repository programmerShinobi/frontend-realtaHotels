import LayoutManager from '@/components/Layout/manager'
import { ColumnsType } from "antd/es/table";
import { Col, Form, Input, Modal, Row, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doGetPurchaseOrderDetail } from "@/redux/Actions/Purchasing/purchaseOrderActions";

interface OrderDetail {
  headerid: number;
  podeid: number;
  stockname: string;
  stockquantity: number;
  stockprice: string;
  receiveqty: number;
  rejectqty: number;
  linetotal: number;
}

const purchaseOrderDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { purchaseOrder, purchaseOrderDetail } = useSelector(
    (state: any) => state.purchaseOrderReducers
  );
  useEffect(() => {
    dispatch(doGetPurchaseOrderDetail());
  }, []);

  const [editDetails, setEditDetails] = useState({
    stockName: "",
    podeId: 0,
    podeOrderQty: 0,
    podeReceivedQty: 0,
    podeRejectedQty: 0,
  });
  const [podeId, setPodeId] = useState(0)
  // Hooks For Modal Edit Details
  const [modalEditDetails, setModalEditDetails] = useState(false);
  //Filter Every Data By ID that give from Purchase Order
  const dataFiltered = purchaseOrderDetail.filter(
    (item: any) => item.headerid == id
  );
  //Filter For Header Of Purchase Order
  const orderHeader = purchaseOrder.filter((item: any) => item.poheid == id);

  const editFilter = purchaseOrderDetail.find((item:any)=> item.podeid == podeId)
  const handleCloseModal = () => {
    setModalEditDetails(false);
  };
  //EditButton
  const EditButton = (value: any) => {
    setModalEditDetails(true);
    setPodeId(value)
  };

  const detailColumn: ColumnsType<OrderDetail> = [
    {
      title: "Stock Name",
      dataIndex: "stockname",
      key: "stockname",
    },
    {
      title: "Qty",
      dataIndex: "stockquantity",
      key: "stockquantity",
    },
    {
      title: "Price",
      dataIndex: "stockprice",
      key: "stockprice",
    },
    {
      title: "Receive Qty",
      dataIndex: "receiveqty",
      key: "receiveqty",
    },
    {
      title: "Reject Qty",
      dataIndex: "rejectqty",
      key: "rejectqty",
    },
    {
      title: "Total",
      dataIndex: "linetotal",
      key: "linetotal",
    },
    {
      title: "Actions",
      key: "x",
      render(_, record) {
        return (
          <div className="flex justify-between">
            <p
              className="hover:text-blue-500 cursor-pointer"
              onClick={() => EditButton(record.podeid)}
            >
              <EditOutlined />
            </p>
            <p>
              <DeleteOutlined />
            </p>
          </div>
        );
      },
    },
  ];
  return (
    <LayoutManager>
      <div className="rounded-lg bg-white m-8">
        <Row gutter={[32, 32]}>
          <Col span={8}>
            <h1>PO Number:{orderHeader[0]?.ponumber}</h1>
          </Col>
          <Col span={8}>
            <h1>Vendor Name : {orderHeader[0]?.vendortarget}</h1>
          </Col>
          <Col span={8}>
            <h1>Subtotal :{orderHeader[0]?.totalamount}</h1>
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          <Col span={8}>
            <h1>PO Date: {orderHeader[0]?.orderdate.split("T")[0]}</h1>
          </Col>
          <Col span={8}>
            <h1>
              Status :{" "}
              {orderHeader[0]?.pohestatus === 1
                ? "Pending"
                : orderHeader[0]?.pohestatus === 2
                ? "Approved"
                : orderHeader[0]?.pohestatus === 3
                ? "Rejected"
                : orderHeader[0]?.pohestatus === 4
                ? "Received"
                : "Completed"}
            </h1>
          </Col>
          <Col span={8}>
            <h1>Total Amount : {orderHeader[0]?.totalamount}</h1>
          </Col>
        </Row>
      </div>

      <Table columns={detailColumn} dataSource={dataFiltered} />
      <Modal
        title="Edit Order Details"
        onCancel={handleCloseModal}
        open={modalEditDetails}
        footer={null}
      >
        <Form initialValues={editFilter}>
          <Form.Item name="stockname" label="Stock Name">
            <Input />
          </Form.Item>
          <Form.Item name="stockquantity" label="Qty">
            <Input />
          </Form.Item>
          <Form.Item name="rejectqty" label="Rejected Qty">
            <Input />
          </Form.Item>
          <Form.Item name="receiveqty" label="Received Qty">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </LayoutManager>
  );
};

export default purchaseOrderDetail;
