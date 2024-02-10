import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";
import { orderService } from "../../services/orderService";
import { message } from "antd";

const Orders = () => {
  const products = async () => {
    try {
      const res = await orderService.getOrders();
      if (res) {
        console.log("res", res?.data?.data?.orders);
        return res?.data?.data?.orders;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("products", products());
  return (
    <div
      className="tab-pane fade active show"
      id="tab-orders"
      role="tabpanel"
      aria-labelledby="tab-orders-link"
    >
      <p>No order has been made yet.</p>
      <Link to={PATHS.PRODUCT} className="btn btn-outline-primary-2">
        <span>GO SHOP</span>
        <i className="icon-long-arrow-right" />
      </Link>
      <br />
      <br />
      <table className="table table-cart table-mobile">
        <thead>
          <tr>
            <th>Product</th>
            <th className="text-center">Price</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="product-col">
              <div className="product">
                <figure className="product-media">
                  <a href="#">
                    <img
                      src="/src/assets/images/demos/demo-3/products/product-3.jpg"
                      alt="Product image"
                    />
                  </a>
                </figure>
                <h3 className="product-title">
                  <a href="#">Beige knitted</a>
                </h3>
              </div>
            </td>
            <td className="price-col text-center">$84.00</td>
            <td className="quantity-col text-center">1 </td>
            <td className="total-col text-center">$84.00</td>
          </tr>
          <tr>
            <td className="product-col">
              <div className="product">
                <figure className="product-media">
                  <a href="#">
                    <img
                      src="/src/assets/images/demos/demo-3/products/product-2.jpg"
                      alt="Product image"
                    />
                  </a>
                </figure>
                <h3 className="product-title">
                  <a href="#">Blue utility</a>
                </h3>
              </div>
            </td>
            <td className="price-col text-center">$76.00</td>
            <td className="quantity-col text-center">1</td>
            <td className="total-col text-center">$76.00 </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
