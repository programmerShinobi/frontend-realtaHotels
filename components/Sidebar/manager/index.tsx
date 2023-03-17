import React, { useState } from "react";
import {
  IdcardOutlined,
  CreditCardOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  BookOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";

const SidebarManager = () => {
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

  const selectMenu = (value: any) => {
   router.push(value.key)
  };

  const items: MenuItem[] = [
    getItem("Human Resource", 1, <SolutionOutlined />, [
      getItem("Department", "/manager/hr/department"),
      getItem("Employee", "/manager/hr/employee"),
      getItem("Work Orders","/manager/hr/workOrders"),
    ]),
    getItem("Purchasing", 2, <ShoppingCartOutlined />, [
      getItem("Purchase Order", "/manager/purchasing/purchaseOrder"),
    ]),
  ];

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
          defaultSelectedKeys={["/manager/hr/department"]}
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
          onSelect={selectMenu}
          style={{ background: colorBgContainer }}
        />
      </Sider>
    </>
  );
};

export default SidebarManager;
