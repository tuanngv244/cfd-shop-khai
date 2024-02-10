import { message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetProfile,
  handleShowModal,
} from "../../store/reducers/authReducer";
import { authService } from "../../services/authService";
import { formatCurrency } from "../../utils/format";
import { handleAddCart } from "../../store/reducers/cartReducer";
import { MODAL_TYPES } from "../../constants/general";
import tokenMethod from "../../utils/token";

const WishList = () => {
  const dispatch = useDispatch();
  const handleDeleteToWishlist = async (id) => {
    try {
      const payload = { product: "6489cfcdde52a05c3466c8ce" };
      console.log("payload", payload);
      const res = await authService.removeProductInWhiteList(payload);
      console.log("res", res);
      if (res) {
        message.success("Remove product to wish list successfully");
        dispatch(handleGetProfile());
      }
    } catch (error) {
      console.log("error", error);
      message.error("Remove product to wish list failed");
    }
  };
  const { profile } = useSelector((state) => state.auth);
  const { whiteList } = profile || {};

  const _onDeleteToWishlist = (e, id) => {
    e?.preventDefault();
    e?.stopPropagation();
    handleDeleteToWishlist(id);
  };

  const _onAddToCart = (e, product) => {
    e?.preventDefault();
    if (!tokenMethod.get()) {
      return dispatch(handleShowModal(MODAL_TYPES.login));
    }
    // add cart
    // ready payload action for reducer
    const addPayLoad = {
      addedId: product.id,
      addedColor: product.color[0],
      addedQuantity: 1,
      addedPrice: product.price - product.discount,
    };

    try {
      const cartRes = dispatch(handleAddCart(addPayLoad)).unwrap();
      return cartRes?.data?.data;
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div
      className="tab-pane fade active show"
      id="tab-wishlist"
      role="tabpanel"
      aria-labelledby="tab-wishlist-link"
    >
      <table className="table table-wishlist table-mobile">
        <thead>
          <tr>
            <th>Product</th>
            <th className="text-center">Price</th>
            <th className="text-center">Stock Status</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {whiteList?.length > 0 &&
            whiteList.map((product, index) => {
              const { id, images, name, price, stock } = product;
              // console.log("product", product);
              return (
                <tr key={index}>
                  <td className="product-col">
                    <div className="product">
                      <figure className="product-media">
                        <a href="#">
                          <img
                            src={`https://cfdshop.hn.ss.bfcplatform.vn/images/product/${images[0]}`}
                            alt="Product image"
                          />
                        </a>
                      </figure>
                      <h3 className="product-title">
                        <a href="#">{name}</a>
                      </h3>
                    </div>
                  </td>
                  <td className="price-col text-center">
                    ${formatCurrency(price)}
                  </td>
                  <td className="stock-col text-center">
                    <span className="in-stock">
                      {stock > 0 ? "In stock" : "Out of stock"}
                    </span>
                  </td>
                  <td className="action-col">
                    <button
                      className="btn btn-block btn-outline-primary-2"
                      onClick={(e) => _onAddToCart(e, product)}
                    >
                      <i className="icon-cart-plus" />
                      Add to Cart{" "}
                    </button>
                  </td>
                  <td className="remove-col">
                    <button
                      className="btn-remove"
                      onClick={(e) => _onDeleteToWishlist(e, id)}
                    >
                      <i className="icon-close" />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default WishList;
