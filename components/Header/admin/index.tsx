import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { doLogin, doUserRequest } from "@/redux/Actions/Users/reduceActions";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastIndicator from "@/components/Indicator/toast";
import { Avatar, MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { DownOutlined, UserOutlined, LogoutOutlined} from '@ant-design/icons';

export default function HeaderAdmin() {
  const router = useRouter();
  const [login, setLogin]: any = useState(false);
  const [userFullName, setFullName]: any = useState(null);
  const [userPhoto, setUserPhoto]: any = useState(null);
  const [roleId, setRoleId]: any = useState(null);
  const [profilePhotoMe, setProfilePhotoMe]: any = useState(null);
  const [profileNameMe, setProfileNameMe]: any = useState(null);

  useEffect(() => {
    const token: any = localStorage.getItem('token');
    setFullName(localStorage.getItem('userFullName'));
    setUserPhoto(localStorage.getItem('userPhoto'));
    setRoleId(localStorage.getItem('roleId'));
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  });

  const [profile, setProfile]: any = useState([]);
  const userMe = useSelector((state: any) => state.usersReducers.user);
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    dispatch(doUserRequest(userId));
  },[]);

  // Profile General
  useEffect(() => {
    if (userMe?.results) {
      setProfile(userMe.results[0]);
    }
    
    if (localStorage.getItem('profilePhotoMe') != profile?.uspro_photo) {
      setProfilePhotoMe(profile?.uspro_photo);
    } else {
      setProfilePhotoMe(localStorage.getItem('profilePhotoMe'));
    }

    if (localStorage.getItem('userFullNameNew') != profile?.user_full_name) {
      setProfileNameMe(profile?.user_full_name);
    } else {
      setProfileNameMe(localStorage.getItem('userFullNameNew'));
    }
    
  });

  let myPhoto: any; 
  if (profilePhotoMe) {
    myPhoto = profilePhotoMe;
  } else if (userPhoto !='null') { 
    myPhoto = userPhoto;
  } else {
    myPhoto = "user.png";
  }

  let myName: any; 
  if (profileNameMe) {
    myName = profileNameMe;
  } else if (userFullName != 'null') { 
    myName = userFullName;
  }  else {
    myName = "Unknown";
  }

  let myRole: any; 
  if (roleId == 1) {
    myRole = "Guest";
  } else if (roleId == 2) {
    myRole = "Manager";
  } else if (roleId == 3) {
    myRole = "Office-Boy";
  } else if (roleId == 4) {
    myRole = "Admin";
  } else if (roleId == 5) {
    myRole = "Staff";
  }

  // useDispatch
  const dispatch:any = useDispatch();
  
  const handleLogout = async () => {
    await router.push('/auth/signin');
    await dispatch(doLogin());
    await localStorage.removeItem('token');
    await localStorage.removeItem('roleId');
    await localStorage.removeItem('userId');
    await localStorage.removeItem('userFullName');
    await localStorage.removeItem('profilePhotoMe');
    await localStorage.removeItem('userFullNameNew');
    await localStorage.removeItem('userPhoto');
    await Cookies.remove('userId');
    await ToastIndicator({status: 'info', message: 'You have logged out'});
  };

  const handleProfile = () => {
    router.push('/admin/profile');
  };

  const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <button
        className="w-full text-left"
        onClick={handleProfile}
        >
        {"Profile"}
      </button>
    ),
    icon: (<UserOutlined />),
    },
    {
      key: '2',
      label: (
        <button
          className="w-full text-left hover:text-red-500 hover:outline-none"
          onClick={handleLogout}
          >
          {"Sign Out"}
        </button>
      ),
      icon: (<LogoutOutlined />),
    },
  ];

  if (login) {
    return (
      <div style={{backgroundColor: '#F5F5F5'}}>
        <div className="pr-4 md:pr-4 text-blue-500 hover:text-blue-500 flex justify-end justify-items-center text-center">
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()} className="w-fit">
                <Space>
                  <picture>
                  <Avatar src={<img src={"/images/" + myPhoto} alt="avatar" />} size="large" />
                </picture>
                <span className="hidden md:block font-medium text-blue-500 hover:text-blue-500">
                  {myName+" | "+myRole}
                </span>
                  <DownOutlined height={2} width={2}/>
                </Space>
              </a>
            </Dropdown>
        </div>
      </div>
    );
  } else {
    return (<></>);
  }
}