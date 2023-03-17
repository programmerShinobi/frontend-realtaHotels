import React, { useState } from 'react';
import {
  IdcardOutlined,
  CreditCardOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  BookOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/router';

const SidebarStaff= () => {
  const { Sider } = Layout;

  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }
  
  const router = useRouter();

  // hr/department
  const handleHRDepartment = () => {
    router.push('/staff/hr/department');
  };

  // hr/employee
  const handleHREmployee = () => {
    router.push('/staff/hr/employee');
  };

  // hr/workOrder
  const handleHRWorkOrder = () => {
    router.push('/staff/hr/workOrder');
  };

  // purchasing/vendor
  const handlePurchasingVendor = () => {
    router.push('/staff/purchasing/vendor');
  };

  // purchasing/stock
  const handlePurchasingStock = () => {
    router.push('/staff/purchasing/stock');
  };

  // purchasing/purchaseOrder
  const handlePurchasingPurchaseOrder = () => {
    router.push('/staff/purchasing/purchaseOrder');
  };

  // payment/bank
  const handlePaymentBank = () => {
    router.push('/staff/payment/bank');
  };

  // payment/fintech
  const handlePaymentFintech = () => {
    router.push('/staff/payment/fintech');
  };

  // payment/account
  const handlePaymentAccounts = () => {
    router.push('/staff/payment/accounts');
  };

  // payment/topup
  const handlePaymentTopup = () => {
    router.push('/staff/payment/topup');
  };

  // payment/transaction
  const handlePaymentTransaction = () => {
    router.push('/staff/payment/transaction');
  };

  // hotels/hotel
  const handleHotelsHotel = () => {
    router.push('/staff/hotels/hotel');
  };

  // hotels/facilities
  const handleHotelsFacilities = () => {
    router.push('/staff/hotels/facilities');
  };

  // hotels/reviews
  const handleHotelsReviews = () => {
    router.push('/staff/hotels/reviews');
  };

  // resto
  const handleResto = () => {
    router.push('/staff/resto');
  };

  const items: MenuItem[] = [
    getItem('Human Resource', 'sub1', <SolutionOutlined />, [
      getItem(
        <button
          className="w-full text-left"
          onClick={handleHRDepartment}>
          {"Department"}
        </button>
        , '/staff/hr/department'),
      getItem(
        <button
          className="w-full text-left"
          onClick={handleHREmployee}>
          {"Employee"}
        </button>
        , '/staff/hr/employee'),
      getItem(
        <button
          className="w-full text-left"
          onClick={handleHRWorkOrder}>
          {"Work Order"}
        </button>
        , '/staff/hr/workOrder'),
    ]),
    getItem('Purchasing', 'sub2', <ShoppingCartOutlined />, [
      getItem(
        <button
          className="w-full text-left"
          onClick={handlePurchasingVendor}>
          {"Vendor"}
        </button>
        , '/staff/purchasing/vendor'),
      getItem(
        <button
          className="w-full text-left"
          onClick={handlePurchasingStock}>
          {"Stock"}
        </button>
        , '/staff/purchasing/stock'),
      getItem(
        <button
          className="w-full text-left"
          onClick={handlePurchasingPurchaseOrder}>
          {"Purchase Order"}
        </button>
        , '/staff/purchasing/purchaseOrder'),
    ]),
    getItem('Payment', 'sub3', <CreditCardOutlined />, [
      getItem(
        <button
          className="w-full text-left"
          onClick={handlePaymentBank}>
          {"Bank"}
        </button>
        , '/staff/payment/bank'),
      getItem(
        <button
          className="w-full text-left"
          onClick={handlePaymentFintech}>
          {"Fintech"}
        </button>
        , '/staff/payment/fintech'),
      getItem(
        <button
          className="w-full text-left"
          onClick={handlePaymentAccounts}>
          {"Accounts"}
        </button>
        , '/staff/payment/accounts'),
      getItem(
        <button
          className="w-full text-left"
          onClick={handlePaymentTopup}>
          {"Topup"}
        </button>
        , '/staff/payment/topup'),
      getItem(
        <button
          className="w-full text-left"
          onClick={handlePaymentTransaction}>
          {"Transaction"}
        </button>
        , '/staff/payment/transaction'),
    ]),
    getItem('Hotels', 'sub4', <IdcardOutlined />, [
      getItem(
        <button
          className="w-full text-left"
          onClick={handleHotelsHotel}>
          {"Hotel"}
        </button>
        , '/staff/hotels/hotel'),
      getItem(
        <button
          className="w-full text-left"
          onClick={handleHotelsFacilities}>
          {"Facilities"}
        </button>
        , '/staff/hotels/facilities'),
      getItem(
        <button
          className="w-full text-left"
          onClick={handleHotelsReviews}>
          {"Reviews"}
        </button>
        , '/staff/hotels/reviews'),
    ]),
    getItem(
        <button
          className="w-full text-left"
          onClick={handleResto}>
          {"Resto Menu"}
        </button>
      , '/staff/resto', <BookOutlined />),
  ];

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
        {/* Sider */}
        <Sider className='shadow-lg overflow-y-auto' theme='dark' style={{background: colorBgContainer}} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>  
          <div className='flex justify-center text-justify'>
            {collapsed ? (
              <div style={{ height: 26, margin: 16 }}>
                <img
                  width={26}
                  src="/assets/logo-head.ico"
                  alt="logo"
                />
              </div>
            ) : (
              <div style={{ height: 26, margin: 16 }}>
                <img
                  src="/assets/logo-realtaHotel.png"
                  alt="logo"
                />
              </div>
            )}
          </div>
          
          {/* Menu Sidebar */}
          <Menu
            defaultSelectedKeys={['/staff/hr/department']} selectedKeys={[location.pathname]}
            mode="inline"
            items={items}
            style={{ background: colorBgContainer }}/>

        </Sider>
    </>
  );
};

export default (SidebarStaff);