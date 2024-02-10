import React, { useState } from "react";
import { TABS_DETAIL } from "../../constants/tabs";
import cn from "../../utils/cn";
import { formatDate, formatNumberToPercent } from "../../utils/format";

const ProductDetailTab = ({ description, shippingReturn, reviews }) => {
  const [selectedTab, setSelectedTab] = useState(TABS_DETAIL.description);
  const _onTabChange = (e, tab) => {
    e?.preventDefault();
    e?.stopPropagation();
    setSelectedTab(tab);
  };
  console.log("reviews", reviews);
  return (
    <div className="product-details-tab">
      <ul className="nav nav-pills justify-content-center" role="tablist">
        <li className="nav-item">
          <a
            className={cn("nav-link", {
              active: selectedTab === TABS_DETAIL.description,
            })}
            href="#product-desc-tab"
            onClick={(e) => {
              _onTabChange(e, TABS_DETAIL.description);
            }}
          >
            Description
          </a>
        </li>
        <li className="nav-item">
          <a
            className={cn("nav-link", {
              active: selectedTab === TABS_DETAIL.shipping,
            })}
            href="#product-shipping-tab"
            onClick={(e) => {
              _onTabChange(e, TABS_DETAIL.shipping);
            }}
          >
            Shipping &amp; Returns
          </a>
        </li>
        <li className="nav-item">
          <a
            className={cn("nav-link", {
              active: selectedTab === TABS_DETAIL.reviews,
            })}
            href="#product-review-tab"
            onClick={(e) => {
              _onTabChange(e, TABS_DETAIL.reviews);
            }}
          >
            Reviews ({reviews.length})
          </a>
        </li>
      </ul>

      <div className="tab-content">
        {selectedTab === TABS_DETAIL.description && (
          <div
            className="tab-pane fade show active"
            id="product-desc-tab"
            role="tabpanel"
            aria-labelledby="product-desc-link"
          >
            <div className="product-desc-content">
              <h3>Product Information</h3>
              <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </div>
          </div>
        )}
        {selectedTab === TABS_DETAIL.shipping && (
          <div
            className="tab-pane fade show active"
            id="product-shipping-tab"
            role="tabpanel"
            aria-labelledby="product-shipping-link"
          >
            <div className="product-desc-content">
              <div dangerouslySetInnerHTML={{ __html: shippingReturn }}></div>
            </div>
          </div>
        )}
        {selectedTab === TABS_DETAIL.reviews && (
          <div
            className="tab-pane fade show active"
            id="product-review-tab"
            role="tabpanel"
            aria-labelledby="product-review-link"
          >
            <div className="reviews">
              <h3>
                {reviews.length < 1
                  ? "There is no any reviews"
                  : `Reviews (${reviews.length})`}
              </h3>
              {!!reviews &&
                reviews.map((review) => {
                  const { id, rate, title, description, order, updatedAt } =
                    review || {};
                  return (
                    <div className="review" key={id}>
                      <div className="row no-gutters">
                        <div className="col-auto">
                          <h4>
                            <a href="#">#{order.slice(-4)}</a>
                          </h4>
                          <div className="ratings-container">
                            <div className="ratings">
                              <div
                                className="ratings-val"
                                style={{ width: formatNumberToPercent(rate) }}
                              />
                            </div>
                          </div>
                          <span className="review-date">
                            {formatDate(updatedAt)}
                          </span>
                        </div>
                        <div className="col">
                          <h4>{title}</h4>
                          <div className="review-content">
                            <p>{description}</p>
                          </div>
                          <div className="review-action">
                            <a href="#">
                              <i className="icon-thumbs-up" />
                              Helpful (2){" "}
                            </a>
                            <a href="#">
                              <i className="icon-thumbs-down" />
                              Unhelpful (0){" "}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailTab;
