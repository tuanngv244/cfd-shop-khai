import axiosInstance from "../utils/axiosInstance";
import tokenMethod from "../utils/token";

export const authService = {
  login(payload = {}) {
    return axiosInstance.post(`/customer/login`, payload);
  },
  register(payload = {}) {
    return axiosInstance.post(`/customer/register`, payload);
  },
  getProfile() {
    return axiosInstance.get(`/customer/profiles`, {
      headers: {
        Authorization: `Bearer ${tokenMethod.get()?.accessToken}`,
      },
    });
  },
  updateProfile(payload = {}) {
    return axiosInstance.put(`/customer/profiles`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getDataProvince() {
    return axiosInstance.get(`/provinces/`);
  },
  getDataProvinceById(id = "") {
    return axiosInstance.get(`/provinces/${id}`);
  },
  getDataDistrict(id = "") {
    return axiosInstance.get(`/districts?province=${id}`);
  },
  getDataDistrictById(id = "") {
    return axiosInstance.get(`/districts/${id}`);
  },
  getDataWard(id = "") {
    return axiosInstance.get(`/wards?district=${id}`);
  },
  getDataWardById(id = "") {
    return axiosInstance.get(`/wards/${id}`);
  },

  addWhiteList(payload = {}) {
    return axiosInstance.post(`/customer/white-list`, payload);
  },
  removeProductInWhiteList(payload = {}) {
    return axiosInstance.delete(`/customer/white-list`, payload);
  },
};
