import React from 'react';
import { Layout, theme } from 'antd';
import PrivateWithAuth from "@/components/Private/withAuth";
import { useRouter } from 'next/router';
import styles from "@/styles/ContentProfile.module.css";
import HeaderEmployee from '@/components/Header/employee';
import SidebarStaff from '@/components/Sidebar/staff';
import FooterEmployee from '@/components/Footer/employee';

const LayoutStaffProfile = ({ children }: any) => {
  const { Header, Content, Footer } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();
  const roleId: any = localStorage.getItem("roleId");
  if (roleId != 5) {
    router.back();
  }

  return (
    <>
      {/* Layout */}
      <Layout style={{ minHeight: '16vh' }}>

        {/* Sider */}
        <SidebarStaff/>

        {/* LayoutSite */}
        <Layout className="site-layout">

          {/* Header */}
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <HeaderEmployee/>
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

export default PrivateWithAuth(LayoutStaffProfile);