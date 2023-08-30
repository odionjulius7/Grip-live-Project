import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import postService from "./postServices";

const initialState = {
  posts: [],
  approvedPosts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getPosts = createAsyncThunk("post/get-posts", async (thunkAPI) => {
  try {
    return await postService.getPosts();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getApprovePosts = createAsyncThunk(
  "post/get-approved-posts",
  async (item, thunkAPI) => {
    try {
      return await postService.getApprovedPosts(item);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAPost = createAsyncThunk(
  "post/get-a-post",
  async (id, thunkAPI) => {
    try {
      return await postService.getAPost(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAUserPosts = createAsyncThunk(
  "post/get-user-posts",
  async (id, thunkAPI) => {
    try {
      return await postService.getAUserPosts(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAPostComments = createAsyncThunk(
  "post/get-a-post-comment",
  async (ids, thunkAPI) => {
    try {
      return await postService.getAPostComments(ids);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletePostComment = createAsyncThunk(
  "post/delete-post-comment",
  async (id, thunkAPI) => {
    try {
      return await postService.deletePostComment(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deletePost = createAsyncThunk(
  "post/delete-post",
  async (id, thunkAPI) => {
    try {
      return await postService.deletePost(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const approvePost = createAsyncThunk(
  "post/approve-post",
  async (id, thunkAPI) => {
    try {
      return await postService.approvePost(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const unApprovePost = createAsyncThunk(
  "post/unApprove-post",
  async (id, thunkAPI) => {
    try {
      return await postService.unApprovePost(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder // Get Posts
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
        state.message = "success";
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Get Approved Posts
      .addCase(getApprovePosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApprovePosts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessStatus = true;
        state.posts = action.payload;
        state.message = "success";
      })
      .addCase(getApprovePosts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessStatus = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Get A User Posts
      .addCase(getAUserPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAUserPosts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.aUserPosts = action.payload;
        state.message = "success";
      })
      .addCase(getAUserPosts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Get A Post's Comments
      .addCase(getAPostComments.pending, (state) => {
        state.isSuccess = false;
      })
      .addCase(getAPostComments.fulfilled, (state, action) => {
        // state.isError = false;
        // state.isLoading = false;
        state.isSuccess = true;
        state.aPostComments = action.payload;
        state.message = "success";
      })
      .addCase(getAPostComments.rejected, (state, action) => {
        // state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Get A Post
      .addCase(getAPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAPost.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload;
        state.message = "success";
      })
      .addCase(getAPost.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Approve Post
      .addCase(approvePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approvePost.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedPost = action.payload;
        state.message = "success";
      })
      .addCase(approvePost.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Unapprove Post
      .addCase(unApprovePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unApprovePost.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.unApproved = action.payload;
        state.message = "success";
      })
      .addCase(unApprovePost.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Delete Post
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccessDel = true;
        state.deletedPost = action.payload;
        state.message = "success";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isError = true;
        state.isSuccessDel = false;
        state.message = action.error;
        state.isLoading = false;
      })
      // Delete Post Comment
      .addCase(deletePostComment.pending, (state) => {
        state.isLoading1 = true;
      })
      .addCase(deletePostComment.fulfilled, (state, action) => {
        // state.isError = false;
        state.isLoading1 = false;
        state.isSuccess = true;
        // state.deletedPost = action.payload;
        state.message = "success";
      })
      .addCase(deletePostComment.rejected, (state, action) => {
        // state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading1 = false;
      })
      .addCase(resetState, () => initialState);
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
