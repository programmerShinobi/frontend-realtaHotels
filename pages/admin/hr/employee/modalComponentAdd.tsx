import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { Input, Upload, Modal, Form, Col, Row, DatePicker, Select, InputNumber, message, Space, Button, TimePicker } from "antd";
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import moment from "moment";
import type { UploadChangeParam } from 'antd/es/upload';
import { doEmployeeCreate } from "@/redux/Actions/HumanResources/reducerEmployeeAction";

export default function ModalComponentAdd({...props} : any) {
  const id = props.id;
  const dataDepartment = props.dataDepartment;
  const dataShift = props.dataShift;
  const dataJobrole = props.dataJobrole;
  const dataUsers = props.dataUsers;
  const { handleClose } = props;
  const [shiftStartTime, setShiftStartTime] = useState("");
  const [shiftEndTime, setShiftEndTime] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState<string>();

  dayjs.extend(customParseFormat);

  /* mapping data department */
  let optionValDept : any = [{ value: "", label: "Please choose"}]
  dataDepartment && dataDepartment.map((res : any, index : any) => {
    optionValDept = [...optionValDept, { value: res.deptId, label: res.deptName }]
  })
  /* end mapping data department */
  
  /* mapping data shift */
  let optionValShift : any = [{ value: "", label: "Please choose"}]
  dataShift && dataShift.map((res : any, index : any) => {
    optionValShift = [...optionValShift, { value: res.shiftId, label: res.shiftName }]
  })
  /* end mapping data shift */
  
  /* mapping data jobrole */
  let optionValJobrole : any = [{ value: "", label: "Please choose"}]
  dataJobrole && dataJobrole.map((res : any, index : any) => {
    optionValJobrole = [...optionValJobrole, { value: res.joroId, label: res.joroName }]
  })
  /* end mapping data jobrole */
  
  /* mapping data users */
  // console.log(dataUsers)

  let optionValUsers : any = [{ value: "", label: "Please choose"}]
  dataUsers && dataUsers.map((res : any, index : any) => {
    optionValUsers = [...optionValUsers, { value: res.userId, label: res.userFullName }]
  })
  // console.log("dataUsers ",dataUsers)
  /* end mapping data users */


  // console.log(formValues)

  /* handle form */
  const onFinish = (values: any) => {
    // console.log(values)
    values = { 
      ...values, 
      emp_photo : imageUrl,
      edhi_end_date: moment(values.edhi_end_date.$d,"YYYY-MM-DD").format("YYYY-MM-DD"),
      edhi_start_date: moment(values.edhi_start_date.$d,"YYYY-MM-DD").format("YYYY-MM-DD"),
      emp_birth_date: moment(values.emp_birth_date.$d,"YYYY-MM-DD").format("YYYY-MM-DD"),
      emp_hire_date: moment(values.emp_hire_date.$d,"YYYY-MM-DD").format("YYYY-MM-DD"),
    }

    dispatch(doEmployeeCreate(values));
    handleClose(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  /* endhandle form */

  /* handle onchange Shift */
  const handleOnchangeShift = (value : any) => {
    
    if(value != ""){
      const findOneDataShift = dataShift.find((item: any) => item.shiftId == value);
      
      const shiftStartTimeNew = dayjs(findOneDataShift.shiftStartTime).format("HH:mm:ss");
      const shiftEndTimeNew = dayjs(findOneDataShift.shiftEndTime).format("HH:mm:ss");

      setShiftStartTime(shiftStartTimeNew)
      setShiftEndTime(shiftEndTimeNew)
      
    }

  }
  /* end handle onchange Shift */

  /* handle upload image */
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const onChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList);

    if (info.file.status === 'done') {
      const imageUrl = info.file.response.result;
      setImageUrl(imageUrl) 
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  /* endhandle upload image */

  return (
    <div>
      <Modal
        open={props.show}
        title={"Add employee"}
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
          // initialValues={formValues}
          form={form}
        >
          <fieldset>
            <legend>General</legend>
            <Row>
              <Col className="gutter-row" span={10}>
                
                  <Form.Item
                    label="National Id"
                    name="emp_national_id" 
                    rules={[
                      { required: true, message: "Please input national id!" },
                    ]}
                  >
                    <InputNumber
                      style={{ width: '100%', marginLeft: '10px' }}
                      min={0}
                      placeholder="Input national id"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Birth Date"
                    name="emp_birth_date"
                    rules={[
                      { required: true, message: "Please input birth date!" },
                    ]}
                  >
                  <DatePicker format="DD-MM-YYYY" style={{ width: '100%', marginLeft: '10px' }} placeholder="Input birth date" />
                  </Form.Item>


                  <Form.Item
                    label="Marital Status"
                    name="emp_marital_status"
                    rules={[
                      { required: true, message: "Please input marital status!" },
                    ]}
                  >
                    <Select
                      placeholder="Please choose"
                      style={{ width: '100%', marginLeft : '10px' }}
                      options={[
                        { value: 'M', label: 'Married' },
                        { value: 'S', label: 'Single' },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Salaried Flag"
                    name="emp_salaried_flag"
                    rules={[
                      { required: true, message: "Please input salaried flag!" },
                    ]}
                  >
                    <Select
                    placeholder="Please choose"
                      style={{ width: '100%', marginLeft : '10px' }}
                      options={[
                        { value: '0', label: 'Hourly' },
                        { value: '1', label: 'Monthly' },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Vacation Hours"
                    name="emp_vacation_hours"
                    rules={[
                      { required: true, message: "Please input vacation hours!" },
                    ]}
                  >
                    <InputNumber 
                      style={{ width: '100%', marginLeft: '10px' }} 
                      min={0}
                      placeholder="Input vacation hours"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Job Role"
                    name="emp_joro_id"
                    rules={[
                      { required: true, message: "Please input job role!" },
                    ]}
                  >
                    <Select
                      placeholder="Please choose"
                      style={{ width: '100%', marginLeft : '10px' }}
                      options={optionValJobrole}
                    />
                  </Form.Item>

              </Col>

              <Col className="gutter-row" span={10}>
                <Form.Item
                  label="Full Name"
                  name="user_id"
                  rules={[
                    { required: true, message: "Please input full name!" },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Input full name"
                    optionFilterProp="children"
                    onChange={(e) => console.log(e)}
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={optionValUsers}
                  />
                </Form.Item>

                <Form.Item
                  label="Hire Date"
                  name="emp_hire_date"
                  rules={[
                    { required: true, message: "Please input hire date!" },
                  ]}
                >
                  <DatePicker format="DD-MM-YYYY" style={{ width: '100%', marginLeft: '10px' }} placeholder="Input hire date" />
                </Form.Item>

                <Form.Item
                  label="Gender"
                  name="emp_gender"
                  rules={[
                    { required: true, message: "Please input gender!" },
                  ]}
                >
                  <Select
                    placeholder="Please choose"
                    style={{ width: '100%', marginLeft : '10px' }}
                    options={[
                      { value: 'M', label: 'Male' },
                      { value: 'F', label: 'Famale' },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="Current Flag"
                  name="emp_current_flag"
                  rules={[
                    { required: true, message: "Please input current flag!" },
                  ]}
                >
                  <Select
                    placeholder="Please choose"
                    style={{ width: '100%', marginLeft : '10px' }}
                    options={[
                      { value: 1, label: 'Active' },
                      { value: 0, label: 'Inactive' },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  labelCol={{ style: { width: 127 } }}
                  label="Sick Leave Hours"
                  name="emp_sickleave_hours"
                  rules={[
                    { required: true, message: "Please input sick leave hours!" },
                  ]}
                >
                  <InputNumber 
                    style={{ width: '87%', marginLeft: '10px' }}
                    min={0}
                    placeholder="Input sick leave hours"
                  />
                </Form.Item>
                
              </Col>

              <Col className="gutter-row" span={4}>
                <ImgCrop rotate>
                  <Upload
                    action="http://localhost:3005/employee/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={onPreview}
                    beforeUpload={beforeUpload}
                    onChange={onChange}
                    method="post"
                  >
                    {fileList.length < 1 && '+ Upload'}
                  </Upload>
                </ImgCrop>
                  
              </Col>

            </Row>

          </fieldset>


          <fieldset>
            <legend>Salary</legend>
            <Row>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Salary Rate"
                  name="ephi_rate_salary"
                  rules={[
                    { required: true, message: "Please input salary rate!" },
                  ]}
                >
                  <InputNumber
                    style={{ width: '100%', marginLeft: '10px' }}
                    min={0} placeholder="Input salary rate"
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  label="Frequency"
                  name="ephi_pay_frequence"
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
              </Col>
            </Row>
          </fieldset>

          <fieldset>
            <legend>Assignment</legend>
            <Row>
              <Col className="gutter-row" span={6}>
                <Form.Item
                  label="Department"
                  name="dept_id"
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
              <Col className="gutter-row" span={9}>
                <Form.Item
                  label="Start Date"
                  name="edhi_start_date"
                  rules={[
                    { required: true, message: "Please input start date!" },
                  ]}
                >
                  <DatePicker format="DD-MM-YYYY" style={{ width: '100%', marginLeft: '10px' }} placeholder="Input start date" />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={9}>
                <Form.Item
                  label="End Date"
                  name="edhi_end_date"
                  rules={[
                    { required: true, message: "Please input end date!" },
                  ]}
                >
                  <DatePicker format="DD-MM-YYYY" style={{ width: '100%', marginLeft: '10px' }} placeholder="Input end date" />
                </Form.Item>
              </Col>
            </Row>
          </fieldset>

          <fieldset>
            <legend>Shift</legend>
            <Row>
              <Col className="gutter-row" span={6}>
                <Form.Item
                  label="Shift"
                  name="shift_id"
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
                  name="shift_start_time"
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
                  name="shift_end_time"
                >
                  <Input
                    disabled={true}
                    style={{ width: '100%', marginLeft: '10px' }} value={shiftEndTime} placeholder={shiftEndTime}
                  /> 

                </Form.Item>
              </Col>
              <Col className="gutter-row" span={2}>
                {/* <Space direction="horizontal">
                  <Space wrap>
                    <Button type="primary" shape="circle" icon={<PlusOutlined />} />
                  </Space>
                  <Space wrap>
                    <Button type="primary" shape="circle" icon={<MinusOutlined />} danger />
                  </Space>
                </Space> */}
              </Col>
            </Row>
          </fieldset>
      </Form>
    </Modal>
    </div >
  );
};
