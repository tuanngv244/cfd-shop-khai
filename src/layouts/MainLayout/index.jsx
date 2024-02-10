/* eslint-disable react/prop-types */
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import ScrollTop from "../../components/ScrollTop";
import MobileMenu from "../../components/MobileMenu";
import AuthModal from "../../components/AuthModal";
import MainContextProvider from "../../context/MainContext";
import MobileMenuOverlay from "../../components/MobileMenuOverlay";
import AuthContextProvider from "../../context/AuthContext";
import Overlay from "../../components/Overlay";

const MainLayout = () => {
  return (
    <MainContextProvider>
      {/* <AuthContextProvider> */}
      <div className="page-wrapper">
        <Header />
        <Outlet />
        <Footer />
      </div>
      <ScrollTop />

      <MobileMenu />
      <MobileMenuOverlay />
      <AuthModal />
      <Overlay />
      {/* </AuthContextProvider> */}
    </MainContextProvider>
  );
};

export default MainLayout;
