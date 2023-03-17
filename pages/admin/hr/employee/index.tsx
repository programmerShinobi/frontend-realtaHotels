import LayoutAdmin from "@/components/Layout/admin";
import { Box } from "@mui/material";
import { Col, Row, Space, Table, Input, Button, Dropdown, Menu, Popconfirm, message, Select, Avatar } from "antd";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import Link from "next/link";
import ModalComponentAdd from "./modalComponentAdd";
import ModalComponentEdit from "./modalComponentEdit";

import { doUsersRequest } from "@/redux/Actions/Users/reduceActions";
import { doDeleteEmployee, doEmployeesRequest } from "@/redux/Actions/HumanResources/reducerEmployeeAction";
import { doDepartmentRequest } from "@/redux/Actions/HumanResources/reducerDepartmentAction";
import { doShiftsRequest } from "@/redux/Actions/HumanResources/reducerShiftAction";
import { doJobrolesRequest } from "@/redux/Actions/HumanResources/reducerJobroleAction";
import Image from "next/image";

export default function HREmployee() {
  const { Search } = Input
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [dataEmpId, setDataEmpId] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  // define API GET employee, department, shift, jobrole
  const { employee, messageError } = useSelector(
    (state: any) => state.employeeReducer
  );

  const { department } = useSelector(
    (state: any) => state.departmentReducer
  );

  const { shift } = useSelector(
    (state: any) => state.shiftReducer
  );

  const { jobrole } = useSelector(
    (state: any) => state.jobroleReducer
  );

  const { users } = useSelector(
    (state: any) => state.usersReducers
  );

  // variable untuk data table
  const [filteredDataSearch, setFilteredDataSearch] = useState([]);
  const [filteredDataSelect, setFilteredDataSelect] = useState([]);

  
  // filter data yang emp_current_flag = 1
  const tableData = filteredDataSearch.length > 0 || filteredDataSelect.length > 0 ? filteredDataSearch.length > 0 ? filteredDataSearch : filteredDataSelect.length > 0 ? filteredDataSelect  : employee : employee;




  //  dispatch API GET employee
  const dispatch = useDispatch();

  useEffect(() => {
    // ambil data dari redux
    dispatch(doEmployeesRequest())
    dispatch(doDepartmentRequest())
    dispatch(doShiftsRequest())
    dispatch(doJobrolesRequest())
    dispatch(doUsersRequest())

  }, []);


  /* handle search */
  const handleSearch = (e: any) => {
    let filteredData : any = []

    if (e.target.value.length > 0){
      filteredData = tableData.filter((item: any) => {
        const values = Object.values(item).map((x: any) =>
          x?.toString().toLowerCase() || ""
        );
        return values.some((x) => x.includes(e.target.value.toLowerCase()));
      });
    }else{
      filteredData = []
    }

    setFilteredDataSearch(filteredData);
  };
  /* endhandle search */

  /* handle filter select */
  const handleSelect = (value: any) : any => {
    if (value == 0 || value == 1) {
      const filteredData = employee.filter((item: any) => item.emp_current_flag === value);
      setFilteredDataSelect(filteredData);
    }else{
      setFilteredDataSelect([]);
    }
  }
  /* endhandle filter select */

  /* handle modal */

  //modal add
  const showModalAdd = (): any => {
    setIsModalOpenAdd(true);
  };

  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  const handleCloseAdd = () => {
    setIsModalOpenAdd(false);
  };
  //endmodal add

  //modal edit
  const showModalEdit = (empId?: number): any => {
    empId = empId ? empId : 0;
    setDataEmpId(empId)
    setIsModalOpenEdit(true);
  };

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
  };

  const handleCloseEdit = () => {
    setIsModalOpenEdit(false);
  };
  //endmodal edit
  /* endhandle modal */


  /* handle dropdown */
  // handle delete data
  const deleteConfirm = (empId: number) => {
    dispatch(doDeleteEmployee(empId))
  };
  //endhandle delete data

  /* handle dropdown */
  const items: any = [
    {
      key: '1',
      label: (
        <a target="#" rel="noopener noreferrer" onClick={() => showModalEdit(dataEmpId)}>
          Edit
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <Link href={`/admin/hr/salaryhistory/${dataEmpId}`}>Salary History</Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link href={`/admin/hr/departmenthistory/${dataEmpId}`}>Department History</Link>
      ),
    },
   
  ];
  /* endhandle dropdown */

  /* handle datatable */
  const columns = [
    {
      title: 'Photo',
      dataIndex: 'emp_photo',
      key: 'emp_photo',
      render: (_: any, record: any) => {
        const emp_photo = (record.emp_photo)
        let url = "";
        
        if (emp_photo == 'user.png'){
          url = "/images/user.png";
        }else{
          url = emp_photo;
        }
        return (
          <>
            <p><Avatar src={<img src={url} alt="avatar"/>} /></p>
          </>
        )
      }
    },
    {
      title: 'EmpId',
      dataIndex: 'emp_id',
      key: 'emp_id',
    },
    {
      title: 'NationalId',
      dataIndex: 'emp_national_id',
      key: 'emp_national_id',
    },
    {
      title: 'FullName',
      dataIndex: 'user_full_name',
      key: 'user_full_name',
    },
    {
      title: 'BirthDate',
      dataIndex: 'emp_birth_date',
      key: 'emp_birth_date',
      render: (_: any, record: any) => {
        const date = new Date(record.emp_birth_date)
        return (
          <>
            <p>{date.toLocaleDateString()}</p>
          </>
        )
      }
    },
    {
      title: 'HireDate',
      dataIndex: 'emp_hire_date',
      key: 'emp_hire_date',
      render : (_ : any, record : any) => {
        const date = new Date(record.emp_hire_date)
        return(
          <>
            <p>{date.toLocaleDateString()}</p>
          </>
        )
      }
    },
    {
      title: 'Status',
      dataIndex: 'emp_current_flag',
      key: 'emp_current_flag',
      render: (_: any, record: any) => {
        let status = ""
        if (record.emp_current_flag == 0){
          status = "INACTIVE"
        }else{
          status = "ACTIVE"
        }
        return (
          <>
            <p>{status}</p>
          </>
        )
      }
    },
    {
      title: [<PlusOutlined />, <Button type="text" onClick={() => showModalAdd()} > Add </Button>],
      dataIndex: 'Action',
      key: 'action',
      render: (_: any, record: any) => {
        return (
          <>
            {/* <Dropdown overlay={menu(record.emp_id)} trigger={["click"]} placement="bottomLeft" arrow>
              <Button type="text"> <MoreOutlined /> </Button>
            </Dropdown> */}

            {/* <Dropdown menu={{ items }} placement="bottomLeft" arrow={{ pointAtCenter: true }}>
              <Button type="text"> <MoreOutlined /> </Button>
            </Dropdown> */}

            <Dropdown menu={{ items }} trigger={['click']}>
              <Button type="text" onClick={() => setDataEmpId(record.emp_id)}	> <MoreOutlined /> </Button>
            </Dropdown>

          </>
        )
      },
    },
  ];
  /* endhandle datatable */
  return (
    <Box>
      <Head>
        <title>Human Resource</title>
      </Head>
      <LayoutAdmin>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ marginBottom: 20 }}
        >
          <Col className="gutter-row" span={24}>
            <div className="space-align-container">
              <div className="space-align-block">
                <Space align="center">
                  <label>Search</label>
                  <Search
                    placeholder="Employee name"
                    style={{ width: 200 }}
                    onChange={handleSearch}
                  />

                  <Select
                    defaultValue=""
                    style={{ width: 120 }}
                    onChange={handleSelect}
                    options={[
                      { value: '', label: 'STATUS' },
                      { value: 1, label: 'ACTIVE' },
                      { value: 0, label: 'INACTIVE' },
                    ]}
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

        {isModalOpenAdd ? (
          <ModalComponentAdd
            show={isModalOpenAdd}
            handleCancel={handleCancelAdd}
            handleClose={handleCloseAdd}
            dataDepartment = {department}
            dataUsers = {users.results}
            dataShift = {shift}
            dataJobrole = {jobrole}
          />
        ) : null}

        {isModalOpenEdit ? (
          <ModalComponentEdit
            show={isModalOpenEdit}
            handleCancel={handleCancelEdit}
            handleClose={handleCloseEdit}
            id={dataEmpId}
            dataEmployee={employee}
            dataDepartment = {department}
            dataUsers={users.results}
            dataShift = {shift}
            dataJobrole = {jobrole}

          />
        ) : null}
      </LayoutAdmin>
    </Box>
  );
}