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
import { ppid } from "process";
import { doWorkorderRequest } from "@/redux/Actions/HumanResources/reducerWorkordersAction";
import dayjs from "dayjs";
import { doDeleteWorkorderdetail, doWorkorderdetailsRequest, doWorkorderdetailsRequestSucceed } from "@/redux/Actions/HumanResources/reducerWorkorderDetailAction";
import { doUsersRequest } from "@/redux/Actions/Users/reduceActions";
import { doServiceTaskRequest } from "@/redux/Actions/Masters/reduceActions";
import { doEmployeesRequest } from "@/redux/Actions/HumanResources/reducerEmployeeAction";

export default function HRWorkOrderDetail() {


  // define API GET workorderdetail
  const { workorderdetail, messageError } = useSelector(
    (state: any) => state.workorderdetailReducer
  );

  // define API GET workorder
  const { workorder } = useSelector(
    (state: any) => state.workorderReducer
  );

  // define API GET service task
  const { mSerTask } = useSelector(
    (state: any) => state.serviceTaskReducer
  );

  // define API GET employee
  const { employee } = useSelector(
    (state: any) => state.employeeReducer
  );

  //  dispatch API GET workorderdetail then assign to dataWorkorderdetail
  const dispatch = useDispatch();
  const router = useRouter()
  const { pid } = router.query

  useEffect(() => {
    dispatch(doWorkorderRequest({ wodeId: pid }))
    dispatch(doWorkorderdetailsRequest({ wodeId: pid }))
    dispatch(doServiceTaskRequest())
    dispatch(doEmployeesRequest())
  }, []);
  //  end dispatch API GET workorderdetail

  /* define library */
  const { Search } = Input
  const [messageApi, contextHolder] = message.useMessage();
  /* end define library */

  /* define all usestate */
  const [typeModal, setTypeModal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wodeId, setWodeId] = useState(0);
  const [page, setPage] = useState(1);
  const [dataWorkorderdetail, setDataWorkorderdetail] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false)
  /* end define all usestate */

  // counting data and assign to table
  
  const tableData = Array.isArray(dataWorkorderdetail) ? dataWorkorderdetail.length > 0 ? dataWorkorderdetail : workorderdetail.data : workorderdetail.data;

  const countedData = workorderdetail.count;


  // console.log("workorder", workorder)
  // console.log("data workorderdetail ", dataWorkorderdetail)
  // console.log("workorderdetail", workorderdetail)
  // console.log("tableData", tableData)
  /* counting data and assign to table */


  

  /* handle modal */
  const showModal = (type: string, wodeId?: number): any => {
    setDataWorkorderdetail([]);

    wodeId = wodeId ? wodeId : 0;
    setWodeId(wodeId)
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
  const deleteConfirm = (wodeId: number) => {
    setDataWorkorderdetail([]);
    dispatch(doDeleteWorkorderdetail({ wodeId: wodeId, page: page, wodeWoro: pid }))
  };
  //endhandle delete data

  /* handle dropdown menu */
  const items: any = [
    {
      key: '1',
      label: (
        <a target="#" rel="noopener noreferrer" onClick={() => showModal("Edit", wodeId)}>
          Edit
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete workorderdetail?"
          onConfirm={() => {
            if ({ confirm }) {
              deleteConfirm(wodeId);
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
  const columns = [
    {
      title: 'WorkOrder Id',
      dataIndex: 'wodeId',
      key: 'wodeId',
    },
    {
      title: 'Taskname',
      dataIndex: 'wodeTaskName',
      key: 'wodeTaskName',
    },
    {
      title: 'Notes',
      dataIndex: 'wodeNotes',
      key: 'wodeNotes',
    },
    {
      title: 'Status',
      dataIndex: 'wodeStatus',
      key: 'wodeStatus',
    },
    {
      title: 'Assign To',
      dataIndex: 'userFullName',
      key: 'userFullName',
      render: (_: any, record: any) => {
        const userFullName = record.wodeEmp.empUser.userFullName
        return (
          <>
            {userFullName}
          </>
        )
      },
    },

    {
      title: [<PlusOutlined />, <Button type="text" onClick={() => showModal("Add")} > Add </Button>],
      dataIndex: 'Action',
      key: 'action',
      render: (_: any, record: any) => {
        return (
          <>
            <Dropdown menu={{ items }} trigger={['click']}>
              <Button type="text" onClick={() => setWodeId(record.wodeId)}	> <MoreOutlined /> </Button>
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

  const getData = (page?: any, limit?: any, params?: any, wodeWoro? : any): any => {
    const queryParams = new URLSearchParams();

    queryParams.append("page", page);
    queryParams.append("limit", limit);
    queryParams.append("wodeWoro", wodeWoro);
 
    if (params && params.order) {
      queryParams.append("order", (params.order));
    }

    if (params && params.keyword) {
      queryParams.append("keyword", (params.keyword));
    }

    // In this example I use axios to fetch
    axios.get(`http://localhost:3005/work-order-detail/pagination?${queryParams.toString()}`)
      .then((response) => {
        // get response
        setLoading(false)
        // set dataWorkorderdetail
        setDataWorkorderdetail(response.data.data)

        // update redux data workorderdetail
        dispatch(doWorkorderdetailsRequestSucceed(response.data))

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
                <Space>

                  <label className="font-bold">WorkOrder Created At</label>

                  <div className="border border-blue-900 border-b-1 border-l-0 border-r-0 border-t-0 text-base">{dayjs(workorder.woroStartDate).format("DD MMM YYYY")}</div>
                  
                  <label className="font-bold">Status</label>

                  <div className="border border-blue-900 border-b-1 border-l-0 border-r-0 border-t-0 text-base">{workorder.woroStatus}</div>

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
            id={wodeId}
            wodeWoro={pid}
            data={workorderdetail.data}
            datamSerTask={mSerTask}
            dataEmployee={employee}
            typeModal={typeModal}
            page={page}
          />
        ) : null}
      </LayoutAdmin>
    </Box>
  );
}