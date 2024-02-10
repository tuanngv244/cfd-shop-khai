import React from "react";
import tokenMethod from "../../utils/token";
import { useAuthContext } from "../../context/AuthContext";
import { MODAL_TYPES } from "../../constants/general";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLogout,
  handleShowModal,
} from "../../store/reducers/authReducer";
import { Link, useNavigate } from "react-router-dom";
import PATHS from "../../constants/paths";

const HeaderTop = () => {
  // const { handleShowModal, showedModal, handleLogout } = useAuthContext();
  const { profile } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log("profile", profile);
  const _onShowAuthModal = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    dispatch(handleShowModal(MODAL_TYPES.login));
    // handleShowModal?.(MODAL_TYPES.login);
    // console.log("showedModal", showedModal);
  };
  // console.log(
  //   "dispatch(handleShowModal()",
  //   dispatch(handleShowModal(MODAL_TYPES.login))
  // );

  const _logOut = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    dispatch(handleLogout());
    navigate(PATHS.HOME);
    // handleLogout();
  };
  return (
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <a href="tel:0989596912">
            <i className="icon-phone" /> Hotline: 098 9596 912{" "}
          </a>
        </div>
        <div className="header-right">
          {!!!tokenMethod.get() ? (
            <>
              {/* Not LogIn */}
              <ul className="top-menu top-link-menu">
                <li>
                  <a
                    href="#signin-modal"
                    // data-toggle="modal"
                    className="top-menu-login"
                    onClick={_onShowAuthModal}
                  >
                    <i className="icon-user" />
                    Login | Resgister{" "}
                  </a>
                </li>
              </ul>
            </>
          ) : (
            <>
              {/* Logged In */}
              <ul className="top-menu">
                <li>
                  <Link to={PATHS.DASHBOARD.INDEX} className="top-link-menu">
                    <i className="icon-user" />
                    {profile?.firstName || "CFD"}
                  </Link>
                  <ul>
                    <li>
                      <ul>
                        <li>
                          <Link to={PATHS.DASHBOARD.INDEX}>
                            Account Details
                          </Link>
                        </li>
                        <li>
                          <Link to={PATHS.DASHBOARD.ORDERS}>Your Orders</Link>
                        </li>
                        <li>
                          <Link to={PATHS.DASHBOARD.WISHLIST}>
                            Wishlist <span>({profile?.whiteList.length})</span>
                          </Link>
                        </li>
                        <li>
                          <a href="#" onClick={_logOut}>
                            Sign Out
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
