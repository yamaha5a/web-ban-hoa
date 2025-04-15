import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header style={{ position: "fixed", width: "100%", zIndex: 1000, top: 0 }}>
      <Menu theme="dark" mode="horizontal" style={{ justifyContent: "center" }}>
        <Menu.Item key="1">
          <Link to="/">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/danhmuc">Sản phẩm</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/cart">Giỏ hàng</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/contact">Liên hệ</Link>
        </Menu.Item>
        <Menu.Item key="5" style={{ marginLeft: "auto" }}>
          <Link to="/login">Đăng nhập</Link>
        </Menu.Item>
        <Menu.Item key="6" style={{ marginLeft: "10px" }}>
          <Link to="/register">Đăng ký</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader;
