import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
  updateCategory,
} from "../provider/danhmuc";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

// Lấy danh sách danh mục
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

// Lấy chi tiết 1 danh mục
export const useCategory = ({ id }: CategoryProps) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory({ id }),
    enabled: !!id, // Chỉ fetch khi có ID
  });
};

// Thêm danh mục
export const useCreateCategory = () => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: (values: any) => createCategory({ values }),
    onSuccess: () => {
      message.success("Thêm danh mục thành công!");
      nav("/admin/danhmuc");
    },
  });
};

// Cập nhật danh mục
export const useUpdateCategory = () => {
    const nav = useNavigate();
    const qc = useQueryClient(); // Để refetch danh sách sau khi sửa
    return useMutation({
      mutationFn: ({ id, values }: { id: number | string; values: any }) =>
        updateCategory({ id, values }),
      onSuccess: () => {
        message.success("Cập nhật danh mục thành công!");
        qc.invalidateQueries({ queryKey: ["categories"] }); // Cập nhật danh sách
        nav("/admin/danhmuc");
      },
    });
  };
  
// Xóa danh mục
export const useDeleteCategory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id?: string | number) => deleteCategory({ id }),
    onSuccess: () => {
      message.success("Xóa danh mục thành công!");
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
