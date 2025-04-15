import { useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "../../hook/danhmuc";

const CategoryProductPage = () => {
  const { data: categories, isLoading } = useCategories();
  const createCategory = useCreateCategory();   
  const updateCategory = useUpdateCategory({});
  const deleteCategory = useDeleteCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{ id?: number | string; name?: string } | null>(null);
  const [form] = Form.useForm();

  const showModal = (category?: { id: number | string; name: string }) => {
    if (category) {
      setEditingCategory(category);
      form.setFieldsValue({ name: category.name });
    } else {
      setEditingCategory(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingCategory?.id) {
        updateCategory.mutate({ id: editingCategory.id, values });
      } else {
        createCategory.mutate(values);
      }
      setIsModalOpen(false);
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 10 }}>
        Thêm danh mục
      </Button>
      <Table
        dataSource={categories || []}
        loading={isLoading}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Tên danh mục",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
              <>
                <Button type="link" onClick={() => showModal(record)}>
                  Sửa
                </Button>
                <Button
                  type="link"
                  danger
                  onClick={() => {
                    deleteCategory.mutate(record.id);
                  }}
                >
                  Xóa
                </Button>
              </>
            ),
          },
        ]}
        rowKey="id"
      />

      {/* Modal thêm/sửa danh mục */}
      <Modal title={editingCategory ? "Sửa danh mục" : "Thêm danh mục"} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item label="Tên danh mục" name="name" rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryProductPage;
