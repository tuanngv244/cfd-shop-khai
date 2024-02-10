const PRODUCT_PATH = "/product";
const BLOG_PATH = "/blog";
const DASHBOARD_PATH = "/dashboard";
const PATHS = {
  HOME: "/",
  PRODUCT: {
    INDEX: PRODUCT_PATH,
    DETAIL: PRODUCT_PATH + "/:productSlug",
  },
  BLOG: {
    INDEX: BLOG_PATH,
    SINGLE: BLOG_PATH + "/:blogSlug",
  },

  DASHBOARD: {
    INDEX: DASHBOARD_PATH,
    ORDERS: DASHBOARD_PATH + "/orders",
    ADRESSES: DASHBOARD_PATH + "/adresses",
    WISHLIST: DASHBOARD_PATH + "/wishlist",
    CHANGEPASSWORD: DASHBOARD_PATH + "/password",
  },

  PAYMENT: "/payment-method",
  CONTACT: "/contact",
  ABOUT: "/about",
  PRIVACY: "/privacy",
  FAQ: "/faq",
  RETURNS: "/returns",
  SHIPPING: "/shipping",
  CART: "/cart",
  CHECKOUT: "/checkout",
  CHECKOUTSUCCESS: "/checkout-success",
};

export default PATHS;
