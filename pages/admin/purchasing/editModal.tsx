import { updateVendor } from '@/redux/Actions/Purchasing/vendorActions'
import { Modal, Button, Form, Row, Col, Input, DatePicker, Select, DatePickerProps, message } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

export default function EditModals  (props:any)  {
    const dispatch = useDispatch()
    const id:number = props.id
    const data = props.data
    const {handleClose} = props
    const detail = data.find((item:any)=>item.vendorEntityId ==id)
    const date = detail.vendorRegisterDate.split('T')[0]
    const [formsValues, setFormValues] = useState(
        {
            vendorEntityId:id,
            vendorName : detail.vendorName,
            vendorRegisterDate : date,
            vendorActive: detail.vendorActive,
            vendorPriority: detail.vendorPriority,
            vendorWeburl: detail.vendorWeburl
        }
    )
    const[messageApi, contextHolder] = message.useMessage()
    
    const eventHandler = (input:any) => (event:any)=>{
        setFormValues({...formsValues,[input]:event.target.value})
    }

    const onFinish = () =>{
        dispatch(updateVendor(formsValues))
        messageApi.open({
          type:'loading',
          content:'Action in Progress...',
          duration: 2.5
        }).then(()=>message.success('Vendor Updated', 2))
        setTimeout(() => { handleClose(false) }, 2100)
        
    }
    const vendorPriorities = [
        {
          value: "1",
          label: "Highest",
        },
        {
          value: "0",
          label: "Lowest",
        },
      ];
      const vendorStatus = [
        {
          value: "1",
          label: "Active",
        },
        {
          value: "0",
          label: "Inactive",
        },
      ];

      const onChangeSelect = (values: string) => {
        eventHandler('vendorActive')
      };

      const onchangePriorities = (values:string) =>{
        eventHandler('vendorPriority')
      }
  return (
    <>
    {contextHolder}
    <Modal
        title="New/Edit Vendor"
        open={props.show}
        onCancel={props.onCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish} initialValues={formsValues}>
          <Row gutter={[32, 32]}>
            <Col>
              <Form.Item label="Vendor Name" name="vendorName" rules={[{required:true}]}>
                <Input onChange={eventHandler('vendorName')}/>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Register Date" name="vendorRegisterDate" rules={[{required:true}]}>
              <Input type='date' onChange={eventHandler('vendorRegisterDate')}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 32]}>
            <Col>
              <Form.Item name="vendorPriority" label="Priority" rules={[{required:true}]}>
                <Select
                  style={{ width: 120 }}
                  placeholder=''
                  options={vendorPriorities}
                  onChange={onchangePriorities}
                ></Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="vendorActive" label="Status" rules={[{required:true}]}>
                <Select
                  style={{ width: 120 }}
                  placeholder=''
                  options={vendorStatus}
                  onChange={onChangeSelect}
                ></Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Form.Item name="vendorWeburl" label="Vendor URL" rules={[{required:true}]}>
              <Input onChange={eventHandler('vendorWeburl')}/>
            </Form.Item>
          </Row>
          <Form.Item>
            <button type="submit" className='px-5 py-2.5 rounded bg-[#F33C5D] text-white'>Save</button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
