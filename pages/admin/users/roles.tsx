import { Dialog, Transition } from '@headlessui/react'
import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { doRolesRequest, doRolesCreate, doRoleRequest, doUpdateRoles, doDeleteRoles } from '../../../redux/Actions/Users/reduceActions';
import { Box, Button, ButtonGroup, useTheme } from "@mui/material"
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
import { v4 as uuidv4 } from 'uuid';

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

  // column API GET users
  const columns = [
    {
      field: 'actions',
      headerName:'Actions',
      type: 'actions',
      flex: 0.2,

      getActions: (row:any) => [
        <GridActionsCellItem
          icon={<EditIcon color='warning' />}
          label="Edit"
          onClick={() => handleEdit(row.row.roleId)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon color='warning' />}
          label="Delete"
          onClick={() => handleDelete(row.row.roleId)}
        />,
      ],
    },
    {
      field: 'roleId',
      headerName: 'ID',
      type:'number',
      flex: 0.2,
    },
    {
      field: 'roleName',
      headerName: 'Role Name',
      cellClassName: "name-column--cell",
      flex: 1,
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
      dispatch(doRolesRequest());
    }, 500);
  }

  const DataWithId = Data.map((row:any) => ({
    ...row,
    id: uuidv4(),
    roleId: row.roleId
  }));

  return (
    <Box>
      <Head>
        <title>Users</title>
      </Head>
      <LayoutAdmin>

      <p className="text-gray-700 text-3xl mb-16 font-bold">Users / Roles</p>
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
                      Add New Role
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
                            {/* RoleName */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="text"
                              label="Role Name"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerAdd('roleName')(event); handleChange(event)}}
                              value={values.roleName}
                              name="roleName"
                              error={!!touched.roleName && !!errors.roleName}
                              helperText={getHelperText(touched.roleName, errors.roleName)}
                              sx={{ gridColumn: "span 4" }}
                            />
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
                      Edit Role
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
                            value={values.roleId=DataUserEdit.roleId}
                            />

                            {/* RoleName */}
                            <TextField
                              color="warning"
                              fullWidth
                              variant="filled"
                              type="text"
                              label="Role Name"
                              onBlur={handleBlur}
                              onChange={(event) => {eventHandlerEdit('roleName')(event); handleChange(event)}}
                              value={values.roleName?values.roleName:values.roleName=DataUserEdit.roleName}                            
                              name="roleName"
                              error={!!touched.roleName && !!errors.roleName}
                              helperText={getHelperText(touched.roleName, errors.roleName)}
                              sx={{ gridColumn: "span 4" }}
                            />
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
