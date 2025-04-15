import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBanner, deleteBanner, getBanner, getBanners, updateBanner } from "../provider/banner";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

 
export const useBanners = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
  });
};

 
export const useBanner = ({ id }: BannerProps) => {
  return useQuery({
    queryKey: ["banner", id],
    queryFn: () => getBanner({ id }),
    enabled: !!id,  
  });
};

// Thêm banner
export const useCreateBanner = () => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: (values: any) => createBanner({ values }),
    onSuccess: () => {
      message.success("Thêm banner thành công!");
      nav("/admin/banner");
    },
  });
};
 
export const useUpdateBanner = ({ id }: BannerProps) => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: (values: any) => updateBanner({ id, values }),
    onSuccess: () => {
      message.success("Cập nhật banner thành công!");
      nav("/admin/banners");
    },
  });
};
 
export const useDeleteBanner = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id?: string | number) => deleteBanner({ id }),
    onSuccess: () => {
      message.success("Xóa banner thành công!");
      qc.invalidateQueries({ queryKey: ["banners"] });
    },
  });
};
