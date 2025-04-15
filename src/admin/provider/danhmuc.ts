import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";

export type CategoryProps = {
  id?: number | string;
  values?: any;
};

export const getCategories = async () => {
  const { data } = await axios.get("categories");
  return data;
};

export const getCategory = async ({ id }: CategoryProps) => {
  if (!id) return;
  const { data } = await axios.get(`categories/${id}`);
  return data;
};

// Thêm danh mục mới
export const createCategory = async ({ values }: CategoryProps) => {
  const { data } = await axios.post("categories", values);
  return data;
};

// Cập nhật danh mục
export const updateCategory = async ({ id, values }: CategoryProps) => {
  if (!id) return;
  const { data } = await axios.put(`categories/${id}`, values);
  return data;
};

// Xóa danh mục
export const deleteCategory = async ({ id }: CategoryProps) => {
  if (!id) return;
  const { data } = await axios.delete(`categories/${id}`);
  return data;
};
