import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./store/actions/counterActions";
import { fetchRandomDog } from "./store/actions/dogAction";
import { message } from "antd";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import PATHS from "./constants/paths";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import DashboardPage from "./pages/DashboardPage";
import ErrorPage from "./pages/ErrorPage";
import ProductPage from "./pages/ProductPage";
import BlogPage from "./pages/BlogPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import BlogSinglePage from "./pages/BlogSinglePage";
import FaqPage from "./pages/FaqPage";
import ShippingPage from "./pages/ShippingPage";
import ReturnsPage from "./pages/ReturnsPage";
import PrivateRoute from "./components/PrivateRoute";
import CartPage from "./pages/CartPage";
import MyInfo from "./pages/DashboardPage/MyInfo";
import Orders from "./pages/DashboardPage/Orders";
import Adresses from "./pages/DashboardPage/Adresses";
import WishList from "./pages/DashboardPage/Wishlist";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import "./assets/style.css";
import tokenMethod from "./utils/token";
import { handleGetProfile } from "./store/reducers/authReducer";
import { handleGetCart } from "./store/reducers/cartReducer";
import ChangePassword from "./pages/DashboardPage/ChangePassword";

function App() {
  // const counter = useSelector((state) => state.counter);
  // const dog = useSelector((state) => state.dog);
  // // console.log("dog", dog);
  // const dispatch = useDispatch();
  // // console.log("globalState", globalState);
  // useEffect(() => {
  //   dispatch(fetchRandomDog());
  // }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    // setup antd message
    message.config({ top: 80, duration: 3, maxCount: 3 });

    if (tokenMethod.get()) {
      dispatch(handleGetProfile());
      dispatch(handleGetCart());
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
              <Route path={PATHS.CART} element={<CartPage />} />
              <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />
              <Route
                path={PATHS.CHECKOUTSUCCESS}
                element={<CheckoutSuccessPage />}
              />
              <Route path={PATHS.DASHBOARD.INDEX} element={<DashboardPage />}>
                <Route index element={<MyInfo />} />
                <Route path={PATHS.DASHBOARD.ORDERS} element={<Orders />} />
                <Route path={PATHS.DASHBOARD.ADRESSES} element={<Adresses />} />
                <Route path={PATHS.DASHBOARD.WISHLIST} element={<WishList />} />
                <Route
                  path={PATHS.DASHBOARD.CHANGEPASSWORD}
                  element={<ChangePassword />}
                />
              </Route>
            </Route>
            <Route path={PATHS.PRODUCT.INDEX} element={<ProductPage />} />
            <Route
              path={PATHS.PRODUCT.DETAIL}
              element={<ProductDetailPage />}
            />

            <Route path={PATHS.BLOG.INDEX} element={<BlogPage />} />
            <Route path={PATHS.BLOG.SINGLE} element={<BlogSinglePage />} />

            <Route path={PATHS.PAYMENT} element={<PaymentMethodPage />} />
            <Route path={PATHS.CONTACT} element={<ContactPage />} />
            <Route path={PATHS.ABOUT} element={<AboutPage />} />
            <Route path={PATHS.PRIVACY} element={<PrivacyPage />} />
            <Route path={PATHS.FAQ} element={<FaqPage />} />
            <Route path={PATHS.RETURNS} element={<ReturnsPage />} />
            <Route path={PATHS.SHIPPING} element={<ShippingPage />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      {/* <div>
        <h1>Counter: {counter}</h1>
        <button onClick={() => dispatch(increment(10))}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <img src={dog.message} alt="" />
      </div> */}
    </>
  );
}

export default App;
