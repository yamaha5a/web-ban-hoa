import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";

export type BannerProps = {
  id?: number | string;
  values?: any;
};

// Lấy danh sách banner
export const getBanners = async () => {
  const { data } = await axios.get("banners");
  return data;
};

// Lấy 1 banner theo ID
export const getBanner = async ({ id }: BannerProps) => {
  if (!id) return;
  const { data } = await axios.get(`banners/${id}`);
  return data;
};

// Thêm banner mới
export const createBanner = async ({ values }: BannerProps) => {
  const { data } = await axios.post("banners", values);
  return data;
};

// Cập nhật banner
export const updateBanner = async ({ id, values }: BannerProps) => {
  if (!id) return;
  const { data } = await axios.put(`banners/${id}`, values);
  return data;
};

// Xóa banner
export const deleteBanner = async ({ id }: BannerProps) => {
  if (!id) return;
  const { data } = await axios.delete(`banners/${id}`);
  return data;
};
