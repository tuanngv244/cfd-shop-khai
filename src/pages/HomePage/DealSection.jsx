import moment from "moment";
import React from "react";
import PATHS from "../../constants/paths";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import CountDown from "../../components/CountDown";

const DealSection = ({ dealProducts }) => {
  const targetTime = moment()
    .add(1, "day")
    .set({ hour: 17, minute: 0, second: 0, millisecond: 0 }); // 5pm tomorrow
  const dealOfTheDayProduct = dealProducts?.[0] || {};
  return (
    <div className="container">
      <div className="heading text-center mb-4">
        <h2 className="title">Deals &amp; Outlet</h2>
        <p className="title-desc">Today’s deal and more</p>
      </div>
      <div className="row">
        <div className="col-lg-6 deal-col">
          <div
            className="deal"
            style={{
              backgroundImage:
                'url("/src/assets/images/demos/demo-3/deal/bg-1.jpg")',
            }}
          >
            <div className="deal-top">
              <h2>Deal of the Day.</h2>
              <h4>Limited quantities. </h4>
            </div>
            <div className="deal-content">
              <h3 className="product-title">
                <Link to={PATHS.PRODUCT.INDEX + `/${dealOfTheDayProduct.slug}`}>
                  Home Smart Speaker with Google Assistant
                </Link>
              </h3>
              <div className="product-price">
                <span className="new-price">
                  ${dealOfTheDayProduct.price - dealOfTheDayProduct.discount}
                </span>
                <span className="old-price">
                  Was ${dealOfTheDayProduct.price}
                </span>
              </div>
              <Link
                to={PATHS.PRODUCT.INDEX + `/${dealOfTheDayProduct.slug}`}
                className="btn btn-link"
              >
                <span>Shop Now</span>
                <i className="icon-long-arrow-right" />
              </Link>
            </div>
            <div className="deal-bottom">
              <CountDown targetTime={targetTime} />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="products">
            <div className="row">
              <div className="col-6">
                {/* <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-sale">
                      Sale
                    </span>
                    <a href="product-detail.html">
                      <img
                        src="/assets/images/demos/demo-3/products/product-5.jpg"
                        alt="Product image"
                        className="product-image"
                      />
                    </a>
                    <div className="product-action-vertical">
                      <a
                        href="#"
                        className="btn-product-icon btn-wishlist btn-expandable"
                      >
                        <span>add to wishlist</span>
                      </a>
                    </div>
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                    </div>
                  </figure>
                  <div className="product-body">
                    <h3 className="product-title">
                      <a href="product-detail.html">
                        Canon - EOS 5D Mark IV DSLR Camera
                      </a>
                    </h3>
                    <div className="product-price">
                      <span className="new-price">$3,599.99</span>
                      <span className="old-price">Was $3,999.99</span>
                    </div>
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "80%" }} />
                      </div>
                      <span className="ratings-text">( 5 Reviews )</span>
                    </div>
                  </div>
                </div> */}
                <ProductCard product={dealProducts[1]} />
              </div>
              <div className="col-6">
                {/* <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-sale">
                      Sale
                    </span>
                    <a href="product-detail.html">
                      <img
                        src="/assets/images/demos/demo-3/products/product-6.jpg"
                        alt="Product image"
                        className="product-image"
                      />
                    </a>
                    <div className="product-action-vertical">
                      <a
                        href="#"
                        className="btn-product-icon btn-wishlist btn-expandable"
                      >
                        <span>add to wishlist</span>
                      </a>
                    </div>
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                    </div>
                  </figure>
                  <div className="product-body">
                    <h3 className="product-title">
                      <a href="product-detail.html">
                        Apple - Smart Keyboard Folio for 11-inch iPad Pro
                      </a>
                    </h3>
                    <div className="product-price">
                      <span className="new-price">$179.00</span>
                      <span className="old-price">Was $200.99</span>
                    </div>
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "60%" }} />
                      </div>
                      <span className="ratings-text">( 4 Reviews )</span>
                    </div>
                  </div>
                </div> */}
                <ProductCard product={dealProducts[2]} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="more-container text-center mt-3 mb-0">
        <a href="#" className="btn btn-outline-dark-2 btn-round btn-more">
          <span>Shop more</span>
          <i className="icon-long-arrow-right" />
        </a>
      </div>
    </div>
  );
};

export default DealSection;
