import LayoutAdmin from '@/components/Layout/admin/'
import { doGetStocks } from '@/redux/Actions/Purchasing/stockActions';
import { ColumnsType } from 'antd/es/table';
import {Button, Form, Modal, Select, Space, Table} from 'antd'
import { useRouter } from 'next/router'
import {EditOutlined} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { doGetFaciNameAndId, doGetStockDetail, doUpdateStockDetail } from '@/redux/Actions/Purchasing/stockDetail';
import Link from 'next/link';

interface StockDetail{
    detailid:number;
    faciid:number;
    stockid:number;
    stodbarcode:string;
    stodstatus:string;
    stodnotes:string;
    ponumber:string;
    faciloc:string
}

const addStockDetail = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {stockDetail, faciName} = useSelector((state:any)=>state.stodReducers)
    const {stocks} = useSelector((state:any)=>state.stocksReducers)
    const {stockId} = router.query
    const dataStodByid = stockDetail?.filter((obj:any)=> obj.stockid == stockId)
    const stockName = stocks.filter((obj:any)=> obj.stockId == stockId)
    // console.log(dataStodByid)
    useEffect(()=>{
        dispatch(doGetStocks())
        dispatch(doGetFaciNameAndId())
    },[])
    
    useEffect(()=>{
        dispatch(doGetStockDetail())
        // dispatch(doGetFaciNameAndId())
    },[stockDetail])

    //Hooks For modal Edit Stock Detail
    const[modalEditDetail, setModalEditDetail] = useState(false)
    //Hooks for Editing data Inside Modal
    const[editDetail, setEditDetail] = useState({})
    const closeModal = () =>{
        setModalEditDetail(false)
    }

    // Use In Component Select to Select Status For Stock Detail
    const selectForDetails =[
        {
            value:1,
            label:'Stocked'   
        },
        {
            value:2,
            label:'Expired'
        },
        {
            value:3,
            label:'Broken'
        },
        {
            value:4,
            label:'Used'
        }
    ]

    const EditButton = (value:any) =>{
        const stockDetailId = stockDetail.find((item:any)=> item.detailid == value)
        setModalEditDetail(true)
        setEditDetail({
            stodId : value,
            stodStatus : stockDetailId.stodstatus,
            stodFaciId : stockDetailId.faciid
        })
    }
    // const eventHandlerForDetail = (input:any) =>(event:any) =>{
    //     setEditDetail({...editDetail, [input]:event.target.value})
    // }

    const onChangeForDetail = (value:any) =>{
        setEditDetail({...editDetail, stodStatus: value})
    }

    const onChangeForFaci = (value:any) =>{
        setEditDetail({...editDetail, stodFaciId: value})
    }

    const onFinish = ()=>{
        console.log(editDetail)
        dispatch(doUpdateStockDetail(editDetail))
        setModalEditDetail(false)
    }

    const detailRow:ColumnsType<StockDetail> =[{
        title:'Barcode',
        dataIndex:'stodbarcode',
        key:'stodbarcode'
    },
    {
        title:'Status',
        dataIndex:'stodstatus',
        key:'stodstatus',
        render(stodstatus,record){
            return(
                <span>{record.stodstatus == 1? 'Stocked' : record.stodstatus == 2 ? 'Expired' : record.stodstatus == 3 ? 'Broken' : 'Used' }</span>
            )
        }
    },{
        title:'Notes',
        dataIndex:'stodnotes',
        key:'stodnotes'
    },{
        title:'PO Number',
        dataIndex:'ponumber',
        key:'ponumber'
    },{
        title:'Used In',
        dataIndex:'faciloc',
        key:'faciloc'
    },{
        title:'Actions',
        dataIndex:'x',
        render(_,record){
            return(
                <EditOutlined className='cursor-pointer hover:bg-blue-500' onClick={()=>EditButton(record.detailid)} />
            )
        }
    }
]
  return (
    <LayoutAdmin>
        <div>
            <h1 className='font-bold text-center'>{stockName[0]?.stockName ? stockName[0].stockName : []}</h1>
        </div>
        <div>
            <button className="bg-[#3C6FF3] w-40 px-2 py-1 rounded text-white hover:bg-[#274799] m-8"><Link href='/admin/purchasing/stocks'>Back To Stocks</Link></button>
        </div>
        <Table columns={detailRow} dataSource={dataStodByid} />
        <Modal
        title='Switch Status'
        open={modalEditDetail}
        onCancel={closeModal}
        footer={null}
        >
            <Form
            onFinish={onFinish}
            initialValues={editDetail}
            >
                <Form.Item label='Switch Status' name='stodStatus'>
                    <Select
                    style={{ width: 120 }}
                    placeholder=""
                    options={selectForDetails}
                    onChange={onChangeForDetail}
                    />
                </Form.Item>
                <Form.Item label='Stock Location' name='stodFaciId'>
                    <Select
                    style={{width : 250}}
                    showSearch
                    placeholder='Search For Location Of Stocks'
                    onChange={onChangeForFaci}
                    filterOption={(input,option)=>{return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());}}
                    options={faciName}
                    />
                </Form.Item>
                <Form.Item>
                    <button htmlType='submit' className="bg-[#F33C5D] text-white hover:text-white-600 px-5 py-2.5 rounded hover:bg-[#c7354f]">Save</button>
                </Form.Item>
            </Form>
            </Modal>   
    </LayoutAdmin>
  )
}

export default addStockDetail