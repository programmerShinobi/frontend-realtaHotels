import { Input, Modal, Upload, Form, Button, Checkbox } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { doGetStockPhoto } from "@/redux/Actions/Purchasing/sphoActions";

const StockPhotoModal = (props: any) => {
    const dispatch = useDispatch()
    const id = props.id
    const data = props.data
    const {stockPhoto} = useSelector((state:any)=>state.sphoReducers)
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([

  ]);

  useEffect(()=>{
    dispatch(doGetStockPhoto())
  },[])
//   const stockId = stockPhoto.filter((obj:any) => obj.sphoStock == id)
//   console.log(stockId)
  const [sphoPrimarytype, setSphoPrimaryType] = useState(1)
  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      //   console.log(file)
      const res = reader.readAsDataURL(file);
      console.log(res);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);
  const onFinish = (values: any) => {
    console.log(values);
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(newFileList);
  };

  const onchanges = (e:CheckboxChangeEvent) =>{
    // console.log(e.target.checked)
    if(e.target.checked == true){
        setSphoPrimaryType(0)
    }else{
        setSphoPrimaryType(1)
    }

    console.log(sphoPrimarytype)
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Modal
        title="Add Stock Photo"
        open={props.show}
        onCancel={props.onCancel}
        footer={null}
      >
        <Form onFinish={onFinish}>
          <Form.Item name='stock'>
            <Upload
              listType="picture-card"
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 4 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item name='sphoPrimary'>
          <Checkbox onChange={onchanges}>Set As Primary</Checkbox>
          </Form.Item>
          {/* <Form.Item name='stockss'>
            <Input type="file" />
          </Form.Item> */}
          <Form.Item>
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default StockPhotoModal;
