import React, { useState } from "react";
import { MODAL_TYPES } from "../../constants/general";
import { useAuthContext } from "../../context/AuthContext";
import cn from "../../utils/cn";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { MESSAGE, REGREX } from "../../constants/validate";
import PATHS from "../../constants/paths";
import { Link } from "react-router-dom";
import ComponentLoading from "../ComponentLoading";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister } from "../../store/reducers/authReducer";
import useDebounce from "../../hooks/useDebounce";

const RegisterForm = () => {
  // const { handleRegister } = useAuthContext();
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (data) {
      // setLoading(true);
      // handleRegister?.(data, () => {
      //   setTimeout(() => {
      //     setLoading(false);
      //   }, 300);
      // });
      // payload
      const { name, email, password } = data;
      const payload = {
        firstName: name || "",
        lastName: "",
        email,
        password,
      };

      try {
        const res = await dispatch(handleRegister(payload)).unwrap();
        if (res) {
          console.log("res", res);
        }
      } catch (error) {
        console.log("error", error);
      }
      // } finally {
      //   setTimeout(() => {
      //     setLoading(false);
      //   }, 300);
      // }
    }
  };
  const renderLoading = useDebounce(loading.register, 1);
  // const renderLoading = loading.register;
  console.log("renderLoading", renderLoading);

  return (
    <>
      <form action="#" onSubmit={handleSubmit(onSubmit)} noValidate>
        {!!renderLoading && <ComponentLoading />}
        <div className="form-group">
          <Input
            label="Your email address"
            required
            {...register("email", {
              required: MESSAGE.required,
              pattern: { value: REGREX.email, message: MESSAGE.email },
            })}
            error={errors?.email?.message}
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
          <button type="submit" className="btn btn-outline-primary-2">
            <span>SIGN UP</span>
            <i className="icon-long-arrow-right" />
          </button>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="register-policy"
              required
              {...register("isAgree", {
                required: "Please agree with our policy",
              })}
            />

            <label className="custom-control-label" htmlFor="register-policy">
              I agree to the
              <Link to={PATHS.PRIVACY}>privacy policy</Link> *
            </label>
            <p className="form-error" style={{ minHeight: 23 }}>
              {errors?.isAgree?.message || ""}
            </p>
          </div>
          {/* End .custom-checkbox */}
        </div>
        {/* End .form-footer */}
      </form>
    </>
  );
};

export default RegisterForm;
