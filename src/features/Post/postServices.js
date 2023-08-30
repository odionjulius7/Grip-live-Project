import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getPosts = async () => {
  const response = await axios.get(
    `${base_url}post/admin?deleted=false`,
    config
  );
  // console.log(response);
  return response.data?.data;
};
const getApprovedPosts = async (item) => {
  const response = await axios.get(
    `${base_url}post/admin?status=${item}&deleted=false`,
    config
  );
  // console.log(response);
  return response.data?.data;
};

const getAPost = async (id) => {
  const response = await axios.get(`${base_url}post/${id}/admin`, config);
  // console.log(response);
  return response.data?.data;
};
const getAUserPosts = async (id) => {
  const response = await axios.get(
    `${base_url}post/admin?status=false&deleted=false&userId=${id}`,
    config
  );
  // console.log(response);
  return response.data?.data;
};
const getAPostComments = async (ids) => {
  const response = await axios.get(
    `${base_url}comment/${ids?.id}?page=${ids?.num}&limit=10`,
    config
  );
  // console.log(response);
  return response.data?.data;
};

const deletePostComment = async (id) => {
  const response = await axios.delete(`${base_url}comment/${id}`, config);
  // console.log(response);
  return response.data;
};

const approvePost = async (id) => {
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
const unApprovePost = async (id) => {
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

const deletePost = async (id) => {
  const response = await axios.delete(`${base_url}post/${id}/admin`, config);
  // console.log(response);
  return response.data;
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
};

export default postService;
