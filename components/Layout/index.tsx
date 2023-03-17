import React from 'react';
import { Layout, theme } from 'antd';
import HeaderGuest from '@/components/Header/guest/';
import Footer from '@/components/Footer/guest/footer';

const Layouts = ({ children }: any) => {
  const { Header, Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      {/* Layout */}
      <Layout>

        {/* Header */}
        <Header style={{ padding: 0, background: colorBgContainer }}>  
          {/* Header */}
          <HeaderGuest/>
        </Header>
          
          {/* Content */}
          <Content >

            {/* LayoutMain */}
            <main className='mt-8 rounded-lg'>
              { children }
            </main>

          </Content>

          {/* Footer */}
          <Footer />

      </Layout>
    </>
  );
};

export default Layouts;