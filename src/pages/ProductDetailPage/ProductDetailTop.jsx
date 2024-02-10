import React from "react";
import ProductImageZoom from "../../components/ProductImageZoom";
import { formatNumberToPercent } from "../../utils/format";
import { formatCurrency } from "./../../utils/format";
import PATHS from "../../constants/paths";
import ShareLink from "../../components/ShareLink";
import ProductColor from "../../components/ProductColor";
import QuantityInput from "../../components/QuantityInput";
import { useDispatch } from "react-redux";
import tokenMethod from "../../utils/token";
import { handleShowModal } from "../../store/reducers/authReducer";
import { MODAL_TYPES } from "../../constants/general";

const ProductDetailTop = ({
  id,
  images,
  name,
  rating,
  reviews,
  price,
  description,
  color,
  category,
  stock,
  handleAddToCart,
  handleAddToWishlist,
  colorRef,
  quantityRef,
}) => {
  //   console.log("images", images);
  const dispatch = useDispatch();
  const pathUrl = window.location.href;
  const categoryPath =
    category?.id && PATHS.PRODUCT.INDEX + `?category=${category?.id}`;
  const _onAddToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!tokenMethod.get()) {
      return dispatch(handleShowModal(MODAL_TYPES.login));
    }
    handleAddToCart?.();
  };
  const _onAddToWishlist = (e, id) => {
    e?.preventDefault();
    e?.stopPropagation();
    handleAddToWishlist?.(id);
  };
  return (
    <div className="product-details-top">
      <div className="row">
        <div className="col-md-6">
          <ProductImageZoom images={images} />
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <h1 className="product-title">{name}</h1>
            <div className="ratings-container">
              <div className="ratings">
                <div
                  className="ratings-val"
                  style={{ width: `${formatNumberToPercent(rating)}%` }}
                />
              </div>
              <a
                className="ratings-text"
                href="#product-review-link"
                id="review-link"
              >
                ( {reviews?.length} Reviews )
              </a>
            </div>
            <div className="product-price"> ${formatCurrency(price)} </div>
            <div
              className="product-content"
              dangerouslySetInnerHTML={{ __html: description }}
            >
              {/* <p>
                Sed egestas, ante et vulputate volutpat, eros pede semper est,
                vitae luctus metus libero eu augue. Morbi purus libero, faucibus
                adipiscing. Sed lectus.{" "}
              </p> */}
            </div>
            <div className="details-filter-row details-row-size">
              <label>Color:</label>
              <ProductColor ref={colorRef} colors={color} />
            </div>
            <div className="details-filter-row details-row-size">
              <label htmlFor="qty">Qty:</label>
              <QuantityInput
                className="product-details-quantity"
                ref={quantityRef}
                max={stock}
              />
            </div>
            <div className="product-details-action">
              <a
                href="#"
                className="btn-product btn-cart"
                onClick={_onAddToCart}
              >
                <span>add to cart</span>
              </a>
              <div className="details-action-wrapper">
                <a
                  href="#"
                  className="btn-product btn-wishlist "
                  title="Wishlist"
                  onClick={(e) => _onAddToWishlist(e, id)}
                >
                  <span>Add to Wishlist</span>
                </a>
              </div>
            </div>
            <div className="product-details-footer">
              <div className="product-cat">
                <span>Category:</span>
                <a href={categoryPath}>{category?.name}</a>
              </div>
              <div className="social-icons social-icons-sm">
                <span className="social-label">Share:</span>
                <ShareLink path={pathUrl} type="facebook" title="Facebook">
                  <i className="icon-facebook-f" />
                </ShareLink>

                <ShareLink path={pathUrl} title="Twitter" type="twitter">
                  <i className="icon-twitter" />
                </ShareLink>

                <ShareLink path={pathUrl} title="Instagram" type="instagram">
                  <i className="icon-instagram" />
                </ShareLink>

                <ShareLink path={pathUrl} title="Pinterest" type="pinterest">
                  <i className="icon-pinterest" />
                </ShareLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailTop;
