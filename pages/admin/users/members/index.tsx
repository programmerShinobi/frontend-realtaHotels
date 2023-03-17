import { Dialog, Transition } from '@headlessui/react'
import React, { useState, useEffect, Fragment, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { doMembersRequest, doMembersCreate, doMemberRequest, doUpdateMembers, doDeleteMembers, doUsersRequest } from '@/redux/Actions/Users/reduceActions';
import { Box, FormControl, InputLabel, MenuItem, Select, useTheme } from "@mui/material";
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
  QuestionCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import ComponentsIndicatorToast from '@/components/Indicator/toast';

export default function UsersMembers() {
  // defaine themes
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // define API GET members
  const [Data, setData]:any = useState([]);  
  const members = useSelector((state: any) => state.usersReducers.members);
  const dispatch = useDispatch();

  //  dispatch API GET users
  useEffect(() => {
    dispatch(doMembersRequest());
  },[]); 
  
  // setData API GET users
  useEffect(() => {
    if (members && members.results){
      setData(members.results)
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
    usmeMembName: null,
    usmeUser: null,
    usmePoints: null,
    usmeType:null

  });

  // function handler API POST users
  const eventHandlerAdd = (data:any) => (event:any) => {
    setDataUser({ ...DataUser, [data]: event.target.value });
  }
  
  // function handle submit form add new users (API POST users)
  const handleFormSubmit = (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    dispatchAdd(doMembersCreate(values));
    setTimeout(() => {
      ComponentsIndicatorToast({status: 'success', message: 'Data inserted successfully'});
      dispatch(doMembersRequest());
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
    usmeMembName: yup.string().required("required"),
    usmeUser: yup.string().required("required"),
    usmePoints: yup.string().required("required"),
    usmeType:yup.string().required("required")
  });

  // function initialValue field from table users
  const initialValues: any = {
    usmeId:null,
    usmeMembName: "",
    usmeUser: "" ,
    usmePoints: "",
    usmeType:""
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
    usmeId: null,
    usmeMembName: null,
    usmeUser: null,
    usmePoints: null,
    usmeType:null
  })

  //  function : open modals Edit user
  function openModalEdit() {
    setIsOpenEdit(true);
  }
  
  const user = useSelector((state: any) => state.usersReducers.user);
  
  // function handler API PUT user
  const handleEdit = (id: number) => {
    const displayedPayload:any = dispatchEdit(doMemberRequest(id));
    if (displayedPayload.payload == id) {
      if (user) {
        if (user.results) {
          const displayedUser:any = user.results;
          if (displayedUser) {
            if (displayedUser.usmeId == id) {
              openModalEdit();
              setDataUserEdit({
                ...DataUserEdit,
                usmeId: displayedUser.usmeId,
                usmeMembName: displayedUser.usmeMembName.membName,
                usmeUser: displayedUser.usmeUser.userId,
                usmePoints: displayedUser.usmePoints,
                usmeType: displayedUser.usmeType,
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
    dispatchEdit(doUpdateMembers(DataUserEdit.usmeId, values));
    setTimeout(() => {
      ComponentsIndicatorToast({status: 'success', message: 'Data updated successfully'});
      dispatch(doMembersRequest());
      setIsOpenEdit(false);
    }, 500);
    setSubmitting(false);
  };

  const dispatchDelete = useDispatch();
  
  // function handler API DELETE user
  const handleDelete = (id: number) => {
    //  dispatch API DELETE users
    dispatchDelete(doDeleteMembers(id)); 
    setTimeout(() => {
      ComponentsIndicatorToast({status: 'success', message: 'Data deleted successfully'});
      dispatch(doMembersRequest());
    }, 500);
  }

  // Members
  interface DataTypeMembers {
    usmeId: number;
    usmeUser: {
      userFullName: string,
      userPhoneNumber: string,
    };
    usmeMembName: {
      membName: string
    };
    usmePoints: number;
    usmeType: string;
    usmePromoteDate: string;
  }
  type DataIndexMembers = keyof DataTypeMembers;

  const dataMembers: DataTypeMembers[] = members ? members.results : '';

  // Search data in by column Tables
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  // Handle Search data in by column Members Table
  const handleSearchMembers = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndexMembers,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // Handle Reset (search) data in by column Members Table
  const handleResetMembers = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  // Get Column Search - Members
  const getColumnSearchPropsMembers = (dataIndex: DataIndexMembers): ColumnType<DataTypeMembers> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex=='usmePromoteDate'?'Year':dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearchMembers(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            onClick={() => handleSearchMembers(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined className="mb-6"  />}
            size="small"
            style={{ width: 32, height:32 }}
          >
          </Button>
          <Button
            onClick={() => clearFilters && handleResetMembers(clearFilters)}
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

  // column Members
  const columnsMembers: ColumnsType<DataTypeMembers> = [
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
        <Space size="middle" className="items-center">
          <Dropdown
            className="items-center"
            overlay={(
              <Menu className="hover:text-blue-600 items-center space-y-1">
                <Menu.Item className="border hover:border-blue-600 hover:text-blue-600 items-center" key={`Edit${record.usmeId}`} onClick={() => handleEdit(record.usmeId)}>
                  <EditOutlined />{" Edit"}
                </Menu.Item>
                <Menu.Item className="border hover:border-red-600 hover:text-red-600 items-center" key={`Delete${record.usmeId}`}>
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete members?"
                    onConfirm={() => {
                      if ({ confirm }) {
                        handleDelete(record.usmeId);
                      }
                    }}
                    okText="Yes"
                    cancelText="No"
                    placement="rightTop" arrow
                    className="items-center"
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
      dataIndex: 'usmeId',
      key: 'usmeId',
      width: '10%',
      ...getColumnSearchPropsMembers('usmeId'),
      sorter: (a:any, b:any) => a.usmeId - b.usmeId,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Promote Date',
      dataIndex: 'usmePromoteDate',
      key: 'usmePromoteDate',
      width: '15%',
      ...getColumnSearchPropsMembers('usmePromoteDate'),
      render: (_, { usmePromoteDate }) => {
        if (!usmePromoteDate) {
          return (<>{"None"}</>);
        }
        return (
          <>{moment(usmePromoteDate).format("DD-MMM-YYYY")}</>
        )
      }
    },
    {
      title: 'Employee Name',
      dataIndex: ['usmeUser', 'userFullName'],
      key: 'usmeUser.userFullName',
      render: (_, { usmeUser }:any) => {
        if (!usmeUser || !usmeUser.userFullName) {
          return (<>{"None"}</>);
        }

        return usmeUser.userFullName;
      },
    },
    {
      title: 'Member Name',
      dataIndex: ['usmeMembName', 'membName'],
      key: 'usmeMembName.membName',
      render: (_, { usmeMembName }) => {
        if (!usmeMembName || !usmeMembName.membName) {
          return (<>{"None"}</>);
        }

        const { membName } = usmeMembName;
        let color = 'white';
        if (membName === 'WIZARD') {
          color = 'green';
        } else if (membName === 'VIP') {
          color = 'purple';
        } else if (membName === 'GOLD') {
          color = 'gold';
        } else if (membName === 'SILVER') {
          color = 'gray';
        }
        return (
          <Tag color={color} key={membName}>
            {membName.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Points',
      dataIndex: 'usmePoints',
      key: 'usmePoints',
      ...getColumnSearchPropsMembers('usmePoints'),
      sorter: (a:any, b:any) => a.usmePoints - b.usmePoints,
      sortDirections: ['descend', 'ascend'],
      render: (_, { usmePoints }:any) => {
        if (!usmePoints) {
          return (<>{"None"}</>);
        }

        return usmePoints;
      },
    },
    {
      title: 'Status',
      dataIndex: 'usmeType',
      key: 'usmeType',
      ...getColumnSearchPropsMembers('usmeType'),
      render: (_, { usmeType }) => {
          if (!usmeType) {
            return (<>{"None"}</>);
          }
        let color = 'white';
          if (usmeType === 'default') {
            color = 'green';
          } else if (usmeType === 'expired') {
            color = 'volcano';
          } else {
            color = 'white';
          }
        return (
          <Tag color={color} key={usmeType}>
            {usmeType?usmeType.toUpperCase():''}
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
        <title>Users/Members</title>
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
                        Add New Member
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
                          {/* Add Members */}
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
                                onChange={(event) => {eventHandlerAdd('usmeUser')(event); handleChange(event)}}
                                value={values.usmeUser}
                                name="usmeUser"
                                error={!!touched.usmeUser && !!errors.usmeUser}
                              >
                                <MenuItem value=''><em>none</em></MenuItem>
                                {
                                  Users && Users.map((users:any) => 
                                  (
                                    <MenuItem value={users.userId}>{users.userFullName}</MenuItem>
                                  ))
                                }
                            </Select>
                            {!!touched.usmeUser && !!errors.usmeUser && <span className='text-red-600 text-xs pt-1'>{getHelperText(touched.usmeUser, errors.usmeUser)}</span>}
                            </FormControl>

                            {/* Memb.Name */}
                            <FormControl className="pb-4" fullWidth size="small" color="primary" variant="standard" error={!!touched.usmeMembName && !!errors.usmeMembName}>
                              <InputLabel id="membName" >Member Name</InputLabel>
                              <Select
                                size="small"
                                fullWidth
                                color="primary"
                                variant="standard"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerAdd('usmeMembName')(event); handleChange(event)}}
                                value={values.usmeMembName}
                                name="usmeMembName"
                                error={!!touched.usmeMembName && !!errors.usmeMembName}
                              >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='SILVER'>{'SILVER'}</MenuItem>
                                <MenuItem value='GOLD'>{'GOLD'}</MenuItem>
                                <MenuItem value='VIP'>{'VIP'}</MenuItem>
                                <MenuItem value='WIZARD'>{ 'WIZARD' }</MenuItem>
                            </Select>
                            {!!touched.usmeMembName && !!errors.usmeMembName && <span className='text-red-600 text-xs pt-1'>{getHelperText(touched.usmeMembName, errors.usmeMembName)}</span>}
                            </FormControl>
                            
                            <TextField
                              className="pb-4"
                              size="small"
                              fullWidth
                              color="primary"
                              variant="standard"
                              type="number"
                              label="Points"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('usmePoints')(event); handleChange(event)}}
                              value={values.usmePoints}
                              name="usmePoints"
                              error={!!touched.usmePoints && !!errors.usmePoints}
                              helperText={getHelperText(touched.usmePoints, errors.usmePoints)}
                            />  
                            {/* Status */}
                            <FormControl className="pb-4" fullWidth size="small" color="primary" variant="standard" error={!!touched.usmeMembName && !!errors.usmeMembName}>
                              <InputLabel id="status" >Status</InputLabel>
                              <Select
                                size="small"
                                fullWidth
                                color="primary"
                                variant="standard"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerAdd('usmeType')(event); handleChange(event)}}
                                value={values.usmeType}
                                name="usmeType"
                                error={!!touched.usmeType && !!errors.usmeType}
                              >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='default'>{'default'}</MenuItem>
                                <MenuItem value='expired'>{'expired'}</MenuItem>
                            </Select>
                            {!!touched.usmeType && !!errors.usmeType && <span className='text-red-600 text-xs pt-1'>{getHelperText(touched.usmeType, errors.usmeType)}</span>}
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
                        Edit Member
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
                          {/* Edit Members */}
                          <Box 
                            className="pl-8 pr-8 pb-4 space-y-2"
                          >
                            <TextField
                              variant='filled'
                              hidden
                              type='hidden'
                              value={values.usmeId=DataUserEdit.usmeId}
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
                                onChange={(event) => {eventHandlerEdit('usmeUser')(event); handleChange(event)}}
                                value={values.usmeUser ? values.usmeUser : values.usmeUser = DataUserEdit.usmeUser}                            
                                name="usmeUser"
                                error={!!touched.usmeUser && !!errors.usmeUser}
                              >
                                <MenuItem value=''><em>none</em></MenuItem>
                                {
                                  Users && Users.map((users:any) => 
                                  (
                                    <MenuItem value={users.userId}>{users.userFullName}</MenuItem>
                                  ))
                                }
                            </Select>
                            {!!touched.usmeUser && !!errors.usmeUser && <span className='text-red-600 text-xs pt-1'>{getHelperText(touched.usmeUser, errors.usmeUser)}</span>}
                            </FormControl>

                            {/* Memb.Name */}
                            <FormControl className="pb-4" fullWidth size="small" color="primary" variant="standard" error={!!touched.usmeMembName && !!errors.usmeMembName}>
                              <InputLabel id="membName" >Member Name</InputLabel>
                              <Select
                                size="small"
                                fullWidth
                                color="primary"
                                variant="standard"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerEdit('usmeMembName')(event); handleChange(event)}}
                                value={values.usmeMembName ? values.usmeMembName : values.usmeMembName = DataUserEdit.usmeMembName}
                                name="usmeMembName"
                                error={!!touched.usmeMembName && !!errors.usmeMembName}
                              >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='SILVER'>{'SILVER'}</MenuItem>
                                <MenuItem value='GOLD'>{'GOLD'}</MenuItem>
                                <MenuItem value='VIP'>{'VIP'}</MenuItem>
                                <MenuItem value='WIZARD'>{ 'WIZARD' }</MenuItem>
                            </Select>
                            {!!touched.usmeMembName && !!errors.usmeMembName && <span className='text-red-600 text-xs pt-1'>{getHelperText(touched.usmeMembName, errors.usmeMembName)}</span>}
                            </FormControl>
                            
                            <TextField
                              className="pb-4"
                              size="small"
                              fullWidth
                              color="primary"
                              variant="standard"
                              type="number"
                              label="Points"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerEdit('usmePoints')(event); handleChange(event)}}
                              value={values.usmePoints ? values.usmePoints : values.usmePoints = DataUserEdit.usmePoints}
                              name="usmePoints"
                              error={!!touched.usmePoints && !!errors.usmePoints}
                              helperText={getHelperText(touched.usmePoints, errors.usmePoints)}
                            />  
                            {/* Status */}
                            <FormControl className="pb-4" fullWidth size="small" color="primary" variant="standard" error={!!touched.usmeMembName && !!errors.usmeMembName}>
                              <InputLabel id="status" >Status</InputLabel>
                              <Select
                                size="small"
                                fullWidth
                                color="primary"
                                variant="standard"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerEdit('usmeType')(event); handleChange(event)}}
                                value={values.usmeType ? values.usmeType : values.usmeType = DataUserEdit.usmeType}
                                name="usmeType"
                                error={!!touched.usmeType && !!errors.usmeType}
                              >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='default'>{'default'}</MenuItem>
                                <MenuItem value='expired'>{'expired'}</MenuItem>
                            </Select>
                            {!!touched.usmeType && !!errors.usmeType && <span className='text-red-600 text-xs pt-1'>{getHelperText(touched.usmeType, errors.usmeType)}</span>}
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
        <Table columns={columnsMembers} dataSource={dataMembers} />
      </LayoutAdmin>
    </div>
  );
}
