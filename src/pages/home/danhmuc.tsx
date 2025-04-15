import { useState } from "react";
import { Table, Input, Slider, Card, Spin } from "antd";
import { useCategories } from "../hook/danhmuc";

interface Category {
  id: number;
  name: string;
}

const CategoryProductPage = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useCategories() as {
    data: Category[];
    isLoading: boolean;
    error: any;
  };

  const [search, setSearch] = useState("");
  const [ setSelectedCategory] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState([0, 50000000]);

  const filteredCategories = categories?.filter((cat: Category) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", gap: 20, padding: 20, marginTop: 80 }}>
      <Card title="Lọc sản phẩm" style={{ width: 300 }}>
        <div style={{ marginBottom: 10 }}>
          <Input
            placeholder="Tìm danh mục..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <h4 style={{ fontSize: 14, marginBottom: 5 }}>
            Giá từ {priceRange[0].toLocaleString()} đến{" "}
            {priceRange[1].toLocaleString()} VND
          </h4>
          <Slider
            range
            min={0}
            max={50000000}
            step={1000000}
            defaultValue={priceRange}
            onChange={(value) => setPriceRange(value)}
            style={{ width: "100%" }}
          />
        </div>

        {isLoading ? (
          <Spin />
        ) : error ? (
          <p>Lỗi khi tải danh mục!</p>
        ) : (
          <Table
            dataSource={filteredCategories}
            columns={[
              {
                title: "Tên danh mục",
                dataIndex: "name",
                key: "name",
                render: (text: string, record: Category) => (
                  <a onClick={() => setSelectedCategory(record.id)}>{text}</a>
                ),
              },
            ]}
            rowKey="id"
            pagination={false}
          />
        )}
      </Card>

      <Card title="Sản phẩm" style={{ flex: 1, marginTop: 50 }}>
        <Table
          dataSource={[]} // danh sách sản phẩm sẽ lọc theo danh mục được chọn
          columns={[{ title: "Tên sản phẩm", dataIndex: "name", key: "name" }]}
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default CategoryProductPage;
