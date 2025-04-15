import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useBanner, useUpdateBanner } from "../../hook/banner";
import { Button, Input, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UpdateBanner = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const { data: banner, isLoading } = useBanner({ id }); // Lấy banner theo ID
  const updateBanner = useUpdateBanner({ id }); // Hook cập nhật banner
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset, // Sử dụng reset() để cập nhật form
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  const [fileList, setFileList] = useState([]); // Lưu danh sách file

  // Khi có dữ liệu banner, cập nhật form
  useEffect(() => {
    if (banner) {
      reset({
        title: banner.title,
        description: banner.description,
        image: banner.image,
      });
      setFileList(banner.image ? [{ url: banner.image }] : []);
    }
  }, [banner, reset]);

  // Xử lý khi upload ảnh
  const handleUpload = (info: any) => {
    if (info.file.status === "done") {
      const imageUrl = info.file.response.url; // URL ảnh sau khi tải lên thành công
      reset((prevValues) => ({
        ...prevValues,
        image: imageUrl,
      }));
      setFileList([{ url: imageUrl }]);
    }
  };

  // Xử lý cập nhật banner
  const onSubmit = (values: any) => {
    updateBanner.mutate(values, {
      onSuccess: () => {
        message.success("Cập nhật banner thành công!");
        navigate("/admin/banner");
      },
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Cập nhật Banner</h2>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Tiêu đề">
          <Input {...register("title")} />
        </Form.Item>

        <Form.Item label="Mô tả">
          <Input.TextArea {...register("description")} />
        </Form.Item>

        <Form.Item label="Ảnh">
          <Upload
            action="http://localhost:3000/upload" // API tải ảnh lên server
            listType="picture-card"
            fileList={fileList}
            onChange={handleUpload}
            showUploadList={{ showRemoveIcon: false }}
          >
            {fileList.length < 1 && <UploadOutlined />}
          </Upload>
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={updateBanner.isLoading}>
          Cập nhật
        </Button>
        <Button onClick={() => navigate("/admin/banner")} style={{ marginLeft: 10 }}>
          Hủy
        </Button>
      </Form>
    </div>
  );
};

export default UpdateBanner;
