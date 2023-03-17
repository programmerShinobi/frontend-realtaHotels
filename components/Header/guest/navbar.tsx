import * as React from 'react';
import Cookies from "js-cookie";
import ToastIndicator from "@/components/Indicator/toast";
import { Col, DatePicker, Dropdown, Input, Row, Space, MenuProps } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doLogin, doUserRequest } from "@/redux/Actions/Users/reduceActions";
import { useDispatch, useSelector } from "react-redux";
import { BookOutlined, DownOutlined, IdcardOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import LoginIcon from "@mui/icons-material/Login";
import KeyIcon from '@mui/icons-material/Key';


const NavBar: React.FC = () => {
  const root = useRouter()
  const dispatch = useDispatch()

  const { provices,Kids, guest, Sroom, checkIn, checkOut } = root.query || {};

  const [login,setLogin]=useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  const handleLogout = async () => {
    await root.push('/auth/signin');
    await dispatch(doLogin());
    await localStorage.removeItem('token');
    await localStorage.removeItem('roleId');
    await localStorage.removeItem('userId');
    await localStorage.removeItem('userFullName');
    await localStorage.removeItem('profilePhotoMe');
    await localStorage.removeItem('userFullNameNew');
    await localStorage.removeItem('userPhoto');
    await localStorage.removeItem('PhoneNumber');
    await localStorage.removeItem('UserType');
    await localStorage.removeItem('Email');
    await Cookies.remove('userId');
    await ToastIndicator({ status: 'info', message: 'You have logged out' });
    await dispatch(doLogin());
  };
  
  const today = dayjs();
  const tomorrow = today.add(1, 'day');
  const [search, SetSearch] = useState({
    Provices: '',
    guest: 1,
    Sroom: 1,
    Kids:0,
    checkin: today.format("YYYY-MM-DD"),
    checkout: tomorrow.format('YYYY-MM-DD'),
  }); 
  
  useEffect(() => {
    if (typeof provices === 'string' && typeof checkIn === 'string' && typeof checkOut === 'string') {
      SetSearch({
        ...search,
        Provices: provices,
        guest: guest ? parseInt(guest as string) : 0,
        Kids: Kids ? parseInt(Kids as string) : 0,
        Sroom: Sroom ? parseInt(Sroom as string) : 1,
        checkin: dayjs(checkIn).format("YYYY-MM-DD"),
        checkout: dayjs(checkOut).format("YYYY-MM-DD")
      });
    }
  }, [provices, guest, Sroom, checkIn, checkOut]);

  useEffect(()=>{
    if (dayjs(search.checkin).isAfter(search.checkout, 'day')){
      SetSearch({...search, checkout:dayjs(search.checkin).add(1, 'day').format('YYYY-MM-DD')})
    }
  },[search.checkin])
  
  const handleSearch = (event:any) => {
    const { name, value } = event.target;
    SetSearch(Filter => ({...Filter, [name]: value}));
  };

  const disabledDateStart = (current:any, checkInDate:any) => {
    if (checkInDate) {
        return (
          current < dayjs().startOf('day') || 
          current.isBefore(checkInDate, 'day')
        );
      }
      return current < dayjs().startOf('day');
  };

  const disabledDateEnd = (current:any, checkInDate:any) => {
    if (checkInDate) {
        return (
          current < dayjs().startOf('day') || 
          current.isSame(checkInDate, 'day') || 
          current.isBefore(checkInDate, 'day')
        );
      }
      return current < dayjs().startOf('day');
  };


  const Search = () => {
    if(search.Provices === ''){
      root.push({pathname: `/booking/`,search: `?guest=${search.guest}&Kids=${search.Kids}&Sroom=${search.Sroom}&checkIn=${search.checkin}&checkOut=${search.checkout}`})
    }else{
      root.push({pathname: `/booking/`,search: `?provices=${(search.Provices).toLowerCase()}&guest=${search.guest}&Kids=${search.Kids}&Sroom=${search.Sroom}&checkIn=${search.checkin}&checkOut=${search.checkout}`})    
    }
  }

  const router = useRouter()

  const [userFullName, setFullName]: any = useState(null);
  const [userPhoto, setUserPhoto]: any = useState(null);
  const [profilePhotoMe, setProfilePhotoMe]: any = useState(null);
  const [profileNameMe, setProfileNameMe]: any = useState(null);

  useEffect(() => {
    const token: any = localStorage.getItem('token');
    setFullName(localStorage.getItem('userFullName'));
    setUserPhoto(localStorage.getItem('userPhoto'));
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
  } else if (userPhoto != 'null') {
    myPhoto = userPhoto;
  } else {
    myPhoto = "user.png";
  }

  let myName: any;
  if (profileNameMe) {
    myName = profileNameMe;
  } else if (userFullName != 'null') {
    myName = userFullName;
  } else {
    myName = "Guest";
  }

  const handleProfile = () => {
    router.push('/guest/profile');
  };

  const handleAccount = () => {
    router.push('/guest/account');
  };

  const handleBooking = () => {
    router.push('/guest/historyBooking');
  };

  const handleTransaction = () => {
    router.push('/guest/transaction');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <button
          className="w-full text-left"
          onClick={handleProfile}>
          {"My Profile"}
        </button>
      ),
      icon: (<UserOutlined />),
    },
    {
      key: '2',
      label: (
        <button
          className="w-full text-left"
          onClick={handleAccount}>
          {"My Account"}
        </button>
      ),
      icon: (<IdcardOutlined />),
    },
    {
      key: '3',
      label: (
        <button
          className="w-full text-left"
          onClick={handleBooking}>
          {"My Booking"}
        </button>
      ),
      icon: (<BookOutlined />),
    },
    {
      key: '4',
      label: (
        <button
          className="w-full text-left"
          onClick={handleTransaction}>
          {"My Transaction"}
        </button>
      ),
      icon: (<BookOutlined />),
    },
    {
      key: '5',
      label: (
        <button
          className="w-full text-left hover:text-red-500 hover:outline-none"
          onClick={handleLogout}>
          {"Sign Out"}
        </button>
      ),
      icon: (<LogoutOutlined />),
    },
  ];



  return (
    <>
            <header className="w-full mb-1 shadow">
        <div className="relative bg-white">
          <div className="relative pl-6">
            <nav className="flex items-center justify-between h-16 lg:h-20">
              <div className="flex-shrink-0 ml-10">
                <a href="/" title="" className="flex">
                  <img className="w-60 h-15 " src="/assets/logo-realtaHotel.png" alt="" />
                </a>
              </div>
              <button
                type="button"
                className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-800 hover:bg-gray-800"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
              <div className="hidden lg:flex lg:justify-center lg:items-center">
                  <Row gutter={0} className=" flex justify-center items-center">
                    <Col span={21} className="flex justify-center  ">
                      {/* Provices */}
                      <Col span={5} className="flex items-center">
                        <Input
                          placeholder="City/Provinces"
                          type="text"
                          name="Provices"
                          value={search.Provices}
                          onChange={handleSearch}
                          className="h-5/6 text-xs shadow-md "
                        />
                    </Col>
                      {/* CheckIn */}
                      <Col span={4} className="flex items-center">
                      <DatePicker
                          placeholder="Ckeck-In"
                          style={{ fontSize: "12px" }}
                          value={dayjs(search.checkin)}
                          format={'DD-MM-YYYY'}
                          onChange={(date) => handleSearch({ target: { name: "checkin", value: date?.format('YYYY/MM/DD') } })}
                          disabledDate={(current)=>disabledDateStart(current, dayjs())}
                          className="text-xs shadow-md appearance-none rounded text-gray-700 h-5/6 w-full leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </Col>
                      {/* CheckOut */}
                      <Col span={4} className="flex items-center ">
                        <DatePicker
                          placeholder="Ckeck-Out"
                          style={{ fontSize: "12px" }}
                          format={'DD-MM-YYYY'}
                          value={dayjs(search.checkout)}
                          onChange={(date) => handleSearch({ target: { name: "checkout", value: date?.format('YYYY/MM/DD') } })}
                          disabledDate={(current)=>disabledDateEnd(current, search.checkin)}
                          className="shadow-md appearance-none rounded text-gray-700 h-5/6 w-full leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </Col>
                      
                      {/* Room */}
                      <Col span={3} className="flex items-center space-x-2">
                        <Input
                          className="h-5/6 w-3/6 text-center text-xs shadow-md "
                          width={50}
                          type="number"
                          max={5}
                          min={1}
                          name="Sroom"
                          value={search.Sroom}
                          onChange={handleSearch}/>
                          <h2>Room</h2>
                      </Col>
                    
                      {/* Guest */}
                      <Col span={3} className="flex items-center space-x-2">
                          <Input
                          className="h-5/6 w-3/6 text-center text-xs shadow-md"
                            type="number"
                            max={5}
                            min={1}
                            name="guest"
                            value={search.guest}
                            onChange={handleSearch}/>
                          <h2>Adults</h2>
                      </Col>
                    
                      <Col span={3} className="flex items-center space-x-2">
                          <Input
                          className="h-5/6 w-3/6 text-center text-xs shadow-md"
                            type="number"
                            max={5}
                            min={0}
                            name="Kids"
                            value={search.Kids}
                            onChange={handleSearch}/>
                          <h2>Kids</h2>
                      </Col>
                    </Col>
                    
                    <Col>
                      <button className="border hover:border-[#F33C5D] rounded hover:text-[#F33C5D] py-1 px-3" onClick={Search}>
                        Search
                      </button>
                    </Col>
                  </Row>
              </div>
              <div className={`${login ? "pr-16 md:pr-16 text-pink-500 hover:text-pink-500 flex justify-end justify-items-center text-center text-[12px]" : "hidden"}`}>
                <Dropdown menu={{ items }} className="hover:text-[#F33C5D]">
                  <a onClick={(e) => e.preventDefault()} className="w-fit">
                    <Space>
                      <picture>
                        <img
                          src={"/images/" + myPhoto}
                          className="rounded-full h-8 border-pink-600 shadow-2xl"
                          alt="profile picture"
                        />
                      </picture>
                      <span className="hidden md:block font-medium text-[#F33C5D]">
                        {"Hi, " + myName}
                      </span >
                      <DownOutlined height={2} width={2} className="hover:text-[#F33C5D]"/>
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <div className={`pt-2 mr-16 ${!login ? "space-x-1 flex justify-between" : "hidden"}`}>
                <a
                  href="/auth/signupGuest"
                  title=""
                  className="hover:text-rose-500 first-line:items-center justify-center hidden px-6 py-1 text-base font-semibold text-rose-500 transition-all duration-200  border border-transparent rounded-lg lg:inline-flex hover:border-rose-500"
                  role="button"
                ><KeyIcon className="text-[#F33C5D]" width={2} height={2} />&nbsp;{"Sign"}&nbsp;{"Up"}</a>

                <a
                  href="/auth/signin"
                  title=""
                  className="hover:text-white items-center bg-[#F33C5D] text-white justify-center hidden px-6 py-1 text-base font-semibold transition-all duration-200  rounded-lg lg:inline-flex hover:bg-rose-600"
                  role="button"
                ><LoginIcon className="text-white " width={2} height={2} />&nbsp;{"Sign"}&nbsp;{"In"}</a>
              </div>
            </nav>

            
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
