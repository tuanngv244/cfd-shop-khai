import React, { useEffect } from "react";
import { orderService } from "../../services/orderService";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetCart,
  updateCacheCart,
} from "../../store/reducers/cartReducer";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import PATHS from "./../../constants/paths";

const useCheckoutPage = () => {
  const { cartInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      Array.isArray(cartInfo) ||
      (cartInfo?.id && cartInfo?.product?.length < 1)
    ) {
      message.config({ top: 80, duration: 3, maxCount: 1 });
      message.error(
        "There are no products in cart. Please add products to cart!"
      );
      console.log(
        "There are no products in cart. Please add products to cart!"
      );
      navigate(PATHS.PRODUCT.INDEX);
    }
  }, [cartInfo]);

  const handleAddCoupon = async (coupon) => {
    try {
      const couponRes = await orderService.getVoucher(coupon);
      const couponInfo = couponRes?.data?.data;
      // console.log("couponInfo", couponInfo);
      if (couponInfo) {
        const { subTotal, shipping } = cartInfo || {};
        dispatch(
          updateCacheCart({
            ...cartInfo,
            discount: couponInfo.value,
            discountCode: couponInfo.code,
            total: subTotal + (shipping?.price || 0) - (couponInfo.value || 0),
          })
        );
        message.success("Add coupon successfully");
      }
    } catch (error) {
      console.log("error", error);
      message.error(error.response.data.message);
    }
  };

  const handleRemoveCoupon = () => {
    try {
      if (cartInfo.discountCode) {
        const { subTotal, shipping } = cartInfo || {};
        dispatch(
          updateCacheCart({
            ...cartInfo,
            discount: 0,
            discountCode: "",
            total: subTotal + (shipping?.price || 0),
          })
        );
      }
    } catch (error) {
      console.log("error", error);
      message.error("Add coupon failed");
    }
  };

  const handleCheckout = async (data) => {
    if (data) {
      const { formInfo, cartInfo } = data || {};
      const {
        phone,
        email,
        firstName,
        province,
        district,
        ward,
        street,
        note,
        paymentMethod,
      } = formInfo || {};
      const {
        shipping,
        variant,
        subTotal,
        total,
        product,
        quantity,
        totalProduct,
        discount,
        discountCode,
      } = cartInfo || {};

      const checkoutPayload = {
        address: {
          phone,
          email,
          fullName: firstName,
          street: `${street}, ${ward?.label}, ${district?.label}, ${province?.label}`,
        },
        shipping,
        variant,
        subTotal,
        total,
        product: product.map((item) => item.id),
        quantity,
        totalProduct,
        discount,
        discountCode,
        paymentMethod,
        note,
      };

      try {
        const res = await orderService.checkout(checkoutPayload);
        if (res?.data?.data) {
          dispatch(handleGetCart());
          message.success("Checkout successfully!");
          navigate(PATHS.CHECKOUTSUCCESS);
        } else {
          message.error("Checkout failed");
        }
      } catch (error) {
        console.log("error", error);
        message.error("Checkout failed");
      }
    }
  };

  const couponProps = {
    addedCoupon: cartInfo.discountCode,
    handleAddCoupon,
    handleRemoveCoupon,
  };

  const checkoutFormProps = { handleCheckout };
  return {
    couponProps,
    checkoutFormProps,
  };
};

export default useCheckoutPage;
