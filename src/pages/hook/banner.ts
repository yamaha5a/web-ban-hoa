import { useQuery } from "@tanstack/react-query";
import { getBanners } from "../provider/banner";

export const useBanners = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
    staleTime: 0, // Luôn lấy dữ liệu mới khi admin thêm banner
  });
  
};
