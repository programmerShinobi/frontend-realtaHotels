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

const SidebarOB= () => {
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

  // hotels/hotel
  const handleHotelsHotel = () => {
    router.push('/ob/hotels/hotel');
  };

  // hotels/facilities
  const handleHotelsFacilities = () => {
    router.push('/ob/hotels/facilities');
  };

  // hotels/reviews
  const handleHotelsReviews = () => {
    router.push('/ob/hotels/reviews');
  };


  const items: MenuItem[] = [
    getItem('Hotels', 'sub1', <IdcardOutlined />, [
      getItem(
        <button
          className="w-full text-left"
          onClick={handleHotelsHotel}>
          {"Hotel"}
        </button>
        , '/ob/hotels/hotel'),
      getItem(
        <button
          className="w-full text-left"
          onClick={handleHotelsFacilities}>
          {"Facilities"}
        </button>
        , '/ob/hotels/facilities'),
      getItem(
        <button
          className="w-full text-left"
          onClick={handleHotelsReviews}>
          {"Reviews"}
        </button>
        , '/ob/hotels/reviews'),
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
            defaultSelectedKeys={['/ob/hotels/hotel']} selectedKeys={[location.pathname]}
            mode="inline"
            items={items}
            style={{ background: colorBgContainer }}/>

        </Sider>
    </>
  );
};

export default (SidebarOB);