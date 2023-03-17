import {Button} from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { Col, Divider, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import dayjs from 'dayjs'
import { getInvoice } from '@/redux/Actions/Booking/actionInvoice';
import { orderDetailHistoryRequest } from '@/redux/Actions/Booking/actionBookingHistory';

export default function index() {

    let root = useRouter();
    const { id } = root.query || {};
    const dispatch = useDispatch();

    const Boex = useSelector((state:any)=> state.bookingHistoryReducer.booking_history)
    

    const Invoice3 = useSelector((state:any)=> state.GetInvoiceReducer.invoice)
    const Invoice = Invoice3.filter((item: any) => item.boor_order_number == id)
    const boor_order_number = Invoice?.length > 0 ? Invoice[0].boor_order_number:'';
    const boor_order_date = Invoice?.length > 0 ? Invoice[0].boor_order_date:'';
    const boor_is_paid = Invoice?.length > 0 ? Invoice[0].boor_is_paid:''; 
    const boor_pay_type = Invoice?.length > 0 ? Invoice[0].boor_pay_type:'';
    const user_full_name = Invoice?.length > 0 ? Invoice[0].user_full_name:'';
    const user_phone_number = Invoice?.length > 0 ? Invoice[0].user_phone_number:''; 
    const usme_memb_name = Invoice?.length > 0 ? Invoice[0].usme_memb_name:'';
    const usme_promote_date = Invoice?.length > 0 ? Invoice[0].usme_promote_date:'';
    const usme_points = Invoice?.length > 0 ? Invoice[0].usme_points:0; 
    const faci_name = Invoice?.length > 0 ? Invoice[0].faci_name:'';
    const boor_total_room = Invoice?.length > 0 ? Invoice[0].boor_total_room:0;        
    const borde_adults = Invoice?.length > 0 ? Invoice[0].borde_adults:0;         
    const borde_kids = Invoice?.length > 0 ? Invoice[0].borde_kids:0;        
    const borde_price = Invoice?.length > 0 ? Invoice[0].borde_price:'';
    const borde_discount = Invoice?.length > 0 ? Invoice[0].borde_discount:'';
    const borde_subtotal = Invoice?.length > 0 ? Invoice[0].borde_subtotal:'';
    const boex_name = Invoice?.length > 0 ? Invoice[0].prit_name:'';
    const boex_Qty = Invoice?.length > 0 ? Invoice[0].boex_qty:'';
    const boex_price = Invoice?.length > 0 ? Invoice[0].boex_price:'';
    const boex_subtotal = Invoice?.length > 0 ? Invoice[0].boex_subtotal:'';
    const borde_id = Invoice?.length > 0 ? Invoice[0].borde_id:0;
    

    
    const [Invoiceview, setInvoiceview] = useState({
        borde_id:0,
        boor_order_number : '',
        boor_order_date : '',
        invoice_number : '',
        invoice_date : '',
        boor_is_paid : '',
        boor_pay_type : '',
        user_full_name : '',
        user_phone_number : '',
        usme_memb_name : '',
        usme_promote_date : '',
        usme_points : 0,
        faci_name : '',
        boor_total_room : 0,
        borde_adults : 0,
        borde_kids : 0,
        borde_price : '',
        borde_discount : '',
        borde_subtotal : '',
        boex_name :'',
        boex_Qty : 0,
        boex_price : '',
        boex_subtotal :'',
    })
    
    useEffect(()=>{
        dispatch(getInvoice())
        dispatch(orderDetailHistoryRequest(borde_id))
    },[borde_id])

    useEffect(()=>{
        setInvoiceview({...Invoiceview, 
            borde_id:borde_id,
            boor_order_number:boor_order_number,
            boor_order_date:boor_order_date,
            boor_is_paid:boor_is_paid,
            boor_pay_type:boor_pay_type,
            user_full_name:user_full_name,
            user_phone_number:user_phone_number,
            usme_memb_name:usme_memb_name,
            usme_promote_date:usme_promote_date,
            usme_points:usme_points,
            faci_name:faci_name,
            boor_total_room:boor_total_room,
            borde_adults:borde_adults,
            borde_kids:borde_kids,
            borde_price:borde_price,
            borde_discount:borde_discount,
            borde_subtotal:borde_subtotal,
            boex_name :boex_name,
            boex_Qty : boex_Qty,
            boex_price : boex_price,
            boex_subtotal :boex_subtotal,      
        })
    },[borde_id])
    
    
    //Array Object untuk title and field
    const invoice1 = [
        {
            title : 'Booking Order',
            field : Invoiceview.boor_order_number
        },
        {
            title : 'Order Date',
            field : dayjs(Invoiceview.boor_order_date).format("DD MMMM YYYY")
        },
        {
            title : 'Invoice Number',
            field : Invoiceview.boor_order_number.replace('BO#','TRX#')
        },
        {
            title : 'Invoice Date',
            field : dayjs(Invoiceview.boor_order_date).format("DD MMMM YYYY")
        },
        {
            title : 'Status',
            field : Invoiceview.boor_is_paid
        },
        {
            title : 'Payment Type',
            field : Invoiceview.boor_pay_type
        }
    ]

    const invoice2 = [
        {
            title : 'Full Name',
            field : Invoiceview.user_full_name
        },
        {
            title : 'Contact Number',
            field : Invoiceview.user_phone_number
        },
        {
            title : 'Member',
            field : Invoiceview.usme_memb_name
        },
        {
            title : 'Member Date',
            field : dayjs(Invoiceview.usme_promote_date).format('DD MMMM YYYY')
        },
        {
            title : 'Remaining Points',
            field : Invoiceview.usme_points
        },
    ]

  return (
    <div className='mx-6 pb-6'>
        <div className='flex items-center space-x-4'>
            <Link href={'/guest/historyBooking'}>
            <h1 className='text-xl mb-5'><LeftOutlined/></h1>
            </Link>
            <h1 className='text-2xl mb-3 font-bold' >Invoice </h1>
        </div>
        <Row>
            {
                invoice1.map((item:any, index : any) =>
                <Col span={4} key={index}>
                    <h2 className='text-xl'>{item.title}</h2>
                    <h3 className='text-l'>{item.field}</h3>
                </Col>
                )  
            }
        </Row>
        <Divider dashed style={{borderColor : 'black'}} />
        <div>
            <h1 className='text-2xl mb-3 font-bold' >Customer </h1>
        </div>
        <Row>
            {
                invoice2.map((item:any, index : any) =>
                <Col span={4} key={index}>
                    <h2 className='text-xl'>{item.title}</h2>
                    <h3 className='text-l'>{item.field}</h3>
                </Col>
                )  
            }
        </Row>
        <Divider dashed style={{borderColor : 'black'}} />
        <div>
            <h1 className='text-2xl mb-3 font-bold' >Billing </h1>
        </div>
        <Row className='flex'>
            <Col span={4} className='flex'>
                <div>
                    <h2 className='text-xl'>Facilities</h2>
                    <h3 className='text-l'>{Invoiceview.faci_name}</h3>
                    {Boex && Boex.length > 0 && Boex.map((Invoice:any)=>{
                        return(
                            <h1>{Invoice.prit_name}</h1>
                        )
                    })}
                </div>
            </Col>
            <Col span={4} className='flex'>
                <div>
                    <h2 className='text-xl'>Qty</h2>
                    <h3 className='text-l'>{Invoiceview.boor_total_room}</h3>
                    {Boex && Boex.length > 0 && Boex.map((Invoice:any)=>{
                        return(
                            <h1>{Invoice.boex_qty}</h1>
                        )
                    })}
                </div>
            </Col>
            <Col span={4} className='flex'>
                <div>
                    <h2 className='text-xl'>Total Guests</h2>
                    <h3 className='text-l'>{Invoiceview.borde_adults} Adults {Invoiceview.borde_kids} Kids</h3>
                </div>
            </Col>
            <Col span={4} className='flex'>
                <div>
                    <h2 className='text-xl'>Price</h2>
                    <h3 className='text-l'>{Invoiceview.borde_price}</h3>
                    {Boex && Boex.length > 0 && Boex.map((Invoice:any)=>{
                        return(
                            <h1>{Invoice.boex_price}</h1>
                        )
                    })}
                </div>
            </Col>
            <Col span={4} className='flex'>
                <div>
                    <h2 className='text-xl'>Discount</h2>
                    <h3 className='text-l'>- {Invoiceview.borde_discount}</h3>
                </div>
            </Col>
            <Col span={4} className='flex'>
                <div>
                    <h2 className='text-xl'>Sub Total</h2>
                    <h3 className='text-l'>{((parseInt((Invoiceview.borde_price).substring(2).replace('.','')))-parseInt((Invoiceview.borde_discount).substring(2).replace('.',''))).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</h3>
                    {Boex && Boex.length > 0 && Boex.map((Invoice:any)=>{
                        return(
                            <h1>{Invoice.boex_subtotal}</h1>
                        )
                    })}
                </div>
            </Col>
        </Row>
        <Divider dashed style={{borderColor : 'black'}} />
        <Row>
            <Col span={16}>
            </Col>
            <Col span={8}>
                <div className='flex mt-2'>
                    <Col span={12}>
                        <div className='flex text-xl mr-5'>
                            <h2>Total Amount</h2>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='flex text-xl'>
                            <h2>{Invoiceview.borde_subtotal}</h2>
                        </div>
                    </Col>
                </div>
                <div className='flex my-2'>
                    <Col span={12}>
                        <div className='flex text-xl mr-5'>
                            <h2>Include Tax</h2>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='flex text-xl'>
                            <h2>10 %</h2>
                        </div>
                    </Col>
                </div>
            </Col>
        </Row>
        <Row>
            <Col span={16}>
            </Col>
            <Col span={8}>
                <div className='flex'>
                    <Col span={12}>
                        <div className='flex text-xl mr-5'>
                            
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='flex text-xl'>
                        
                        </div>
                    </Col>
                </div>
            </Col>
        </Row>
        <Row>
            <Col span={8}>
            </Col>
            <Col span={16}>
                <div className='flex'>
                    <Col span={6}>
                        <div className='flex text-xl mr-5'>
                            <Button>Send To Email</Button>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='flex text-xl'>
                        <Button onClick={()=>window.print()}>Print</Button>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='flex text-xl mr-5'>
                            <h2>Payment Amount</h2>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='flex text-xl'>
                            <h2>{Invoiceview.borde_subtotal}</h2>
                        </div>
                    </Col>
                </div>
            </Col>
        </Row>
    </div>
  )
}
