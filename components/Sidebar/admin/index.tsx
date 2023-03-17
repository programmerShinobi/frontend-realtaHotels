import React, { useState } from "react";
import {
  IdcardOutlined,
  DeploymentUnitOutlined,
  TeamOutlined,
  CreditCardOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  BookOutlined,
  ReconciliationOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";

const SidebarAdmin = () => {
  const { Sider } = Layout;

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const router = useRouter();

  const selectMenuItem = (value:any) =>{
    router.push(value.key)
  }

  const items:MenuItem[] = [
    getItem('Master', 1,<DeploymentUnitOutlined/>,[
      getItem('Category Group', '/admin/master/categoryGroup'),
      getItem('Locations', '/admin/master/locations'),
      getItem('Policy', '/admin/master/policy'),
      getItem('Price Items','/admin/master/priceItems'),
      getItem('Service Task','/admin/master/serviceTask'),
    ]),
    getItem('User',2, <TeamOutlined/>,[
      getItem('Bonus Point','/admin/users/bonusPoints'),
      getItem('Members','/admin/users/members'),
      getItem('Roles', '/admin/users/roles'),
    ]),
    getItem('Human Resources', 3,<SolutionOutlined/>,[
      getItem('Departments','/admin/hr/department'),
      getItem('Employees', '/admin/hr/employee'),
      getItem('Work Orders','/admin/hr/workorders'),
    ]),
    getItem('Purchasing', 4,<ShoppingCartOutlined/>,[
      getItem('Vendor','/admin/purchasing/vendor'),
      getItem('Stock','/admin/purchasing/stocks'),
      getItem('Stock Carts','/admin/purchasing'),
    ]),
    getItem('Payment',5, <CreditCardOutlined/>, [
      getItem('Bank','/admin/payment/bank'),
      getItem('Financial Techno','/admin/payment/fintech'),
      getItem('Transaction','/admin/payment/transaction'),
    ]),
    getItem('Hotels', '/admin/hotels/hotel', <IdcardOutlined/>),
    getItem('Resto', '/admin/resto', <BookOutlined />),
    getItem('Booking', '/admin/booking/receptionist', <ReconciliationOutlined />)
  ]
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      {/* Sider */}
      <Sider
        className="shadow-lg overflow-y-auto"
        theme="dark"
        style={{ background: colorBgContainer }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="flex justify-center text-justify">
          {collapsed ? (
            <div style={{ height: 26, margin: 16 }}>
              <img width={26} src="/assets/logo-head.ico" alt="logo" />
            </div>
          ) : (
            <div style={{ height: 26, margin: 16 }}>
              <img src="/assets/logo-realtaHotel.png" alt="logo" />
            </div>
          )}
        </div>

        {/* Menu Sidebar */}
        <Menu
          // defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          style={{ background: colorBgContainer }}
          onSelect={selectMenuItem}
          selectedKeys={[location.pathname]}
        />
      </Sider>
    </>
  );
};

export default SidebarAdmin;