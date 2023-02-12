import { Dialog, Transition, Listbox } from '@headlessui/react'
import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { doUsersRequest, doUserRequest, doUsersCreate, doDeleteUsers, doUpdateUsers } from '../../../redux/Actions/Users/reduceActions';
import { Box, Button, ButtonGroup, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, useTheme } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { tokens } from '@/theme';
import * as yup from "yup";
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import TextField from '@mui/material/TextField';
import { Form, Formik } from 'formik';
import RefreshIcon from '@mui/icons-material/Refresh';
import SaveIcon from '@mui/icons-material/Save';
import Input from '@mui/material/Input';
import Head from 'next/head';
import LayoutAdmin from '@/components/Layout/LayoutAdmin';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

export default function UsersUsers() {
  // defaine themes
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // define API GET users
  const [Data, setData]:any = useState([]);  
  const users = useSelector((state: any) => state.usersReducers.users);
  const dispatch = useDispatch();

  //  dispatch API GET users
  useEffect(() => {
    dispatch(doUsersRequest());
  },[]); 
  
  // setData API GET users
  useEffect(() => {
    if (users && users.results){
      setData(users.results)
    }
  });

  // column API GET users
  const columns = [
    {
      field: 'actions',
      headerName:'Actions',
      type: 'actions',
      flex: 0.5,

      getActions: (row:any) => [
        <GridActionsCellItem
          icon={<EditIcon color='warning' />}
          label="Edit"
          onClick={() => handleEdit(row.row.userId)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon color='warning' />}
          label="Delete"
          onClick={() => handleDelete(row.row.userId)}
        />,
      ],
    },
    {
      field: 'userId',
      headerName: 'ID',
      type:'number',
      flex: 0.2,
    },
    {
      field: 'userFullName',
      headerName: 'Full Name',
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: 'userCompanyName',
      headerName: 'Company',
      flex: 1,
    },
    {
      field: 'userEmail',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'userPhoneNumber',
      headerName: 'Phone',
      flex: 0.75,
    },
  ];

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
    userFullName: null,
    userCompanyName: null,
    userType: null,
    userEmail: null,
    userPhoneNumber: null,
    uspaPasswordhash: null,
    ubpoTotalPoints: null,
    ubpoBonusType: null,
    usmeMembName: null,
    usmePoints: null,
    usmeType: null,
    usroRole: null,
    usproNationalId: null,
    usproBirth: null,
    usproJobTitle: null,
    usproMaritalStatus: null,
    usproGender: null,
    usproAddr: 1
  });

  // function handler API POST users
  const eventHandlerAdd = (data:any) => (event:any) => {
    setDataUser({ ...DataUser, [data]: event.target.value });
  }
  
  // function handle submit form add new users (API POST users)
  const handleFormSubmit = (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    dispatchAdd(doUsersCreate(values));
    setTimeout(() => {
      dispatch(doUsersRequest());
      setIsOpenAdd(false);
    }, 500)
    setSubmitting(false);
  };

  // getHelper for display in form
  const getHelperText = (touched:any, errors:any) => {
    return (touched && errors ? errors : false)
  }

  // phone regExp
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  // check all validasi required & etc
  const checkoutSchema:any = yup.object().shape({
    userFullName: yup.string().required("required"),
    userType: yup.string().required("required"),
    userCompanyName: yup.string().required("required"),
    userEmail: yup.string().email("invalid email").required("required"),
    userPhoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid").required("required"),
    uspaPasswordhash: yup.string().required("required"),
    ubpoTotalPoints : yup.number().required("required"),
    ubpoBonusType : yup.string().required("required"),
    usmeMembName : yup.string().required("required"),
    usmePoints : yup.number().required("required"),
    usmeType : yup.string().required("required"), 
    usroRole: yup.number().required("required"),
    usproNationalId: yup.string().required("required"),
    usproBirth : yup.string().required("required"),
    usproJobTitle : yup.string().required("required"),
    usproMaritalStatus : yup.string().required("required"),
    usproGender : yup.string().required("required"),
    usproAddr : yup.number().required("required"),
  });

  // function initialValue field from table users
  const initialValues: any = {
    userId:null,
    userFullName: "",
    userType:"",
    userCompanyName: "",
    userEmail: "",
    userPhoneNumber: "",
    uspaPasswordhash: "",
    ubpoTotalPoints : 0,
    ubpoBonusType : "",
    usmeMembName : "",
    usmePoints : 0,
    usmeType : "", 
    usroRole: null,
    usproNationalId: "",
    usproBirth : "",
    usproJobTitle : "",
    usproMaritalStatus : "",
    usproGender : "",
    usproAddr : 1
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
    userId: null,
    userFullName: null,
    userCompanyName: null,
    userType: null,
    userEmail: null,
    userPhoneNumber: null,
    uspaPasswordhash: null,
    ubpoTotalPoints: null,
    ubpoBonusType: null,
    usmeMembName: null,
    usmePoints: null,
    usmeType: null,
    usroRole: null,
    usproNationalId: null,
    usproBirth: "",
    usproJobTitle: null,
    usproMaritalStatus: null,
    usproGender: null,
    usproAddr: null
  })

  //  function : open modals Edit user
  function openModalEdit() {
    setIsOpenEdit(true);
  }
  
  const user = useSelector((state: any) => state.usersReducers.user);

  // function handler API PUT user
  const handleEdit = (id: number) => {
    const displayedPayload:any = dispatchEdit(doUserRequest(id));
    if (displayedPayload.payload == id) {
      if (user) {
        if (user.results) {
          const displayedUser:any = user.results[0];
          if (displayedUser) {
            if (displayedUser.user_id == id) {
              openModalEdit();
              const dateBirth = moment(displayedUser.uspro_birth).format("YYYY-MM-DD");
              setDataUserEdit({
                ...DataUserEdit,
                userId: displayedUser.user_id,
                userFullName: displayedUser.user_full_name,
                userCompanyName: displayedUser.user_company_name,
                userType: displayedUser.user_type,
                userEmail: displayedUser.user_email,
                userPhoneNumber: displayedUser.user_phone_number,
                ubpoTotalPoints: displayedUser.ubpo_total_points,
                ubpoBonusType: displayedUser.ubpo_bonus_type,
                usmeMembName: displayedUser.usme_memb_name,
                usmePoints: displayedUser.usme_points,
                usmeType: displayedUser.usme_type,
                usroRole: displayedUser.role_id,
                usproNationalId: displayedUser.uspro_national_id,
                usproBirth: dateBirth,
                usproJobTitle: displayedUser.uspro_job_title,
                usproMaritalStatus: displayedUser.uspro_marital_status,
                usproGender: displayedUser.uspro_gender,
                usproAddr: displayedUser.uspro_addr
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
    dispatchEdit(doUpdateUsers(DataUserEdit.userId, values));
    setTimeout(() => {
      dispatch(doUsersRequest());
      setIsOpenEdit(false);
    }, 500);
    setSubmitting(false);
  };

  const dispatchDelete = useDispatch();
  
  // function handler API DELETE user
  const handleDelete = (id: number) => {
    //  dispatch API DELETE users
    dispatchDelete(doDeleteUsers(id)); 
    setTimeout(() => {
      dispatch(doUsersRequest());
    }, 500);
  }
  
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const DataWithId = Data.map((row:any) => ({
    ...row,
    id: uuidv4(),
    userId: row.userId
  }));

  return (
    <Box>
      <Head>
        <title>Users</title>
      </Head>
      <LayoutAdmin>

      <p className="text-gray-700 text-3xl mb-16 font-bold">Users / Users</p>
      <ButtonGroup className="align-middle bg-gray">
        <Button
            type="button"
            onClick={openModalAdd}
            color="warning"
            className="rounded-md bg-warning text-warning-500 border-warning-500 first-line:bg-opacity-20 px-4 py-2 text-sm font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <PlusIcon width={20} /><span className='text-transparent'>-</span> Add
        </Button>
      </ButtonGroup>
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
                  <Dialog.Panel className="w-full max-w-md transform max-h-96 overflow-y-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-black"
                    >
                      Add New User
                    </Dialog.Title>
                    <br></br>
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
                          <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                          >
                            {/* FullName */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="text"
                              label="Full Name"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('userFullName')(event); handleChange(event)}}
                              value={values.userFullName}
                              name="userFullName"
                              error={!!touched.userFullName && !!errors.userFullName}
                              helperText={getHelperText(touched.userFullName, errors.userFullName)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usproBirth */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="date"
                              label="Birth"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('usproBirth')(event); handleChange(event)}}
                              value={values.usproBirth}
                              name="usproBirth"
                              error={!!touched.usproBirth && !!errors.usproBirth}
                              helperText={getHelperText(touched.usproBirth, errors.usproBirth)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usproGender */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="usproGender" color="warning">Gender</InputLabel>
                              <Select
                                placeholder="Select gender ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Gender"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerAdd('usproGender')(event); handleChange(event)}}
                                value={values.usproGender}
                                name="usproGender"
                                error={!!touched.usproGender && !!errors.usproGender}
                                // helperText={getHelperText(touched.usproGender, errors.usproGender)}
                            >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='M'>Male</MenuItem>
                                <MenuItem value='F'>Female</MenuItem>
                            </Select>
                            {!!touched.usproGender && !!errors.usproGender && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.usproGender, errors.usproGender)}</span>}
                            </FormControl>

                            {/* usproMaritalStatus */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="usproMaritalStatus" color="warning">Marital Status</InputLabel>
                              <Select
                                placeholder="Select status ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Marital Status"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerAdd('usproMaritalStatus')(event); handleChange(event)}}
                                value={values.usproMaritalStatus}
                                name="usproMaritalStatus"
                                error={!!touched.usproMaritalStatus && !!errors.usproMaritalStatus}
                                // helperText={getHelperText(touched.usproMaritalStatus, errors.usproMaritalStatus)}
                            >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='S'>Single</MenuItem>
                                <MenuItem value='M'>Married</MenuItem>
                            </Select>
                            {!!touched.usproMaritalStatus && !!errors.usproMaritalStatus && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.usproMaritalStatus, errors.usproMaritalStatus)}</span>}
                            </FormControl>

                            {/* UserType */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="userType" color="warning">Type</InputLabel>
                              <Select
                                placeholder="Select type ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Type"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerAdd('userType')(event); handleChange(event)}}
                                value={values.userType}
                                name="userType"
                                error={!!touched.userType && !!errors.userType}
                                // helperText={getHelperText(touched.userType, errors.userType)}
                            >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='T'>Travel Agent</MenuItem>
                                <MenuItem value='C'>Company</MenuItem>
                                <MenuItem value='I'>Individual</MenuItem>
                            </Select>
                            {!!touched.userType && !!errors.userType && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.userType, errors.userType)}</span>}
                            </FormControl>

                            {/* Email */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="email"
                              label="Email"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('userEmail')(event); handleChange(event)}}
                              value={values.userEmail}
                              name="userEmail"
                              error={!!touched.userEmail && !!errors.userEmail}
                              helperText={getHelperText(touched.userEmail, errors.userEmail)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* uspaPasswordhash */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type={showPassword ? 'text' : 'password'}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={() => setShowPassword(!showPassword)}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              label="Password"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('uspaPasswordhash')(event); handleChange(event)}}
                              value={values.uspaPasswordhash}
                              name="uspaPasswordhash"
                              error={!!touched.uspaPasswordhash && !!errors.uspaPasswordhash}
                              helperText={getHelperText(touched.uspaPasswordhash, errors.uspaPasswordhash)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* PhoneNumber */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="text"
                              label="Phone Number"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('userPhoneNumber')(event); handleChange(event)}}
                              value={values.userPhoneNumber}
                              name="userPhoneNumber"
                              error={!!touched.userPhoneNumber && !!errors.userPhoneNumber}
                              helperText={getHelperText(touched.userPhoneNumber, errors.userPhoneNumber)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usproNationalId */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="text"
                              label="National ID"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('usproNationalId')(event); handleChange(event)}}
                              value={values.usproNationalId}
                              name="usproNationalId"
                              error={!!touched.usproNationalId && !!errors.usproNationalId}
                              helperText={getHelperText(touched.usproNationalId, errors.usproNationalId)}
                              sx={{ gridColumn: "span 4" }}
                            />
                            
                            {/* usproAddr */}

                            {/* CompanyName */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="text"
                              label="Company Name"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('userCompanyName')(event); handleChange(event)}}
                              value={values.userCompanyName}
                              name="userCompanyName"
                              error={!!touched.userCompanyName && !!errors.userCompanyName}
                              helperText={getHelperText(touched.userCompanyName, errors.userCompanyName)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usproJobTitle */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="text"
                              label="Job Title"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('usproJobTitle')(event); handleChange(event)}}
                              value={values.usproJobTitle}
                              name="usproJobTitle"
                              error={!!touched.usproJobTitle && !!errors.usproJobTitle}
                              helperText={getHelperText(touched.usproJobTitle, errors.usproJobTitle)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usmeType */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="usmeType" color="warning">Member Type</InputLabel>
                              <Select
                                placeholder="Select Type ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Member Type"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerAdd('usmeType')(event); handleChange(event)}}
                                value={values.usmeType}
                                name="usmeType"
                                error={!!touched.usmeType && !!errors.usmeType}
                                // helperText={getHelperText(touched.usmeType, errors.usmeType)}
                            >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='default'>default</MenuItem>
                                <MenuItem value='expired'>expired</MenuItem>
                            </Select>
                            {!!touched.usmeType && !!errors.usmeType && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.usmeType, errors.usmeType)}</span>}
                            </FormControl>

                            {/* usmeMembName */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="usmeMembName" color="warning">Member Name</InputLabel>
                              <Select
                                placeholder="Select Name ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Member Name"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerAdd('usmeMembName')(event); handleChange(event)}}
                                value={values.usmeMembName}
                                name="usmeMembName"
                                error={!!touched.usmeMembName && !!errors.usmeMembName}
                                // helperText={getHelperText(touched.usmeMembName, errors.usmeMembName)}
                            >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='SILVER'>SILVER</MenuItem>
                                <MenuItem value='GOLD'>GOLD</MenuItem>
                                <MenuItem value='VIP'>VIP</MenuItem>
                                <MenuItem value='WIZARD'>WIZARD</MenuItem>
                            </Select>
                            {!!touched.usmeMembName && !!errors.usmeMembName && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.usmeMembName, errors.usmeMembName)}</span>}
                            </FormControl>

                            {/* usmePoints */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="number"
                              label="Member Points"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('usmePoints')(event); handleChange(event)}}
                              value={values.usmePoints}
                              name="usmePoints"
                              error={!!touched.usmePoints && !!errors.usmePoints}
                              helperText={getHelperText(touched.usmePoints, errors.usmePoints)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* ubpoBonusType */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="ubpoBonusType" color="warning">Bonus Type</InputLabel>
                              <Select
                                placeholder="Select type ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Bonus Type"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerAdd('ubpoBonusType')(event); handleChange(event)}}
                                value={values.ubpoBonusType}
                                name="ubpoBonusType"
                                error={!!touched.ubpoBonusType && !!errors.ubpoBonusType}
                                // helperText={getHelperText(touched.ubpoBonusType, errors.ubpoBonusType)}
                            >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='R'>Rating</MenuItem>
                                <MenuItem value='P'>Promote</MenuItem>
                            </Select>
                            {!!touched.ubpoBonusType && !!errors.ubpoBonusType && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.ubpoBonusType, errors.ubpoBonusType)}</span>}
                            </FormControl>

                            {/* ubpoTotalPoints */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="number"
                              label="Total Bonus Points"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('ubpoTotalPoints')(event); handleChange(event)}}
                              value={values.ubpoTotalPoints}
                              name="ubpoTotalPoints"
                              error={!!touched.ubpoTotalPoints && !!errors.ubpoTotalPoints}
                              helperText={getHelperText(touched.ubpoTotalPoints, errors.ubpoTotalPoints)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usroRole */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="usroRole" color="warning">Role</InputLabel>
                              <Select
                                placeholder="Select role ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Role"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerAdd('usroRole')(event); handleChange(event)}}
                                value={values.usroRole}
                                name="usroRole"
                                error={!!touched.usroRole && !!errors.usroRole}
                                // helperText={getHelperText(touched.usroRole, errors.usroRole)}
                            >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value={1}>Guest</MenuItem>
                                <MenuItem value={2}>Manager</MenuItem>
                                <MenuItem value={3}>Office Boy</MenuItem>
                                <MenuItem value={4}>Admin</MenuItem>
                                <MenuItem value={5}>User</MenuItem>
                            </Select>
                            {!!touched.usroRole && !!errors.usroRole && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.usroRole, errors.usroRole)}</span>}
                            </FormControl>

                          </Box>
                          <Box display="flex" justifyContent="center" mt="20px">
                            <Box display="flex">
                              <Button
                                type="reset"
                                color="warning"
                                className="rounded-md bg-yellow-100 text-yellow-500 border-warning-500 first-line:bg-opacity-20 px-4 py-2 text-sm font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                  <RefreshIcon width={15} height={15}/>
                              </Button>
                            </Box>
                            <Box display="flex" pl="100px">
                              <Button
                                type="submit"
                                color="success"
                                className="rounded-md bg-green-100 text-green-500 border-warning-500 first-line:bg-opacity-20 px-4 py-2 text-sm font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                <SaveIcon width={15} height={15} />
                              </Button>
                            </Box>
                            <Box display="flex" pl="100px">
                              <Button
                                onClick={closeModalAdd}
                                type="button"
                                color="error"
                                className="rounded-md bg-red-100 text-red-500 border-error-500 first-line:bg-opacity-20 px-4 py-2 text-sm font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                  <XMarkIcon width={20} height={20}/>
                              </Button>
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
                  <Dialog.Panel className="w-full max-w-md transform max-h-96 overflow-y-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                    className="text-lg font-medium leading-6 text-black"
                    >
                      Edit User
                    </Dialog.Title>
                    <br></br>
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
                          <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                          >
                          <Input
                            hidden
                            type='hidden'
                            value={values.userId=DataUserEdit.userId}
                            />

                            {/* FullName */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="text"
                              label="Full Name"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerEdit('userFullName')(event); handleChange(event)}}
                              value={values.userFullName?values.userFullName:values.userFullName=DataUserEdit.userFullName}                            
                              name="userFullName"
                              error={!!touched.userFullName && !!errors.userFullName}
                              helperText={getHelperText(touched.userFullName, errors.userFullName)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usproBirth */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="date"
                              label="Birth"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('usproBirth')(event); handleChange(event)}}
                              value={values.usproBirth?values.usproBirth:values.usproBirth=DataUserEdit.usproBirth}
                              name="usproBirth"
                              error={!!touched.usproBirth && !!errors.usproBirth}
                              helperText={getHelperText(touched.usproBirth, errors.usproBirth)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usproGender */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="usproGender" color="warning">Gender</InputLabel>
                              <Select
                                placeholder="Select gender ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Gender"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerAdd('usproGender')(event); handleChange(event)}}
                                value={values.usproGender?values.usproGender:values.usproGender=DataUserEdit.usproGender}
                                name="usproGender"
                                error={!!touched.usproGender && !!errors.usproGender}
                                // helperText={getHelperText(touched.usproGender, errors.usproGender)}
                            >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='M'>Male</MenuItem>
                                <MenuItem value='F'>Female</MenuItem>
                            </Select>
                            {!!touched.usproGender && !!errors.usproGender && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.usproGender, errors.usproGender)}</span>}
                            </FormControl>

                            {/* usproMaritalStatus */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="usproMaritalStatus" color="warning">Marital Status</InputLabel>
                              <Select
                                placeholder="Select status ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Marital Status"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerAdd('usproMaritalStatus')(event); handleChange(event)}}
                                value={values.usproMaritalStatus?values.usproMaritalStatus:values.usproMaritalStatus=DataUserEdit.usproMaritalStatus}
                                name="usproMaritalStatus"
                                error={!!touched.usproMaritalStatus && !!errors.usproMaritalStatus}
                                // helperText={getHelperText(touched.usproMaritalStatus, errors.usproMaritalStatus)}
                            >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='S'>Single</MenuItem>
                                <MenuItem value='M'>Married</MenuItem>
                            </Select>
                            {!!touched.usproMaritalStatus && !!errors.usproMaritalStatus && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.usproMaritalStatus, errors.usproMaritalStatus)}</span>}
                            </FormControl>
                            
                            {/* UserType */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }} error={!!touched.userType && !!errors.userType}>
                              <InputLabel id="userType" color="warning">Type</InputLabel>
                              <Select
                                placeholder="Select type ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Type"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerEdit('userType')(event); handleChange(event)}}
                                value={values.userType?values.userType:values.userType=DataUserEdit.userType}
                                name="userType"
                              >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='T'>Travel Agent</MenuItem>
                                <MenuItem value='C'>Company</MenuItem>
                                <MenuItem value='I'>Individual</MenuItem>
                            </Select>
                            {!!touched.userType && !!errors.userType && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.userType, errors.userType)}</span>}
                            </FormControl>

                            {/* Email */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="email"
                              label="Email"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerEdit('userEmail')(event); handleChange(event)}}
                              value={values.userEmail?values.userEmail:values.userEmail=DataUserEdit.userEmail}
                              name="userEmail"
                              error={!!touched.userEmail && !!errors.userEmail}
                              helperText={getHelperText(touched.userEmail, errors.userEmail)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* uspaPasswordhash */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type={showPassword ? 'text' : 'password'}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={() => setShowPassword(!showPassword)}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              label="Password"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('uspaPasswordhash')(event); handleChange(event)}}
                              value={values.uspaPasswordhash}
                              name="uspaPasswordhash"
                              error={!!touched.uspaPasswordhash && !!errors.uspaPasswordhash}
                              helperText={getHelperText(touched.uspaPasswordhash, errors.uspaPasswordhash)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* PhoneNumber */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="text"
                              label="Phone Number"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerEdit('userPhoneNumber')(event); handleChange(event)}}
                              value={values.userPhoneNumber?values.userPhoneNumber:values.userPhoneNumber=DataUserEdit.userPhoneNumber}
                              name="userPhoneNumber"
                              error={!!touched.userPhoneNumber && !!errors.userPhoneNumber}
                              helperText={getHelperText(touched.userPhoneNumber, errors.userPhoneNumber)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usproNationalId */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="text"
                              label="National ID"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('usproNationalId')(event); handleChange(event)}}
                              value={values.usproNationalId?values.usproNationalId:values.usproNationalId=DataUserEdit.usproNationalId}
                              name="usproNationalId"
                              error={!!touched.usproNationalId && !!errors.usproNationalId}
                              helperText={getHelperText(touched.usproNationalId, errors.usproNationalId)}
                              sx={{ gridColumn: "span 4" }}
                            />
                            
                            {/* usproAddr */}

                            {/* CompanyName */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="text"
                              label="Company Name"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerEdit('userCompanyName')(event); handleChange(event)}}
                              value={values.userCompanyName?values.userCompanyName:values.userCompanyName=DataUserEdit.userCompanyName}
                              name="userCompanyName"
                              error={!!touched.userCompanyName && !!errors.userCompanyName}
                              helperText={getHelperText(touched.userCompanyName, errors.userCompanyName)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usproJobTitle */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="text"
                              label="Job Title"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('usproJobTitle')(event); handleChange(event)}}
                              value={values.usproJobTitle?values.usproJobTitle:values.usproJobTitle=DataUserEdit.usproJobTitle}
                              name="usproJobTitle"
                              error={!!touched.usproJobTitle && !!errors.usproJobTitle}
                              helperText={getHelperText(touched.usproJobTitle, errors.usproJobTitle)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usmeType */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="usmeType" color="warning">Member Type</InputLabel>
                              <Select
                                placeholder="Select Type ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Member Type"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerAdd('usmeType')(event); handleChange(event)}}
                                value={values.usmeType?values.usmeType:values.usmeType=DataUserEdit.usmeType}
                                name="usmeType"
                                error={!!touched.usmeType && !!errors.usmeType}
                                // helperText={getHelperText(touched.usmeType, errors.usmeType)}
                            >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='default'>default</MenuItem>
                                <MenuItem value='expired'>expired</MenuItem>
                            </Select>
                            {!!touched.usmeType && !!errors.usmeType && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.usmeType, errors.usmeType)}</span>}
                            </FormControl>

                            {/* usmeMembName */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="usmeMembName" color="warning">Member Name</InputLabel>
                              <Select
                                placeholder="Select Name ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Member Name"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerAdd('usmeMembName')(event); handleChange(event)}}
                                value={values.usmeMembName?values.usmeMembName:values.usmeMembName=DataUserEdit.usmeMembName}
                                name="usmeMembName"
                                error={!!touched.usmeMembName && !!errors.usmeMembName}
                                // helperText={getHelperText(touched.usmeMembName, errors.usmeMembName)}
                            >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='SILVER'>SILVER</MenuItem>
                                <MenuItem value='GOLD'>GOLD</MenuItem>
                                <MenuItem value='VIP'>VIP</MenuItem>
                                <MenuItem value='WIZARD'>WIZARD</MenuItem>
                            </Select>
                            {!!touched.usmeMembName && !!errors.usmeMembName && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.usmeMembName, errors.usmeMembName)}</span>}
                            </FormControl>

                            {/* usmePoints */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="number"
                              label="Member Points"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('usmePoints')(event); handleChange(event)}}
                              value={values.usmePoints?values.usmePoints:values.usmePoints=DataUserEdit.usmePoints}
                              name="usmePoints"
                              error={!!touched.usmePoints && !!errors.usmePoints}
                              helperText={getHelperText(touched.usmePoints, errors.usmePoints)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* ubpoBonusType */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="ubpoBonusType" color="warning">Bonus Type</InputLabel>
                              <Select
                                placeholder="Select type ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Bonus Type"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerAdd('ubpoBonusType')(event); handleChange(event)}}
                                value={values.ubpoBonusType?values.ubpoBonusType:values.ubpoBonusType=DataUserEdit.ubpoBonusType}
                                name="ubpoBonusType"
                                error={!!touched.ubpoBonusType && !!errors.ubpoBonusType}
                                // helperText={getHelperText(touched.ubpoBonusType, errors.ubpoBonusType)}
                            >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='R'>Rating</MenuItem>
                                <MenuItem value='P'>Promote</MenuItem>
                            </Select>
                            {!!touched.ubpoBonusType && !!errors.ubpoBonusType && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.ubpoBonusType, errors.ubpoBonusType)}</span>}
                            </FormControl>

                            {/* ubpoTotalPoints */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="number"
                              label="Total Bonus Points"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('ubpoTotalPoints')(event); handleChange(event)}}
                              value={values.ubpoTotalPoints?values.ubpoTotalPoints:values.ubpoTotalPoints=DataUserEdit.ubpoTotalPoints}
                              name="ubpoTotalPoints"
                              error={!!touched.ubpoTotalPoints && !!errors.ubpoTotalPoints}
                              helperText={getHelperText(touched.ubpoTotalPoints, errors.ubpoTotalPoints)}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usroRole */}
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="usroRole" color="warning">Role</InputLabel>
                              <Select
                                placeholder="Select role ..."
                                color="warning"
                                fullWidth
                                variant="filled"
                                className='form-control'
                                label="Role"
                                onBlur={handleBlur}                             
                                onChange={(event) => {eventHandlerAdd('usroRole')(event); handleChange(event)}}
                                value={values.usroRole?values.usroRole:values.usroRole=DataUserEdit.usroRole}
                                name="usroRole"
                                error={!!touched.usroRole && !!errors.usroRole}
                                // helperText={getHelperText(touched.usroRole, errors.usroRole)}
                            >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value={1}>Guest</MenuItem>
                                <MenuItem value={2}>Manager</MenuItem>
                                <MenuItem value={3}>Office Boy</MenuItem>
                                <MenuItem value={4}>Admin</MenuItem>
                                <MenuItem value={5}>User</MenuItem>
                            </Select>
                            {!!touched.usroRole && !!errors.usroRole && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.usroRole, errors.usroRole)}</span>}
                            </FormControl>
                            
                          </Box>

                          <Box display="flex" justifyContent="center" mt="20px">
                            <Box display="flex">
                              <Button
                                type="reset"
                                color="warning"
                                className="rounded-md bg-yellow-100 text-yellow-500 border-warning-500 first-line:bg-opacity-20 px-4 py-2 text-sm font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                  <RefreshIcon width={15} height={15}/>
                              </Button>
                            </Box>
                            <Box display="flex" pl="100px">
                              <Button
                                type="submit"
                                color="success"
                                className="rounded-md bg-green-100 text-green-500 border-warning-500 first-line:bg-opacity-20 px-4 py-2 text-sm font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                <SaveIcon width={15} height={15} />
                              </Button>
                            </Box>
                            <Box display="flex" pl="100px">
                              <Button
                                onClick={closeModalEdit}
                                type="button"
                                color="error"
                                className="rounded-md bg-red-100 text-red-500 border-error-500 first-line:bg-opacity-20 px-4 py-2 text-sm font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                  <XMarkIcon width={20} height={20}/>
                              </Button>
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
      <Box
        className="rounded-2xl"
        sx={{
          height: 10,
          width: '100%', 
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.primary[100],
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "none",
            backgroundColor: colors.grey[800],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.grey[800],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]}`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.redAccent[500]} !important`,
          },
        }}
      >
        {/* <table className='table'>
          <thead>
              <tr> 
                  <th>ID</th>
                  <th>Username</th>
              </tr>
          </thead>
          <tbody>
          {
            users && users.results.map(
              (user: any) => {
                return (
                  <tr>
                      <td>{ user.userId }</td>
                      <td>{ user.userFullName }</td>
                  </tr>
                )
              }
            )
          }
          </tbody>
        </table> */}
        {
          <DataGrid
            autoHeight
            pageSize={5}
            rowsPerPageOptions={[5, 10, 15, 20]}
            rows={DataWithId}
            columns={columns}
            getRowId={(rows:any) => rows.id}
            components={{ Toolbar: GridToolbar }} 
          />
        }
      </Box>
      </LayoutAdmin>
    </Box>
  );
}
