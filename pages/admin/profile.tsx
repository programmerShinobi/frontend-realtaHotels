import { GetServerSideProps, NextPage } from "next";
import React, { useState, useEffect, Fragment, useRef } from 'react'
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { doUpdatePhotoUsers, doUserRequest, doUpdateUsers, doUsersRequest } from "@/redux/Actions/Users/reduceActions";
import { useDispatch, useSelector } from "react-redux";
import LayoutAdmin from "@/components/Layout/LayoutAdmin";
import { Box, FormControl, Grid, IconButton, InputAdornment, InputBase, InputLabel, MenuItem, OutlinedInput, Select, Tooltip, Typography } from "@mui/material"
import { Dialog, Transition } from '@headlessui/react'
import * as yup from "yup";
import { XMarkIcon } from '@heroicons/react/24/solid';
import TextField from '@mui/material/TextField';
import { Form, Formik } from 'formik';
import styles from '../../styles/ContentProfile.module.css';
import RefreshIcon from '@mui/icons-material/Refresh';
import SaveIcon from '@mui/icons-material/Save';
// import Input from '@mui/material/Input';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import EditIcon from '@mui/icons-material/Edit';
import moment from "moment";
import { useRouter } from "next/router";
import { InputRef, Tabs, Tag, Button, Input, Space, Table } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

interface Props {
  dirs: string[];
}

const Profile: NextPage<Props> = ({ dirs }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [profile, setProfile]:any = useState([]);
  const [profileBP, setProfileBP]:any = useState([]);
  const [profileMemb, setProfileMemb]:any = useState([]);
  const dispatchEditPhoto = useDispatch();
  const dispatchProfile = useDispatch();
  const userMe = useSelector((state: any) => state.usersReducers.user);
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    dispatchProfile(doUserRequest(userId));
  },[]);
  
  useEffect(() => {
    if (userMe && userMe.results) {
      setProfile(userMe.results[0]);
    }
  })

  useEffect(() => {
    const displayedUserBP: any = userMe.results;
    if (displayedUserBP) {
      setProfileBP(displayedUserBP);
    }
  })

  useEffect(() => {
    const displayedUserMemb: any = userMe.results;
    if (displayedUserMemb) {
      setProfileMemb(displayedUserMemb);
    }
  })

  const [BonusPoints, setBonusPoints]: any = useState([]);
  useEffect(() => {
    if (profileBP.length > 0) {
      const reducedBonusPoints = profileBP.reduce((accumulator:any, current:any) => {
        const index = accumulator.findIndex((item:any) => item.key === current.ubpo_user_id && item.createdOn === moment(current.ubpo_create_on).format("DD-MMM-YYYY") && item.type[0] === current.ubpo_bonus_type);
        if (index === -1) {
          accumulator.push({
            key: current.ubpo_user_id,
            createdOn: moment(current.ubpo_create_on).format("DD-MMM-YYYY"),
            type: [current.ubpo_bonus_type],
            point: parseInt(current.ubpo_total_points),
          });
        }
        return accumulator;
      }, []);
      setBonusPoints(reducedBonusPoints);
    }
  }, [profileBP]);
  interface DataTypeBonusPoints {
    key: string;
    createdOn: string;
    point: number;
    type: string[];
  }
  type DataIndexBonusPoints = keyof DataTypeBonusPoints;
  const dataBonusPoints: DataTypeBonusPoints[] = BonusPoints;

  const [Members, setMembers]: any = useState([]);
  useEffect(() => {
    if (profileMemb.length > 0) {
      const reducedMembers = profileMemb.reduce((accumulator:any, current:any) => {
        const index = accumulator.findIndex((item:any) => item.key === current.usme_user_id && item.promoteDate === moment(current.usme_promote_date).format("DD-MMM-YYYY") && item.type[0] === current.usme_memb_name && item.status[0] === current.usme_type);
        if (index === -1) {
          accumulator.push({
            key: current.usme_user_id,
            promoteDate: moment(current.usme_promote_date).format("DD-MMM-YYYY"),
            type: [current.usme_memb_name],
            point: parseInt(current.usme_points),
            status:[current.usme_type]
          });
        }
        return accumulator;
      }, []);
      setMembers(reducedMembers);
    }
  }, [profileMemb]);
  interface DataTypeMembers {
    key: string;
    promoteDate: string;
    type: string[];
    point: number;
    status: string[];
  }
  type DataIndexMembers = keyof DataTypeMembers;
  const dataMembers: DataTypeMembers[] = Members;

  const routerEditPhoto = useRouter();
  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/image", formData);
      const userId = localStorage.getItem('userId');
      const isDataUpload = {
        usproId:userId,
        usproPhoto: "Admin_" + selectedFile.name
      }
      
      dispatchEditPhoto(doUpdatePhotoUsers(userId, isDataUpload));
      dispatchEdit(doUserRequest(userId));
      localStorage.setItem('profilePhotoMe', isDataUpload.usproPhoto);
      setTimeout(() => {
        routerEditPhoto.reload();
      }, 500);
    } catch (error: any) {
      console.log(error.message);
    }
    setUploading(false);
  };

  // define useState API POST users
  let [DataUserEdit, setDataUserEdit] = useState({
    userId: null,
    userFullName: null,
    userCompanyName: null,
    userType: null,
    userEmail: null,
    userPhoneNumber: null,
    uspaPasswordhash: null,
    uspaConfirmPasswordhash:null,
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
    usproAddr: 1
  });

  const user = useSelector((state: any) => state.usersReducers.user);

  // getHelper for display in form
  const getHelperText = (touched: any, errors: any, field:any) => {
    if (field == "fullName") {
      return (touched && errors ? errors : "enter your full name");
    } else if (field == "userType") {
      return (touched && errors ? errors : "enter your type");
    } else if(field == "phone") {
      return (touched && errors ? errors : "enter your phone numb.");
    } else if (field == "email") {
      return (touched && errors ? errors : "enter your email");
    } else if (field == "companyName") {
      return (touched && errors ? errors : "enter your company name");
    } else if (field == "nationalID") {
      return (touched && errors ? errors : "enter your national ID");
    } else if (field == "jobTitle") {
      return (touched && errors ? errors : "enter your job title");
    } else if (field == "usproGender") {
      return (touched && errors ? errors : "enter your gender");
    } else if (field == "usproBirth") {
      return (touched && errors ? errors : "enter your birth");
    } else if (field == "status") {
      return (touched && errors ? errors : "enter your marital status");
    }
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

  //  function : open modals Edit user
  function openModalEdit() {
    setIsOpenEdit(true);
  }

  // function handler API PUT user
  const handleEdit = () => {
    const userId = localStorage.getItem('userId');
    const displayedPayload:any = dispatchEdit(doUserRequest(userId));
    if (displayedPayload.payload == userId) {
      if (user) {
        if (user.results) {
          const displayedUser:any = user.results[0];
          if (displayedUser) {
            if (displayedUser.user_id == userId) {
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

  const routerEdit = useRouter()
  const dispatchUpdate = useDispatch();
  
  // function handle submit form edit users (API POST users)
  const handleFormSubmitEdit = (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    const userId = localStorage.getItem('userId');
    dispatchUpdate(doUpdateUsers(userId, values));

    setTimeout(() => {
      setIsOpenEdit(false);
      dispatchProfile(doUserRequest(userId));
      routerEdit.reload();
      localStorage.setItem('userFullNameNew', values.userFullName);
    }, 3000);
    setSubmitting(false);
  };

  // getHelper for display in form
  const getHelperTextPassword = (touched: any, errors: any, field:any) => {
    if (field == "currentPassword") {
      return (touched && errors ? errors : "enter your current password");
    } else if(field == "password") {
      return (touched && errors ? errors : "enter your password");
    }  else if(field == "confirmPassword") {
      return (touched && errors ? errors : "enter your confirm password");
    }
  }

  // check all validasi required & etc
  const checkoutSchemaPassword:any = yup.object().shape({
    uspaPasswordhash: yup.string().required("required"),
    uspaConfirmPasswordhash: yup.string()
      .oneOf([yup.ref('uspaPasswordhash'), null], 'Passwords must match')
      .required('required'),
  });

  // function initialValue field from table users
  const initialValuesPassword: any = {
    userId:null,
    uspaPasswordhash: "",

  };
 
  const dispatchEditPassword = useDispatch();

  // useState : modals Edit user
  const [isOpenEditPassword, setIsOpenEditPassword] = useState(false)

  //  function : close modals Edit user
  function closeModalEditPassword() {
    setIsOpenEditPassword(false)
  }

  //  function : open modals Edit user
  function openModalEditPassword() {
    setIsOpenEditPassword(true);
  }

  // function handler API PUT user
  const handleEditPassword = () => {
    const userId = localStorage.getItem('userId');
    const displayedPayload:any = dispatchEdit(doUserRequest(userId));
    if (displayedPayload.payload == userId) {
      if (user) {
        if (user.results) {
          const displayedUser:any = user.results[0];
          if (displayedUser) {
            if (displayedUser.user_id == userId) {
              openModalEditPassword();
              setDataUserEdit({
                ...DataUserEdit,
                userId: displayedUser.user_id,
                uspaPasswordhash: displayedUser.uspa_passwordhash
              });
            }
          }
        }
      }
    }
  }
  
  // function handler API PUT users
  const eventHandlerEditPassword = (data: any) => (event: any) => {
      setDataUserEdit({...DataUserEdit, [data] : event.target.value});
  }

  const routerEditPassword = useRouter();
  const dispatchUpdatePassword = useDispatch();
  
  // function handle submit form edit users (API POST users)
  const handleFormSubmitEditPassword = (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    const userId = localStorage.getItem('userId');
    dispatchUpdatePassword(doUpdateUsers(userId, values));

    setTimeout(() => {
      setIsOpenEdit(false);
      dispatchProfile(doUserRequest(userId));
      routerEditPassword.reload();
    }, 3000);
    setSubmitting(false);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onChangeTab = (key: string) => {
    console.log(key);
  };

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearchBonusPoints = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndexBonusPoints,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleResetBonusPoints = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const handleSearchMembers = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndexMembers,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleResetMembers = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchPropsBonusPoints = (dataIndex: DataIndexBonusPoints): ColumnType<DataTypeBonusPoints> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearchBonusPoints(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            onClick={() => handleSearchBonusPoints(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleResetBonusPoints(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
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
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
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

  const columnsBonusPoints: ColumnsType<DataTypeBonusPoints> = [
    {
      title: 'Created On',
      dataIndex: 'createdOn',
      key: 'createdOn',
      width: '30%',
      ...getColumnSearchPropsBonusPoints('createdOn'),
    },
    {
      title: 'Bonus Type',
      dataIndex: 'type',
      key: 'type',
      width: '30%',
      ...getColumnSearchPropsBonusPoints('type'),
      render: (_, { type }) => (
        <>
          {type.map((isType) => {
            let color = isType.length < 5 ? 'geekblue' : 'green';
            if (isType === 'P') {
              color = 'orange';
            } else if (isType === 'R') {
              color = 'geekblue'
            }
            return (
              <Tag color={color} key={isType}>
                {isType=='P'?'PROMOTE':'RATING'}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Point',
      dataIndex: 'point',
      key: 'point',
      width: '20%',
      ...getColumnSearchPropsBonusPoints('point'),
      sorter: (a, b) => a.point - b.point,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  const getColumnSearchPropsMembers = (dataIndex: DataIndexMembers): ColumnType<DataTypeMembers> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearchMembers(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            onClick={() => handleSearchMembers(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleResetMembers(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
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
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
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

  const columnsMembers: ColumnsType<DataTypeMembers> = [
    {
      title: 'Promote Date',
      dataIndex: 'promoteDate',
      key: 'promoteDate',
      width: '30%',
      ...getColumnSearchPropsMembers('promoteDate'),
    },
    {
      title: 'Member Type',
      dataIndex: 'type',
      key: 'type',
      width: '30%',
      ...getColumnSearchPropsMembers('type'),
      render: (_, { type }) => (
        <>
          {type.map((isType) => {
            let color = isType.length < 5 ? 'geekblue' : 'green';
            if (isType === 'WIZARD') {
              color = 'green';
            } else if (isType === 'VIP') {
              color = 'purple';
            } else if (isType === 'GOLD') {
              color = 'gold';
            } else if (isType === 'SILVER') {
              color = 'gray';
            }
            return (
              <Tag color={color} key={isType}>
                {isType.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Point',
      dataIndex: 'point',
      key: 'point',
      width: '20%',
      ...getColumnSearchPropsMembers('point'),
      sorter: (a, b) => a.point - b.point,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      ...getColumnSearchPropsMembers('status'),
      render: (_, { status }) => (
        <>
          {status.map((isStatus) => {
            let color = isStatus.length > 5 ? 'geekblue' : 'green';
            if (isStatus === 'expired') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={isStatus}>
                {isStatus.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  return (
    <>
      <LayoutAdmin>
        <div className="overflow-y-auto">
          <p className="text-gray-700 text-3xl mb-6 font-bold">Profile</p>
          <div className="w-full md:w-full p-3">
            <Box className="grid shadow-md rounded-xl bg-white pb-8">
              {/* General */}
              <div className="mt-8 pl-8 font-bold shadow-md w-full h-fit py-2 px-2 mx-auto items-center bg-orange-100 text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75">
                <Typography className={styles.textTitleInProfile}>
                  General
                </Typography>
              </div>
              <div className="pt-5 pl-8 text-left font-normal text-orange-900">
                <Typography className={styles.textLabelInProfile}>
                  This information will be display, so be careful what you share
                </Typography>
              </div>
              <div className="flex items-stretch">
                <Box className="w-full md:w-1/4 justify-center">
                  <Box className="flex justify-center pt-5">
                    <label>
                      <center>
                        <Input
                          type="file"
                          hidden
                          onChange={({ target }) => {
                            if (target.files) {
                              const file = target.files[0];
                              setSelectedImage(URL.createObjectURL(file));
                              setSelectedFile(file);
                            }
                          }}
                        />
                      </center>
                      <Box className="flex justify-center h-28 w-28 cursor-pointer">
                        {selectedImage ? (
                          <img src={selectedImage} alt="" />
                        ) : (
                          <img src={"/images/" + profile.uspro_photo}/>
                        )}
                      </Box>
                    </label>
                  </Box>
                  {selectedImage ? (
                    <Box className="flex justify-center">
                      <button
                        className="shadow-lg w-28 py-1 px-1 mx-auto rounded-md  bg-orange-100 text-center text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75"
                        onClick={handleUpload}
                        disabled={uploading}
                        style={{ opacity: uploading ? ".5" : "1" }}>
                        <p className="normal-case font-normal">{uploading ? <CloudSyncIcon /> : <CloudUploadIcon className="h-5 w-5  " />}&nbsp;{"Upload"}</p>
                      </button>
                    </Box>
                  ) : (
                    <Box className="flex justify-center">
                      <button
                        className="shadow-lg w-28 py-1 px-1 mx-auto rounded-md  bg-orange-100 text-center text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75"
                        
                        disabled={true}
                        style={{ opacity: uploading ? ".5" : "1" }}>
                        <p className="normal-case font-normal">{uploading ? <CloudSyncIcon /> : <CloudUploadIcon className="h-5 w-5  " />}&nbsp;{"Upload"}</p>
                      </button>
                    </Box>
                  )}
                </Box>
                <div className="w-full md:w-1/4">
                  <Box className="grid col-1 bg-white h-50">
                    <Box className="max-w-4xl pt-3 space-y-3 pb-3">
                      {/* Full Name */}
                      <div className="flex flex-wrap">
                        <span className={styles.formProfile + "text-left w-50"}>{profile.user_full_name ? profile.user_full_name : "None"}</span>
                      </div>
                      {/* Memb. Name */}
                      <div className="flex flex-wrap">
                        <span className={styles.formProfile + "text-left w-50"}>
                          {
                            profile.usme_memb_name === "SILVER" ? "Silver Member" :
                              profile.usme_memb_name === "GOLD" ? "Gold Member" :
                                profile.usme_memb_name === "VIP" ? "VIP Member" :
                                  profile.usme_memb_name === "WIZARD" ? "Wizard Member" :
                                    "None"
                          }
                        </span>
                      </div>
                      {/* Type Agency */}
                      <div className="flex flex-wrap">
                        <span className={styles.formProfile + "text-left w-50"}>
                          {
                            profile.user_type === "T" ? "Travel Agency" :
                              profile.user_type === "C" ? "Company Agency" :
                                profile.user_type === "I" ? "Individual Agency" :
                                  "None"
                          }
                        </span>
                          
                      </div>
                    </Box>
                  </Box>
                </div>
                <div className="w-full md:w-1/4">
                  <Box className="grid col-1 bg-white">
                    <Box className="max-w-4xl pr-5 pt-3 space-y-3 pb-3">
                      {/* Email */}
                      <div className="flex flex-wrap">
                        <span className={styles.formProfile + "text-left w-50"}>{profile.user_email ? profile.user_email + " (default)" : "None"}</span>
                      </div>
                      {/* Phone Number */}
                      <div className="flex flex-wrap">
                        <span className={styles.formProfile + "text-left w-50"}>{profile.user_phone_number ? profile.user_phone_number + " (active)" : "None"}</span>
                      </div>
                    </Box>
                  </Box>
                </div>
                <div className="w-full md:w-1/4">
                  <Box className="flex items-stretch pt-32">
                    <button
                      className="shadow-lg w-28 py-1 px-1 mx-auto rounded-md  bg-orange-100 text-center text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75"
                      onClick={() => handleEdit()}
                    >
                      <p className="normal-case font-normal">{<EditIcon className="h-4 w-4   " />}&nbsp;{"Edit"}</p>
                    </button>
                  </Box>
                </div>
              </div>
              {/* Security */}
              <div className="mt-8 pl-8 font-bold shadow-md w-full h-fit py-2 px-2 mx-auto items-center bg-orange-100 text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75">
                <Typography className={styles.textTitleInProfile}>
                  Security
                </Typography>
              </div>
              <div className="pt-5 flex items-stretch">
                <Box className="w-full md:w-1/4 pl-8">
                  <Box className="flex items-stretch">
                    <div className="text-left font-normal text-orange-900">
                      <Typography className={styles.textLabelInProfile}>
                        Change password
                      </Typography>
                    </div>
                  </Box>
                </Box>
                <div className="w-full md:w-1/4">
                  <Box className="grid col-1 bg-white h-50">
                    <Box className="space-y-3 w-40">
                      <OutlinedInput
                        readOnly={true}
                        size="small"
                        type="text"
                        value="**********************"
                      />
                    </Box>
                  </Box>
                </div>
                <div className="w-full md:w-1/4">
                </div>
                <div className="w-full md:w-1/4">
                  <Box className="flex items-stretch">
                    <button
                      className="shadow-lg w-28 py-1 px-1 mx-auto rounded-md  bg-orange-100 text-center text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75"
                      onClick={() => handleEditPassword()}
                    >
                      <p className="normal-case font-normal">{<EditIcon className="h-4 w-4   " />}&nbsp;{"Edit"}</p>
                    </button>
                  </Box>
                </div>
              </div>
              {/* Points & Members */}
              <div className="mt-8 pl-8 font-bold shadow-md w-full h-fit py-2 px-2 mx-auto items-center bg-orange-100 text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75">
                <Typography className={styles.textTitleInProfile}>
                  Points & Members
                </Typography>
              </div>
              <div className="pl-8 pt-8 pr-8">
                <Tabs
                  onChange={onChangeTab}
                  type="card"
                  tabBarGutter={8}
                >
                  <Tabs.TabPane
                    tab={
                      <div
                        className="font-bold  items-center text-orange-900"
                      >
                        Bonus Points
                      </div>
                    }
                    key="1"
                  >
                    <Table columns={columnsBonusPoints} dataSource={dataBonusPoints} />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab={
                      <div
                        className="font-bold items-center text-orange-900"
                      >
                        Members
                      </div>
                    }
                    key="2"
                  >
                    <Table columns={columnsMembers} dataSource={dataMembers} />
                  </Tabs.TabPane>
                </Tabs>
              </div>
            </Box>
          </div>
        </div>
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
                            <TextField
                              hidden
                              type='hidden'
                              value={values.userId = DataUserEdit.userId}
                            />

                            {/* FullName */}
                            <TextField
                              size="small"
                              fullWidth
                              color="warning"
                              variant="standard"
                              type="text"
                              label="Full Name"
                              onBlur={handleBlur}
                              onChange={(event) => { eventHandlerEdit('userFullName')(event); handleChange(event) }}
                              value={values.userFullName ? values.userFullName : values.userFullName = DataUserEdit.userFullName}
                              name="userFullName"
                              error={!!touched.userFullName && !!errors.userFullName}
                              helperText={getHelperText(touched.userFullName, errors.userFullName, "fullName")}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* UserType */}
                            <FormControl color="warning" size="small" variant="standard"  sx={{ gridColumn: "span 4" }} error={!!touched.userType && !!errors.userType}>
                              <InputLabel id="userType" >Type</InputLabel>
                              <Select
                                placeholder="Select type ..."
                                fullWidth
                                variant="standard"
                                className='form-control'
                                name="userType"
                                onBlur={handleBlur}
                                onChange={(event) => { eventHandlerEdit('userType')(event); handleChange(event) }}
                                value={values.userType ? values.userType : values.userType = DataUserEdit.userType}
                                
                              >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='T'>Travel Agent</MenuItem>
                                <MenuItem value='C'>Company</MenuItem>
                                <MenuItem value='I'>Individual</MenuItem>
                              </Select>
                            </FormControl>
                              {!!touched.userType && !!errors.userType && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.userType, errors.userType,"userType")}</span>}

                            {/* PhoneNumber */}
                            <TextField
                              size="small"
                              fullWidth
                              color="warning"
                              variant="standard"
                              type="text"
                              label="Phone Number"
                              onBlur={handleBlur}
                              onChange={(event) => { eventHandlerEdit('userPhoneNumber')(event); handleChange(event) }}
                              value={values.userPhoneNumber ? values.userPhoneNumber : values.userPhoneNumber = DataUserEdit.userPhoneNumber}
                              name="userPhoneNumber"
                              error={!!touched.userPhoneNumber && !!errors.userPhoneNumber}
                              helperText={getHelperText(touched.userPhoneNumber, errors.userPhoneNumber, "phone")}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* Email */}
                            <TextField
                              size="small"
                              fullWidth
                              color="warning"
                              variant="standard"
                              type="email"
                              label="Email"
                              onBlur={handleBlur}
                              onChange={(event) => { eventHandlerEdit('userEmail')(event); handleChange(event) }}
                              value={values.userEmail ? values.userEmail : values.userEmail = DataUserEdit.userEmail}
                              name="userEmail"
                              error={!!touched.userEmail && !!errors.userEmail}
                              helperText={getHelperText(touched.userEmail, errors.userEmail, "email")}
                              sx={{ gridColumn: "span 4" }}
                            />
                            
                            {/* CompanyName */}
                            <TextField
                              size="small"
                              fullWidth
                              color="warning"
                              variant="standard"
                              type="text"
                              label="Company Name"
                              onBlur={handleBlur}
                              onChange={(event) => { eventHandlerEdit('userCompanyName')(event); handleChange(event) }}
                              value={values.userCompanyName ? values.userCompanyName : values.userCompanyName = DataUserEdit.userCompanyName}
                              name="userCompanyName"
                              error={!!touched.userCompanyName && !!errors.userCompanyName}
                              helperText={getHelperText(touched.userCompanyName, errors.userCompanyName, "companyName")}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* ---------------------------------------------------- */}
                          
                            {/* usproNationalId */}
                            <TextField
                              size="small"
                              fullWidth
                              color="warning"
                              variant="standard"
                              type="text"
                              label="National ID"
                              onBlur={handleBlur}
                              onChange={(event) => { eventHandlerEdit('usproNationalId')(event); handleChange(event) }}
                              value={values.usproNationalId ? values.usproNationalId : values.usproNationalId = DataUserEdit.usproNationalId}
                              name="usproNationalId"
                              error={!!touched.usproNationalId && !!errors.usproNationalId}
                              helperText={getHelperText(touched.usproNationalId, errors.usproNationalId, "nationalID")}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usproJobTitle */}
                            <TextField
                              size="small"
                              fullWidth
                              color="warning"
                              variant="standard"
                              type="text"
                              label="Job Title"
                              onBlur={handleBlur}
                              onChange={(event) => { eventHandlerEdit('usproJobTitle')(event); handleChange(event) }}
                              value={values.usproJobTitle ? values.usproJobTitle : values.usproJobTitle = DataUserEdit.usproJobTitle}
                              name="usproJobTitle"
                              error={!!touched.usproJobTitle && !!errors.usproJobTitle}
                              helperText={getHelperText(touched.usproJobTitle, errors.usproJobTitle, "jobTitle")}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usproGender */}
                            <FormControl color="warning" size="small" variant="standard" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="usproGender">Gender</InputLabel>
                              <Select
                                size="small"
                                fullWidth
                                variant="standard"
                                label="Gender"
                                onBlur={handleBlur}
                                onChange={(event) => { eventHandlerEdit('usproGender')(event); handleChange(event) }}
                                value={values.usproGender ? values.usproGender : values.usproGender = DataUserEdit.usproGender}
                                name="usproGender"
                                error={!!touched.usproGender && !!errors.usproGender}
                              >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='M'>Male</MenuItem>
                                <MenuItem value='F'>Female</MenuItem>
                              </Select>
                            </FormControl>
                              {!!touched.usproGender && !!errors.usproGender && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.usproGender, errors.usproGender, "usproGender")}</span>}

                            {/* usproBirth */}
                            <TextField
                              size="small"
                              fullWidth
                              color="warning"
                              variant="standard"
                              type="date"
                              label="Birth"
                              onBlur={handleBlur}
                              onChange={(event) => { eventHandlerEdit('usproBirth')(event); handleChange(event) }}
                              value={values.usproBirth ? values.usproBirth : values.usproBirth = DataUserEdit.usproBirth}
                              name="usproBirth"
                              error={!!touched.usproBirth && !!errors.usproBirth}
                              helperText={getHelperText(touched.usproBirth, errors.usproBirth, "usproBirth")}
                              sx={{ gridColumn: "span 4" }}
                            />

                            {/* usproMaritalStatus */}
                            <FormControl color="warning" size="small" variant="standard" sx={{ gridColumn: "span 4" }}>
                              <InputLabel id="usproMaritalStatus">Marital Status</InputLabel>
                              <Select
                                size="small"
                                fullWidth
                                variant="standard"
                                label="Marital Status"
                                onBlur={handleBlur}
                                onChange={(event) => { eventHandlerEdit('usproMaritalStatus')(event); handleChange(event) }}
                                value={values.usproMaritalStatus ? values.usproMaritalStatus : values.usproMaritalStatus = DataUserEdit.usproMaritalStatus}
                                name="usproMaritalStatus"
                                error={!!touched.usproMaritalStatus && !!errors.usproMaritalStatus}
                              >
                                <MenuItem value=''><em>none</em></MenuItem>
                                <MenuItem value='S'>Single</MenuItem>
                                <MenuItem value='M'>Married</MenuItem>
                              </Select>
                            </FormControl>
                              {!!touched.usproMaritalStatus && !!errors.usproMaritalStatus && <span className='text-red-600 text-xs pt-1 pl-4'>{getHelperText(touched.usproMaritalStatus, errors.usproMaritalStatus, "status")}</span>}

                            {/* usproAddr */}

                          </Box>

                          <Box display="flex" justifyContent="center" mt="20px">
                            <Box display="flex">
                              <button
                                type="reset"
                                color="warning"
                                className="rounded-md bg-yellow-100 text-yellow-500 border-warning-500 first-line:bg-opacity-20 px-4 py-2 text-sm font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                <RefreshIcon width={15} height={15} />
                              </button>
                            </Box>
                            <Box display="flex" pl="100px">
                              <button
                                type="submit"
                                color="warning"
                                className="rounded-md bg-green-100 text-green-500 border-warning-500 first-line:bg-opacity-20 px-4 py-2 text-sm font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                <SaveIcon width={15} height={15} />
                              </button>
                            </Box>
                            <Box display="flex" pl="100px">
                              <button
                                onClick={closeModalEdit}
                                type="button"
                                color="error"
                                className="rounded-md bg-red-100 text-red-500 border-error-500 first-line:bg-opacity-20 px-4 py-2 text-sm font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                <XMarkIcon width={20} height={20} />
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
        <Transition appear show={isOpenEditPassword} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModalEditPassword}>
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
                      onSubmit={handleFormSubmitEditPassword}
                      initialValues={initialValuesPassword}
                      validationSchema={checkoutSchemaPassword}
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
                            <TextField
                              hidden
                              type='hidden'
                              value={values.userId = DataUserEdit.userId}
                            />

                            {/* uspaPasswordhash */}
                            <TextField
                              size="small"
                              fullWidth
                              color="warning"
                              variant="standard"
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
                              onChange={(event) => { eventHandlerEdit('uspaPasswordhash')(event); handleChange(event) }}
                              value={values.uspaPasswordhash}
                              name="uspaPasswordhash"
                              error={!!touched.uspaPasswordhash && !!errors.uspaPasswordhash}
                              helperText={getHelperTextPassword(touched.uspaPasswordhash, errors.uspaPasswordhash, "password")}
                              sx={{ gridColumn: "span 4" }}
                            />
                            
                            {/* confirmPassword */}
                            <TextField
                              size="small"
                              fullWidth
                              color="warning"
                              variant="standard"
                              type={showConfirmPassword ? 'text' : 'password'}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                      onMouseDown={handleMouseDownConfirmPassword}
                                    >
                                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              label="Confirm Passoword"
                              onBlur={handleBlur}
                              onChange={(event) => { eventHandlerEdit('uspaConfirmPasswordhash')(event); handleChange(event) }}
                              value={values.uspaConfirmPasswordhash}
                              name="uspaConfirmPasswordhash"
                              error={!!touched.uspaConfirmPasswordhash && !!errors.uspaConfirmPasswordhash}
                              helperText={getHelperTextPassword(touched.uspaConfirmPasswordhash, errors.uspaConfirmPasswordhash, "confirmPassword")}
                              sx={{ gridColumn: "span 4" }}
                            />
                          </Box>

                          <Box display="flex" justifyContent="center" mt="20px">
                            <Box display="flex">
                              <button
                                type="reset"
                                color="warning"
                                className="rounded-md bg-yellow-100 text-yellow-500 border-warning-500 first-line:bg-opacity-20 px-4 py-2 text-sm font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                <RefreshIcon width={15} height={15} />
                              </button>
                            </Box>
                            <Box display="flex" pl="100px">
                              <button
                                type="submit"
                                color="warning"
                                className="rounded-md bg-green-100 text-green-500 border-warning-500 first-line:bg-opacity-20 px-4 py-2 text-sm font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                <SaveIcon width={15} height={15} />
                              </button>
                            </Box>
                            <Box display="flex" pl="100px">
                              <button
                                onClick={closeModalEditPassword}
                                type="button"
                                color="error"
                                className="rounded-md bg-red-100 text-red-500 border-error-500 first-line:bg-opacity-20 px-4 py-2 text-sm font-normal  hover:bg-opacity-30 focus:outline-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                <XMarkIcon width={20} height={20} />
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
      </LayoutAdmin>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const props = { dirs: [] };
  try {
    const dirs = await fs.readdir(path.join(process.cwd(), "/public/images"));
    props.dirs = dirs as any;
    return { props };
  } catch (error) {
    return { props };
  }


};

export default Profile;