import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { authService } from "../services/authService";
import { message } from "antd";
import tokenMethod from "../utils/token";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [showedModal, setShowedModal] = useState("");
  const [profile, setProfile] = useState();

  const handleShowModal = (modalType) => {
    if (!!!tokenMethod.get()) {
      setShowedModal(modalType || "");
      $("body").addClass("modal-open");
    }
  };

  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setShowedModal("");
    $("body").removeClass("modal-open");
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const handleShowDropdown = (e) => {
    e?.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleCloseDropdown = (isShow) => {
    setShowDropdown(isShow);
  };

  const handleLogout = () => {
    tokenMethod.remove();
    setProfile(undefined);
  };

  const handleGetProfile = async () => {
    try {
      const profileRes = await authService.getProfile();
      if (profileRes?.data?.data) {
        setProfile(profileRes.data.data);
      }
    } catch (error) {
      console.log("error", error);
      handleLogout();
    }
  };

  useEffect(() => {
    if (tokenMethod.get()) {
      // call api get profile
      handleGetProfile();
    }
  }, []);

  //  LOGIN
  const handleLogin = async (loginData, callback) => {
    // payload
    const payload = { ...loginData };
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
        handleGetProfile();
        message.success("Đăng nhập thành công");
        handleCloseModal();
      }
    } catch (error) {
      console.log("error", error);
      if (error?.response?.status === 404) {
        message.error("Sai email hoặc password");
      } else {
        message.error("Đăng nhập thất bại");
      }
    } finally {
      callback?.();
    }
  };

  // REGISTER
  const handleRegister = async (registerData, callback) => {
    const { email, password } = registerData || {};
    // payload
    const payload = {
      firstName: "",
      lastName: "",
      email,
      password,
    };
    console.log("payload", payload);
    // api register
    try {
      const res = await authService.register(payload);
      console.log("res", res);
      if (res?.data?.data?.id) {
        message.success("Đăng kí thành công");
        // handle login
        handleLogin({
          email,
          password,
        });
      }
    } catch (error) {
      console.log("error", error);
      if (error?.response?.status === 403) {
        message.error("Email đăng ký đã tồn tại");
      } else {
        message.error("Đăng ký thất bại");
      }
    } finally {
      callback?.();
    }
  };

  // const handleUpdateProfile = async (profileData) => {
  //   try {
  //     const {
  //       firstName,
  //       email,
  //       password,
  //       facebookURL,
  //       introduce,
  //       phone,
  //       website,
  //     } = profileData;
  //     const payload = {
  //       firstName: firstName,
  //       lastName: "",
  //       email,
  //       password,
  //       facebookURL,
  //       website,
  //       introduce,
  //       phone,
  //     };
  //     const res = await authService.updateProfile(payload);
  //     if (res?.data?.data?.id) {
  //       message.success("Cập nhật thông tin thành công");
  //       handleGetProfile();
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // useEffect(() => {

  // }, [third])

  return (
    <AuthContext.Provider
      value={{
        showedModal,
        showDropdown,
        handleShowDropdown,
        handleCloseDropdown,
        handleShowModal,
        handleCloseModal,
        handleLogin,
        handleRegister,
        // handleUpdateProfile,
        handleLogout,
        profile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
