import React from "react";
import { useMainContext } from "../../context/MainContext";

const MobileMenuOverlay = () => {
  const { handleCloseMobileMenu } = useMainContext();
  return (
    <div className="mobile-menu-overlay" onClick={handleCloseMobileMenu} />
  );
};

export default MobileMenuOverlay;
