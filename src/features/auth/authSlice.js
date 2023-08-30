import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";
import { toast } from "react-toastify";

// get the user stored data in local storage from set in the authService
const getUserfromLocalStorage = localStorage.getItem("grip")
  ? JSON.parse(localStorage.getItem("grip"))
  : null;

const initialState = {
  user: getUserfromLocalStorage,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      toast.error("Failed to login, try again");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const getOrders = createAsyncThunk(
//   "order/get-orders",
//   async (thunkAPI) => {
//     try {
//       return await authService.getOrders();
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // loginUser: (state, action) => {
    //   const { password, email, role } = action.payload;
    //   state.user.password = password;
    //   state.user.email = email;
    //   state.user.role = role;
    // },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });
  },
});

export const { loginUser } = authSlice.actions;
export default authSlice.reducer;
