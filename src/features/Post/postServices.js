import axios from "axios";
// import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
import { generateAxiosConfig } from "utils/axiosconfig";

const getPosts = async (token) => {
  const config = generateAxiosConfig(token);
  const response = await axios.get(
    `${base_url}post/admin?deleted=false`,
    config
  );
  return response.data?.data;
};

const getApprovedPosts = async (items) => {
  const config = generateAxiosConfig(items.token);
  const response = await axios.get(
    `${base_url}post/admin?status=${items.item}&deleted=false`,
    config
  );
  // console.log(response);
  return response.data?.data;
};

const getAPost = async (ids) => {
  const config = generateAxiosConfig(ids.token);
  const response = await axios.get(`${base_url}post/${ids.id}/admin`, config);
  // console.log(response);
  return response.data?.data;
};
const getAUserPosts = async (ids) => {
  const config = generateAxiosConfig(ids.token);
  const response = await axios.get(
    `${base_url}post/admin?status=false&deleted=false&userId=${ids.id}`,
    config
  );
  // console.log(response);
  return response.data?.data;
};
const getAPostComments = async (ids) => {
  const config = generateAxiosConfig(ids.token);
  const response = await axios.get(
    `${base_url}comment/${ids?.id}?page=${ids?.num}&limit=10`,
    config
  );
  // console.log(response);
  return response.data?.data;
};

const deletePostComment = async (ids) => {
  const config = generateAxiosConfig(ids.token);
  const response = await axios.delete(`${base_url}comment/${ids.id}`, config);
  // console.log(response);
  return response.data;
};

const approvePost = async (ids) => {
  const config = generateAxiosConfig(ids.token);
  const response = await axios.patch(
    `${base_url}post/approve`,
    {
      id: id,
    },
    config
  );
  // console.log(response);
  return response.data;
};
const unApprovePost = async (ids) => {
  const id = ids.id;
  const config = generateAxiosConfig(ids.token);
  const response = await axios.patch(
    `${base_url}post/unapprove/all`,
    {
      posts: [...id],
    },
    config
  );
  // console.log(response);
  return response.data;
};

const deletePost = async (ids) => {
  const config = generateAxiosConfig(ids.token);
  const response = await axios.delete(
    `${base_url}post/${ids.id}/admin`,
    config
  );
  // console.log(response);
  return response.data;
};

// Get Graph metrics
const getMonthlyPost = async (token) => {
  const config = generateAxiosConfig(token);
  const response = await axios.get(`${base_url}post/monthly`, config);

  return response.data?.data;
};

const getDailyPosts = async (token) => {
  const config = generateAxiosConfig(token);
  const response = await axios.get(`${base_url}post/daily`, config);

  return response.data?.data;
};

const postService = {
  deletePostComment,
  getAPost,
  getPosts,
  getApprovedPosts,
  approvePost,
  deletePost,
  deletePost,
  getAUserPosts,
  getAPostComments,
  unApprovePost,
  getMonthlyPost,
  getDailyPosts,
};

export default postService;
