import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../component/Header";
import Sidebar from "../component/menu";

const { Content } = Layout;

const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />

      <Layout>
        <Sidebar />

        <Layout style={{ padding: "20px", marginTop: 64 }}>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
