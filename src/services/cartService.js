import axiosInstance from "../utils/axiosInstance";

export const cartService = {
  getCart(query = "") {
    return axiosInstance.get(`/carts/me/${query}`);
  },
  updateCart(payload) {
    return axiosInstance.put(`/carts/`, payload);
  },
};
