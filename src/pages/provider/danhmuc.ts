import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";

export type CategoryProps = {
  id?: number | string;
};

// Lấy danh sách danh mục
export const getCategories = async () => {
  const { data } = await axios.get("categories");
  return data;
};

// Lấy chi tiết danh mục theo ID (nếu cần)
export const getCategory = async ({ id }: CategoryProps) => {
  if (!id) return;
  const { data } = await axios.get(`categories/${id}`);
  return data;
};
