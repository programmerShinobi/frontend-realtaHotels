import React from 'react';
import { Layout, theme } from 'antd';
import PrivateWithAuth from "@/components/Private/withAuth";
import { useRouter } from 'next/router';
import HeaderGuest from '@/components/Header/guest';
import Footer from '@/components/Footer/guest/footer';

const LayoutGuest = ({ children }: any) => {
  const { Header, Content } = Layout;
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


          {/* Header */}
          <HeaderGuest/>
          
          {/* Content */}
          <Content style={{ margin: '0 120px' }}>

            {/* LayoutMain */}
            <main className='grid shadow-md bg-white pb-8 mt-6 mb-8 rounded-lg' style={{ padding: 24, minHeight: 444, background: colorBgContainer, borderRadius:10 }}>
              { children }
            </main>

          </Content>

          {/* Footer */}
          <Footer />

      </Layout>
    </>
  );
};

export default PrivateWithAuth(LayoutGuest);