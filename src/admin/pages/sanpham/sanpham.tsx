import React, { useState } from "react";
import { useProducts, useCreateProduct, useDeleteProduct, useUpdateProduct } from "../../hook/sanpham";
import { useCategories } from "../../hook/danhmuc";
import { Button, Table, Modal, Form, Input, message, Image, Select, Spin, Alert } from "antd";

const SanPham: React.FC = () => {
  const { data: products = [], isLoading: loadingProducts, error: errorProducts } = useProducts();
  const { data: categories = [], isLoading: loadingCategories, error: errorCategories } = useCategories();
  const deleteProductMutation = useDeleteProduct();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Log errors for debugging
  if (errorProducts) {
    console.error("Error loading products:", errorProducts);
  }
  if (errorCategories) {
    console.error("Error loading categories:", errorCategories);
  }

  if (loadingProducts || loadingCategories) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (errorProducts || errorCategories) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert
          message="Lỗi"
          description={
            <div>
              <p>Đã xảy ra lỗi khi tải dữ liệu:</p>
              {errorProducts && <p>- Lỗi tải sản phẩm: {errorProducts.message}</p>}
              {errorCategories && <p>- Lỗi tải danh mục: {errorCategories.message}</p>}
            </div>
          }
          type="error"
          showIcon
        />
        <Button type="primary" onClick={() => window.location.reload()} style={{ marginTop: '20px' }}>
          Tải lại trang
        </Button>
      </div>
    );
  }

  const handleDelete = (id: string | number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => {
        deleteProductMutation.mutate(id, {
          onSuccess: () => message.success("Xóa sản phẩm thành công!"),
          onError: (error: any) => message.error("Xóa sản phẩm thất bại: " + error.message),
        });
      },
    });
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingProduct) {
        updateProductMutation.mutate({ id: editingProduct.id, values });
      } else {
        createProductMutation.mutate(values);
      }
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Danh mục",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (id: string) => {
        const category = categories.find((cat: any) => cat.id === id);
        return category ? category.name : "Không có danh mục";
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number | undefined) => {
        if (price === undefined || price === null) return "Chưa có giá";
        return `${price.toLocaleString()} VND`;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "supplier",
      key: "supplier",
    },
    {
      title: "Hình ảnh",
      dataIndex: "images",
      key: "images",
      render: (images: string[]) => {
        if (!images || !Array.isArray(images) || images.length === 0) {
          return "Không có ảnh";
        }
        
        // Lấy URL ảnh đầu tiên
        const imageUrl = images[0];
        
        // Kiểm tra nếu URL là đường dẫn tương đối, thêm base URL
        const fullImageUrl = imageUrl.startsWith('http') 
          ? imageUrl 
          : `http://localhost:3000/${imageUrl.replace(/^\/+/, '')}`;
        
        return (
          <div>
            <Image 
              width={50} 
              src={fullImageUrl} 
              alt="Sản phẩm"
              fallback="https://via.placeholder.com/50"
            />
            <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
              {fullImageUrl}
            </div>
          </div>
        );
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (record: any) => (
        <div>
          <Button type="primary" onClick={() => handleEdit(record)}>Sửa</Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)} style={{ marginLeft: 8 }}>Xóa</Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>Thêm sản phẩm</Button>
      <Table 
        dataSource={products} 
        columns={columns} 
        rowKey="id"
        loading={loadingProducts || loadingCategories}
      />
      <Modal 
        title={editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm"} 
        open={isModalVisible} 
        onOk={handleModalOk} 
        onCancel={handleModalCancel}
        confirmLoading={createProductMutation.isPending || updateProductMutation.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}>
            <Select placeholder="Chọn danh mục">
              {categories.map((category: any) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true, message: "Vui lòng nhập giá!" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="quantity" label="Số lượng" rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="supplier" label="Nhà cung cấp" rules={[{ required: true, message: "Vui lòng nhập nhà cung cấp!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="images" label="Hình ảnh" rules={[{ required: true, message: "Vui lòng nhập hình ảnh!" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SanPham;
