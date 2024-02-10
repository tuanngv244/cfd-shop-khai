import React, { useRef } from "react";
import PATHS from "../../constants/paths";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/format";
import QuantityInput from "../../components/QuantityInput";
import styled from "styled-components";
import ProductColor from "../../components/ProductColor";
import { useSelector } from "react-redux";
const ProductTitle = styled.h3`
  display: flex !important;
  flex-direction: column;
  gap: 10px;

  .product-variant {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
  }
  .product-nav-dots {
    margin: 0;
  }
`;
const CartTable = ({
  quantityRef,
  products,
  handleUpdateQuantity,
  handleRemoveProduct,
}) => {
  //   const quantityRef = useRef([]);
  //   console.log("quantityRef", quantityRef.current);
  return (
    <div className="col-lg-9">
      <table className="table table-cart table-mobile">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products?.length > 0
            ? products.map((product, index) => {
                const {
                  id,

                  slug,
                  images,
                  name,
                  price,
                  quantity,
                  totalProduct,
                  variant,
                } = product;
                const detailPath = PATHS.PRODUCT.INDEX + `/${slug}`;
                let imagePath = images?.[0];
                if (imagePath?.split("http")?.length > 2) {
                  imagePath = imagePath?.split("http");
                  imagePath = "http" + imagePath[2];
                }
                return (
                  <tr key={index}>
                    <td className="product-col">
                      <div className="product">
                        <figure className="product-media">
                          <Link to={detailPath}>
                            <img src={imagePath} alt="Product image" />
                          </Link>
                        </figure>
                        <ProductTitle className="product-title">
                          <Link to={detailPath}>{name}</Link>
                          <ProductColor colors={[variant]} />
                        </ProductTitle>
                      </div>
                    </td>
                    <td className="price-col">${formatCurrency(price)}</td>
                    <td className="quantity-col">
                      <QuantityInput
                        ref={(thisRef) =>
                          (quantityRef.current[index] = thisRef)
                        }
                        className="cart-product-quantity"
                        max={100}
                        defaultValue={quantity}
                        onChange={(value) => {
                          handleUpdateQuantity(value, index);
                        }}
                      ></QuantityInput>
                    </td>
                    <td className="total-col">
                      ${formatCurrency(totalProduct)}
                    </td>
                    <td className="remove-col">
                      <button
                        className="btn-remove"
                        onClick={() => {
                          handleRemoveProduct(index);
                        }}
                      >
                        <i className="icon-close" />
                      </button>
                    </td>
                  </tr>
                );
              })
            : "NOT VALUE"}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
