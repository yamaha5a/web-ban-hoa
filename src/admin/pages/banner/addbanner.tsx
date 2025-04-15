import { useState } from "react";
import { Button, Form, Input, Upload, message } from "antd";
import { useCreateBanner } from "../../hook/banner";
import { UploadOutlined } from "@ant-design/icons";

const AddBanner = () => {
  const { mutate: createBanner, isLoading } = useCreateBanner();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    if (!values.image || values.image.length === 0) {
      return message.error("Vui lòng chọn ảnh!");
    }

    // Lấy file từ danh sách đã chọn
    const file = values.image[0].originFileObj;
    if (!file) return;

    // Lấy tên file
    const fileName = file.name;

    // Đường dẫn ảnh (giả sử ảnh có sẵn trong thư mục public/images/banner/)
    const imagePath = `/images/banner/${fileName}`;

    // Gửi dữ liệu lên API JSON Server
    await createBanner({
      id: Math.random().toString(36).substr(2, 4), // Tạo ID ngẫu nhiên
      title: values.title,
      description: values.description,
      image: imagePath, // Lưu đúng đường dẫn
    });
    form.resetFields(); // Reset form sau khi thêm thành công
  };

  return (
    <div>
      <h1>Thêm Banner</h1>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Ảnh banner"
          name="image"
          rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
          valuePropName="fileList"
          getValueFromEvent={(e) => e?.fileList || []}
        >
          <Upload listType="picture" beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={isLoading}>
          Thêm Banner
        </Button>
      </Form>
    </div>
  );
};

export default AddBanner;
