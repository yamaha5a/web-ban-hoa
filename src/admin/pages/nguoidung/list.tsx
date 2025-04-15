import React from "react";
import { useListUsers } from "../../hook/nguoidung";
import { Layout, Table, Spin, Typography, Alert, Avatar, Space } from "antd";
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Content } = Layout;

const UserList = () => {
  const { data: users, isLoading, error } = useListUsers();

  if (isLoading) return <Spin size="large" />;
  if (error) return <Alert message="Lỗi" description={error.message} type="error" />;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      render: (avatar) => (
        <Avatar size={40} shape="square" icon={<UserOutlined />} src={avatar} />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_, user) => (
        <Space size="middle">
          <EditOutlined style={{ color: "#1890ff", cursor: "pointer" }} onClick={() => console.log("Sửa", user.id)} />
          <DeleteOutlined style={{ color: "red", cursor: "pointer" }} onClick={() => console.log("Xóa", user.id)} />
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", display: "flex" }}>
      {/* Không cần Sidebar ở đây, đã có ở AdminLayout */}
      <Content style={{  padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>Danh sách người dùng</Title>
        <Table 
          dataSource={users} 
          columns={columns} 
          rowKey="id" 
          pagination={{ pageSize: 5 }}
          bordered
        />
      </Content>
    </Layout>
  );
};

export default UserList;
