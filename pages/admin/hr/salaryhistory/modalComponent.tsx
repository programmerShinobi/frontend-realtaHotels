import { useEffect, useState } from "react";
import React from "react";
import { Input, Button, Modal, Form, InputNumber, Select } from "antd";
import { useDispatch } from "react-redux";
import { doEmployeePayHistoryCreate, doUpdateEmployeePayHistory } from "@/redux/Actions/HumanResources/reducerEmployeePayHistory";

export default function ModalComponent(props: any){
  const id = props.id;
  const data = props.data;
  const page = props.page;
  const ephiEmp = props.ephiEmp;
  const { handleClose } = props;
  const details = data.find((item: any) => item.ephiId == id);
  const [formValues, setFormValues] = useState(details);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  /* handlee modal Edit Data */
  const handleInputChange = (input: any) => (e: any) => {
    if(e.target.value){
      setFormValues({ ...formValues, [input]: e.target.value });
    }else{
      setFormValues({ ...formValues, [input]: e });
    }
  };
  /* endhandle modal Edit Data*/

  /* handle form */
  const onFinish = (values: any) => {
    values = { ...values, page: page, ephiEmp: ephiEmp }

    if(props.typeModal == "Add"){
      dispatch(doEmployeePayHistoryCreate(values));
    }else if (props.typeModal == "Edit") {
      dispatch(doUpdateEmployeePayHistory({ ...values, ephiId: id }));
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
        title={props.typeModal + " salary history"}
        okText="Submit"
        onCancel={props.handleCancel}
        onOk={form.submit}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{ 
            ephiRateSalary: formValues ? formValues.ephiRateSalary.split(",")[0].replace(/[^0-9]/g, "") : '',
            ephiPayFrequence: formValues ? formValues.ephiPayFrequence : ''
          }}
          form={form}
        >
          <Form.Item
            label="Salary Rate"
            name="ephiRateSalary"
            rules={[
              { required: true, message: "Please input salary rate!" },
            ]}
          >
            <InputNumber
              style={{ width: '100%', marginLeft: '10px' }}
              min={0} 
              placeholder="Input salary rate"
            />
          </Form.Item>

          <Form.Item
            label="Frequency"
            name="ephiPayFrequence"
            rules={[
              { required: true, message: "Please input frequency!" },
            ]}
          >
            <Select
              placeholder="Please choose"
              style={{ width: '100%', marginLeft: '10px' }}
              options={[
                { value: 0, label: 'Hourly' },
                { value: 1, label: 'Monthly' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
