import { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import scrollTop from "../utils/scrollTop";

const MainContext = createContext({});

const MainContextProvider = ({ children }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    handleCloseMobileMenu();
    const myTimeout = setTimeout(() => {
      scrollTop();
    }, 100);

    return () => {
      clearTimeout(myTimeout);
    };
  }, [pathname]);

  const handleCloseMobileMenu = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    $("body").removeClass("mmenu-active");
  };

  const handleShowMobileMenu = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    $("body").addClass("mmenu-active");
  };

  return (
    <MainContext.Provider
      value={{ handleCloseMobileMenu, handleShowMobileMenu }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
export const useMainContext = () => useContext(MainContext);
