import LayoutAdmin from "@/components/Layout/admin";
import {
  doDeleteDepartment,
  doDepartmentsRequest,
} from "@/redux/Actions/HumanResources/reducerDepartmentAction";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Row,
  Space,
  Table,
  Input,
  Button,
  Dropdown,
  Menu,
  Popconfirm,
  message,
} from "antd";
import { Box } from "@mui/material";
import {
  MoreOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import ModalComponent from "./modalComponent";

export default function HRDepartment() {
  const { Search } = Input;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [dataDeptId, setDataDeptId] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  // define API GET department
  const { department, messageError } = useSelector(
    (state: any) => state.departmentReducer
  );

  console.log(department);

  const [filteredData, setFilteredData] = useState([]);
  const tableData = filteredData.length > 0 ? filteredData : department.data;

  //  dispatch API GET department
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doDepartmentsRequest());
  }, []);

  /* handle search */
  const handleSearch = (e: any) => {
    const filteredData = department.filter((item: any) => {
      const values = Object.values(item).map((x: any) =>
        x.toString().toLowerCase()
      );

      return values.some((x) => x.includes(e.target.value.toLowerCase()));
    });

    setFilteredData(filteredData);
  };
  /* endhandle search */

  /* handle modal */
  const showModal = (type: string, deptId?: number): any => {
    deptId = deptId ? deptId : 0;
    setDataDeptId(deptId);
    setIsModalOpen(true);
    setTypeModal(type);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  /* endhandle modal */

  /* handle message */
  useEffect(() => {
    if (messageError !== null) {
      messageApi
        .open({
          type: "loading",
          content: "loading....",
          duration: 0.5,
        })
        .then(() => message.error(messageError, 2));
    }
  }, [messageError]);

  /* endhandle message */

  /* handle dropdown */
  // handle delete data
  const deleteConfirm = (deptId: number) => {
    dispatch(doDeleteDepartment(deptId));
  };
  //endhandle delete data
  const menu = (deptId: number) => {
    return (
      <Menu>
        <Menu.Item
          key={`Edit${deptId}`}
          onClick={() => showModal("Edit", deptId)}
        >
          Edit
        </Menu.Item>
        <Menu.Item key={`Delete${deptId}`}>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete department?"
            onConfirm={() => {
              if ({ confirm }) {
                deleteConfirm(deptId);
              }
            }}
            okText="Yes"
            cancelText="No"
            placement="topLeft"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            Delete
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );
  };
  /* endhandle dropdown */

  /* handle datatable */
  const columns = [
    {
      title: "DepartementId",
      dataIndex: "deptId",
      key: "deptId",
    },
    {
      title: "Department",
      dataIndex: "deptName",
      key: "deptName",
    },
    {
      title: [
        <PlusOutlined />,
        <Button type="text" onClick={() => showModal("Add")}>
          {" "}
          Add{" "}
        </Button>,
      ],
      dataIndex: "Action",
      key: "action",
      render: (_: any, record: any) => {
        return (
          <>
            <Dropdown
              overlay={menu(record.deptId)}
              trigger={["click"]}
              placement="bottomLeft"
              arrow
            >
              <Button type="text">
                {" "}
                <MoreOutlined />{" "}
              </Button>
            </Dropdown>
          </>
        );
      },
    },
  ];
  /* endhandle datatable */

  return (
    <Box>
      <Head>
        <title>Human Resources </title>
      </Head>
      <LayoutAdmin>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ marginBottom: 20 }}
        >
          <Col className="gutter-row" span={24}>
            <div className="space-align-container">
              <div className="space-align-block">
                {contextHolder}
                <Space align="center">
                  <Search
                    placeholder="Department name"
                    style={{ width: 200 }}
                    onChange={handleSearch}
                  />
                </Space>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={24}>
            <Table columns={columns} dataSource={tableData} rowKey="Id" />
          </Col>
        </Row>

        {isModalOpen ? (
          <ModalComponent
            show={isModalOpen}
            handleCancel={handleCancel}
            handleClose={handleClose}
            id={dataDeptId}
            data={department}
            typeModal={typeModal}
          />
        ) : null}
      </LayoutAdmin>
    </Box>
  );
}
