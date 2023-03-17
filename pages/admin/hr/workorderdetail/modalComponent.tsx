import { useState } from "react";
import React from "react";
import { Input,  Modal, Form, Select } from "antd";
import { useDispatch } from "react-redux";
import { doUpdateWorkorderdetail, doWorkorderdetailCreate } from "@/redux/Actions/HumanResources/reducerWorkorderDetailAction";
 
export default function ModalComponent(props: any){
  const id = props.id;
  const wodeWoro = props.wodeWoro;
  const data = props.data;
  const datamSerTask = props.datamSerTask;
  const dataEmployee = props.dataEmployee;
  const page = props.page;
  const { handleClose } = props;
  const details = data?.find((item: any) => item.wodeId == id);
  const [formValues, setFormValues] = useState(details);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [labelOption, setLabelOption] = useState(details ? details.wodeSeta.setaName : "");
 
  const { TextArea } = Input;

  /* mapping data datamSerTask */
  let optionValMSerTask: any = [{ value: "", label: "Please choose" }]
  datamSerTask && datamSerTask.map((res: any, index: any) => {
    optionValMSerTask = [...optionValMSerTask, { value: res.setaId, label: res.setaName }]
  })
  /* end mapping data mSerTask */

  /* mapping data dataEmployee */
  let optionValEmployee: any = [{ value: "", label: "Please choose" }]
  dataEmployee && dataEmployee.map((res: any, index: any) => {
    optionValEmployee = [...optionValEmployee, { value: res.emp_id, label: res.user_full_name }]
  })
  /* end mapping data dataEmployee */

  /* handle service task selected */
  const onChange = (value : any, data: any) => {
    setLabelOption(data.label)
  }
  /* endhandle service task selected */

  /* handle form */
  const onFinish = (values: any) => {
    values = { 
      ...values, 
      page: page, 
      wodeTaskName: labelOption,
      wodeWoro: wodeWoro,
    }

    if(props.typeModal == "Add"){
      dispatch(doWorkorderdetailCreate(values));
    }else if (props.typeModal == "Edit") {
      dispatch(doUpdateWorkorderdetail({ ...values, wodeId: id }));
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
        title={props.typeModal + " task"}
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
            wodeSeta: formValues ? formValues.wodeSeta.setaId : '',
            wodeEmp: formValues ? formValues.wodeEmp.empId : '',
            wodeNotes: formValues ? formValues.wodeNotes : '',
          }}
          form={form}
        >
          <Form.Item
            label="Task name"
            name="wodeSeta"
            rules={[
              { required: true, message: "Please input task name!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Input task name"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={optionValMSerTask}
              onChange={onChange}
            />
          </Form.Item>

          <Form.Item
            label="Assign to"
            name="wodeEmp"
            rules={[
              { required: true, message: "Please input assign to!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Input assign to"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={optionValEmployee}
            />
          </Form.Item>

          <Form.Item
            label="Notes"
            name="wodeNotes"
            rules={[
              { required: true, message: "Please input Notes!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};
