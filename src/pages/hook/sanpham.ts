import {  useQuery,} from "@tanstack/react-query";
import { getProducts } from "../provider/sanpham";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};