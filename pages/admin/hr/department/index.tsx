import LayoutAdmin from "@/components/Layout/admin";
import { doDeleteDepartment, doDepartmentsRequest, doDepartmentsRequestSucceed } from "@/redux/Actions/HumanResources/reducerDepartmentAction";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Space, Table, Input, Button, Dropdown, Menu, Popconfirm, message } from "antd";
import { Box } from "@mui/material";
import { MoreOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ModalComponent from "./modalComponent";
import axios from "axios";

export default function HRDepartment() {

  // define API GET department
  const { department, messageError } = useSelector(
    (state: any) => state.departmentReducer
  );

  /* define library */
  const { Search } = Input
  const [messageApi, contextHolder] = message.useMessage();
  /* end define library */


  /* define all usestate */
  const [typeModal, setTypeModal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataDeptId, setDataDeptId] = useState(0);
  const [page, setPage] = useState(1);
  const [dataDepartment, setDataDepartment] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false)
  /* end define all usestate */


  // counting data and assign to table
  const tableData = Array.isArray(dataDepartment) ? dataDepartment.length > 0 ? dataDepartment : department.data : department.data;

  const countedData = department.count;

  console.log("data department ", dataDepartment)
  console.log("department.data", department.data)
  console.log("tableData", tableData)
  /* counting data and assign to table */


  //  dispatch API GET department then assign to dataDepartment
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doDepartmentsRequest())

    setDataDepartment(department.data)
  }, []);
  //  end dispatch API GET department



  /* handle modal */
  const showModal = (type: string, deptId?: number): any => {
    setDataDepartment([]);

    deptId = deptId ? deptId : 0;
    setDataDeptId(deptId)
    setIsModalOpen(true);
    setTypeModal(type)
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

  // handle delete data
  const deleteConfirm = (deptId: number) => {
    setDataDepartment([]);
    dispatch(doDeleteDepartment({deptId : deptId, page: page}))
  };
  //endhandle delete data

  /* handle dropdown menu */
  const menu = (deptId: number) => {
    return (
      <Menu>
        <Menu.Item key={`Edit${deptId}`} onClick={() => showModal("Edit", deptId)}>
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
  }
  /* endhandle dropdown menu */

  /* handle column table */
  const columns: any = [
    {
      title: 'DepartementId',
      dataIndex: 'deptId',
      key: 'deptId',
    },
    {
      title: 'Department',
      dataIndex: 'deptName',
      key: 'deptName',
    },
    {
      title: [<PlusOutlined />, <Button type="text" onClick={() => showModal("Add")} > Add </Button>],
      dataIndex: 'Action',
      key: 'action',
      render: (_: any, record: any) => {
        return (
          <>
            <Dropdown overlay={menu(record.deptId)} trigger={["click"]} placement="bottomLeft" arrow>
              <Button type="text"> <MoreOutlined /> </Button>
            </Dropdown>
          </>
        )
      },
    },
  ];
  /* endhandle column table */



  /* handle search */
  function ucwords(str : string) : any {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
    });
  }

  const handleSearch = (e: any) => {
    // setloading true
    setLoading(true)

    // get data with data search
    getData('', '', { keyword: ucwords(e.target.value)})

  };
  /* endhandle search */

  /* handle table server side */
  const handleChange = (pagination: any, filters: any, sorter: any) => {

    const page = pagination.current
    const limit = pagination.pageSize;
    const params = { order: {} };

    // setloading true
    setLoading(true)
    // set current page table
    setPage(page)

    if (sorter.hasOwnProperty("column")) {
      params.order = { field: sorter.field, dir: sorter.order };
    }

    getData(page, limit, params);
  };

  const getData = (page?: any, limit?: any, params?: any) : any => {
    const queryParams = new URLSearchParams();

    queryParams.append("page", page);
    queryParams.append("limit", limit);

    if (params && params.order) {
      queryParams.append("order", (params.order));
    }

    if (params && params.keyword) {
      queryParams.append("keyword", (params.keyword));
    }


    // In this example I use axios to fetch
    axios.get(`http://localhost:3005/department/pagination?${queryParams.toString()}`)
      .then((response) => {
        // get response
        setLoading(false)
        // set dataDepartment
        setDataDepartment(response.data.data)

        // update redux data department
        dispatch(doDepartmentsRequestSucceed(response.data))

      })
      .catch((err) => {
        // Handle error
        console.log(err);
      });
  };
  /* end handle table server side */

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
            {/* <Table 
              columns={columns} 
              dataSource={tableData} 
              rowKey="Id" 
          
              /> */}

            <Table
              columns={columns}
              rowKey="key"
              loading={loading}
              dataSource={tableData}
              onChange={handleChange}
              pagination={{
                total: countedData // total count returned from backend
              }}
            />
          </Col>
        </Row>

        {isModalOpen ? (
          <ModalComponent
            show={isModalOpen}
            handleCancel={handleCancel}
            handleClose={handleClose}
            id={dataDeptId}
            data={department.data}
            typeModal={typeModal}
            page={page}
          />
        ) : null}
      </LayoutAdmin>
    </Box>
  );
}