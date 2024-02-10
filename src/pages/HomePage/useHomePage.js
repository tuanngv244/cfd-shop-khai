import React, { useState } from "react";
import useQuery from "../../hooks/useQuery";
import { productService } from "../../services/productService";
import { pageService } from "../../services/pageService";
import useMutation from "../../hooks/useMutation";
import { subscribeService } from "../../services/subscribeService";
import { message } from "antd";
import { GENERAL_MESSAGE, HOME_MESSAGE } from "../../constants/message";

const useHomePage = () => {
  const { data: productsData } = useQuery(productService.getProducts);
  const products = productsData?.products || [];
  const featuredProducts =
    products?.filter((product) => product.featured) || [];

  //   Intro Section
  const introProducts = featuredProducts.slice(0, 3);
  const introProps = {
    introProducts,
  };

  // Hot Product Section
  const onSaleProducts = products?.filter((product) => product.onSale) || [];
  const topRatedProducts =
    products?.filter((product) => product.topRated) || [];
  const hotProductProps = {
    onSaleProducts,
    topRatedProducts,
    featuredProducts,
  };

  // Deal Section
  const dealProducts = onSaleProducts.filter((product) => product.discount > 0);
  const dealProps = {
    dealProducts,
  };

  // Brand Section
  const { data: homeData } = useQuery(() =>
    pageService.getPageDataByName("home")
  );
  const brands = homeData?.data?.brands;
  const brandProps = {
    brands,
  };

  // Featured Section
  const [selectedCateSlug, setSelectedCateSlug] = useState("all");
  const { data: CategoriesData } = useQuery(productService.getCategories);
  const categories = CategoriesData?.products;
  const featuredProductsBySlug =
    selectedCateSlug === "all"
      ? featuredProducts
      : featuredProducts.filter(
          (product) => product?.category?.slug === selectedCateSlug
        );
  const featuredProps = {
    categories,
    featuredProductsBySlug,
    selectedCateSlug,
    handleSelectCate: (slug) => setSelectedCateSlug(slug),
  };

  // Service Section
  const services = homeData?.data?.information || {};
  const serviceProps = {
    services,
  };

  // GetDealSection
  const { execute: dealExecute } = useMutation(subscribeService.subscribeDeal);
  const handleSubscribeDeal = (email, callback) => {
    if (email)
      dealExecute(email, {
        onSuccess: (data) => {
          message.success(HOME_MESSAGE.dealSuccess);
          callback?.();
        },
        onFail: (error) => {
          message.error(GENERAL_MESSAGE.error);
        },
      });
  };
  const getDealProps = {
    handleSubscribeDeal,
  };
  return {
    introProps,
    hotProductProps,
    dealProps,
    brandProps,
    featuredProps,
    serviceProps,
    getDealProps,
  };
};

export default useHomePage;
