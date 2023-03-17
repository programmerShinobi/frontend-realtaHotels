import { doEditStocks } from '@/redux/Actions/Purchasing/stockActions';
import { Button, Col, Form, Input, Modal, Row } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const EditModalStocks = (props:any) => {
    const dispatch = useDispatch()
    const id:number = props.id;
    const data = props.data;
    const {handleClose} = props
    const detail= data.find((item:any)=>item.stockId == id)
    const [formEdit, setFormEdit] = useState({
        stockId : id,
        stockName: detail.stockName,
        stockReorderPoint : detail.stockReorderPoint,
        stockQuantity: detail.stockQuantity,
        stockUsed : detail.stockUsed,
        stockScrap : detail.stockScrap,
        stockColor : detail.stockColor,
        stockSize : detail.stockSize,
        stockDescription : detail.stockDescription
        
    })
    const eventHandler = (input:any) => (event:any) =>{
        setFormEdit({...formEdit, [input]:event.target.value})
    }

    const onFinish = () =>{
        dispatch(doEditStocks(formEdit))
        handleClose(false)
    }
  return (
    <>
    <Modal
        title="Add/Edit Stock"
        open={props.show}
        onCancel={props.onCancel}
        width={700}
        footer={null}
      >
        <Form initialValues={formEdit} onFinish={onFinish}>
          <Row gutter={[32, 32]}>
            <Col>
              <Form.Item label="Stock" name="stockName">
                <Input onChange={eventHandler('stockName')}/>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Re-Order Point" name="stockReorderPoint">
                <Input onChange={eventHandler('stockReorderPoint')} style={{ width: 70 }} placeholder="0" type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 32]}>
            <Col>
              <Form.Item label="Quantity" name="stockQuantity">
                <Input onChange={eventHandler('stockQuantity')} style={{ width: 70 }} placeholder="0" type="number" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Used" name="stockUsed">
                <Input onChange={eventHandler('stockUsed')} style={{ width: 70 }} placeholder="0" type="number" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Scrap" name="stockScrap">
                <Input onChange={eventHandler('stockScrap')} style={{ width: 70 }} placeholder="0" type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 32]}>
            <Col>
              <Form.Item label="Color" name="stockColor">
                <Input onChange={eventHandler('stockColor')} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Size" name="stockSize">
                <Input onChange={eventHandler('stockSize')} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label='Description' name='stockDescription'>
            <Input onChange={eventHandler('stockDescription')}/>
          </Form.Item>
          <Form.Item>
            <button className="bg-[#F33C5D] text-white hover:text-white-600 px-5 py-2.5 rounded hover:bg-[#c7354f]" htmlType='submit'>Save</button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default EditModalStocks