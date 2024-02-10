import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { authService } from "../../services/authService";
import { message } from "antd";
import Input from "../../components/Input";
import { MESSAGE } from "../../constants/validate";
import validate from "./../../utils/validate";

const ChangePassword = () => {
  const { profile } = useSelector((state) => state.auth);
  const newPassword = useRef({});
  const password = useRef({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  newPassword.current = watch("newPassword", "");
  password.current = watch("password", "");
  const _onSubmit = async (data) => {
    try {
      const res = await authService.updateProfile({ ...profile, ...data });
      if (res) {
        message.success("Update password successfully!");
      }
    } catch (error) {
      console.log("error", error);
      message.error("Update passwprd failed");
    }
  };
  //   console.log("first", profile);
  return (
    <div className="tab-pane fade show active">
      <form onSubmit={handleSubmit(_onSubmit)} className="account-form">
        <Input
          label="Current password (leave blank to leave unchanged)"
          type="password"
          {...register("password", {
            required: MESSAGE.required,
          })}
          error={errors?.password?.message}
        />
        <Input
          label="New password (leave blank to leave unchanged)"
          type="password"
          {...register("newPassword", {
            required: MESSAGE.required,
            validate: (value) =>
              value !== password.current
                ? true
                : "Không được trùng với mật khẩu cũ",
          })}
          error={errors?.newPassword?.message}
        />

        <Input
          label="Confirm new password"
          type="password"
          {...register("confirmPassword", {
            required: MESSAGE.required,
            validate: (value) =>
              value === newPassword.current
                ? true
                : "Xác nhận mật khẩu không khớp",
          })}
          error={errors?.confirmPassword?.message}
        />
        <button type="submit" className="btn btn-outline-primary-2">
          <span>SAVE CHANGES</span>
          <i className="icon-long-arrow-right" />
        </button>
      </form>{" "}
    </div>
  );
};

export default ChangePassword;
