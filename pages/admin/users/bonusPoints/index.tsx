import { Dialog, Transition } from '@headlessui/react'
import React, { useState, useEffect, Fragment, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { doBonusPointsRequest, doBonusPointsCreate, doBonusPointRequest, doUpdateBonusPoints, doDeleteBonusPoints, doUsersRequest } from '@/redux/Actions/Users/reduceActions';
import { Box, FormControl, InputLabel, MenuItem, Select, useTheme } from "@mui/material"
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
import Highlighter from "react-highlight-words";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { InputRef, Space, Table, Input, Button, Dropdown, Popconfirm, Menu, Tag } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import {
  MoreOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import ComponentsIndicatorToast from '@/components/Indicator/toast';

export default function UsersBonusPoints() {
  // defaine themes
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // define API GET bonusPoints
  const [Data, setData]:any = useState([]);  
  const bonusPoints = useSelector((state: any) => state.usersReducers.bonusPoints);
  const dispatch = useDispatch();

  //  dispatch API GET users
  useEffect(() => {
    dispatch(doBonusPointsRequest());
  },[]); 
  
  // setData API GET users
  useEffect(() => {
    if (bonusPoints && bonusPoints.results){
      setData(bonusPoints.results)
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
    ubpoUser: null,
    ubpoTotalPoints: null,
    ubpoBonusType:null

  });

  // function handler API POST users
  const eventHandlerAdd = (data:any) => (event:any) => {
    setDataUser({ ...DataUser, [data]: event.target.value });
  }
  
  // function handle submit form add new users (API POST users)
  const handleFormSubmit = (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    dispatchAdd(doBonusPointsCreate(values));
    setTimeout(() => {
      ComponentsIndicatorToast({status: 'success', message: 'Data inserted successfully'});
      dispatch(doBonusPointsRequest());
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
    ubpoUser: yup.string().required("required"),
    ubpoTotalPoints: yup.string().required("required"),
    ubpoBonusType:yup.string().required("required")
  });

  // function initialValue field from table users
  const initialValues: any = {
    ubpoId:null,
    ubpoUser: "" ,
    ubpoTotalPoints: "",
    ubpoBonusType:""
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
    ubpoId: null,
    ubpoUser: null,
    ubpoTotalPoints: null,
    ubpoBonusType:null
  })

  //  function : open modals Edit user
  function openModalEdit() {
    setIsOpenEdit(true);
  }
  
  const user = useSelector((state: any) => state.usersReducers.user);
  
  // function handler API PUT user
  const handleEdit = (id: number) => {
    const displayedPayload:any = dispatchEdit(doBonusPointRequest(id));
    if (displayedPayload.payload == id) {
      if (user) {
        if (user.results) {
          const displayedUser:any = user.results;
          if (displayedUser) {
            if (displayedUser.ubpoId == id) {
              openModalEdit();
              setDataUserEdit({
                ...DataUserEdit,
                ubpoId: displayedUser.ubpoId,
                ubpoUser: displayedUser.ubpoUser.userId,
                ubpoTotalPoints: displayedUser.ubpoTotalPoints,
                ubpoBonusType: displayedUser.ubpoBonusType,
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
    dispatchEdit(doUpdateBonusPoints(DataUserEdit.ubpoId, values));
    setTimeout(() => {
      ComponentsIndicatorToast({status: 'success', message: 'Data updated successfully'});
      dispatch(doBonusPointsRequest());
      setIsOpenEdit(false);
    }, 500);
    setSubmitting(false);
  };

  const dispatchDelete = useDispatch();
  
  // function handler API DELETE user
  const handleDelete = (id: number) => {
    //  dispatch API DELETE users
    dispatchDelete(doDeleteBonusPoints(id)); 
    setTimeout(() => {
      ComponentsIndicatorToast({status: 'success', message: 'Data deleted successfully'});
      dispatch(doBonusPointsRequest());
    }, 500);
  }

  // BonusPoints
  interface DataTypeBonusPoints {
    ubpoId: number;
    ubpoUser: {
      userFullName: string,
      userPhoneNumber: string,
    };
    ubpoTotalPoints: number;
    ubpoBonusType: string;
    ubpoCreatedOn: string;
  }
  type DataIndexBonusPoints = keyof DataTypeBonusPoints;

  const dataBonusPoints: DataTypeBonusPoints[] = bonusPoints ? bonusPoints.results : '';

  // Search data in by column Tables
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  // Handle Search data in by column BonusPoints Table
  const handleSearchBonusPoints = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndexBonusPoints,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // Handle Reset (search) data in by column BonusPoints Table
  const handleResetBonusPoints = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  // Get Column Search - BonusPoints
  const getColumnSearchPropsBonusPoints = (dataIndex: DataIndexBonusPoints): ColumnType<DataTypeBonusPoints> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex=='ubpoCreatedOn'?'Year':dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearchBonusPoints(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            onClick={() => handleSearchBonusPoints(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined className="mb-6"  />}
            size="small"
            style={{ width: 32, height:32 }}
          >
          </Button>
          <Button
            onClick={() => clearFilters && handleResetBonusPoints(clearFilters)}
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

  // column BonusPoints
  const columnsBonusPoints: ColumnsType<DataTypeBonusPoints> = [
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
            className="items-center"
            overlay={(
              <Menu className="hover:text-blue-600 items-center space-y-1">
                <Menu.Item className="border hover:border-blue-600 hover:text-blue-600 items-center" key={`Edit${record.ubpoId}`} onClick={() => handleEdit(record.ubpoId)}>
                  <EditOutlined />{" Edit"}
                </Menu.Item>
                <Menu.Item className="border hover:border-red-600 hover:text-red-600 items-center" key={`Delete${record.ubpoId}`}>
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete bonus points?"
                    onConfirm={() => {
                      if ({ confirm }) {
                        handleDelete(record.ubpoId);
                      }
                    }}
                    okText="Yes"
                    cancelText="No"
                    placement="rightTop" arrow
                    icon={<QuestionCircleOutlined style={{ color: "red" }} className="items-center" />}
                  >
                    <DeleteOutlined />{" Delete"}
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
      title: 'ID',
      dataIndex: 'ubpoId',
      key: 'ubpoId',
      width: '10%',
      ...getColumnSearchPropsBonusPoints('ubpoId'),
      sorter: (a:any, b:any) => a.ubpoId - b.ubpoId,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Create On',
      dataIndex: 'ubpoCreatedOn',
      key: 'ubpoCreatedOn',
      width: '15%',
      ...getColumnSearchPropsBonusPoints('ubpoCreatedOn'),
      render: (_, { ubpoCreatedOn }) => {
        return (
          <>{moment(ubpoCreatedOn).format("DD-MMM-YYYY")}</>
        )
      }
    },
    {
      title: 'Employee Name',
      dataIndex: ['ubpoUser', 'userFullName'],
      key: 'ubpoUser.userFullName',
    },
    {
      title: 'Points',
      dataIndex: 'ubpoTotalPoints',
      key: 'ubpoTotalPoints',
      ...getColumnSearchPropsBonusPoints('ubpoTotalPoints'),
      sorter: (a:any, b:any) => a.ubpoTotalPoints - b.ubpoTotalPoints,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Type',
      dataIndex: 'ubpoBonusType',
      key: 'ubpoBonusType',
      ...getColumnSearchPropsBonusPoints('ubpoBonusType'),
        render: (_, { ubpoBonusType }) => {
        let color = 'white';
          if (ubpoBonusType === 'P') {
            color = 'blue';
          } else if (ubpoBonusType === 'R') {
            color = 'volcano';
          } else {
            color = 'white';
          }
        return (
          <Tag color={color} key={ubpoBonusType}>
            {ubpoBonusType=='P'?'PROMOTE':'RATING'}
          </Tag>
        );
      },
    },
  ];

  const [Users, setUsers]: any = useState([]);
  
  const users = useSelector((state: any) => state.usersReducers.users);
  useEffect(() => {
    dispatch(doUsersRequest());
  }, []);
  
  useEffect(() => {
    if (users && users.results) {
      setUsers(users.results);
    }
  }, [users])

  return (
    <div>
      <Head>
        <title>Users/BonusPoints</title>
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
                        Add New BonusPoint
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
                          {/* Add BonusPoints */}
                          <Box 
                            className="pl-8 pr-8 pb-4 space-y-2"
                          >

                            {/* FullName */}
                            <FormControl className="pb-4" fullWidth size="small" color="primary" variant="standard" error={!!touched.usroRole && !!errors.usroRole}>
                              <InputLabel id="fullName" >Employee Name</InputLabel>
                              <Select
                                size="small"
                                fullWidth
                                color="primary"
                                variant="standard"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerAdd('ubpoUser')(event); handleChange(event)}}
                                value={values.ubpoUser}
                                name="ubpoUser"
                                error={!!touched.ubpoUser && !!errors.ubpoUser}
                              >
                                <MenuItem value=''><em>none</em></MenuItem>
                                {
                                  Users && Users.map((users:any) => 
                                  (
                                    <MenuItem value={users.userId}>{users.userFullName}</MenuItem>
                                  ))
                                }
                            </Select>
                            {!!touched.ubpoUser && !!errors.ubpoUser && <span className='text-red-600 text-xs pt-1'>{getHelperText(touched.ubpoUser, errors.ubpoUser)}</span>}
                            </FormControl>
                            
                            {/* ubpoTotalPoints */}
                            <TextField
                              className="pb-4"
                              size="small"
                              fullWidth
                              color="primary"
                              variant="standard"
                              type="number"
                              label="Points"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('ubpoTotalPoints')(event); handleChange(event)}}
                              value={values.ubpoTotalPoints}
                              name="ubpoTotalPoints"
                              error={!!touched.ubpoTotalPoints && !!errors.ubpoTotalPoints}
                              helperText={getHelperText(touched.ubpoTotalPoints, errors.ubpoTotalPoints)}
                            />  

                            {/* Status */}
                            <FormControl className="pb-4" fullWidth size="small" color="primary" variant="standard" error={!!touched.ubpoMembName && !!errors.ubpoMembName}>
                              <InputLabel id="status" >Status</InputLabel>
                              <Select
                                size="small"
                                fullWidth
                                color="primary"
                                variant="standard"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerAdd('ubpoBonusType')(event); handleChange(event)}}
                                value={values.ubpoBonusType}
                                name="ubpoBonusType"
                                error={!!touched.ubpoBonusType && !!errors.ubpoBonusType}
                              >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='R'>{'RATING'}</MenuItem>
                                <MenuItem value='P'>{'PROMOTE'}</MenuItem>
                            </Select>
                            {!!touched.ubpoBonusType && !!errors.ubpoBonusType && <span className='text-red-600 text-xs pt-1'>{getHelperText(touched.ubpoBonusType, errors.ubpoBonusType)}</span>}
                            </FormControl>
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
                        Edit BonusPoint
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
                          {/* Edit BonusPoints */}
                          <Box 
                            className="pl-8 pr-8 pb-4 space-y-2"
                          >
                            <TextField
                              variant='filled'
                              hidden
                              type='hidden'
                              value={values.ubpoId=DataUserEdit.ubpoId}
                            />

                            {/* FullName */}
                            <FormControl className="pb-4" fullWidth size="small" color="primary" variant="standard" error={!!touched.usroRole && !!errors.usroRole}>
                              <InputLabel id="fullName" >Employee Name</InputLabel>
                              <Select
                                size="small"
                                fullWidth
                                color="primary"
                                variant="standard"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerEdit('ubpoUser')(event); handleChange(event)}}
                                value={values.ubpoUser ? values.ubpoUser : values.ubpoUser = DataUserEdit.ubpoUser}                            
                                name="ubpoUser"
                                error={!!touched.ubpoUser && !!errors.ubpoUser}
                              >
                                <MenuItem value=''><em>none</em></MenuItem>
                                {
                                  Users && Users.map((users:any) => 
                                  (
                                    <MenuItem value={users.userId}>{users.userFullName}</MenuItem>
                                  ))
                                }
                            </Select>
                            {!!touched.ubpoUser && !!errors.ubpoUser && <span className='text-red-600 text-xs pt-1'>{getHelperText(touched.ubpoUser, errors.ubpoUser)}</span>}
                            </FormControl>
                            
                            {/* ubpoTotalPoints */}
                            <TextField
                              className="pb-4"
                              size="small"
                              fullWidth
                              color="primary"
                              variant="standard"
                              type="number"
                              label="Points"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerEdit('ubpoTotalPoints')(event); handleChange(event)}}
                              value={values.ubpoTotalPoints ? values.ubpoTotalPoints : values.ubpoTotalPoints = DataUserEdit.ubpoTotalPoints}
                              name="ubpoTotalPoints"
                              error={!!touched.ubpoTotalPoints && !!errors.ubpoTotalPoints}
                              helperText={getHelperText(touched.ubpoTotalPoints, errors.ubpoTotalPoints)}
                            />  

                            {/* Status */}
                            <FormControl className="pb-4" fullWidth size="small" color="primary" variant="standard" error={!!touched.ubpoMembName && !!errors.ubpoMembName}>
                              <InputLabel id="status" >Status</InputLabel>
                              <Select
                                size="small"
                                fullWidth
                                color="primary"
                                variant="standard"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerEdit('ubpoBonusType')(event); handleChange(event)}}
                                value={values.ubpoBonusType ? values.ubpoBonusType : values.ubpoBonusType = DataUserEdit.ubpoBonusType}
                                name="ubpoBonusType"
                                error={!!touched.ubpoBonusType && !!errors.ubpoBonusType}
                              >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='R'>{'RATING'}</MenuItem>
                                <MenuItem value='P'>{'PROMOTE'}</MenuItem>
                            </Select>
                            {!!touched.ubpoBonusType && !!errors.ubpoBonusType && <span className='text-red-600 text-xs pt-1'>{getHelperText(touched.ubpoBonusType, errors.ubpoBonusType)}</span>}
                            </FormControl>
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
        <Table columns={columnsBonusPoints} dataSource={dataBonusPoints} />
      </LayoutAdmin>
    </div>
  );
}
