import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAuthContext } from "../../context/AuthContext";
import styled from "styled-components";
import { MODAL_TYPES } from "../../constants/general";
import cn from "../../utils/cn";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCloseModal,
  handleShowModal,
} from "../../store/reducers/authReducer";

const AuthenModalContainer = styled.div`
  display: ${(props) => (props?.isShow ? "block" : "none")};
`;

const AuthModal = () => {
  // const { showedModal, handleCloseModal, handleShowModal } = useAuthContext();
  const { showedModal } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // console.log("showedModal", showedModal);
  const _onTabChange = (e, tab) => {
    e?.stopPropagation();
    e?.preventDefault();
    dispatch(handleShowModal(tab));
  };

  const _onCloseModal = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    dispatch(handleCloseModal());
  };
  return (
    <AuthenModalContainer
      className={`modal ${!!showedModal ? "fade show" : ""}`}
      // id="signin-modal"
      // tabIndex={-1}
      // role="dialog"
      // aria-hidden="true"
      isShow={!!showedModal}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={_onCloseModal}
            >
              <span aria-hidden="true">
                <i className="icon-close" />
              </span>
            </button>
            <div className="form-box">
              <div className="form-tab">
                <ul
                  className="nav nav-pills nav-fill nav-border-anim"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className={cn("nav-link", {
                        active: showedModal === MODAL_TYPES.login,
                      })}
                      // id="signin-tab"
                      // data-toggle="tab"
                      href="#signin"
                      // role="tab"
                      // aria-controls="signin"
                      // aria-selected="true"
                      onClick={(e) => {
                        _onTabChange(e, MODAL_TYPES.login);
                      }}
                    >
                      Sign In
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={cn("nav-link", {
                        active: showedModal === MODAL_TYPES.register,
                      })}
                      // id="register-tab"
                      // data-toggle="tab"
                      href="#register"
                      // role="tab"
                      // aria-controls="register"
                      // aria-selected="false"
                      onClick={(e) => {
                        _onTabChange(e, MODAL_TYPES.register);
                      }}
                    >
                      Register
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="tab-content-5">
                  <div
                    className="tab-pane fade active show"
                    // id="register"
                    // role="tabpanel"
                    // aria-labelledby="register-tab"
                  >
                    {showedModal === MODAL_TYPES.login && <LoginForm />}
                    {showedModal === MODAL_TYPES.register && <RegisterForm />}
                  </div>
                </div>
              </div>
              {/* End .form-tab */}
            </div>
            {/* End .form-box */}
          </div>
          {/* End .modal-body */}
        </div>
        {/* End .modal-content */}
      </div>
      {/* End .modal-dialog */}
    </AuthenModalContainer>
  );
};

export default AuthModal;
