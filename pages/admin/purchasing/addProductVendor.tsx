import { doAddVendpro, doGetVendrpo } from "@/redux/Actions/Purchasing/vendproActions";
import { ColumnsType } from "antd/es/table";
import { Button, Col, Form, Input, Modal, Row, Table, message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVendorRequest } from "@/redux/Actions/Purchasing/vendorActions";
import { BackwardOutlined } from "@ant-design/icons";
import LayoutAdmin from '@/components/Layout/admin/'

interface VendPro {
  vendid: number;
  stockname: string;
  stockquantity: number;
  stockremain: number;
  stockprice: string;
}

const addProductVendor = () => {
  const [modalProduct, setModalProduct] = useState(false);
  const { vendpro } = useSelector((state: any) => state.vendproReducers);
  const { vendors } = useSelector((state: any) => state.vendorReducers);
  const router = useRouter();
  const id = router.query.id;
  const dispatch = useDispatch();

  const [product, setProduct] = useState(
    {
        vendid:id,
        stockname: '',
        stockquantity : 0,
        stockremain : 0,
        stockprice : 0
    }
  )
  const [messageApi,contextHolder] = message.useMessage()

  const eventHandler = (input:any) => (event:any) =>{
    setProduct({...product, [input]:event.target.value})
  }
  useEffect(() => {
      dispatch(getVendorRequest());
    }, []);
    
    useEffect(()=>{
      dispatch(doGetVendrpo());

  }, [vendpro])

  const backButton = () => {
    router.push("/admin/purchasing/vendor");
  };
  const vendorProduct = vendpro?.filter((obj: any) => obj.vendid == id);
  
  const vendorName = vendors?.filter((obj: any) => obj.vendorEntityId == id);

  const onFinish = () => {
    dispatch(doAddVendpro(product))
    messageApi.open({
      type:'loading',
      content:'Action in Progress...',
      duration: 2.5
    }).then(()=>message.success('Product Added', 2))
    setTimeout(() => {setModalProduct(false)}, 2100)
    
  };
  //   console.log(id);
  // console.log(vendorName, 'test')

  const openModalProduct = () => {
    setModalProduct(true);
  };
  const closeModalProduct = () => {
    setModalProduct(false);
  };
  const vendProRow: ColumnsType<VendPro> = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Stock Name",
      dataIndex: "stockname",
      key: "stockname",
    },
    {
      title: "Quantity",
      dataIndex: "stockquantity",
      key: "stockquantity",
    },
    {
      title: "Stock Remain",
      dataIndex: "stockremain",
      key: "stockremain",
    },
    {
      title: "Price",
      dataIndex: "stockprice",
      key: "stockprice",
    },
  ];

  const data = vendorProduct?.length > 0 ? vendorProduct : [];
  return (
    <LayoutAdmin>
      {contextHolder}
      <h4 className="font-bold m-4 text-center">{vendorName[0]?.vendorName}</h4>
      <div className="flex hover:text-blue-500 cursor-pointer">
        <BackwardOutlined
          className="text-xl mb-2 hover:text-blue-500"
          onClick={backButton}
        />
        <p className="text-lg mt-1" onClick={backButton}>
          Back
        </p>
      </div>
      <button className="bg-[#3C6FF3] w-40 px-2 py-1 rounded text-white hover:bg-[#274799] m-8" onClick={openModalProduct}>
        Add Product Vendor
      </button>
      <Table columns={vendProRow} dataSource={vendorProduct? vendorProduct : []} />
      <Modal
        title="New Vendor Product"
        open={modalProduct}
        onCancel={closeModalProduct}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Stock Name" name="stockname">
            <Input onChange={eventHandler('stockname')} />
          </Form.Item>
          <Row gutter={[32,32]}>
            <Col>
              <Form.Item label="Quantity" name="stockquantity">
                <Input placeholder="0" type="number" onChange={eventHandler('stockquantity')}/>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Stock Remain" name="stockremain">
                <Input placeholder="0" type="number" onChange={eventHandler('stockremain')}/>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label='Sell Price' name='stockprice'>
            <Input onChange={eventHandler('stockprice')}/>
          </Form.Item>
         <Form.Item>
            <Button htmlType="submit">Save</Button>
         </Form.Item>
        </Form>
      </Modal>
    </LayoutAdmin>
  );
};

export default addProductVendor;
