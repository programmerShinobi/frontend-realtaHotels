import LayoutAdmin from '@/components/Layout/admin/'
import { ColumnsType } from "antd/es/table";
import {
  Button,
  Table,
  Input,
  Modal,
  Form,
  Row,
  Col,
  Menu,
  Dropdown,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import EditModalStocks from "./editModalStocks";
import { useDispatch, useSelector } from "react-redux";
import {
  doAddStocks,
  doGetStocks,
} from "@/redux/Actions/Purchasing/stockActions";
import { useRouter } from "next/router";
import StockPhotoModal from "./stockPhotoModal";
interface Stock {
  stockId: number;
  stockName: string;
  stockReorderPoint: number;
  stockQuantity: number;
  stockUsed: number;
  stockScrap: number;
  stockSize: string;
  stockColor: string;
  stockDescription: string;
}
const { Search } = Input;
const Stocks = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { stocks } = useSelector((state: any) => state.stocksReducers);
  useEffect(() => {
    dispatch(doGetStocks());
  }, []);
  const [addStockModal, setAddStockModal] = useState(false);
  const [editStockModal, setEditStockModal] = useState(false);
  const [uploadPhotoModal, setUploadPhotoModal] = useState(false);
  const [idStock, setIdStock] = useState(0);
  const openAddStockModal = () => {
    setAddStockModal(true);
  };
  const openUploadPhotoModal = () => {
    setUploadPhotoModal(true);
  };
  const handleCloseStockModal = () => {
    setAddStockModal(false);
    setEditStockModal(false);
    setUploadPhotoModal(false);
  };
  const EditStock = (id: number) => {
    setEditStockModal(true);
    setIdStock(id);
  };
  const uploadPhoto = (id: number) => {
    setIdStock(id);
    setUploadPhotoModal(true);
  };
  const onFinish = (values: any) => {
    console.log(values);
    dispatch(doAddStocks(values));
    setAddStockModal(false);
  };
  const stockRow: ColumnsType<Stock> = [
    {
      title: "Stock",
      dataIndex: "stockName",
      key: "stockName",
    },
    {
      title: "Re Order at.",
      dataIndex: "stockReorderPoint",
      key: "stockReorderPoint",
    },
    {
      title: "Quantity",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
    },
    {
      title: "Used",
      dataIndex: "stockUsed",
      key: "stockUsed",
    },
    {
      title: "Scrap",
      dataIndex: "stockScrap",
      key: "stockScrap",
    },
    {
      title: "Size & Color",
      dataIndex: "stockSize",
      key: "stockSize",
      render(key, record) {
        return <span>{`${record.stockSize}-${record.stockColor}`}</span>;
      },
    },
    {
      title: "Actions",
      dataIndex: "x",
      key: "x",
      render(_, record) {
        const menu = (
          <Menu onClick={(e) => handleMenuClick(e, record.stockId)}>
            <Menu.Item key="Edit">Edit</Menu.Item>
            <Menu.Item key="Upload">Upload Photo</Menu.Item>
            <Menu.Item key="Detail">Detail Info Stock</Menu.Item>
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
  const handleMenuClick = (e: any, recordKey: number) => {
    if (e.key == "Edit") {
      EditStock(recordKey);
    }
    if (e.key == "Detail") {
      router.push(
        {
          pathname: "/admin/purchasing/addStockDetail",
          query: { stockId: recordKey },
        },
        "/admin/purchasing/addStockDetail"
      );
    }
    if (e.key == "Upload") {
      uploadPhoto(recordKey);
    }
  };

  // const onSearch = (value: any) => {
  //   const dataFilter = stocks.filter((item: any) => {
  //     const values = Object.values(item).map((x: any) =>
  //       x.toString().toLowerCase()
  //     );
  //     return values.some((x) => x.includes(value.toLowerCase()));
  //   });
  //   setDataFiltered(dataFilter);
  // };

  // const dataInFilter = dataFiltered.length > 0 ? dataFiltered : stocks;

  return (
    <LayoutAdmin>
      <h1 className="font-bold text-center">Stocks List</h1>
      <div className="flex justify-between m-8">
        <button
          className="bg-[#3C6FF3] px-4 py-1.5 rounded text-white hover:bg-[#274799]"
          onClick={openAddStockModal}
        >
          Add Stocks
        </button>
        {/* <Search
          placeholder="Search Vendor Name"
          className="w-96 center"
          onSearch={onSearch}
        /> */}
      </div>
      <Table columns={stockRow} dataSource={stocks} />
      <Modal
        title="Add/Edit Stock"
        open={addStockModal}
        onCancel={handleCloseStockModal}
        width={700}
        footer={null}
      >
        <Form onFinish={onFinish}>
          <Row gutter={[32, 32]}>
            <Col>
              <Form.Item label="Stock Name" name="stockName" rules={[{required:true}]}>
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Re-Order Point" name="stockReorderPoint">
                <Input style={{ width: 100 }} placeholder="0" type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 32]}>
            <Col>
              <Form.Item label="Quantity" name="stockQuantity" rules={[{required:true}]}>
                <Input style={{ width: 100 }} placeholder="0" type="number" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Used" name="stockUsed" rules={[{required:true}]}>
                <Input style={{ width: 100 }} placeholder="0" type="number" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Scrap" name="stockScrap" rules={[{required:true}]}>
                <Input style={{ width: 100 }} placeholder="0" type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 32]}>
            <Col>
              <Form.Item label="Color" name="stockColor">
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Size" name="stockSize">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Stock Description" name="stockDescription">
            <Input />
          </Form.Item>
          <Form.Item>
            <button
              htmlType="submit"
              className="bg-[#F33C5D] text-white hover:text-white-600 px-5 py-2.5 rounded hover:bg-[#c7354f]"
            >
              Save
            </button>
          </Form.Item>
        </Form>
      </Modal>
      {editStockModal ? (
        <EditModalStocks
          show={editStockModal}
          onCancel={handleCloseStockModal}
          handleClose={handleCloseStockModal}
          id={idStock}
          data={stocks}
        />
      ) : null}
      {uploadPhotoModal ? (
        <StockPhotoModal
          show={uploadPhotoModal}
          onCancel={handleCloseStockModal}
          data={stocks}
          id={idStock}
        />
      ) : null}
    </LayoutAdmin>
  );
};

export default Stocks;
