import { useMutation, useQuery } from "@tanstack/react-query"; 
import { message } from "antd"; 
import { useNavigate } from "react-router-dom"; 
import { auth, listUsers } from "../provider/nguoidung"; 

export const useAuth = ({ resource = "register" }) => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: (values: any) => auth({ resource, values }),
    onSuccess: (data) => {
      message.success("Đăng nhập thành công");
      if (resource == "register") {
        nav("/login");
        return;
      }
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      nav("/admin");
    },
  });
};

 
export const useListUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: listUsers,
  });
};
