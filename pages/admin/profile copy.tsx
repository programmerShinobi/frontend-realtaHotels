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
  const [profile, setProfile] = useState([]);
  const [profileBP, setProfileBP] = useState([]);
  const [profileMemb, setProfileMemb] = useState([]);
  const dispatchEditPhoto = useDispatch();
  const dispatchProfile = useDispatch();
  console.info(profile);
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
    // uspaPasswordhash: yup.string().required("required"),
    // ubpoTotalPoints : yup.number().required("required"),
    // ubpoBonusType : yup.string().required("required"),
    // usmeMembName : yup.string().required("required"),
    // usmePoints : yup.number().required("required"),
    // usmeType : yup.string().required("required"), 
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
    usproAddr: 1
  })

  //  function : open modals Edit user
  function openModalEdit() {
    setIsOpenEdit(true);
  }
  
  const user = useSelector((state: any) => state.usersReducers.user);

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

  const dispatch = useDispatch();
  const routerEdit = useRouter()



  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
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
    <></>
  )
 
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