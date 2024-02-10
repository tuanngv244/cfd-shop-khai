import React from "react";
import { useSelector } from "react-redux";

const Overlay = () => {
  const { showedModal } = useSelector((state) => state.auth);
  return (
    <div className={`modal-backdrop fade ${!!showedModal ? "show" : ""}`}></div>
  );
};

export default Overlay;
