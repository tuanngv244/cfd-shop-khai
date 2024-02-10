import { useForm } from "react-hook-form";
import { MODAL_TYPES } from "../../constants/general";
import { useAuthContext } from "../../context/AuthContext";
import cn from "../../utils/cn";
import { useState } from "react";
import Input from "../Input";
import { MESSAGE, REGREX } from "../../constants/validate";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";

import ComponentLoading from "../ComponentLoading";
import { handleLogin } from "../../store/reducers/authReducer";
import useDebounce from "../../hooks/useDebounce";

const LoginForm = () => {
  // const { handleLogin } = useAuthContext();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (data && !loading.login) {
      // setLoading(true);
      // handleLogin?.(data, () => {
      //   setTimeout(() => {
      //     setLoading(false);
      //   }, 300);
      // });
      try {
        const res = await dispatch(handleLogin(data)).unwrap();
        if (res) {
          console.log("res", res);
        }
      } catch (error) {
        console.log("error", error);
      }
      //  finally {
      //   setTimeout(() => {
      //     setLoading(false);
      //   }, 300);
      // }
    }
  };
  const renderLoading = useDebounce(loading.login, 1);
  // console.log("renderLoading", renderLoading);
  return (
    <>
      <form action="#" onSubmit={handleSubmit(onSubmit)} noValidate>
        {!!renderLoading && <ComponentLoading />}
        <div className="form-group">
          <Input
            label="Username or email address"
            required
            {...register("email", {
              required: MESSAGE.required,
              pattern: {
                value: REGREX.email,
                message: MESSAGE.email,
              },
            })}
            error={errors?.email?.message || ""}
          />
        </div>
        {/* End .form-group */}
        <div className="form-group">
          <Input
            label="Password"
            required
            type="password"
            {...register("password", {
              required: MESSAGE.required,
              pattern: { value: REGREX.password, message: MESSAGE.password },
            })}
            error={errors?.password?.message || ""}
          />
        </div>
        {/* End .form-group */}
        <div className="form-footer">
          <Button type="submit" variant="border">
            <span>LOG IN</span>
            <i className="icon-long-arrow-right" />
          </Button>
        </div>
        {/* End .form-footer */}
      </form>
    </>
  );
};

export default LoginForm;
