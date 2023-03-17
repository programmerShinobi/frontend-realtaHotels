import LayoutAdmin from "@/components/Layout/admin";
import { bookingStatus } from "@/redux/Actions/Booking/actionBookingHistory";
import { getInvoice } from "@/redux/Actions/Booking/actionInvoice";
import { Modal, Select, Table } from "antd";
import dayjs from "dayjs";
import { sendStatusCode } from "next/dist/server/api-utils";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BookingReceptionist() {
  let root = useRouter();
  const dispatch = useDispatch();

  const [BoNumber,setBoNumber]=useState({
    BoorNumber:'BO#01012022-0001'
  });
  const [dataBookingOrder,SetDataBo]=useState([])

  console.log('bo',BoNumber);
  
  const handleFilterChange = (event:any) => {
    const { name, value } = event.target;
    setBoNumber(prevFilter => ({...prevFilter, [name]: value}));
  };

  const Invoice = useSelector((state:any)=> state.GetInvoiceReducer.invoice)
  console.log(Invoice,'data',dataBookingOrder);
  
  const[open,setOpen]=useState(false)
  useEffect(()=>{
    if (BoNumber.BoorNumber !== ''){
      dataBo=Invoice.filter((item:any)=> item.boor_order_number == BoNumber.BoorNumber)
      SetDataBo(dataBo)
    }else if (BoNumber.BoorNumber == ''){
      dataBo=Invoice
      SetDataBo(dataBo)
    }
  },[BoNumber])

  useEffect(()=>{
    dispatch(getInvoice())
  },[open])

  let dataBo:any

  const columns = [
    {
      title: 'NO',
      dataIndex: 'name',
    },
    {
      title: 'Order Number',
      dataIndex: 'boor_order_number',
    },
    {
      title: 'Order Date',
      dataIndex: 'boor_order_date',
      render: (date:string) => dayjs(date).format('DD MMMM YYYY'),
    },
    {
      title: 'Hotel Name',
      dataIndex: 'hotel_name',
    },
    {
      title: 'Room Name',
      dataIndex: 'faci_name',
    },
    {
      title: 'Check-In',
      dataIndex: 'borde_checkin',
      render: (date:string) => dayjs(date).format('DD MMMM YYYY'),
    },
    {
      title: 'Check-Out',
      dataIndex: 'borde_checkout',
      render: (date:string) => dayjs(date).format('DD MMMM YYYY'),
    },
    {
      title: 'Total Room',
      dataIndex: 'boor_total_room',
    },
    {
      title: 'Total Amout',
      dataIndex: 'boor_total_amount',
    },
    {
      title: 'Payment Type',
      dataIndex: 'boor_pay_type',
    },
    {
      title: 'Status',
      render: (_:any, record:any) => (
        <div>
          <button onClick={()=>OpenModalUpdate(record.boor_id)} className="hover:text-rose-500">{record.boor_status}</button>
          <Modal footer={null} open={open} onCancel={()=>setOpen(false)}>
          <div className="flex justify-center space-x-5">
            <div  className="flex justify-center">
              <Select
              style={{ width: 250 }}
              onChange={handleChange}
              options={[
                { value: 'BOOKING', label: 'BOOKING' },
                { value: 'CHECKIN', label: 'CHECKIN' },
                { value: 'CHECKOUT', label: 'CHECKOUT' },
                { value: 'CLEANING', label: 'CLEANING'},
              ]}
              />
            </div>
            <div className="flex justify-center space-x-3">
              <button className="py-1 px-2 bg-rose-500 hover:bg-rose-600 text-white text-[12px] font-semibold rounded">Cancel</button>
              <button onClick={UpdateStatusBooking} className="py-1 px-2 bg-rose-500 hover:bg-rose-600 text-white rounded text-[12px] font-semibold">Update</button> 
            </div>
          </div>
        </Modal>
        </div>
      ),
    },
  ];

  const[dataUpdate,setDataUpdate]=useState({
    boorId:0,
    boorStatus:''
  })

  const UpdateStatusBooking=(e:any)=>{
    e.preventDefault();
    dispatch(bookingStatus(dataUpdate))
    setOpen(false)
  }

  const handleChange = (value: string) => {
    setDataUpdate({...dataUpdate, boorStatus:value})
  };
  console.log(dataUpdate);
  
  const OpenModalUpdate =(id:number)=>{
    setOpen(true)
    setDataUpdate({...dataUpdate,boorId:id})
  }

  return (
    <div>
      <Head>
        <title>Booking/Receptionist</title>
      </Head>
      <LayoutAdmin>
        <div className="text-center table-container overflow-x-auto overflow-y-auto">
          <h1 className="font-bold text-[32px]">BOOOKING ORDERS</h1>
        </div>
        <div className="overflow-x-auto ">
          <div className="space-x-3 flex items-center mb-2">
            <h2>Search  :</h2>
            <input onChange={handleFilterChange} type="text" name='BoorNumber' className="border w-2/12 py-1 rounded text-[12px]" placeholder="Order Number"/>
          </div>
          <Table dataSource={dataBookingOrder} columns={columns} className="ww-96"/>
        </div>
      </LayoutAdmin>
    </div>
  );
}