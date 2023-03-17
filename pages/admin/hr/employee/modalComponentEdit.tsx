import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { Input, Upload, Modal, Form, Col, Row, DatePicker, Select, InputNumber, message, Space, Button, TimePicker } from "antd";
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { doEmployeeCreate, doUpdateEmployee } from "@/redux/Actions/HumanResources/reducerEmployeeAction";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import moment from "moment";
import type { UploadChangeParam } from 'antd/es/upload';

export default function ModalComponentEdit({ ...props }: any) {
  const id = props.id;
  const dataEmployee = props.dataEmployee;
  const dataDepartment = props.dataDepartment;
  const dataShift = props.dataShift;
  const dataJobrole = props.dataJobrole;
  const dataUsers = props.dataUsers;
  const { handleClose } = props;
  const detailsEmployee: any = dataEmployee.find((item: any) => item.emp_id == id);
  const [formValues, setFormValues] = useState(detailsEmployee);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState<string>(detailsEmployee.emp_photo);


  dayjs.extend(customParseFormat);

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

  /* mapping data jobrole */
  let optionValJobrole: any = [{ value: "", label: "Please choose" }]
  dataJobrole && dataJobrole.map((res: any, index: any) => {
    optionValJobrole = [...optionValJobrole, { value: res.joroId, label: res.joroName }]
  })
  /* end mapping data jobrole */

  /* mapping data users */
  let optionValUsers: any = [{ value: "", label: "Please choose" }]
  dataUsers && dataUsers.map((res: any, index: any) => {
    optionValUsers = [...optionValUsers, { value: res.userId, label: res.userFullName }]
  })

  // console.log("datausers ",dataUsers)
  /* end mapping data users */


  /* handlee modal Edit Data */
  const handleInputChange = (input: any) => (e: any) => {
    setFormValues({ ...formValues, [input]: e.target.value });
  };

  /* endhandle modal Edit Data*/

  /* handle form */
  const onFinish = (values: any) => {

    values = {
      ...values,
      emp_id: id,
      emp_photo: imageUrl,
      emp_birth_date: moment(values.emp_birth_date.$d, "YYYY-MM-DD").format("YYYY-MM-DD"),
      emp_hire_date: moment(values.emp_hire_date.$d, "YYYY-MM-DD").format("YYYY-MM-DD"),
    }

    dispatch(doUpdateEmployee(values));
    handleClose(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
  };

  /* endhandle form */

  /* handle upload image */
  let employeePhoto: any = [];
  if (formValues != null) {
    employeePhoto = [{
      uid: '-1',
      name: 'avatar',
      status: 'done',
      url: formValues.emp_photo,
    },];
  }
  const [fileList, setFileList] = useState<UploadFile[]>(employeePhoto);

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
        title={"Edit employee"}
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
          initialValues={
            {
              emp_national_id: formValues.emp_national_id,
              emp_birth_date: dayjs(formValues.emp_birth_date, "YYYY-MM-DD"),
              emp_marital_status: formValues.emp_marital_status,
              emp_salaried_flag: formValues.emp_salaried_flag,
              emp_vacation_hours: formValues.emp_vacation_hours,
              emp_joro_id: formValues.emp_joro_id,
              emp_user_id: formValues.emp_user_id,
              emp_hire_date: dayjs(formValues.emp_hire_date, "YYYY-MM-DD"),
              emp_gender: formValues.emp_gender,
              emp_current_flag: formValues.emp_current_flag,
              emp_sickleave_hours: formValues.emp_sickleave_hours,
            }
          }
          form={form}

        >
          <fieldset>
            <legend>General</legend>
            <Row>
              <Col className="gutter-row" span={10}>

                <Form.Item
                  label="National Id"
                  name="emp_national_id"
                >
                  <InputNumber
                    style={{ width: '100%', marginLeft: '10px' }}
                    min={0}
                    placeholder="Input national id"
                    onChange={handleInputChange("emp_national_id")}
                    disabled={true}
                  />
                </Form.Item>

                <Form.Item
                  label="Birth Date"
                  name="emp_birth_date"
                >
                  <DatePicker

                    presets={[
                      { label: 'Yesterday', value: dayjs().add(-1, 'd') },
                      { label: 'Last Week', value: dayjs().add(-7, 'd') },
                      { label: 'Last Month', value: dayjs().add(-1, 'month') },
                    ]}
                    style={{ width: '100%', marginLeft: '10px' }}
                    format="DD-MM-YYYY"
                  />
                </Form.Item>


                <Form.Item
                  label="Marital Status"
                  name="emp_marital_status"
                >
                  <Select
                    style={{ width: '100%', marginLeft: '10px' }}
                    options={[
                      { value: '', label: 'Please choose' },
                      { value: 'M', label: 'Married' },
                      { value: 'S', label: 'Single' },
                    ]}

                  />
                </Form.Item>

                <Form.Item
                  label="Salaried Flag"
                  name="emp_salaried_flag"
                >
                  <Select
                    style={{ width: '100%', marginLeft: '10px' }}
                    options={[
                      { value: '', label: 'Please choose' },
                      { value: '0', label: 'Hourly' },
                      { value: '1', label: 'Monthly' },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="Vacation Hours"
                  name="emp_vacation_hours"
                >
                  <InputNumber

                    style={{ width: '100%', marginLeft: '10px' }}
                    min={0}
                  />
                </Form.Item>

                <Form.Item
                  label="Job Role"
                  name="emp_joro_id"
                >
                  <Select
                    style={{ width: '100%', marginLeft: '10px' }}
                    options={optionValJobrole}
                  />
                </Form.Item>

              </Col>

              <Col className="gutter-row" span={10}>
                <Form.Item
                  label="Full Name"
                  name="emp_user_id"
                >
                  <Select
                    showSearch
                    placeholder="Input full name"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={optionValUsers}

                  />
                </Form.Item>

                <Form.Item
                  label="Hire Date"
                  name="emp_hire_date"
                >
                  <DatePicker
                    presets={[
                      { label: 'Yesterday', value: dayjs().add(-1, 'd') },
                      { label: 'Last Week', value: dayjs().add(-7, 'd') },
                      { label: 'Last Month', value: dayjs().add(-1, 'month') },
                    ]}
                    style={{ width: '100%', marginLeft: '10px' }}
                    format="DD-MM-YYYY"
                  />

                </Form.Item>

                <Form.Item
                  label="Gender"
                  name="emp_gender"
                >
                  <Select
                    style={{ width: '100%', marginLeft: '10px' }}
                    options={[
                      { value: '', label: 'Please choose' },
                      { value: 'M', label: 'Male' },
                      { value: 'F', label: 'Famale' },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="Current Flag"
                  name="emp_current_flag"
                >
                  <Select
                    style={{ width: '100%', marginLeft: '10px' }}
                    options={[
                      { value: '', label: 'Please choose' },
                      { value: 1, label: 'Active' },
                      { value: 0, label: 'Inactive' },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  labelCol={{ style: { width: 127 } }}
                  label="Sick Leave Hours"
                  name="emp_sickleave_hours"
                >
                  <InputNumber
                    style={{ width: '87%', marginLeft: '10px' }}
                    min={0}
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
        </Form>
      </Modal>
    </div >
  );
};
