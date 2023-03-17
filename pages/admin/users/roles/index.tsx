import { Dialog, Transition } from '@headlessui/react'
import React, { useState, useEffect, Fragment, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { doRolesRequest, doRolesCreate, doRoleRequest, doUpdateRoles, doDeleteRoles } from '@/redux/Actions/Users/reduceActions';
import { Box, useTheme } from "@mui/material"
import styles from "@/styles/ContentProfile.module.css";
import { tokens } from '@/theme';
import * as yup from "yup";
import { XMarkIcon } from '@heroicons/react/24/solid';
import TextField from '@mui/material/TextField';
import { Form, Formik } from 'formik';
import RefreshIcon from '@mui/icons-material/Refresh';
import SaveIcon from '@mui/icons-material/Save';
import Head from 'next/head';
import LayoutAdmin from '@/components/Layout/admin';
import { v4 as uuidv4 } from 'uuid';
import Highlighter from "react-highlight-words";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { InputRef, Space, Table, Input, Button, Dropdown, Popconfirm, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import {
  MoreOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import ComponentsIndicatorToast from '@/components/Indicator/toast';

export default function UsersRoles() {
  // defaine themes
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // define API GET roles
  const [Data, setData]:any = useState([]);  
  const roles = useSelector((state: any) => state.usersReducers.users);
  const dispatch = useDispatch();

  //  dispatch API GET users
  useEffect(() => {
    dispatch(doRolesRequest());
  },[]); 
  
  // setData API GET users
  useEffect(() => {
    if (roles && roles.results){
      setData(roles.results)
    }
  });

  // useState : modals Add New
  let [isOpenAdd, setIsOpenAdd] = useState(false)

  //  function : close modals Add New
  function closeModalAdd() {
    setIsOpenAdd(false)
  }

  //  function : open modals Add New
  function openModalAdd() {
    setIsOpenAdd(true)
  }

  // useDispatch API POST users
  const dispatchAdd = useDispatch();

  // define useState API POST users
  const [DataUser, setDataUser] = useState({
    roleName: null,
  });

  // function handler API POST users
  const eventHandlerAdd = (data:any) => (event:any) => {
    setDataUser({ ...DataUser, [data]: event.target.value });
  }
  
  // function handle submit form add new users (API POST users)
  const handleFormSubmit = (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    dispatchAdd(doRolesCreate(values));
    setTimeout(() => {
      ComponentsIndicatorToast({status: 'success', message: 'Data inserted successfully'});
      dispatch(doRolesRequest());
      setIsOpenAdd(false);
    }, 500)
    setSubmitting(false);
  };

  // getHelper for display in form
  const getHelperText = (touched:any, errors:any) => {
    return (touched && errors ? errors : false)
  }

  // check all validasi required & etc
  const checkoutSchema:any = yup.object().shape({
    roleName: yup.string().required("required"),
  });

  // function initialValue field from table users
  const initialValues: any = {
    roleId:null,
    roleName: "",
  };
 
  const dispatchEdit = useDispatch();

  // useState : modals Edit user
  const [isOpenEdit, setIsOpenEdit] = useState(false)

  //  function : close modals Edit user
  function closeModalEdit() {
    setIsOpenEdit(false)
  }

  // define useState API POST users
  let [DataUserEdit, setDataUserEdit] = useState({
    roleId: null,
    roleName: null,
  })

  //  function : open modals Edit user
  function openModalEdit() {
    setIsOpenEdit(true);
  }
  
  const user = useSelector((state: any) => state.usersReducers.user);

  // function handler API PUT user
  const handleEdit = (id: number) => {
    const displayedPayload:any = dispatchEdit(doRoleRequest(id));
    if (displayedPayload.payload == id) {
      if (user) {
        if (user.results) {
          const displayedUser:any = user.results;
          if (displayedUser) {
            if (displayedUser.roleId == id) {
              openModalEdit();
              setDataUserEdit({
                ...DataUserEdit,
                roleId: displayedUser.roleId,
                roleName: displayedUser.roleName,
              });
            }
          }
        }
      }
    }
  }
  
  // function handler API PUT users
  const eventHandlerEdit = (data: any) => (event: any) => {
      setDataUserEdit({...DataUserEdit, [data] : event.target.value});
  }

  // function handle submit form edit users (API POST users)
  const handleFormSubmitEdit = (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    dispatchEdit(doUpdateRoles(DataUserEdit.roleId, values));
    setTimeout(() => {
      ComponentsIndicatorToast({status: 'success', message: 'Data updated successfully'});
      dispatch(doRolesRequest());
      setIsOpenEdit(false);
    }, 500);
    setSubmitting(false);
  };

  const dispatchDelete = useDispatch();
  
  // function handler API DELETE user
  const handleDelete = (id: number) => {
    //  dispatch API DELETE users
    dispatchDelete(doDeleteRoles(id)); 
    setTimeout(() => {
      ComponentsIndicatorToast({status: 'success', message: 'Data deleted successfully'});
      dispatch(doRolesRequest());
    }, 500);
  }

  // Roles
  interface DataTypeRoles {
    roleId: number;
    roleName: string;
  }
  type DataIndexRoles = keyof DataTypeRoles;

  const dataRoles: DataTypeRoles[] = roles?roles.results:'';

  // Search data in by column Tables
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  // Handle Search data in by column Roles Table
  const handleSearchRoles = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndexRoles,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // Handle Reset (search) data in by column Roles Table
  const handleResetRoles = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  // Get Column Search - Roles
  const getColumnSearchPropsRoles = (dataIndex: DataIndexRoles): ColumnType<DataTypeRoles> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearchRoles(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            onClick={() => handleSearchRoles(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined className="mb-6"  />}
            size="small"
            style={{ width: 32, height:32 }}
          >
          </Button>
          <Button
            onClick={() => clearFilters && handleResetRoles(clearFilters)}
            icon={<RotateLeftIcon />}
            size="small"
            style={{ width: 32,height:32  }}
          >
          </Button>
          <Button
            className="text-gray-500"
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            className="text-red-500"
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const items = [
    {
      key: '1',
      label: 'Edit',
      onClick: (id: any) => {
        handleEdit(id.key);
      }
    },
    {
      key: '2',
      label: 'Delete',
      onClick: (id: any) => {
        handleDelete(id.key);
      }
    },
  ];

  // column Roles
  const columnsRoles: ColumnsType<DataTypeRoles> = [
    {
      title:
        <button
          className='hover:text-blue-600'
          type="button"
          onClick={openModalAdd}>
          <PlusCircleOutlined className='text-center' />
        </button>,
      dataIndex: 'operation',
      key: 'operation',
      width: '5%',
      render: (_, record) => (
        <Space size="middle">
          <Dropdown
            overlay={(
              <Menu className="hover:text-blue-600 items-center space-y-1">
                <Menu.Item className="border hover:border-blue-600 hover:text-blue-600 items-center" key={`Edit${record.roleId}`} onClick={() => handleEdit(record.roleId)}>
                  <EditOutlined />{" Edit"}
                </Menu.Item>
                <Menu.Item className="border hover:border-red-600 hover:text-red-600 items-center" key={`Delete${record.roleId}`}>
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete roles?"
                    onConfirm={() => {
                      if ({ confirm }) {
                        handleDelete(record.roleId);
                      }
                    }}
                    okText="Yes"
                    cancelText="No"
                    placement="rightTop" arrow
                    icon={<QuestionCircleOutlined style={{ color: "red" }} className="items-center" />}
                  >
                    <DeleteOutlined className="hover:text-red-600" />{" Delete"}
                  </Popconfirm>
                </Menu.Item>
              </Menu>
            )}
          >
            <a>
              <MoreOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
    {
      title: 'Role ID',
      dataIndex: 'roleId',
      key: 'roleId',
      width: '20%',
      ...getColumnSearchPropsRoles('roleId'),
      sorter: (a, b) => a.roleId - b.roleId,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Role Name',
      dataIndex: 'roleName',
      key: 'roleName',
      width: '70%',
      ...getColumnSearchPropsRoles('roleName'),
    },
  ];

  return (
    <div>
      <Head>
        <title>Users/Roles</title>
      </Head>
      <LayoutAdmin>

        {/* Add */}
        <Transition appear show={isOpenAdd} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModalAdd}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="grid transform max-h-96 overflow-y-auto rounded-xl bg-white text-left  shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="pl-8 pr-8 mb-5 sticky top-0 flex justify-between font-bold shadow-md w-full h-fit py-2 px-2 mx-auto items-center bg-blue-900 text-blue-100 hover:bg-blue-800 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75"
                    >
                      <div className={styles.textTitleInProfileEdit}>
                        Add New Role
                      </div>
                      <button
                        onClick={closeModalAdd}
                        type="button"
                        className="rounded-md font-bold shadow-md h-fit py-1 px-1  items-end bg-blue-100 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                        <XMarkIcon width={20} height={20} />
                      </button>
                    </Dialog.Title>
                    <Formik
                      onSubmit={handleFormSubmit}
                      initialValues={initialValues}
                      validationSchema={checkoutSchema}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                          {/* Add roles */}
                          <Box 
                            className="pl-8 pr-8 pb-4 space-y-2"
                            
                          >
                            <TextField
                              variant='filled'
                              hidden={true}
                              type='hidden'
                              value={values.roleId=DataUserEdit.roleId}
                            />

                            {/* FullName */}
                            <TextField
                              size="small"
                              fullWidth
                              color="primary"
                              variant="standard"
                              type="text"
                              label="Role Name"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('roleName')(event); handleChange(event)}}
                              value={values.roleName}
                              name="roleName"
                              error={!!touched.roleName && !!errors.roleName}
                              helperText={getHelperText(touched.roleName, errors.roleName)}
                            />  
                          </Box>
                          <Box className="flex flex-row-reverse pb-8">
                            <Box className='pr-8'>
                              <button
                                type="submit"
                                className="rounded-md font-bold shadow-md w-full h-fit py-2 px-2 mx-auto items-center bg-blue-100 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                                <SaveIcon width={4} height={4} />{' Save'}
                              </button>
                            </Box>
                            <Box className='pr-4'>
                              <button
                                type="reset"
                                className="rounded-md font-bold shadow-md w-full h-fit py-2 px-2 mx-auto items-center bg-blue-100 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                                <RefreshIcon width={4} height={4} />{' Cancle'}
                              </button>
                            </Box>
                          </Box>
                        </Form>
                      )}
                    </Formik>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* Edit */}
        <Transition appear show={isOpenEdit} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModalEdit}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="grid transform max-h-96 overflow-y-auto rounded-xl bg-white text-left  shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="pl-8 pr-8 mb-5 sticky top-0 flex justify-between font-bold shadow-md w-full h-fit py-2 px-2 mx-auto items-center bg-blue-900 text-blue-100 hover:bg-blue-800 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75"
                    >
                      <div className={styles.textTitleInProfileEdit}>
                        Edit Role
                      </div>
                      <button
                        onClick={closeModalEdit}
                        type="button"
                        className="rounded-md font-bold shadow-md h-fit py-1 px-1  items-end bg-blue-100 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                        <XMarkIcon width={20} height={20} />
                      </button>
                    </Dialog.Title>
                    <Formik
                      onSubmit={handleFormSubmitEdit}
                      initialValues={initialValues}
                      validationSchema={checkoutSchema}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                          {/* Edit Roles */}
                          <Box 
                            className="pl-8 pr-8 pb-4 space-y-2"
                          >
                            <TextField
                              variant='filled'
                              hidden
                              type='hidden'
                              value={values.roleId=DataUserEdit.roleId}
                            />

                            {/* FullName */}
                            <TextField
                              size="small"
                              fullWidth
                              color="primary"
                              variant="standard"
                              type="text"
                              label="Role"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerEdit('roleName')(event); handleChange(event)}}
                              value={values.roleName?values.roleName:values.roleName=DataUserEdit.roleName}                            
                              name="roleName"
                              error={!!touched.roleName && !!errors.roleName}
                              helperText={getHelperText(touched.roleName, errors.roleName)}
                            />  
                          </Box>
                          <Box className="flex flex-row-reverse pb-8">
                            <Box className='pr-8'>
                              <button
                                type="submit"
                                className="rounded-md font-bold shadow-md w-full h-fit py-2 px-2 mx-auto items-center bg-blue-100 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                                <SaveIcon width={4} height={4} />{' Save'}
                              </button>
                            </Box>
                            <Box className='pr-4'>
                              <button
                                type="reset"
                                className="rounded-md font-bold shadow-md w-full h-fit py-2 px-2 mx-auto items-center bg-blue-100 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                                <RefreshIcon width={4} height={4} />{' Cancle'}
                              </button>
                            </Box>
                          </Box>
                        </Form>
                      )}
                    </Formik>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <Table columns={columnsRoles} dataSource={dataRoles} />
      </LayoutAdmin>
    </div>
  );
}
