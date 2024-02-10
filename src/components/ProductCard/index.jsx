import React from "react";
import { styled } from "styled-components";
import PATHS from "../../constants/paths";
import { Link } from "react-router-dom";
import { Empty, message } from "antd";
import { formatCurrency } from "./../../utils/format";
import { useDispatch } from "react-redux";
import { handleAddCart } from "../../store/reducers/cartReducer";
import tokenMethod from "../../utils/token";
import {
  handleGetProfile,
  handleShowModal,
} from "../../store/reducers/authReducer";
import { MODAL_TYPES } from "../../constants/general";
import useProductDetailPage from "../../pages/ProductDetailPage/useProductDetailPage";
import { authService } from "../../services/authService";
const ImageWrapper = styled.div`
  width: 100%;
  height: 315px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c1c1c1;
`;

const ProductCard = ({ product }) => {
  const { id, slug, title, price, rating, images, discount, color } =
    product || {};
  const productPath = PATHS.PRODUCT.INDEX + `/${slug}`;
  const dispatch = useDispatch();
  const { handleAddToWishlist } = useProductDetailPage();
  const _onAddToCart = (e) => {
    e?.preventDefault();
    if (!tokenMethod.get()) {
      return dispatch(handleShowModal(MODAL_TYPES.login));
    }
    // add cart
    // ready payload action for reducer
    const addPayLoad = {
      addedId: id,
      addedColor: color[0],
      addedQuantity: 1,
      addedPrice: price - discount,
    };

    try {
      const cartRes = dispatch(handleAddCart(addPayLoad)).unwrap();
      return cartRes?.data?.data;
    } catch (error) {
      console.log("error", error);
    }
  };
  const _onAddToWishList = (e, id) => {
    e?.preventDefault();
    e?.stopPropagation();
    handleAddToWishlist?.(id);
  };
  return (
    <div className="product product-2">
      <figure className="product-media">
        <Link to={productPath}>
          {images?.length > 0 ? (
            <img
              src={images[0]}
              alt="Product image"
              className="product-image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <ImageWrapper>
              <Empty
                description=""
                // props này mặc định của Antd Empty, dùng để thay đổi ảnh của Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </ImageWrapper>
          )}
        </Link>
        <div className="product-action-vertical">
          <a
            href="#"
            className="btn-product-icon btn-wishlist btn-expandable"
            onClick={(e) => _onAddToWishList(e, id)}
          >
            <span>add to wishlist</span>
          </a>
        </div>
        <div className="product-action product-action-dark">
          <a
            href="#"
            className="btn-product btn-cart"
            title="Add to cart"
            onClick={_onAddToCart}
          >
            <span>add to cart</span>
          </a>
        </div>
      </figure>
      <div className="product-body">
        <h3 className="product-title">
          <Link to={productPath}>{title || ""}</Link>
        </h3>
        <div className="product-price">
          {" "}
          {discount ? (
            <>
              {" "}
              <span className="new-price">
                ${formatCurrency(price - discount)}
              </span>
              <span className="old-price">Was ${formatCurrency(price)}</span>{" "}
            </>
          ) : (
            <>${formatCurrency(price || 0)}</>
          )}{" "}
        </div>
        <div className="ratings-container">
          <div className="ratings">
            <div
              className="ratings-val"
              style={{
                width: `${(rating || 0) * 20}%`,
              }}
            />
          </div>
          <span className="ratings-text">( {rating} Reviews )</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
