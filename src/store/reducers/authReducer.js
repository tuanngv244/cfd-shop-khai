import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tokenMethod from "../../utils/token";
import { message } from "antd";
import { authService } from "../../services/authService";
import { handleGetCart } from "./cartReducer";

const initialState = {
  showedModal: "",
  profile: null,
  loading: {
    login: false,
    register: false,
    getProfile: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleShowModal: (state, action) => {
      state.showedModal = action.payload;
    },
    handleCloseModal: (state) => {
      state.showedModal = "";
    },
    handleLogout: (state) => {
      tokenMethod.remove();
      state.profile = null;
      state.showedModal = "";
      message.success("Đăng xuất thành công");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleRegister.fulfilled, (state) => {
        state.loading.register = false;
        console.log("fulfilledRegister");
      })
      .addCase(handleRegister.pending, (state) => {
        state.loading.register = true;
        console.log("pendingRegister");
      })
      .addCase(handleRegister.rejected, (state) => {
        state.loading.register = false;
        console.log("rejectedRegister");
      })

      .addCase(handleLogin.fulfilled, (state) => {
        state.loading.login = false;
        state.showedModal = "";
        // console.log("fulfilledLogin");
      })
      .addCase(handleLogin.pending, (state) => {
        // console.log("pendingLogin");
        state.loading.login = true;
      })
      .addCase(handleLogin.rejected, (state) => {
        state.loading.login = false;
        // console.log("rejectedLogin");
      })

      .addCase(handleGetProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading.getProfile = false;
      })
      .addCase(handleGetProfile.pending, (state) => {
        state.loading.getProfile = true;
      })
      .addCase(handleGetProfile.rejected, (state) => {
        state.loading.getProfile = false;
      });
  },
});

// Extract the action creators object and the reducer
const { actions, reducer: authReducer } = authSlice;
// Extract and export each action creator by name
export const { handleLogout, handleShowModal, handleCloseModal } = actions;
// Export the reducer, either as a default or named export
export default authReducer;

export const handleRegister = createAsyncThunk(
  "auth/handleRegister",
  async (payload, thunkApi) => {
    try {
      const registerRes = await authService.register(payload);
      if (registerRes?.data?.data?.id) {
        message.success("Đăng ký thành công");
        thunkApi.dispatch(
          handleLogin({
            email: payload.email,
            password: payload.password,
          })
        );
        return true;
      } else {
        throw false;
      }
    } catch (error) {
      const errorInfo = error?.response?.data;
      if (errorInfo.error === "Forbidden") {
        message.error("Email đã được đăng ký");
      }
      if (errorInfo.error === "Bad Request") {
        message.error("Mật khẩu phải có từ 6 kí tự trở lên");
      }

      return thunkApi.rejectWithValue(errorInfo);
    }
  }
);

export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async (payload, thunkApi) => {
    // api login
    try {
      const res = await authService.login(payload);
      const { token: accessToken, refreshToken } = res?.data?.data || {};
      // console.log("res", res);
      // Lưu vào cookie
      tokenMethod.set({
        accessToken,
        refreshToken,
      });

      if (!!tokenMethod) {
        // Lấy thông tin profile
        // handleGetProfile();
        thunkApi.dispatch(handleGetProfile());
        thunkApi.dispatch(handleGetCart());
        message.success("Đăng nhập thành công");
        // handleCloseModal();
      }
      return true;
    } catch (error) {
      // console.log("error", error);
      const errorInfo = error?.response?.data;
      if (error?.response?.status === 404) {
        message.error("Sai email hoặc password");
      } else {
        message.error("Đăng nhập thất bại");
      }
      return thunkApi.rejectWithValue(errorInfo);
    } finally {
      // callback?.();
    }
  }
);

export const handleGetProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, thunkApi) => {
    if (tokenMethod.get()) {
      try {
        const profileRes = await authService.getProfile();
        // console.log("profileRes?.data?.data", profileRes?.data?.data);
        return profileRes?.data?.data;
      } catch (error) {
        return thunkApi.rejectWithValue(error?.response?.data);
      }
    }
  }
);
