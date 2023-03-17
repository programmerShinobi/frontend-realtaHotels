import { useEffect, useState } from "react";
import React from "react";
import { Input, Button, Modal, Form, InputNumber, Select, DatePicker, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { doEmployeePayHistoryCreate, doUpdateEmployeePayHistory } from "@/redux/Actions/HumanResources/reducerEmployeePayHistory";
import dayjs from "dayjs";
import moment from "moment";
import { doEmployeeDepartmentHistoryCreate, doUpdateEmployeeDepartmentHistory } from "@/redux/Actions/HumanResources/reducerEmployeeDepartmentHistory";

export default function ModalComponent(props: any){
  const id = props.id;
  const data = props.data;
  const page = props.page;
  const edhiEmp = props.edhiEmp;
  const dataDepartment = props.dataDepartment;
  const dataShift = props.dataShift;
  const { handleClose } = props;
  const details = data.find((item: any) => item.edhiId == id);
  const [formValues, setFormValues] = useState(details);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [shiftStartTime, setShiftStartTime] = useState(formValues ? dayjs(formValues.edhiShift.shiftStartTime).format("HH:mm:ss") : '');
  const [shiftEndTime, setShiftEndTime] = useState(formValues ? dayjs(formValues.edhiShift.shiftEndTime).format("HH:mm:ss") : ''); 

  /* mapping data department */
  let optionValDept: any = [{ value: "", label: "Please choose" }]
  dataDepartment && dataDepartment.map((res: any, index: any) => {
    optionValDept = [...optionValDept, { value: res.deptId, label: res.deptName }]
  })
  /* end mapping data department */

  /* mapping data shift */
  let optionValShift: any = [{ value: "", label: "Please choose" }]
  dataShift && dataShift.map((res: any, index: any) => {
    optionValShift = [...optionValShift, { value: res.shiftId, label: res.shiftName }]
  })
  /* end mapping data shift */



  /* handlee modal Edit Data */
  const handleInputChange = (input: any) => (e: any) => {
    if(e.target.value){
      setFormValues({ ...formValues, [input]: e.target.value });
    }else{
      setFormValues({ ...formValues, [input]: e });
    }
  };
  /* endhandle modal Edit Data*/

  /* handle onchange Shift */
  const handleOnchangeShift = (value: any) => {

    if (value != "") {
      const findOneDataShift = dataShift.find((item: any) => item.shiftId == value);

      const shiftStartTimeNew = dayjs(findOneDataShift.shiftStartTime).format("HH:mm:ss");
      const shiftEndTimeNew = dayjs(findOneDataShift.shiftEndTime).format("HH:mm:ss");

      setShiftStartTime(shiftStartTimeNew)
      setShiftEndTime(shiftEndTimeNew)

    }

  }
  /* end handle onchange Shift */

  /* handle form */
  const onFinish = (values: any) => {
    values = {
      ...values,
      page: page, 
      edhiEmp: edhiEmp,
      edhiEndDate: moment(values.edhiEndDate.$d, "YYYY-MM-DD").format("YYYY-MM-DD"),
      edhiStartDate: moment(values.edhiStartDate.$d, "YYYY-MM-DD").format("YYYY-MM-DD"), 
    }

    if(props.typeModal == "Add"){
      dispatch(doEmployeeDepartmentHistoryCreate(values));
    }else if (props.typeModal == "Edit") {
      dispatch(doUpdateEmployeeDepartmentHistory({ ...values, edhiId: id }));
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
        title={props.typeModal + " department history"}
        okText="Submit"
        onCancel={props.handleCancel}
        onOk={form.submit}
        width={1000}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{ 
            deptId: formValues ? formValues.edhiDept.deptId : '',
            shiftId: formValues ? formValues.edhiShift.shiftId : '',
            edhiEndDate: formValues ? dayjs(formValues.edhiEndDate, "YYYY-MM-DD") : '',
            edhiStartDate: formValues ? dayjs(formValues.edhiStartDate, "YYYY-MM-DD") : '',
            
            
          }}
          
          form={form}
        >

          <Row>
            <Col className="gutter-row" span={24}>
              <Form.Item
                label="Department"
                name="deptId"
                rules={[
                  { required: true, message: "Please input department!" },
                ]}
              >
                <Select
                  placeholder="Please choose"
                  style={{ width: '100%', marginLeft: '10px' }}
                  options={optionValDept}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={24}>
              <Form.Item
                label="Start Date"
                name="edhiStartDate"
                rules={[
                  { required: true, message: "Please input start date!" },
                ]}
              >
                <DatePicker format="DD-MM-YYYY" style={{ width: '100%', marginLeft: '10px' }} placeholder="Input start date" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={24}>
              <Form.Item
                label="End Date"
                name="edhiEndDate"
                rules={[
                  { required: true, message: "Please input end date!" },
                ]}
              >
                <DatePicker format="DD-MM-YYYY" style={{ width: '100%', marginLeft: '10px' }} placeholder="Input end date" />
              </Form.Item>
            </Col>

            <Col className="gutter-row" span={8}>
              <Form.Item
                label="Shift"
                name="shiftId"
                rules={[
                  { required: true, message: "Please input shift!" },
                ]}
              >
                <Select
                  placeholder="Please choose"
                  onChange={handleOnchangeShift}
                  style={{ width: '100%', marginLeft: '10px' }}
                  options={optionValShift}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                label="Start Time"
                name="shiftStartTime"
              >
                <Input
                  disabled={true}
                  style={{ width: '100%', marginLeft: '10px' }} value={shiftStartTime} placeholder={shiftStartTime}
                />

              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                label="End Time"
                name="shiftEndTime"
              >
                <Input
                  disabled={true}
                  style={{ width: '100%', marginLeft: '10px' }} value={shiftEndTime} placeholder={shiftEndTime}
                />

              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
