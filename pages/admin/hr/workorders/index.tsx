import LayoutAdmin from "@/components/Layout/admin";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Space, Table, Input, Button, Dropdown, Menu, Popconfirm, message, DatePicker, Select } from "antd";
import { Box } from "@mui/material";
import { MoreOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ModalComponent from "./modalComponent";
import axios from "axios";
import { doDeleteWorkorder, doWorkordersRequest, doWorkordersRequestSucceed } from "@/redux/Actions/HumanResources/reducerWorkordersAction";
import dayjs from "dayjs";
import Link from "next/link";
import type { DatePickerProps } from 'antd';

export default function HRWorkOrder() {

  const { RangePicker } = DatePicker;

  // define API GET workorder
  const { workorder, messageError } = useSelector(
    (state: any) => state.workorderReducer
  );

  /* define library */
  const { Search } = Input
  const [messageApi, contextHolder] = message.useMessage();
  /* end define library */


  /* define all usestate */
  const [typeModal, setTypeModal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataWoroId, setDataWoroId] = useState(0);
  const [page, setPage] = useState(1);
  const [dataWorkorder, setDataWorkorder] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(null);
  /* end define all usestate */
  
  useEffect(() => {
    const userId = localStorage ? localStorage.getItem('userId') : "";
    setUserId(userId)
  }, [])

  // counting data and assign to table
  const tableData = Array.isArray(dataWorkorder) ? dataWorkorder.length > 0 ? dataWorkorder : workorder.data : workorder.data;

  const countedData = workorder.count;
  /* counting data and assign to table */

  //  dispatch API GET workorder then assign to dataWorkorder
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doWorkordersRequest())
    setDataWorkorder(workorder.data)
  }, []);
  //  end dispatch API GET workorder

  /* handle modal */
  const showModal = (type: string, woroId?: number): any => {
    setDataWorkorder([]);

    woroId = woroId ? woroId : 0;
    setDataWoroId(woroId)
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
  const deleteConfirm = (woroId: number) => {
    setDataWorkorder([]);
    dispatch(doDeleteWorkorder({ woroId: woroId, page: page }))
  };
  //endhandle delete data

  /* handle dropdown */
  const items: any = [
    {
      key: '1',
      label: (
        <a target="#" rel="noopener noreferrer" onClick={() => showModal("Edit", dataWoroId)}>
          Edit
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <Link href={`/admin/hr/workorderdetail/${dataWoroId}`}>WorkOrder Detail</Link>
      ),
    },

  ];
  /* endhandle dropdown */


  /* handle column table */
  const columns: any = [
    {
      title: 'Workorder Date',
      dataIndex: 'woroStartDate',
      key: 'woroStartDate',
      render: (_: any, record: any) => {
        const woroStartDate = dayjs(record.woroStartDate).format("YYYY-MM-DD")
        return (
          <>
            {woroStartDate}
          </>
        )
      },
    },
    {
      title: 'Status',
      dataIndex: 'woroStatus',
      key: 'woroStatus',
    },
    {
      title: 'Created By',
      dataIndex: 'woroUser',
      key: 'woroUser',
      render: (_: any, record: any) => {
        const userFullName = record.woroUser?.userFullName
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
            {/* <Dropdown overlay={menu(record.woroId)} trigger={["click"]} placement="bottomLeft" arrow>
              <Button type="text"> <MoreOutlined /> </Button>
            </Dropdown> */}

            <Dropdown menu={{ items }} trigger={['click']}>
              <Button type="text" onClick={() => setDataWoroId(record.woroId)}	> <MoreOutlined /> </Button>
            </Dropdown>
          </>
        )
      },
    },
  ];
  /* endhandle column table */


  /* handle onchange daterangepicker */
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);

    
  };
  /* handle onchange daterangepicker */

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

    getData(page, limit, params);
  };

  const getData = (page?: any, limit?: any, params?: any): any => {
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
    axios.get(`http://localhost:3005/workorders?${queryParams.toString()}`)
      .then((response) => {
        // get response
        setLoading(false)
        // set dataWorkorder
        setDataWorkorder(response.data.data)

        // update redux data workorder
        dispatch(doWorkordersRequestSucceed(response.data))

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
          <Col span={12} offset={6}>
            <RangePicker
              onChange={onChange}
            />

            <Select
              defaultValue="OPEN"
              style={{ width: 120 }}
              className="ml-6"
              options={[
                { value: 'OPEN', label: 'OPEN' },
                { value: 'CLOSED', label: 'CLOSED' },
                { value: 'CANCELLED', label: 'CANCELLED' },

              ]}
            />
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
            id={dataWoroId}
            userId={userId}
            data={workorder.data}
            typeModal={typeModal}
            page={page}
          />
        ) : null}
      </LayoutAdmin>
    </Box>
  );
}