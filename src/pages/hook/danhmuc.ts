import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategory } from "../provider/danhmuc";

// Lấy danh sách danh mục
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

// Lấy chi tiết một danh mục (nếu cần)
export const useCategory = ({ id }: { id?: number | string }) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory({ id }),
    enabled: !!id, // Chỉ fetch khi có ID
  });
};
