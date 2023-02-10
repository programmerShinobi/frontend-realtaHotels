import { Button, Modal, Select, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

interface Detail {
  stodStockId: number;
  stodBarcode: string;
  stodStatus: string;
  stodNotes: string;
  stodFacilityId: number;
}

const allStockDetail = () => {
  const status = [
    {
      value: "1",
      label: "Stocked",
    },
    {
      value: "2",
      label: "Expired",
    },
    {
      value: "3",
      label: "Broken",
    },
    {
      value: "4",
      label: "Used",
    },
  ];
  const [stat, setStat] = useState("");

  const handleClick = (value: string) => {
    setStat(value);
    console.log(value);
  };
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false)
  const openModal1 = () =>{
    setShowModal1(true)
  }
  const closeModal1 = () =>{
    setShowModal1(false)
  }
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const detailColumn: ColumnsType<Detail> = [
    { title: "Stocks ID", dataIndex: "stodStockId", key: "stodStockId" },
    { title: "Barcode", dataIndex: "stodBarcode", key: "stodBarcode" },
    { title: "Status", dataIndex: "stodStatus", key: "stodStatus" },
    { title: "Notes", dataIndex: "stodNotes", key: "stodNotes" },
    {
      title: "Facility ID",
      dataIndex: "stodFacilityId",
      key: "stodFacilityId",
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: () => (
        <p
          onClick={openModal}
          className="hover:underline hover:text-blue-500 cursor-pointer"
        >
          Edit
        </p>
      ),
    },
  ];
  const dataDetail: Detail[] = [
    {
      stodStockId: 1,
      stodBarcode: "barfadf#Fdaj3VDF",
      stodStatus: "Stocked",
      stodNotes: "Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet",
      stodFacilityId: 3,
    },
  ];
  return (
    <div className="m-8">
        <h4 className="text-center font-bold m-4">Stocks Details</h4>
      <Button onClick={openModal1}>Add New Stocks Detail</Button>
      <Table columns={detailColumn} dataSource={dataDetail} />
      <Modal title="Edit Stock Details" open={showModal} onCancel={closeModal} footer={[
        <Button onClick={closeModal}>Cancel</Button>,
        <Button>Save</Button>
      ]}>
        <form>
          <div className="relative z-0 w-96 mb-6 group">
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
              Stock Name
            </label>
          </div>
          <div className="relative z-0 w-96 mb-6 group">
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
              Barcode
            </label>
          </div>
          <div className="relative z-0 w-96 mb-6 group">
            <Space direction="vertical">
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Status
              </label>
              <Select
                style={{ width: 100 }}
                defaultValue=""
                onChange={handleClick}
                options={status}
              ></Select>
            </Space>
          </div>
          <div className="relative z-0 w-96 mb-6 group">
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
              Notes
            </label>
          </div>
        </form>
      </Modal>
      <Modal title="New Stock Details" open={showModal1} onCancel={closeModal1} footer={[
        <Button onClick={closeModal1}>Cancel</Button>,
        <Button>Save</Button>
      ]}>
        <form>
          <div className="relative z-0 w-96 mb-6 group">
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
              Stock Name
            </label>
          </div>
          <div className="relative z-0 w-96 mb-6 group">
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
              Barcode
            </label>
          </div>
          <div className="relative z-0 w-96 mb-6 group">
            <Space direction="vertical">
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Status
              </label>
              <Select
                style={{ width: 100 }}
                defaultValue=""
                onChange={handleClick}
                options={status}
              ></Select>
            </Space>
          </div>
          <div className="relative z-0 w-96 mb-6 group">
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
              Notes
            </label>
          </div>
          <div className="relative z-0 w-96 mb-6 group">
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
              Facility ID
            </label>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default allStockDetail;
