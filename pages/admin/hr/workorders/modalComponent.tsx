import { useEffect, useState } from "react";
import React from "react";
import { Input, Button, Modal, Form, DatePicker, Row, Col, Select } from "antd";
import { useDispatch } from "react-redux";
import { doUpdateWorkorder, doWorkorderCreate } from "@/redux/Actions/HumanResources/reducerWorkordersAction";
import moment from "moment";
import dayjs from "dayjs";
import { AnyAaaaRecord } from "dns";

export default function ModalComponent(props: any){
  const id = props.id;
  const userId = props.userId;
  const data = props.data;
  const page = props.page;
  const typeModal = props.typeModal;
  const { handleClose } = props;
  const details = data?.find((item: any) => item.woroId == id);
  const [formValues, setFormValues] = useState(details);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  /* handlee modal Edit Data */
  const handleInputChange = (input: any) => (e: any) => {
    setFormValues({ ...formValues, [input]: e.target.value });
  };
  /* endhandle modal Edit Data*/

  /* handle form */
  const onFinish = (values: any) => {
    values = { 
      ...values, 
      woroStartDate: moment(values.woroStartDate.$d, "YYYY-MM-DD").format("YYYY-MM-DD"), 
      page: page,
      userId: userId,

    }

    if(typeModal == "Add"){
      dispatch(doWorkorderCreate(values));
    }else if (typeModal == "Edit") {
      dispatch(doUpdateWorkorder({ ...values, deptId: id }));
    }
    handleClose(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  /* endhandle form */

  return (
    <div>
      <Modal
        open={props.show}
        title={props.typeModal + " workorder"}
        okText="Submit"
        onCancel={props.handleCancel}
        onOk={form.submit}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            woroStartDate: formValues ? dayjs(formValues.woroStartDate, "YYYY-MM-DD") : '',
            woroStatus: formValues ? formValues.woroStatus : ''
          }}
          form={form}
        >
          <Form.Item
            label="Start Date"
            name="woroStartDate"
            rules={[
              { required: true, message: "Please input start date!" },
            ]}
          >
            <DatePicker placeholder="Input start date" style={{ width: '100%' }} />
          </Form.Item>

          {typeModal == "Edit" ? (
            <Form.Item
              label="Status"
              name="woroStatus"
              rules={[
                { required: true, message: "Please input status!" },
              ]}
            >
              <Select
                placeholder="Please choose"
                style={{ width: '100%' }}
                options={[
                  { value: 'OPEN', label: 'OPEN' },
                  { value: 'CLOSED', label: 'CLOSED' },
                  { value: 'CANCELLED', label: 'CANCELLED' },
                ]}
              />
            </Form.Item>
          ) : null}
          

        </Form>
      </Modal>
    </div>
  );
};
