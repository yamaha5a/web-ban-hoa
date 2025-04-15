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