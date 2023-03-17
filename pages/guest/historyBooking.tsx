import LayoutGuest from "@/components/Layout/guest";
import { bookingStatus } from "@/redux/Actions/Booking/actionBookingHistory";
import { getInvoice } from "@/redux/Actions/Booking/actionInvoice";
import { Col, Modal, Row } from "antd";
import dayjs from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

const GuestBooking = () => {
  let root = useRouter();
  const dispatch = useDispatch();

      //from localStorage
      let userId: any;
      let userName: any;
      let phone: any;
      let email: any;
      let UserType: any;
      if (typeof window !== 'undefined') {
          userId = localStorage.getItem('userId');
          userName = localStorage.getItem('userFullName');
          phone = localStorage.getItem('PhoneNumber');
          email = localStorage.getItem('Email');
          UserType = localStorage.getItem('UserType')
      } else {
          userId = '0';
          userName = '';
          phone = '';
          email = '';
          UserType = '';
      }

  const Invoice1 = useSelector((state:any)=> state.GetInvoiceReducer.invoice)
  const Invoice = Invoice1?.filter((item: any) => item.user_id == userId)
  console.log(Invoice);
  
  const [Cancel,setCancel]=useState(false) 

  useEffect(()=>{
    dispatch(getInvoice())
  },[Cancel])

  const [status, setSatus]=useState({
    boorId:0,
    boorStatus:'CANCELLED'
  })

  console.log('status',status);
  

  const UpdateStatusBooking=(e:any)=>{
    e.preventDefault();
    dispatch(bookingStatus(status))
    setCancel(false)
    // add create refund transaction
  }

  const modalStatus =(id:any)=>{
    setSatus({...status,boorId:id})
    setCancel(true)
  }

  return (
    <div>
      <Head>
        <title>My Booking</title>
      </Head>
      <LayoutGuest>
        <div className="">
          <h1 className="font-bold text-xl text-center mb-4">Booking Order History</h1>
          {Invoice && Invoice.map((invo:any)=>{
            let cancel:string;
            if (invo.boor_status == 'BOOKING'){
              cancel='px-3 py-1 rounded font-semibold text-[11px] hover:border hover:border-rose-500'
              if((dayjs(invo.borde_checkin).isBefore(dayjs()))){
                cancel='hidden'
              }
            }else{
              cancel='hidden'
            }     
            const invoice =()=>{
              root.push({pathname : '/booking/room/invois' ,search: `?id=${invo.boor_order_number}`})
            }       
            console.log('hari',dayjs());
            
            return(
            <Row className="flex rounded bg-rose-100 mb-5 shadow-lg">
              <Col span={20} className="">
                <div>
                  <h1 className="font-bold text-base bg-rose-400 w-1/4 py-1 text-center rounded-br-md">{invo.boor_order_number}</h1>
                  <h1 className="font-semibold text-[12px] ml-2">{invo.hotel_name}</h1>
                  <h1 className="font-semibold text-[14px] ml-2">{invo.faci_name}</h1>
                </div>
                <div className="mt-3 flex space-x-4 items-center ml-2">
                  <div className="text-center">
                    <h1 className="text-[10px]">Check-In</h1>
                    <h1 className="font-semibold  text-xs">{dayjs(invo.borde_checkin).format('DD MMMM YYYY')}</h1>
                  </div>
                  <div className="text-center">
                    <h1 className="text-[10px]">Check-Out</h1>
                    <h1 className="font-semibold text-xs">{dayjs(invo.borde_checkout).format('DD MMMM YYYY')}</h1>
                  </div>
                </div>
              </Col>
              <Col span={4}>
                <h1 className="mt-6 font-bold text-[14px]">{invo.boor_total_amount}</h1>
                <h1 className="font-semibold text-[13px]">{invo.boor_status}</h1>
                <div className="flex items-center justify-end space-x-2 pt-2 pr-3 h-10">
                  <button className={`${cancel}`} onClick={()=>modalStatus(invo.boor_id)}>Cancel</button> 
                  <button className="px-3 py-1 rounded font-semibold text-[11px] bg-rose-500 right-1 mr-3" onClick={invoice}>Invoice</button>
                </div>
                <Modal title="Warning !!!" footer={null} open={Cancel} onCancel={()=>setCancel(false)}>
                  <h1 className="font_bold text-[15px] my-5">Batalkan Pesanan!</h1>
                  <div className="flex items-center justify-center">
                    <button className="px-3 py-1 rounded font-semibold text-[11px] bg-rose-500 right-1 mr-3" onClick={UpdateStatusBooking}>Ok</button>
                  </div>
                </Modal>
              </Col>

            </Row>
            )
            })}
        </div>
      </LayoutGuest>
    </div>
  );
}

export default GuestBooking;