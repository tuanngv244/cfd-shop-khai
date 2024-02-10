import axiosInstance from "../utils/axiosInstance";

export const orderService = {
  getVoucher(id = "") {
    return axiosInstance.get(`/orders/voucher/${id}`);
  },
  getOrders(query = "") {
    return axiosInstance.get(`/orders/me/${query}`);
  },
  getOrderById(id = "") {
    return axiosInstance.get(`/orders/${id}/me`);
  },
  checkout(payload = {}) {
    return axiosInstance.post(`/orders`, payload);
  },
};
