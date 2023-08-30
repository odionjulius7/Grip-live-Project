import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getUsers = async (num) => {
  const response = await axios.get(
    `${base_url}user/all?page=${num}&limit=15&role=user`, // because users and creators are same array i'm separating them
    config
  );
  // console.log(nums.user);
  return response.data;
};

const getSuspUsers = async (num) => {
  const response = await axios.get(
    `${base_url}user/all?page=${num}&limit=20`, // because users and creators are same array i'm separating them
    config
  );

  return response.data;
};

const getCreatorUsers = async (num) => {
  const response = await axios.get(
    `${base_url}user/all?page=${num}&limit=15&role=creator`,
    config
  );
  // console.log(response?.data?.data);
  return response.data;
};

const getUsersAggregate = async () => {
  const response = await axios.get(`${base_url}user/summary`, config);
  // console.log(response);
  return response.data.data;
};

const getAUser = async (id) => {
  const response = await axios.get(`${base_url}user/${id}`, config);

  return response.data?.data;
};
const getMonthlyUsers = async () => {
  const response = await axios.get(`${base_url}user/monthly`, config);

  return response.data?.data;
};
const changeUserRole = async (id) => {
  const response = await axios.post(
    `${base_url}user/role/${id}`,
    {
      userType: "creator",
    },
    config
  );
  // console.log(response);
  return response.data?.data;
};

const usersService = {
  getUsers,
  getUsersAggregate,
  getAUser,
  getCreatorUsers,
  changeUserRole,
  getSuspUsers,
  getMonthlyUsers,
};

export default usersService;
