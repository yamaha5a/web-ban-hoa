import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";

export const getBanners = async () => {
  const { data } = await axios.get("banners");
  return data;
  
};
