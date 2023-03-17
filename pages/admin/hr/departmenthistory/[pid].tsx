import LayoutAdmin from "@/components/Layout/admin";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Space, Table, Input, Button, Dropdown, Menu, Popconfirm, message } from "antd";
import { Box } from "@mui/material";
import { MoreOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ModalComponent from "./modalComponent";
import axios from "axios";
import { useRouter } from 'next/router'
import moment from "moment";
import { doDeleteEmployeeDepartmentHistory, doEmployeeDepartmentHistorysRequest, doEmployeeDepartmentHistorysRequestSucceed } from "@/redux/Actions/HumanResources/reducerEmployeeDepartmentHistory";
import dayjs from "dayjs";
import { doDepartmentRequest } from "@/redux/Actions/HumanResources/reducerDepartmentAction";
import { doShiftsRequest } from "@/redux/Actions/HumanResources/reducerShiftAction";

export default function HRDepartmentHistory() {


  // define API GET department, shift
  const { employeeDepartmentHistory, messageError } = useSelector(
    (state: any) => state.employeeDepartmentHistoryReducer
  );

  const { department } = useSelector(
    (state: any) => state.departmentReducer
  );

  const { shift } = useSelector(
    (state: any) => state.shiftReducer
  );
  // define API GET department, shift

  /* define library */
  const { Search } = Input
  const [messageApi, contextHolder] = message.useMessage();
  /* end define library */

  /* define all usestate */
  const [typeModal, setTypeModal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edhiId, setEdhiId] = useState(0);
  const [page, setPage] = useState(1);
  const [dataEmployeeDepartmentHistory, setDataEmployeeDepartmentHistory] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false)

  /* end define all usestate */

  // counting data and assign to table

  const tableData = Array.isArray(dataEmployeeDepartmentHistory) ? dataEmployeeDepartmentHistory.length > 0 ? dataEmployeeDepartmentHistory : employeeDepartmentHistory.data : employeeDepartmentHistory.data;

  const countedData = employeeDepartmentHistory.count;


  /* counting data and assign to table */


  //  dispatch API GET employeeDepartmentHistory then assign to dataEmployeeDepartmentHistory
  const dispatch = useDispatch();
  const router = useRouter()
  const { pid } = router.query
  
  useEffect(() => {
    dispatch(doEmployeeDepartmentHistorysRequest({ edhiEmp: pid }))
    dispatch(doDepartmentRequest())
    dispatch(doShiftsRequest())

  }, []);
  //  end dispatch API GET employeeDepartmentHistory

  /* handle modal */
  const showModal = (type: string, edhiId?: number): any => {
    setDataEmployeeDepartmentHistory([]);

    edhiId = edhiId ? edhiId : 0;
    setEdhiId(edhiId)
    setIsModalOpen(true);
    setTypeModal(type)
  };

  const handleCancel = () => {
    employeeDepartmentHistory.data.map((val: any, index: any) => {
      employeeDepartmentHistory.data[index].ephiPaySalary = val.toLocaleString("id-ID", { style: "currency", currency: "IDR" }).replace(/\s/g, '');
    })

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
  const deleteConfirm = (edhiId: number) => {
    setDataEmployeeDepartmentHistory([]);
    dispatch(doDeleteEmployeeDepartmentHistory({ edhiId: edhiId, page: page, edhiEmp: pid }))
  };
  //endhandle delete data

  /* handle dropdown menu */
  const items: any = [
    {
      key: '1',
      label: (
        <a target="#" rel="noopener noreferrer" onClick={() => showModal("Edit", edhiId)}>
          Edit
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete employeeDepartmentHistory?"
          onConfirm={() => {
            if ({ confirm }) {
              deleteConfirm(edhiId);
            }
          }}
          okText="Yes"
          cancelText="No"
          placement="topLeft"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        >
          Delete
        </Popconfirm>
      ),
    },
   

  ];

  /* endhandle dropdown menu */

  /* handle column table */
  const columns: any = [
    {
      title: 'Department',
      dataIndex: 'edhiDept',
      key: 'edhiDept',
      render: (_: any, record: any) => {
        const department = record.edhiDept ? record.edhiDept.deptName : ''
        return (
          <>
            {department}
          </>
        )
      }
    },
    {
      title: 'StartDate',
      dataIndex: 'edhiStartDate',
      key: 'edhiStartDate',
      render: (_: any, record: any) => {

        const edhiStartDate = moment(record.edhiStartDate, 'YYYY-MM-DD').format('YYYY-MM-DD');

        return (
          <>
            {edhiStartDate}
          </>
        )
      }
    },
    {
      title: 'EndDate',
      dataIndex: 'edhiEndDate',
      key: 'edhiEndDate',
      render: (_: any, record: any) => {

        const edhiEndDate = moment(record.edhiEndDate, 'YYYY-MM-DD').format('YYYY-MM-DD');

        return (
          <>
            {edhiEndDate}
          </>
        )
      }
    },
    {
      title: 'ShiftName',
      dataIndex: 'shiftName',
      key: 'shiftName',
      render: (_: any, record: any) => {
        const shiftName = record.edhiShift?.shiftName
        return (
          <>
            {shiftName}
          </>
        )
      }
    },
    {
      title: [<PlusOutlined />, <Button type="text" onClick={() => showModal("Add")} > Add </Button>],
      dataIndex: 'Action',
      key: 'action',
      render: (_: any, record: any) => {
        return (
          <>
            <Dropdown menu={{ items }} trigger={['click']}>
              <Button type="text" onClick={() => setEdhiId(record.edhiId)}	> <MoreOutlined /> </Button>
            </Dropdown>
          </>
        )
      },
    },
  ];
  /* endhandle column table */



  /* handle search */
  function ucwords(str: string): any {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
    });
  }

  const handleSearch = (e: any) => {
    // setloading true
    setLoading(true)
    // get data with data search
    getData('', '', { keyword: ucwords(e.target.value) }, pid)

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

    getData(page, limit, params, pid);
  };

  const getData = (page?: any, limit?: any, params?: any, edhiEmp? : any): any => {
    const queryParams = new URLSearchParams();

    queryParams.append("page", page);
    queryParams.append("limit", limit);
    queryParams.append("edhiEmp", edhiEmp);
 
    if (params && params.order) {
      queryParams.append("order", (params.order));
    }

    if (params && params.keyword) {
      queryParams.append("keyword", (params.keyword));
    }


    // In this example I use axios to fetch
    axios.get(`http://localhost:3005/employee-department-history/pagination?${queryParams.toString()}`)
      .then((response) => {
        // get response
        setLoading(false)
        // set dataEmployeeDepartmentHistory
        setDataEmployeeDepartmentHistory(response.data.data)

        // update redux data employeeDepartmentHistory
        dispatch(doEmployeeDepartmentHistorysRequestSucceed(response.data))

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
                    placeholder="EmployeeDepartmentHistory name"
                    style={{ width: 200 }}
                    // onChange={handleSearch}
                  />
                  <Button type="primary" onClick={() => router.push('/admin/hr/employee')} >Back</Button>
                </Space>

              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={24}>

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
            id={edhiId}
            edhiEmp={pid}
            dataShift={shift}
            dataDepartment = {department}
            data={employeeDepartmentHistory.data}
            typeModal={typeModal}
            page={page}
          />
        ) : null}
      </LayoutAdmin>
    </Box>
  );
}