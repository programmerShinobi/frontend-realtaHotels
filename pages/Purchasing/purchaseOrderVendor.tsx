import { Table, Modal, Button, Select, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";

interface DataType {
  purchasingNumber: string;
  status: string;
  orderDate: string;
  totalRefund: number;
  subtotal: number;
  paymentType: string;
  arrivaleDate: string;
  total: number;
  employeeName: string;
  vendorName: string;
}

interface orderDetail {
  podePoheId: number;
  podeOrderQty: number;
  podePrice: number;
  podeLineTotal: number;
  podeReceivedQty: number;
  podeRejectedQty: number;
  podeStockedQty: number;
  podeStockId: number;
}
const purchaseOrderVendor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const showModal2 = () => {
    setOpenModal(true);
  };
  const closeModal2 = () => {
    setOpenModal(false);
  };
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const closeModal1 = () => {
    setIsModalOpen1(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const detailColumn: ColumnsType<orderDetail> = [
    { title: "Order Header ID", dataIndex: "podePoheId", key: "podePoheID" },
    { title: "Order Quantity", dataIndex: "podeOrderQty", key: "podeOrderQty" },
    { title: "Price", dataIndex: "podePrice", key: "podePrice" },
    { title: "Line Total", dataIndex: "podeLineTotal", key: "podeLineTotal" },
    { title: "Received", dataIndex: "podeReceivedQty", key: "podeReceivedQty" },
    { title: "Rejected", dataIndex: "podeRejectedQty", key: "podeRejectedQty" },
    { title: "Stocked", dataIndex: "podeStockedQty", key: "podeStockedQty" },
    { title: "Stock ID", dataIndex: "podeStockId", key: "podeStockId" },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: () => (
        <p
          onClick={showModal1}
          className="hover:underline hover:text-blue-500 cursor-pointer"
        >
          Edit
        </p>
      ),
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: "Purchasing Number",
      dataIndex: "purchasingNumber",
      key: "purchasingNumber",
    },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Order Date", dataIndex: "orderDate", key: "orderDate" },
    { title: "Total Refund", dataIndex: "totalRefund", key: "totalRefund" },
    { title: "Subtotal", dataIndex: "subtotal", key: "subtotal" },
    { title: "Payment Type", dataIndex: "paymentType", key: "paymentType" },
    { title: "Arrival Date", dataIndex: "arrivaleDate", key: "arrivaleDate" },
    { title: "Total", dataIndex: "total", key: "total" },
    { title: "Employee Name", dataIndex: "employeeName", key: "employeeName" },
    { title: "Vendor Name", dataIndex: "vendorName", key: "vendorName" },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: () => (
        <p
          className="hover:underline hover:text-blue-500 cursor-pointer"
          onClick={showModal}
        >
          See Details
        </p>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: () => (
        <p
          onClick={showModal2}
          className="hover:underline hover:text-blue-500 cursor-pointer"
        >
          Edit
        </p>
      ),
    },
  ];
  const data: DataType[] = [
    {
      purchasingNumber: "10222",
      status: "Pending",
      orderDate: "20/10/2023",
      totalRefund: 1000000,
      subtotal: 20000,
      paymentType: "Cash",
      arrivaleDate: "23/10/2023",
      total: 100000,
      employeeName: "James",
      vendorName: "PT. Unilever Indonesia",
    },
  ];
  const [status, setStatus] = useState("");
  const items = [
    {
      value: "1",
      label: "Pending",
    },
    {
      value: "2",
      label: "Accepted",
    },
    {
      value: "3",
      label: "Rejected",
    },
    {
      value: "4",
      label: "Completed",
    },
  ];
  const handleClick = (value: string) => {
    setStatus(value);
    console.log(value);
  };

  const handleChange = (values: string) => {
    console.log(values);
  };

  const items1 = [
    {
      value: "TR",
      label: <p>Transfer</p>,
    },
    {
      value: "CA",
      label: <p>Cash</p>,
    },
  ];
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-3">
      <h4 className="text-gray-500 text-center mb-4 font-bold">
        Purchase Orders
      </h4>
      <Button onClick={showModal1} className="m-4">
        New Purchase Order Header
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        className="w-full text-sm text-center text-gray-500 dark:text-gray-400"
      />
      <Modal
        title="Purchase Order Detail"
        open={isModalOpen}
        onCancel={closeModal}
        width={"full"}
      >
        <Table columns={detailColumn} />
      </Modal>
      <Modal
        title="New Purchase Order Header"
        open={isModalOpen1}
        onCancel={closeModal1}
        footer={[
          <Button onClick={closeModal1}>Cancel</Button>,
          <Button>Save</Button>,
        ]}
      >
        <form className="w-96">
          <div className="relative z-0 w-full mb-6 group mt-4">
            <input
              type="text"
              name="floating_text"
              id="floating_text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_text"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Purhcase Order Number
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 mt-4 group">
            //Buat Cascader Vendor
          </div>
          <div className="relative z-0 w-full mb-6 group mt-4">
            <Space direction="vertical">
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Status
              </label>
              <Select
                style={{ width: 100 }}
                defaultValue=""
                onChange={handleClick}
                options={items}
              ></Select>
            </Space>
          </div>
          <div className="relative z-0 w-full mb-6 group mt-4">
            <input
              type="text"
              name="floating_text"
              id="floating_text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_text"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Sub Total
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group mt-4">
            <input
              type="text"
              name="floating_text"
              id="floating_text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_text"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Total Refund
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group mt-4">
            <input
              type="date"
              name="floating_text"
              id="floating_text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_text"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Arrival Date
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group mt-4">
            <Space direction="vertical">
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Purchasing Type
              </label>
              <Select
                style={{ width: 100 }}
                defaultValue=""
                onChange={handleChange}
                options={items1}
              ></Select>
            </Space>
          </div>
        </form>
      </Modal>
      <Modal
        title="Edit Orders Header"
        open={openModal}
        onCancel={closeModal2}
        footer={[
          <Button onClick={closeModal2}>Cancel</Button>,
          <Button>Save</Button>,
        ]}
      >
        <form className="w-96">
          <div className="relative z-0 w-full mb-6 group mt-4">
            <input
              type="text"
              name="floating_text"
              id="floating_text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_text"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Purhcase Order Number
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 mt-4 group">
            //Buat Cascader Vendor
          </div>
          <div className="relative z-0 w-full mb-6 group mt-4">
            <Space direction="vertical">
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Status
              </label>
              <Select
                style={{ width: 100 }}
                defaultValue=""
                onChange={handleClick}
                options={items}
              ></Select>
            </Space>
          </div>
          <div className="relative z-0 w-full mb-6 group mt-4">
            <input
              type="text"
              name="floating_text"
              id="floating_text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_text"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Sub Total
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group mt-4">
            <input
              type="text"
              name="floating_text"
              id="floating_text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_text"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Total Refund
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group mt-4">
            <input
              type="date"
              name="floating_text"
              id="floating_text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_text"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Arrival Date
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group mt-4">
            <Space direction="vertical">
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Purchasing Type
              </label>
              <Select
                style={{ width: 100 }}
                defaultValue=""
                onChange={handleChange}
                options={items1}
              ></Select>
            </Space>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default purchaseOrderVendor;
