import React from "react";
import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
  PictureOutlined,
  UserOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  TagOutlined,
  FileTextOutlined,
  CreditCardOutlined,
  CarOutlined,
  CoffeeOutlined,
  StarOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider width={250} style={{ background: "#fff" }}>
      <div className="logo" style={{ padding: "16px", textAlign: "center", fontWeight: "bold", fontSize: "18px" }}>
        Quản trị <span style={{ color: "#1890ff" }}>Viên</span>
      </div>
      <Menu mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <a href="/admin/banner">Bảng điều khiển</a>
        </Menu.Item>
        <Menu.Item key="2" icon={<PictureOutlined />}>
          <a href="/admin/banner">Banner</a>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <a href="/admin/nguoidung">Người dùng</a>
        </Menu.Item>
        <Menu.Item key="4" icon={<AppstoreOutlined />}>
          <a href="/admin/sanpham">Sản phẩm</a>
        </Menu.Item>
        <Menu.Item key="5" icon={<UnorderedListOutlined />}>
          <a href="/admin/danhmuc">Danh mục</a>
        </Menu.Item>
        <Menu.Item key="6" icon={<TagOutlined />}>
          <a href="/admin/banner">Mã giảm giá</a>
        </Menu.Item>
        <Menu.Item key="7" icon={<FileTextOutlined />}>
          <a href="/admin/banner">Hóa đơn</a>
        </Menu.Item>
        <Menu.Item key="8" icon={<CreditCardOutlined />}>
          <a href="/admin/banner">Quản lý thanh toán</a>
        </Menu.Item>
        <Menu.Item key="9" icon={<CarOutlined />}>
          <a href="/admin/banner">Trạng thái vận chuyển</a>
        </Menu.Item>
        <Menu.Item key="10" icon={<CoffeeOutlined />}>
          <a href="/admin/banner">Quản lý Topping</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="11" icon={<StarOutlined />}>
          <a href="/admin/banner">Đánh giá</a>
        </Menu.Item>
        <Menu.Item key="12" icon={<MailOutlined />}>
          <a href="/admin/banner">Liên hệ</a>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
