import React from "react";
import { Layout, Typography } from 'antd';
import NavBar from "./NavBar";
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const CustomLayout = ({ children }) => <Layout className="layout">
  <Header><Title style={{ padding:"10px", color: "white" }} >File manager</Title></Header>
  <Content style={{ padding: '0 50px' }}>
    <NavBar />
    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{children}</div>
  </Content>
  <Footer style={{ textAlign: 'center' }}>   </Footer>
</Layout>

export default CustomLayout;