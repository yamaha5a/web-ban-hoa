import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";

export type ProductProps = {
  id?: number | string;
  values?: any;
};

// Lấy danh sách sản phẩm
export const getProducts = async () => {
  const { data } = await axios.get("products");
  return data;
};

// Lấy một sản phẩm theo ID
export const getProduct = async ({ id }: ProductProps) => {
  if (!id) return;
  const { data } = await axios.get(`products/${id}`);
  return data;
};

// Thêm sản phẩm mới
export const createProduct = async ({ values }: ProductProps) => {
  const { data } = await axios.post("products", values);
  return data;
};

// Cập nhật sản phẩm
export const updateProduct = async ({ id, values }: ProductProps) => {
  if (!id) return;
  const { data } = await axios.put(`products/${id}`, values);
  return data;
};

// Xóa sản phẩm
export const deleteProduct = async ({ id }: ProductProps) => {
  if (!id) return;
  const { data } = await axios.delete(`products/${id}`);
  return data;
};
