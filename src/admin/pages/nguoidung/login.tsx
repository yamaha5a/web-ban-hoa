import { Button, Form, Input, message } from "antd";
import { useAuth } from "../../hook/nguoidung";  
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { mutate, isPending } = useAuth({ resource: "login" });

  const onFinish = async (values: any) => {
    try {
      const response = await mutate(values);
      if (response?.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh",
      background: "#f0f2f5"
    }}>
      <div style={{ 
        background: "white", 
        padding: "40px", 
        borderRadius: "8px", 
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        width: "400px"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Đăng nhập</h2>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item 
            label="Email" 
            name="email" 
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block
              loading={isPending}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
