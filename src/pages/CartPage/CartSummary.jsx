import React from "react";
import { formatCurrency } from "../../utils/format";
import { Link, useNavigate } from "react-router-dom";
import PATHS from "../../constants/paths";
import { message } from "antd";
import RadioGroup from "../../context/RadioContext";
import { SHIPPING_OPTIONS } from "../../constants/general";

const CartSummary = ({
  product,
  subTotal,
  total,
  typeShip,
  handleUpdateShipping,
}) => {
  console.log("product", product);
  console.log("total", total);
  const navigate = useNavigate();
  const _onProceedCheckout = (e) => {
    e?.preventDefault();
    if (!typeShip) {
      message.error("Please select shipping method");
    } else if (!product?.length) {
      message.error("Your cart has no products");
    } else {
      navigate(PATHS.CHECKOUT);
    }
  };
  return (
    <aside className="col-lg-3">
      <div className="summary summary-cart">
        <h3 className="summary-title">Cart Total</h3>
        <table className="table table-summary">
          <tbody>
            <tr className="summary-subtotal">
              <td>Subtotal:</td>
              <td>${formatCurrency(subTotal)}</td>
            </tr>
            <tr className="summary-shipping">
              <td>Shipping:</td>
              <td>&nbsp;</td>
            </tr>
            <RadioGroup
              onChange={handleUpdateShipping}
              defaultValue={typeShip || ""}
            >
              {SHIPPING_OPTIONS.map((option) => {
                const { value, label, price } = option;
                return (
                  <tr key={value} className="summary-shipping-row">
                    <td>
                      <RadioGroup.Item value={value}>{label}</RadioGroup.Item>
                    </td>
                    <td>${formatCurrency(price)}</td>
                  </tr>
                );
              })}
            </RadioGroup>
            {/* <tr className="summary-shipping-row">
              <td>
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    id="free-shipping"
                    name="shipping"
                    className="custom-control-input"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="free-shipping"
                  >
                    Free Shipping
                  </label>
                </div>
              </td>
              <td>$0.00</td>
            </tr>
            <tr className="summary-shipping-row">
              <td>
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    id="standart-shipping"
                    name="shipping"
                    className="custom-control-input"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="standart-shipping"
                  >
                    Standart:
                  </label>
                </div>
              </td>
              <td>$10.00</td>
            </tr>
            <tr className="summary-shipping-row">
              <td>
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    id="express-shipping"
                    name="shipping"
                    className="custom-control-input"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="express-shipping"
                  >
                    Express:
                  </label>
                </div>
              </td>
              <td>$20.00</td>
            </tr> */}
            <tr className="summary-shipping-estimate">
              <td>
                Estimate for Your Country <br />
                <Link to={PATHS.DASHBOARD.INDEX}>Change address</Link>
              </td>
              <td>&nbsp;</td>
            </tr>
            <tr className="summary-total">
              <td>Total:</td>
              <td>${formatCurrency(total)}</td>
            </tr>
          </tbody>
        </table>
        <Link
          to={PATHS.CHECKOUT}
          className="btn btn-outline-primary-2 btn-order btn-block"
          onClick={_onProceedCheckout}
        >
          PROCEED TO CHECKOUT
        </Link>
      </div>
      <Link
        to={PATHS.PRODUCT.INDEX}
        className="btn btn-outline-dark-2 btn-block mb-3"
      >
        <span>CONTINUE SHOPPING</span>
        <i className="icon-refresh" />
      </Link>
    </aside>
  );
};

export default CartSummary;
