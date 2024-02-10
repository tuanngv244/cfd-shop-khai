import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sumArrayNumber } from "../../utils/calculate";
import {
  handleGetCart,
  handleRemoveFromCart,
  handleUpdateCart,
} from "../../store/reducers/cartReducer";
import { cartService } from "../../services/cartService";
import { SHIPPING_OPTIONS } from "../../constants/general";

const useCartPage = () => {
  const dispatch = useDispatch();
  const quantityRef = useRef([]);
  const updateQuantityTimeOutRef = useRef();
  const { cartInfo, cartLoading } = useSelector((state) => state.cart);
  const {
    product,
    quantity,
    variant,
    totalProduct,
    subTotal,
    total,
    shipping,
    discount,
  } = cartInfo || {};
  const handleUpdateQuantity = (updatedQuantity, updatedIndex) => {
    const getPayload = () => {
      const newQuantity = quantity.map((oldQuantity, index) =>
        index === updatedIndex ? updatedQuantity : oldQuantity
      );
      //   console.log("newQuantity", newQuantity);
      const newTotalProduct = totalProduct.map((oldTotalProduct, index) =>
        index === updatedIndex
          ? product[updatedIndex].price * updatedQuantity
          : oldTotalProduct
      );
      const newSubTotal = sumArrayNumber(newTotalProduct);
      const newTotal = newSubTotal - (discount ?? 0) + (shipping?.price ?? 0);
      return {
        ...cartInfo,
        product: product.map((item) => item.id),
        quantity: newQuantity,
        totalProduct: newTotalProduct,
        subTotal: newSubTotal,
        total: newTotal,
      };
    };

    if (updateQuantityTimeOutRef.current) {
      clearTimeout(updateQuantityTimeOutRef.current);
    }

    updateQuantityTimeOutRef.current = setTimeout(async () => {
      if (
        !cartLoading &&
        updatedQuantity !== "" &&
        quantity[updatedIndex] !== updatedQuantity
      ) {
        try {
          const cartRes = dispatch(handleUpdateCart(getPayload())).unwrap();
        } catch (error) {
          quantityRef.current[updatedIndex]?.reset?.();
        }
      }
    }, 300);
  };

  const handleRemoveProduct = (removeIndex) => {
    if (removeIndex < 0 || cartLoading) return;
    dispatch(handleRemoveFromCart({ removeIndex }));
  };

  const handleUpdateShipping = (selectedTypeShip) => {
    const selectedShipping = SHIPPING_OPTIONS.find(
      (option) => option.value === selectedTypeShip
    );
    if (selectedShipping) {
      const updatePayload = {
        ...cartInfo,
        product: product?.map((product) => product.id),
        shipping: {
          typeShip: selectedTypeShip,
          price: selectedShipping.price,
        },
        total: total - (shipping?.price || 0) + selectedShipping.price,
      };
      dispatch(handleUpdateCart(updatePayload));
    }
  };
  const cartTableProps = {
    products: product?.map((item, index) => {
      return {
        ...item,
        quantity: quantity?.[index],
        totalProduct: totalProduct?.[index],
        variant: variant?.[index],
      };
    }),
    quantityRef,
    handleUpdateQuantity,
    handleRemoveProduct,
  };
  const cartSummaryProps = {
    product,
    subTotal,
    total,
    typeShip: shipping?.typeShip,
    handleUpdateShipping,
  };
  return {
    cartTableProps,
    cartSummaryProps,
  };
};

export default useCartPage;
