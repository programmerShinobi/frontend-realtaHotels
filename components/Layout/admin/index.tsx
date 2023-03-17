import React from 'react';
import { Layout, theme } from 'antd';
import PrivateWithAuth from "@/components/Private/withAuth";
import HeaderAdmin from '@/components/Header/admin';
import SidebarAdmin from '@/components/Sidebar/admin';
import FooterEmployee from '@/components/Footer/employee';
import IndicatorBreadcrumbEmployee from '@/components/Indicator/breadcrumb';
import { useRouter } from 'next/router';


const LayoutAdmin = ({ children }:any) => {
  const { Header, Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();
  const roleId: any = localStorage.getItem("roleId");
  if (roleId != 4) {
    router.back();
  }

  return (
    <div>
      {/* Layout */}
      <Layout style={{ minHeight: '16vh' }}>

        {/* Sider */}
        <SidebarAdmin/>

        {/* LayoutSite */}
        <Layout className="site-layout">

          {/* Header */}
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <HeaderAdmin/>
          </Header>
          
          {/* Content */}
          <Content style={{ margin: '0 16px' }}>

            {/* Breadcrumb */}
            <IndicatorBreadcrumbEmployee />
            
            {/* LayoutMain */}
            <main style={{ padding: 24, minHeight: 444, background: colorBgContainer, borderRadius:10 }}>
              { children }
            </main>

          </Content>

          {/* Footer */}
          <FooterEmployee />
          
        </Layout>

      </Layout>
    </div>
  );
};

export default PrivateWithAuth(LayoutAdmin);