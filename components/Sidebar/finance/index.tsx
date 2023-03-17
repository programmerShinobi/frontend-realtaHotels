import React, { useState } from 'react';
import {
  CreditCardOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/router';

const SidebarFinance= () => {
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

  // payment/bank
  const handlePaymentBank = () => {
    router.push('/finance/payment/bank');
  };

  // payment/fintech
  const handlePaymentFintech = () => {
    router.push('/finance/payment/fintech');
  };

  // payment/account
  const handlePaymentAccounts = () => {
    router.push('/finance/payment/accounts');
  };

  // payment/topup
  const handlePaymentTopup = () => {
    router.push('/finance/payment/topup');
  };

  // payment/transaction
  const handlePaymentTransaction = () => {
    router.push('/finance/payment/transaction');
  };

  const items: MenuItem[] = [
    getItem('Payment', 'sub1', <CreditCardOutlined />, [
      getItem(
        <button
          className="w-full text-left"
          onClick={handlePaymentBank}>
          {"Bank"}
        </button>
        , '/finance/payment/bank'),
      getItem(
        <button
          className="w-full text-left"
          onClick={handlePaymentFintech}>
          {"Fintech"}
        </button>
        , '/finance/payment/fintech'),
      getItem(
        <button
          className="w-full text-left"
          onClick={handlePaymentAccounts}>
          {"Accounts"}
        </button>
        , '/finance/payment/accounts'),
      getItem(
        <button
          className="w-full text-left"
          onClick={handlePaymentTopup}>
          {"Topup"}
        </button>
        , '/finance/payment/topup'),
      getItem(
        <button
          className="w-full text-left"
          onClick={handlePaymentTransaction}>
          {"Transaction"}
        </button>
        , '/finance/payment/transaction'),
    ]),
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
            defaultSelectedKeys={['/finance/payment/transaction']} selectedKeys={[location.pathname]}
            mode="inline"
            items={items}
            style={{ background: colorBgContainer }}/>

        </Sider>
    </>
  );
};

export default (SidebarFinance);