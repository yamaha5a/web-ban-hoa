import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: "center", background: "#001529", color: "#fff" }}>
      © {new Date().getFullYear()} - Cửa hàng hoa tươi.
    </Footer>
  );
};

export default AppFooter;
