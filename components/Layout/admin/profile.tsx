import React from 'react';
import { Layout, theme } from 'antd';
import PrivateWithAuth from "@/components/Private/withAuth";
import { useRouter } from 'next/router';
import styles from "@/styles/ContentProfile.module.css";
import HeaderAdmin from '@/components/Header/admin';
import SidebarAdmin from '@/components/Sidebar/admin';
import FooterEmployee from '@/components/Footer/employee';

const LayoutAdminProfile = ({ children }: any) => {
  const { Header, Content, Footer } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();
  const roleId: any = localStorage.getItem("roleId");
  if (roleId != 4) {
    router.back();
  }

  return (
    <>
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
          <Content>
            {/* LayoutMain */}
            <main style={{ minHeight: 444 }} >
              <div className={styles.cardBackgroundEmpolyee}>
                  <div className={styles.textTitleEmployee}>
                      {"My Profile"}
                  </div>
                { children }
              </div>
            </main>
          </Content>
            <Footer>
              {/* Footer */}
              <FooterEmployee />
            </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default PrivateWithAuth(LayoutAdminProfile);