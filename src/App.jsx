import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";
import { Layout, ConfigProvider } from 'antd';
import { useState } from "react";
import SideBar from "./Components/SideMenu";


const { Content, Footer } = Layout;


export default function App() {
  const [collapsed, setCollapsed] = useState(true);

  return (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#00b96b',
            },
          }}
        >
          <Layout
            style={{ minHeight: '100vh' }}
          >
            <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout style={{ marginLeft: "0.5%"}}>
                
              <AppHeader setCollapsed={setCollapsed} collapsed={collapsed} />
              <Content
                style={{
                  margin: '0 16px',
                }}
              >
                  <PageContent />
              </Content>
              <Footer
                style={{
                  textAlign: 'center',
                }}
              >
                <AppFooter />
              </Footer>
            </Layout>
          </Layout>
        </ConfigProvider>
  );
}
