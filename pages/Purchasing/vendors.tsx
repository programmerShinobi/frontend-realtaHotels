import { Button, Card, Col, Modal, Row, Switch } from "antd";
import Link from "next/link";
import { useState } from "react";
const { Meta } = Card;
const Vendors = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false)

  const openModal1 = () =>{
    setShowModal1(true)
  }

  const closeModal1 = () =>{
    setShowModal1(false)
  }

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const nav = [
    {
      title: "PT.Unilever Indonesia",
      desc: "Lorem Ipsum Dolor Sit Amet",
      pictUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "PT.Unilever Indonesia",
      desc: "Lorem Ipsum Dolor Sit Amet",
      pictUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "PT.Unilever Indonesia",
      desc: "Lorem Ipsum Dolor Sit Amet",
      pictUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
  ];
  return (
    <div className="m-8">
    <Button onClick={openModal1}>Add New Vendor</Button>
      <Row gutter={[8, 8]}>
        {nav.map((item: any, i: any) => (
          <Col>
            <div className="m-6">
              <Card
                key={i}
                hoverable
                onClick={openModal}
                style={{ width: 240 }}
                cover={<img alt="example" src={item.pictUrl} />}
              >
                <Meta title={item.title} description={item.desc} />
              </Card>
            </div>
          </Col>
        ))}
      </Row>
      <Modal title="Vendor Details" open={showModal} onCancel={closeModal} footer={[
        <Button key='back' onClick={closeModal}>Cancel</Button>,
        <Link href='/vendorStocks/editVendors'><Button>Edit</Button></Link>
      ]}>
        <form>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_text"
              id="floating_text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-not-allowed"
              placeholder=" "
              disabled
            />
            <label
              htmlFor="floating_text"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Vendor ID
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_text"
              id="floating_text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-not-allowed"
              placeholder=" "
              disabled
            />
            <label
              htmlFor="floating_text"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Vendor Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <Row gutter={[32,32]}>
              <Col>
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Vendor Status
                </label>
                <Switch
                  className="mt-6"
                  disabled
                  checkedChildren="Active"
                  unCheckedChildren="Inactive"
                />
              </Col>
              <Col>
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Vendor Primary
                </label>
                <Switch
                  className="mt-6"
                  disabled
                  checkedChildren="Primary"
                  unCheckedChildren="Not Primary"
                />
              </Col>
            </Row>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="date"
              name="floating_text"
              id="floating_text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-not-allowed"
              placeholder=" "
              disabled
            />
            <label
              htmlFor="floating_text"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Register Date
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_text"
              id="floating_text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-not-allowed"
              placeholder=" "
              disabled
            />
            <label
              htmlFor="floating_text"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Vendor URL
            </label>
          </div>
        </form>
      </Modal>
      <Modal title="Add New Vendors" open={showModal1} onCancel={closeModal1}>
        <form>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_text"
              id="floating_text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_text"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Vendor Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <Row gutter={[32,32]}>
              <Col>
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Vendor Status
                </label>
                <Switch
                  className="mt-6"
                  checkedChildren="Active"
                  unCheckedChildren="Inactive"
                />
              </Col>
              <Col>
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Vendor Primary
                </label>
                <Switch
                  className="mt-6"
                  checkedChildren="Primary"
                  unCheckedChildren="Not Primary"
                />
              </Col>
            </Row>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="date"
              name="floating_text"
              id="floating_text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_text"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Register Date
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_text"
              id="floating_text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_text"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Vendor URL
            </label>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Vendors;