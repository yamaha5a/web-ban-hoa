import axios from "axios";
const token = localStorage.getItem("token");
const axiosClient = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    Authorization: token && `Bearer ${token}`,
  },
});

export const listUsers = async () => {
    const { data } = await axiosClient.get("users");
    return data; 
  };
  export const auth = async ({ resource = "register", values }: Props) => {
    const { data } = await axiosClient.post(resource, values);
    return data;
  }