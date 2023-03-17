import {
  Input,
  Modal,
  Upload,
  Form,
  Button,
  Checkbox,
  Switch,
  Row,
  Col,
} from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { doAddStockPhoto, doGetStockPhoto } from "@/redux/Actions/Purchasing/sphoActions";
import { method } from "lodash";

const StockPhotoModal = (props: any) => {
  const dispatch = useDispatch();
  const id = props.id;
  const data = props.data;
  const { stockPhoto } = useSelector((state: any) => state.sphoReducers);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    dispatch(doGetStockPhoto());
  }, []);
  //   const stockId = stockPhoto.filter((obj:any) => obj.sphoStock == id)
  //   console.log(stockId)
  const [formPhoto, setformPhoto] = useState({
    file: [],
    body: {
      sphoStock: id,
      sphoPrimary: '0',
    },
  });

  const onChangeforSwitch = (value: any) => {
    if (value == false) {
      setformPhoto((prevFormPhoto) => ({
        ...prevFormPhoto,
        body: {
          ...prevFormPhoto.body,
          sphoPrimary: '1',
        },
      }));
    } else {
      setformPhoto((prevFormPhoto) => ({
        ...prevFormPhoto,
        body: {
          ...prevFormPhoto.body,
          sphoPrimary: '0',
        },
      }));
    }
    // console.log(formPhoto.body);
  };
  const onFinish = () => {
    console.log(formPhoto);
    const body = new FormData()
    body.append('sphoUrl', formPhoto.file[0])
    body.append('sphoPrimary', formPhoto.body.sphoPrimary)
    body.append('sphoStock', formPhoto.body.sphoStock)
    // fetch('localhost:3005/stock-photo',{method:'POST', body:body})
    dispatch(doAddStockPhoto(body))
    // console.log(body)
  };

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
          <Row gutter={32}>
            <Col span={20}>
              <Form.Item name="sphoPrimary" label="Set Primary">
                <Switch defaultChecked onChange={onChangeforSwitch} />
              </Form.Item>
              <Form.Item label="Stock Photo" htmlFor="upload">
                <label htmlFor="upload">
                  <p className="border py-1 rounded text-center">
                    {"Upload Your Stocks Photo"}
                  </p>
                </label>
                <Input
                  type="file"
                  id="upload"
                  style={{ display: "none" }}
                  onChange={(e: any) =>
                    setformPhoto({ ...formPhoto, file: [e.target.files[0]] })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
            <Form.Item>
              <button type="submit" className="bg-[#F33C5D] text-white hover:text-white-600 px-5 py-2.5 rounded hover:bg-[#c7354f]">Save</button>
            </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default StockPhotoModal;
