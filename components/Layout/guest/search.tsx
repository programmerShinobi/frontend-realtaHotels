import { Col, DatePicker, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dayjs from 'dayjs';
import styles from "@/styles/ContentHome.module.css";

export default function SearchHotel() {
  const root = useRouter()

  const [search,SetSearch]=useState({
    Provices:'',
    guest:0,
    Kids:0,
    Sroom:0,
    checkin:'',
    checkout:''
  })
  
  console.log('out',search.checkout);
  const [cek,setCek]=useState('')
  
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
          current <= dayjs().startOf('day') || 
          current.isSame(checkInDate, 'day') || 
          current.isBefore(checkInDate, 'day')
        );
      }
      return current <= dayjs().startOf('day')||
      current.isSame(dayjs(), 'day');
  };

  useEffect(()=>{
    if (dayjs(search.checkin).isAfter(search.checkout, 'day')){
      SetSearch({...search, checkout:dayjs(search.checkin).add(1, 'day').format('YYYY-MM-DD')})
    }
  },[search.checkin])

  const Search = () => {
    if (search.Sroom == 0){
      setCek('Room Belum Di Input')
    }else if (search.guest == 0){
      setCek('Adults Belum Di Input')
    }else if (search.checkin == ''){
      setCek('Check-In Belum Di Input')
    }else if (search.checkout == ''){
      setCek('Check-Out Belum Di Input')
    }else if (search.checkin == search.checkout){
      setCek('Check-In Check-Out Tidak Boleh Sama')
    }else{
      if(search.Provices == ''){
        root.push({pathname: `/booking/`,search: `?guest=${search.guest}&Kids=${search.Kids}&Sroom=${search.Sroom}&checkIn=${search.checkin}&checkOut=${search.checkout}`})
      }else{
        root.push({pathname: `/booking/`,search: `?provices=${(search.Provices).toLowerCase()}&guest=${search.guest}&Kids=${search.Kids}&Sroom=${search.Sroom}&checkIn=${search.checkin}&checkOut=${search.checkout}`})
      }
    }
  }

  return (
    <>
      <div className={styles.searchCardHome}>  
        <Row gutter={6} className="bg-white w-4/6 rounded-2xl shadow-2xl justify-between" >
            <Col span={24} className="flex justify-center mt-4 pb-4">
              <Col span={7}>
                <label className="form-label inline-block mb-2 text-gray-700 md:text-sm">
                  Province
                </label>
                <Input
                  className="rounded-lg"
                  type="text"
                  name="Provices"
                  value={search.Provices}
                  onChange={handleSearch}
                />
              </Col>
              <Col span={7}>
                <label className="form-label inline-block mb-2 text-gray-700 md:text-sm">
                  Room 
                </label>
                <Input
                  className="rounded-lg"
                  type="number"
                  min={0}
                  max={5}
                  name="Sroom"
                  value={search.Sroom}
                  onChange={handleSearch}
                />
              </Col>
              <Col span={4}>
                <label className="form-label inline-block mb-2 text-gray-700 md:text-sm">
                  Adults
                </label>
                <Input
                  className="rounded-lg"
                  type="number"
                  max={5}
                  min={1}
                  name="guest"
                  value={search.guest}
                  onChange={handleSearch}
                />
              </Col>
              <Col span={4}>
                <label className="form-label inline-block mb-2 text-gray-700 md:text-sm">
                  Kids
                </label>
                <Input
                  className="rounded-lg"
                  type="number"
                  max={5}
                  min={0}
                  name="Kids"
                  value={search.Kids}
                  onChange={handleSearch}
                />
              </Col>
            </Col>
            <Col span={24} className="flex justify-center pb-6">
              <Col span={7}>
              <label className="form-label inline-block mb-2 text-gray-700 md:text-sm">
                  Check-in
                </label>
                <DatePicker
                  format={'DD-MM-YYYY'}
                  onChange={(date) => handleSearch({ target: { name: "checkin", value: date?.format('YYYY/MM/DD') } })}
                  disabledDate={(current) => disabledDateStart(current, dayjs())}
                  className="shadow appearance-none border rounded-lg text-gray-700  w-full leading-tight focus:outline-none focus:shadow-outline"
                />
              </Col>
              <Col span={7}>
                <label className="form-label inline-block mb-2 text-gray-700 md:text-sm">
                  Check-Out
                </label>
                <DatePicker
                  name="checkout"
                  format={'DD-MM-YYYY'}
                  value={search.checkout ? dayjs(search.checkout) : null}
                  onChange={(date) => handleSearch({ target: { name: "checkout", value: date?.format('YYYY/MM/DD') } })}
                  disabledDate={(current) => disabledDateEnd(current, search.checkin)}
                  className="shadow appearance-none border rounded-lg text-gray-700 w-full leading-tight focus:outline-none focus:shadow-outline"
                />
              </Col>
              <Col span={8} className="justify-center text-center">
                <h2 className="absolute text-rose-500">{cek}</h2>
                <button
                    type="button"
                    className="mt-7 rounded-lg bg-[#F33C5D] inline-block py-2 w-full text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-rose-600 hover:shadow-lg focus:bg-rose-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-rose-800 active:shadow-lg transition duration-150 ease-in-out "
                    onClick={Search}
                  >
                    S e a r c h
                  </button>
              </Col>
            </Col>
        </Row>
      </div>
    </>
  );
}
