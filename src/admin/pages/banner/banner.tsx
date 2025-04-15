import { Table, Button, Popconfirm} from "antd";
import { useBanners, useDeleteBanner } from "../../hook/banner";
import { Link } from "react-router-dom";


const AdminBanner = () => {
  const { data: banners, isLoading } = useBanners();
  const { mutate: deleteBanner } = useDeleteBanner();

  if (isLoading) return <p>Loading...</p>;

  const handleDelete = (id: number) => {
    deleteBanner(id);
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (text: string) => <img src={text} alt="banner" style={{ width: 100 }} />,
    },
    { title: "Tiêu đề", dataIndex: "title" },
    { title: "Mô tả", dataIndex: "description" },
    {
      title: "Hành động",
      render: (record: any) => (
        <>
          <Link to={`/admin/banner/update/${record.id}`}>
            <Button type="primary" style={{ marginRight: 8 }}>Sửa</Button>
          </Link>
          <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => handleDelete(record.id)}>
            <Button type="primary" danger>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Quản lý Banner</h1>
      <Link to="/admin/banner/add">
        <Button type="primary" style={{ marginBottom: 16 }}>Thêm Banner</Button>
      </Link>
      <Table dataSource={banners} columns={columns} rowKey="id" />
    </div>
  );
};

export default AdminBanner;
