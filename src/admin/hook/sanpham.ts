import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProduct, getProducts, createProduct, updateProduct, deleteProduct, ProductProps } from "../provider/sanpham";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useProduct = ({ id }: ProductProps) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct({ id }),
    enabled: !!id,  
  });
};

// Thêm sản phẩm
export const useCreateProduct = () => {
  const nav = useNavigate();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: any) => createProduct({ values }),
    onSuccess: () => {
      message.success("Thêm sản phẩm thành công!");
      qc.invalidateQueries({ queryKey: ["products"] });
      nav("/admin/sanpham");
    },
    onError: (error: any) => {
      message.error("Thêm sản phẩm thất bại: " + (error.response?.data?.message || error.message));
    },
  });
};

// Cập nhật sản phẩm
export const useUpdateProduct = () => {
  const nav = useNavigate();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, values }: { id: number | string; values: any }) =>
      updateProduct({ id, values }),
    onSuccess: () => {
      message.success("Cập nhật sản phẩm thành công!");
      qc.invalidateQueries({ queryKey: ["products"] });
      nav("/admin/sanpham");
    },
    onError: (error: any) => {
      message.error("Cập nhật sản phẩm thất bại: " + (error.response?.data?.message || error.message));
    },
  });
};

// Xóa sản phẩm
export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id?: string | number) => deleteProduct({ id }),
    onSuccess: () => {
      message.success("Xóa sản phẩm thành công!");
      qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      message.error("Xóa sản phẩm thất bại: " + (error.response?.data?.message || error.message));
    },
  });
};