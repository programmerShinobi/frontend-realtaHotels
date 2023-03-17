import LayoutAdmin from "@/components/Layout/admin";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Space, Table, Input, Button, Dropdown, Menu, Popconfirm, message } from "antd";
import { Box } from "@mui/material";
import { MoreOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ModalComponent from "./modalComponent";
import axios from "axios";
import { doDeleteEmployeePayHistory, doEmployeePayHistoryRequest, doEmployeePayHistorysRequest, doEmployeePayHistorysRequestSucceed } from "@/redux/Actions/HumanResources/reducerEmployeePayHistory";
import { useRouter } from 'next/router'
import moment from "moment";
import { ppid } from "process";

export default function HRSalaryHistory() {


  // define API GET employeePayHistory
  const { employeePayHistory, messageError } = useSelector(
    (state: any) => state.employeePayHistoryReducer
  );

  /* define library */
  const { Search } = Input
  const [messageApi, contextHolder] = message.useMessage();
  /* end define library */

  /* define all usestate */
  const [typeModal, setTypeModal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ephiId, setEphiId] = useState(0);
  const [page, setPage] = useState(1);
  const [dataEmployeePayHistory, setDataEmployeePayHistory] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false)
  /* end define all usestate */

  // counting data and assign to table
  
  const tableData = Array.isArray(dataEmployeePayHistory) ? dataEmployeePayHistory.length > 0 ? dataEmployeePayHistory : employeePayHistory.data : employeePayHistory.data;

  const countedData = employeePayHistory.count;

  // console.log("data employeePayHistory ", dataEmployeePayHistory)

  // console.log("employeePayHistory", employeePayHistory.data[0].ephiModifiedDate)
  // console.log("tableData", tableData)
  /* counting data and assign to table */


  //  dispatch API GET employeePayHistory then assign to dataEmployeePayHistory
  const dispatch = useDispatch();
  const router = useRouter()
  const { pid } = router.query
  
  useEffect(() => {
    dispatch(doEmployeePayHistorysRequest({ ephiEmp: pid }))
  }, []);
  //  end dispatch API GET employeePayHistory

  /* handle modal */
  const showModal = (type: string, ephiId?: number): any => {
    setDataEmployeePayHistory([]);

    ephiId = ephiId ? ephiId : 0;
    setEphiId(ephiId)
    setIsModalOpen(true);
    setTypeModal(type)
  };

  const handleCancel = () => {
    employeePayHistory.data.map((val: any, index: any) => {
      employeePayHistory.data[index].ephiPaySalary = val.toLocaleString("id-ID", { style: "currency", currency: "IDR" }).replace(/\s/g, '');
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
  const deleteConfirm = (ephiId: number) => {
    setDataEmployeePayHistory([]);
    dispatch(doDeleteEmployeePayHistory({ ephiId: ephiId, page: page, ephiEmp: pid }))
  };
  //endhandle delete data

  /* handle dropdown menu */
  const items: any = [
    {
      key: '1',
      label: (
        <a target="#" rel="noopener noreferrer" onClick={() => showModal("Edit", ephiId)}>
          Edit
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete employeePayHistory?"
          onConfirm={() => {
            if ({ confirm }) {
              deleteConfirm(ephiId);
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
      title: 'Date',
      dataIndex: 'ephiRateChangeDate',
      key: 'ephiRateChangeDate',
    },
    {
      title: 'Rate Sallary',
      dataIndex: 'ephiRateSalary',
      key: 'ephiRateSalary',
    },
    {
      title: 'Pay Frequency',
      dataIndex: 'ephiPayFrequence',
      key: 'ephiPayFrequence',
      render: (_: any, record: any) => {
        const ephiPayFrequence = record.ephiPayFrequence == 0 ? "Hourly" : "Monthly";
        return (
          <>
            {ephiPayFrequence}
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
              <Button type="text" onClick={() => setEphiId(record.ephiId)}	> <MoreOutlined /> </Button>
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
    getData('', '', { keyword: ucwords(e.target.value) })

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

  const getData = (page?: any, limit?: any, params?: any, ephiEmp? : any): any => {
    const queryParams = new URLSearchParams();

    queryParams.append("page", page);
    queryParams.append("limit", limit);
    queryParams.append("ephiEmp", ephiEmp);
 
    if (params && params.order) {
      queryParams.append("order", (params.order));
    }

    if (params && params.keyword) {
      queryParams.append("keyword", (params.keyword));
    }


    // In this example I use axios to fetch
    axios.get(`http://localhost:3005/employee-pay-history/pagination?${queryParams.toString()}`)
      .then((response) => {
        // get response
        setLoading(false)
        // set dataEmployeePayHistory
        setDataEmployeePayHistory(response.data.data)

        // update redux data employeePayHistory
        dispatch(doEmployeePayHistorysRequestSucceed(response.data))

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
                    placeholder="EmployeePayHistory name"
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
            id={ephiId}
            ephiEmp={pid}
            data={employeePayHistory.data}
            typeModal={typeModal}
            page={page}
          />
        ) : null}
      </LayoutAdmin>
    </Box>
  );
}