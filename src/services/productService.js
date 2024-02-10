import axiosInstance from "../utils/axiosInstance";

export const productService = {
  getProducts(query = "") {
    return axiosInstance.get(`/products/${query}`);
  },
  getProductsBySlug(slug = "") {
    return axiosInstance.get(`/products/${slug}`);
  },
  getCategories(query = "") {
    return axiosInstance.get(`/product-categories${query}`);
  },
  getCategoryBySlug(slug = "") {
    return axiosInstance.get(`/product-categories/${slug}`);
  },
  getProductReview(id = "", query = "") {
    return axiosInstance.get(`/reviews/product/${id}${query}`);
  },
};
