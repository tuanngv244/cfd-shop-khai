import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../../services/productService";
import useQuery from "../../hooks/useQuery";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { handleAddCart } from "../../store/reducers/cartReducer";
import { authService } from "../../services/authService";
import { handleGetProfile } from "../../store/reducers/authReducer";

const useProductDetailPage = () => {
  const dispatch = useDispatch();
  const { productSlug: slug } = useParams();
  const colorRef = useRef();
  const quantityRef = useRef();

  const { data: productDetailData } = useQuery(
    () => productService.getProductsBySlug(slug),
    [slug]
  );
  const { id, name, description, shippingReturn, price, discount } =
    productDetailData || {};

  const { data: productDetailReviews } = useQuery(
    () => id && productService.getProductReview(id),
    [id]
  );

  const handleAddToCart = () => {
    const { value: color, reset: colorReset } = colorRef.current || {};
    const { value: quantity, reset: quantityReset } = quantityRef.current || {};
    if (!color) {
      message.error("Please select color");
      return;
    } else if (isNaN(quantity) && quantity < 1) {
      message.error("Quantity must be greater than 1");
      return;
    }
    console.log("color", color);
    console.log("quantity", quantity);
    // add cart
    // ready payload action for reducer
    const addPayLoad = {
      addedId: id,
      addedColor: color,
      addedQuantity: quantity,
      addedPrice: price - discount,
    };

    try {
      const res = dispatch(handleAddCart(addPayLoad)).unwrap();
      if (res) {
        colorReset?.();
        quantityReset?.();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleAddToWishlist = async (id) => {
    try {
      const payload = { product: id };
      const res = await authService.addWhiteList(payload);
      if (res) {
        message.success("Add wish list successfully");
        dispatch(handleGetProfile());
      }
    } catch (error) {
      console.log("error", error);
      message.success("Add wish list failed");
    }
  };

  const productDetailTopProps = {
    ...productDetailData,
    reviews: productDetailReviews,
    colorRef,
    quantityRef,
    handleAddToCart,
    handleAddToWishlist,
  };
  const productDetailTabProps = {
    ...productDetailData,
    reviews: productDetailReviews,
  };
  return {
    productName: name,
    productDetailTopProps,
    productDetailTabProps,
    handleAddToWishlist,
  };
};

export default useProductDetailPage;
