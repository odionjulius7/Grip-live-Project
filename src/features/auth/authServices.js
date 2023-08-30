import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const login = async (user) => {
  const response = await axios.post(`${base_url}user/adminLogin`, user);
  if (response.data) {
    localStorage.setItem("grip", JSON.stringify(response.data));
  }
  return response.data;
};

const getUsers = async () => {
  const response = await axios.get(`${base_url}user/all`, config);

  return response.data;
};

// const getOrder = async (id) => {
//   const response = await axios.post(
//     `${base_url}user/getorderbyuser/${id}`,
//     "",
//     config
//   );

//   return response.data;
// };

const authService = {
  login,
  getUsers,
  //   getOrder,
};

export default authService;
