import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { handleShowModal } from "../../store/reducers/authReducer";
import { MODAL_TYPES } from "../../constants/general";
// import { useAuthContext } from "../../context/AuthContext";
import tokenMethod from "../../utils/token";

const PrivateRoute = ({ redirectPath = "/" }) => {
  const dispatch = useDispatch();
  if (!!!tokenMethod.get()) {
    dispatch(handleShowModal(MODAL_TYPES.login));
    return <Navigate to={redirectPath} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
