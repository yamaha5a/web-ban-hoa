import { useProducts } from "../hook/sanpham";
import { Card, Col, Row, Spin } from "antd";

const ProductGrid = () => {
  const { data: products, isLoading } = useProducts();

  if (isLoading) {
    return <Spin size="large" className="flex justify-center items-center w-full h-40" />;
  }

  return (
    <div className="container mx-auto py-8">
      <Row gutter={[16, 16]} justify="center">
        {products?.slice(0, 8).map((product: any) => (  
          <Col key={product.id} xs={24} sm={12} md={6}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.images} className="h-40 object-cover" />}
            >
              <Card.Meta title={product.name} description={`Giá: ${product.price} VNĐ`} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductGrid;
