import React, { useEffect } from "react";
import ProductDetailTab from "./ProductDetailTab";
import ProductDetailTop from "./ProductDetailTop";
import Breadcrumb from "../../components/Breadcrumb";
import { Link, useParams } from "react-router-dom";
import PATHS from "../../constants/paths";
import useProductDetailPage from "./useProductDetailPage";
import useQuery from "../../hooks/useQuery";
import { productService } from "../../services/productService";

const ProductDetailPage = () => {
  const { productName, productDetailTopProps, productDetailTabProps } =
    useProductDetailPage();

  return (
    <main className="main">
      <Breadcrumb className="breadcrumb-nav border-0 mb-0">
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>{productName || ""}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="container">
          <ProductDetailTop {...productDetailTopProps} />
          <ProductDetailTab {...productDetailTabProps} />
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
