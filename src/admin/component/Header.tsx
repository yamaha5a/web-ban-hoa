import { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Avatar, Badge, Input, Typography } from "antd";
import { SearchOutlined, ClockCircleOutlined, BellOutlined, MailOutlined, HomeOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Text } = Typography;

const Navbar = () => {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };
    const interval = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(interval);
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <a href="/">Trang chủ</a>
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />}>
        <a href="/login">Đăng xuất</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", padding: "0 20px" }}>
      <Input prefix={<SearchOutlined />} placeholder="Search..." style={{ width: 200 }} />
      
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#f0f2f5", padding: "5px 10px", borderRadius: "5px" }}>
          <ClockCircleOutlined style={{ color: "#4a4a4a", fontSize: "20px" }} />
          <Text>{time}</Text>
        </div>
        
        <Badge count={3}>
          <BellOutlined style={{ fontSize: "20px" }} />
        </Badge>
        
        <Badge count={5}>
          <MailOutlined style={{ fontSize: "20px" }} />
        </Badge>
        
        <Dropdown overlay={menu} trigger={["click"]}>
  <div style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: "10px" }}>
    <Avatar size={40} icon={<UserOutlined />} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: "1" }}>
      <Text strong>Guest</Text>
      <Text type="secondary" style={{ fontSize: "12px" }}>Guest</Text>
    </div>
  </div>
</Dropdown>

      </div>
    </Header>
  );
};

export default Navbar;
