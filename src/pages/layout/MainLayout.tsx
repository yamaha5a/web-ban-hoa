import { Layout } from "antd";
import { Outlet } from "react-router";
import AppHeader from "../component/Header";
import AppFooter from "../component/Footer";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppHeader />
      <Content style={{ flex: 1, padding: "20px 50px" }}>
        <Outlet />
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default MainLayout;
