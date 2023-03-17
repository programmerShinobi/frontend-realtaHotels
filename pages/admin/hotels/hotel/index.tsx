import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Button,
  Form,
  Input,
  Modal,
  Rate,
  Select,
  Table,
  message,
} from "antd";
import { useRouter } from "next/router";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  MenuFoldOutlined,
  MenuOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import { FaHotel } from "react-icons/fa";
import dayjs from "dayjs";
import {
  doDelHotel,
  doInsertHotel,
  doHotelAdminReq,
  doAddrSearchReq,
} from "@/redux/Actions/Hotels/actionHotelAdmin";
import LayoutAdmin from "@/components/Layout/admin";
import Head from "next/head";

export default function index() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { TextArea } = Input;
  let dataHotel = useSelector(
    (state: any) => state.HotelAdminReducer.hotelAdmin
  );
  let dataAddr = useSelector((state: any) => state.AddrHotelReducer.HotelAddr);

  // modalinsert
  const [modal2Open, setModal2Open] = useState(false);

  // modal delete
  const { confirm } = Modal;
  const showDeleteConfirm = (idHotel: any) => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(doDelHotel(idHotel));
        if (!dispatch) {
          message.error("failed delete data");
        } else {
          message.success("delete data success");
        }
      },
      onCancel() {},
    });
  };

  // end

  // buuton edit
  const showEdit = (id: any) => {
    router.push("hotel/updatehotel/" + id);
  };

  const showFaci = (id: any) => {
    router.push("/admin/hotels/hotel/facility/" + id);
  };

  // dropdown
  const [dropdowns, setDropdowns] = useState(
    dataHotel.reduce((acc: any, item: any) => {
      return { ...acc, [item.hotelId]: false };
    }, {})
  );

  const toggleDropdown = (dropdown: any) => {
    setDropdowns({
      ...dropdowns,
      [dropdown]: !dropdowns[dropdown],
    });
  };
  const columns: ColumnType<any>[] = [
    {
      title: "No.",
      dataIndex: "index",
      render: (text: any, record: any, index: any) => index + 1,
      fixed: "left",
    },
    {
      title: "hotel",
      dataIndex: "hotelName",
      key: "hotelName",
      sorter: (a: any, b: any) => a.hotelName.length - b.hotelName.length,
    },
    {
      title: "Address",
      dataIndex: ["hotelAddr", "addrLine1"],
      key: "Address",
    },
    {
      title: "Deskription",
      dataIndex: "hotelDescription",
      key: "hotelDescription",
    },
    {
      title: "Rating",
      key: "index",
      render: (text: any, record: any, index) => (
        <Rate
          disabled
          defaultValue={record.hotelRatingStar}
          className="text-sm"
        />
      ),
      className: "w-36",
    },
    {
      title: "hotel Phonenumber",
      dataIndex: "hotelPhonenumber",
      key: "hotelPhonenumber",
      className: "w-32",
    },
    {
      title: "modified date",
      key: "index",
      render: (text: any, record: any, index) => (
        <p>{dayjs(record.hotelModifiedDate).format("DD MMMM YYYY hh:mm:ss")}</p>
      ),
      className: "w-36",
    },
    {
      title: (
        <>
          <Button
            className="mt-5 px-3 py-1 bg-green-500 mb-5 flex text-white items-center"
            type="primary"
            onClick={() => setModal2Open(true)}
          >
            <p>add</p>
          </Button>
        </>
      ),
      key: "action",
      render: (_: any, record: { hotelId: any }) => (
        <>
          <button
            onClick={() => toggleDropdown(record.hotelId)}
            className="px-4 py-1 bg-white-300 rounded-md w-16"
          >
            <MoreOutlined />
          </button>
          <div className="absolute">
            {dropdowns[record.hotelId] && (
              <ul className="absolute right-0 bottom-full z-10 bg-white border rounded-lg shadow-lg mt-2 ">
                <li className="py-2 px-2 hover:bg-gray-100 flex justify-center">
                  <button
                    className="text-yellow-500 text-sm hover:text-green-400 flex items-center justify-center space-x-2"
                    onClick={() => showEdit(record.hotelId)}
                  >
                    <EditOutlined />
                    <p>Update</p>
                  </button>
                </li>
                <li className="py-2 px-2 hover:bg-gray-100 flex justify-center">
                  <button
                    onClick={() => showDeleteConfirm(record.hotelId)}
                    className="text-red-500 text-sm hover:text-green-400 flex items-center justify-center space-x-2"
                  >
                    <DeleteOutlined />
                    <p>Delete</p>
                  </button>
                </li>
                <li className="py-2 px-2 hover:bg-gray-100 flex justify-center">
                  <button
                    className="text-blue-500 text-sm hover:text-green-400 flex items-center justify-center space-x-2"
                    onClick={() => showFaci(record.hotelId)}
                  >
                    <MenuOutlined />
                    <p>Facility</p>
                  </button>
                </li>
              </ul>
            )}
          </div>
        </>
      ),
    },
  ];
  // value input

  const [valueHotel, setValueHotel] = useState({
    hotelName: "",
    hotelAddr: 0,
    hotelDescription: "",
    hotelRatingStar: 0,
    hotelPhonenumber: "+62 ",
    hotelModifiedDate: new Date().toISOString().substr(0, 10),
  });
  const eventHandler =
    (item: any): ((event: any) => void) =>
    (event) => {
      setValueHotel({ ...valueHotel, [item]: event.target.value });
    };

  // end
  // button insert data hotel
  const [showError, setShowError] = useState({
    hotelName: false,
    hotelAddr: false,
    hotelDescription: false,
    hotelRatingStar: false,
    hotelPhonenumber: false,
  });
  const [messageError, setMessageError] = useState({
    hotelName: "",
    hotelAddr: "",
    hotelDescription: "",
    hotelRatingStar: "",
    hotelPhonenumber: "",
  });
  const addData = (e: any) => {
    e.preventDefault();
    if (valueHotel.hotelName === "") {
      setShowError({ ...showError, hotelName: true });
      setMessageError({
        ...messageError,
        hotelName: "hotel name must be filled!",
      });
      return;
    }
    if (valueHotel.hotelAddr === 0) {
      setShowError({ ...showError, hotelAddr: true });
      setMessageError({ ...messageError, hotelAddr: "adrees must be filled!" });
      return;
    }
    if (valueHotel.hotelDescription === "") {
      setShowError({ ...showError, hotelDescription: true });
      setMessageError({
        ...messageError,
        hotelDescription: "deskription must be filled!",
      });
      return;
    }
    if (valueHotel.hotelPhonenumber === "") {
      setShowError({ ...showError, hotelPhonenumber: true });
      setMessageError({
        ...messageError,
        hotelPhonenumber: "phonenumber must be filled!",
      });
      return;
    }
    dispatch(doInsertHotel(valueHotel));
    if (!dispatch) {
      message.error("failed add data");
    } else {
      message.success("add data success");
      setModal2Open(false);
    }
  };
  // search addrs
  const handleSelect = (value: any) => {
    setValueHotel({ ...valueHotel, hotelAddr: parseInt(value) });
  };
  const options = dataAddr?.map((item: any) => ({
    value: item.hotel_addr_id,
    label: item.place,
  }));
  // search hotel name
  const [queryHotel, setQueryHotel] = useState("");
  const handleSearchHotel = (e: any) => {
    const input = e.target.value.toLowerCase().replace(/\s/g, "");
    setQueryHotel(input);
  };
  const searchResultsHotel = dataHotel.filter((item: any) =>
    item.hotelName.toLowerCase().replace(/\s/g, "").includes(queryHotel)
  );

  useEffect(() => {
    dispatch(doHotelAdminReq());
    dispatch(doAddrSearchReq());
  }, []);

  return (
    <div>
      <Head>
        <title>Hotels/Hotel</title>
      </Head>
      <LayoutAdmin>
        <div className="flex justify-between">
          <div className="flex justify-start">
            <span className="text-4xl font bold">
              <FaHotel />
            </span>
            <span className="text-4xl ml-3 font-bold">Hotels</span>
          </div>
          <div className="">
            <Form.Item label="">
              <Input
                placeholder="search by hotel name"
                type="search"
                value={queryHotel}
                onChange={handleSearchHotel}
                className="w-full"
                suffix={
                  <SearchOutlined className="text-2xl text-blue-500 mb-1" />
                }
              />
            </Form.Item>
          </div>
        </div>
        <hr className="text-gray-600 font-bold py-2" />
        {/* modal add data */}
        <>
          <Modal
            title="Add Hotel"
            centered
            open={modal2Open}
            onOk={() => setModal2Open(false)}
            onCancel={() => setModal2Open(false)}
            footer={null}
            width={500}
          >
            <Form layout="vertical" className="bg-white p-6 rounded-lg mx-auto">
              <Form.Item
                label="hotel name"
                name="hotelName"
                rules={[{ required: true }]}
                validateStatus={
                  valueHotel.hotelName === "" && showError.hotelName
                    ? "error"
                    : ""
                }
                help={
                  valueHotel.hotelName === "" ? messageError.hotelName : null
                }
              >
                <Input
                  placeholder=""
                  value={valueHotel.hotelName}
                  onChange={eventHandler("hotelName")}
                />
              </Form.Item>
              <Form.Item
                label="Address"
                name="Address"
                rules={[{ required: true }]}
                validateStatus={
                  valueHotel.hotelAddr === 0 && showError.hotelAddr
                    ? "error"
                    : ""
                }
                help={
                  valueHotel.hotelAddr === 0 ? messageError.hotelAddr : null
                }
              >
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={options}
                  value={valueHotel.hotelAddr}
                  onChange={handleSelect}
                />
              </Form.Item>
              <Form.Item
                label="hotel phonenumber"
                name="hotelPhonenumber"
                rules={[{ required: true }]}
                validateStatus={
                  valueHotel.hotelPhonenumber === "" &&
                  showError.hotelPhonenumber
                    ? "error"
                    : ""
                }
                help={
                  valueHotel.hotelPhonenumber === ""
                    ? messageError.hotelPhonenumber
                    : null
                }
              >
                <Input
                  placeholder=""
                  value={valueHotel.hotelPhonenumber}
                  onChange={eventHandler("hotelPhonenumber")}
                  type="number"
                  prefix="+62 "
                />
              </Form.Item>
              <Form.Item
                label="hotel description"
                name="hotelDeskription"
                rules={[{ required: true }]}
                validateStatus={
                  valueHotel.hotelDescription === "" &&
                  showError.hotelDescription
                    ? "error"
                    : ""
                }
                help={
                  valueHotel.hotelDescription === ""
                    ? messageError.hotelDescription
                    : null
                }
              >
                <TextArea
                  placeholder=""
                  value={valueHotel.hotelDescription}
                  onChange={eventHandler("hotelDescription")}
                />
              </Form.Item>
              <Form.Item label="">
                <Input
                  placeholder="input placeholder"
                  value={valueHotel.hotelModifiedDate}
                  onChange={eventHandler("hotelModifiedDate")}
                  hidden
                  type="date"
                  className="bg-gray-100 font-bold text-gray-500"
                />
              </Form.Item>
              <Form.Item className="items-center">
                <Button type="primary" className="bg-red-500" onClick={addData}>
                  Submit
                </Button>
              </Form.Item>
              <Form.Item>
                <Input
                  type="number"
                  placeholder=""
                  value={valueHotel.hotelAddr}
                  onChange={eventHandler("hotelAddr")}
                  hidden
                />
              </Form.Item>
            </Form>
            {/* end */}
          </Modal>
        </>
        {/* end */}

        <div>
          <Table
            scroll={{ x: true }}
            size="small"
            dataSource={searchResultsHotel}
            columns={columns}
          />
        </div>
      </LayoutAdmin>
    </div>
  );
}
