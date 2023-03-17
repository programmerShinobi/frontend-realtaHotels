import { Row, Col, Divider, Form, Input, Select, Button } from "antd";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
export default function Order() {
  const style: React.CSSProperties = {
    background: "#0092ff",
    padding: "8px 0",
  };

  return (
    <>
      <div className="w-full">
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Divider orientation="center">Booking Order Details</Divider>
          <Row gutter={22} className="justify-center">
            <Col className="gutter-row" span={10}>
              <div className="py-2 rounded-lg bg-white shadow-lg md:flex-row">
                <div className="text-center py-3 font-bold">Booking Order</div>
                <div>
                  <Form.Item
                    label="Order Number"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Hotel Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Order Date"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Arrival Date"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Total Room"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="">
                  <Form.Item
                    label="Total Guest"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Col span={24} className="flex  text-center space-x-10">
                      <Input placeholder="Adults" />
                      <Input placeholder="Kids" />
                    </Col>
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Discount"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Discount"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Total Tax"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Total Amount"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
            </Col>

            <Col className="gutter-row" span={10}>
              <div className="py-2 rounded-lg bg-white shadow-lg md:flex-row">
                <div className="text-center font-bold py-3">Payment</div>
                <div>
                  <Form.Item
                    label="Down Payment"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label="Pay Type"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Select
                      defaultValue="Debet"
                      style={{ width: 200 }}
                      onChange={handleChange}
                      options={[
                        { value: "CR", label: "Credit Card" },
                        { value: "C", label: "Cash" },
                        { value: "D", label: "Debet" },
                        { value: "PG", label: "Down Payment" },
                      ]}
                    />
                  </Form.Item>
                </div>
                <Form.Item wrapperCol={{ offset: 17, span: 24 }}>
                  <Button
                    className="bg-pink-400 focus:bg-red-700 w-20"
                    type="primary"
                    htmlType="submit"
                  >
                    Pay
                  </Button>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}
