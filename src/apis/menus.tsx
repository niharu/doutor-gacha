import axios from "axios";

const menusUrl: string = "http://localhost:3100/menus";

export const getAllMenus = async () => {
  const response = await axios.get(menusUrl);
  return response.data;
};
