import React, { useEffect, useMemo, useRef } from "react";
import queryString from "query-string";
import { useLocation, useSearchParams } from "react-router-dom";
import useMutation from "./../../hooks/useMutation";
import { productService } from "./../../services/productService";
import { SORT_OPTIONS } from "../../constants/general";
import useQuery from "./../../hooks/useQuery";
const PRODUCT_LIMITS = 9;
const useProductPage = () => {
  const { search } = useLocation();
  const queryObject = queryString.parse(search);
  const [_, setSearchParams] = useSearchParams();

  const {
    data: productsData,
    loading: productListLoading,
    error: productsError,
    execute: fetchProducts,
  } = useMutation((query) =>
    productService.getProducts(query || `?limit=${PRODUCT_LIMITS}`)
  );
  useEffect(() => {
    fetchProducts(search);
  }, [search]);

  const products = productsData?.products || [];
  const productsPagi = productsData?.pagination || {};

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(productService.getCategories);
  const categories = categoriesData?.products || [];

  const productListProps = {
    isLoading: productListLoading,
    isError: !!productsError,
    products,
  };

  const updateQueryString = (queryObject) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: PRODUCT_LIMITS,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };

  const onPagiChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };

  const pagiProps = {
    page: Number(productsPagi.page || queryObject.page || 1),
    limit: Number(productsPagi.limit || 0),
    total: Number(productsPagi.total || 0),
    onPagiChange,
  };

  // ToolBox Props
  const activeSort = useMemo(() => {
    return (
      Object.values(SORT_OPTIONS).find(
        (option) =>
          option.queryObject.order === queryObject.order &&
          option.queryObject.orderBy === queryObject.orderBy
      )?.value || SORT_OPTIONS.popularity.value
    );
  }, [queryObject]);
  const onSortChange = (sortType) => {
    const sortQueryObject = SORT_OPTIONS[sortType].queryObject;
    if (sortQueryObject) {
      updateQueryString({ ...queryObject, ...sortQueryObject, page: 1 });
    }
  };

  const toolboxProps = {
    showNumb: products?.length || 0,
    totalNumb: productsPagi.total || 0,
    activeSort,
    onSortChange,
  };

  // Filter
  const handleCateFilterChange = (cateId, isChecked) => {
    let newCategoryQuery = Array.isArray(queryObject.category)
      ? [...queryObject.category, cateId]
      : [queryObject.category, cateId];

    if (!isChecked) {
      newCategoryQuery = newCategoryQuery.filter(
        (category) => category !== cateId
      );
    }

    if (!cateId) {
      newCategoryQuery = [];
    }

    updateQueryString({
      ...queryObject,
      category: newCategoryQuery,
      page: 1,
    });
  };

  const priceFilterTimeout = useRef();
  const handlePriceFilterChange = (priceRange) => {
    if (priceRange?.length === 2) {
      if (priceFilterTimeout.current) {
        clearTimeout(priceFilterTimeout.current);
      }
      priceFilterTimeout.current = setTimeout(() => {
        updateQueryString({
          ...queryObject,
          minPrice: priceRange[0].substring(1),
          maxPrice: priceRange[1].substring(1),
          page: 1,
        });
      }, 500);
    }
  };

  const filterProps = {
    categories: categories || [],
    isLoading: categoriesLoading,
    isError: categoriesError,
    activeCategory: Array.isArray(queryObject.category)
      ? queryObject.category
      : [queryObject.category],
    currentPriceRange: [
      queryObject.minPrice || 0,
      queryObject.maxPrice || 10000,
    ],
    handleCateFilterChange,
    handlePriceFilterChange,
  };
  return {
    productListProps,
    pagiProps,
    toolboxProps,
    filterProps,
  };
};

export default useProductPage;
