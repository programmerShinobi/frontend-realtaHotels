import React from 'react';
import { Layout, theme } from 'antd';
import PrivateWithAuth from "@/components/Private/withAuth";
import { useRouter } from 'next/router';
import HeaderGuest from '@/components/Header/guest';
import styles from "@/styles/ContentProfile.module.css";
import Footer from '@/components/Footer/guest/footer';
import FooterGuest from '@/components/Footer/guest';
const LayoutGuestProfile = ({ children }: any) => {
  const { Header, Content, Footer } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();
  const roleId: any = localStorage.getItem("roleId");
  if (roleId != 1) {
    router.back();
  }

  return (
    <>
      {/* Layout */}
      <Layout style={{ minHeight: '16vh' }}>

        {/* LayoutSite */}
        <Layout className="site-layout">

        {/* Header */}
        <HeaderGuest/>
          
          {/* Content */}
          <Content>

            {/* LayoutMain */}
            <main style={{ minHeight: 444 }} >
              <div className={styles.cardBackground}>
                  <div className={styles.textTitle}>
                      {"My Profile"}
                  </div>
                { children }
              </div>
            </main>

          </Content>        

        </Layout>

      </Layout>
    </>
  );
};

export default PrivateWithAuth(LayoutGuestProfile);