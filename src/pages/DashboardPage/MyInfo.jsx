import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input";
import { MESSAGE, REGREX } from "../../constants/validate";
import { removeAccents } from "../../utils/format";

import useAddress from "../../hooks/useAddress";
import { Select, message } from "antd";
import { authService } from "../../services/authService";
import { handleGetProfile } from "../../store/reducers/authReducer";
import dayjs from "dayjs";

const MyInfo = () => {
  const { profile } = useSelector((state) => state.auth);
  const {
    firstName,
    birthday,
    phone,
    email,
    province,
    district,
    ward,
    street,
  } = profile || {};
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName,
      birthday,
      phone,
      email,
      province,
      district,
      ward,
      street,
    },
  });

  const {
    provinces,
    districts,
    wards,
    provinceId,
    districtId,
    wardId,
    handleProvinceChange,
    handleDistrictChange,
    handleWardChange,
  } = useAddress();

  useEffect(() => {
    if (!profile) return;
    reset?.({
      firstName,
      phone,
      email,
      province,
      district,
      ward,
      street,
      birthday: profile?.birthday
        ? dayjs(profile?.birthday || "01-01-2000")
            .format("YYYY/MM/DD")
            .replaceAll("/", "-")
        : "",
    });
    handleProvinceChange?.(province);
    handleDistrictChange?.(district);
    handleWardChange?.(ward);
  }, [profile]);

  const _onProvinceChange = (changeId) => {
    // console.log("provincechange");
    console.log("changeId", changeId);
    handleProvinceChange?.(changeId);

    reset({
      ...getValues(),
      province: changeId,
      district: undefined,
      ward: undefined,
    });
  };
  // console.log("provinceId", provinceId);
  // console.log("districts", districts);
  // console.log("wards", wards);
  console.log("profile", profile);
  const _onDistrictChange = (changeId) => {
    handleDistrictChange?.(changeId);
    reset({
      ...getValues(),
      district: changeId,
      ward: undefined,
    });
  };
  const _onWardChange = (changeId) => {
    handleWardChange?.(changeId);
    reset({
      ...getValues(),
      ward: changeId,
    });
  };
  const _onSubmit = async (data) => {
    console.log("data", data);
    const payload = {
      ...data,
      lastName: "",
    };
    try {
      const res = await authService.updateProfile(payload);
      if (res) {
        message.success("Update profile successfully!");
        dispatch(handleGetProfile());
      }
    } catch (error) {
      console.log("error", error);
      message.error("Update profile failed");
    }
  };
  return (
    <div
      className="tab-pane fade show active"
      id="tab-account"
      role="tabpanel"
      aria-labelledby="tab-account-link"
    >
      <form onSubmit={handleSubmit(_onSubmit)} className="account-form">
        <div className="row">
          <div className="col-sm-6">
            <Input
              label="Full Name"
              required
              {...register("firstName", { required: MESSAGE.required })}
              error={errors?.name?.message}
            />
          </div>
          <div className="col-sm-6">
            <Input
              label="Email address"
              required
              disabled
              type="email"
              {...register("email", {
                required: MESSAGE.required,
                pattern: { value: REGREX.email, message: MESSAGE.email },
              })}
              error={errors?.email?.message}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Input
              label="Phone number"
              required
              {...register("phone", { required: MESSAGE.required })}
              error={errors?.phone?.message}
            />
          </div>
          <div className="col-sm-6">
            <Input
              type="date"
              label="Ngày sinh"
              required
              {...register("birthday", { required: MESSAGE.required })}
              error={errors?.birthday?.message}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <label>Province/City *</label>
            <Controller
              name="province"
              control={control}
              rules={{ required: MESSAGE.required }}
              render={({ formState: { errors } }) => {
                return (
                  <>
                    <Select
                      className="form-control form-select"
                      suffixIcon={<></>}
                      showSearch
                      placeholder="Please select Province/City"
                      value={provinceId}
                      options={provinces}
                      optionFilterProp="children"
                      onChange={_onProvinceChange}
                      filterOption={(input, option) => {
                        removeAccents(option?.label ?? "")
                          .toLowerCase()
                          .includes(removeAccents(input.toLowerCase()));
                      }}
                    />
                    <p className="form-error" style={{ minHeight: 23 }}>
                      {errors?.province?.message || ""}
                    </p>
                  </>
                );
              }}
            ></Controller>
          </div>
          <div className="col-sm-4">
            <label>District/Town *</label>
            <Controller
              name="district"
              control={control}
              rules={{ required: MESSAGE.required }}
              render={({ formState: { errors } }) => {
                return (
                  <>
                    <Select
                      className="form-control form-select"
                      suffixIcon={<></>}
                      showSearch
                      placeholder="Please select District/Town"
                      value={districtId}
                      options={districts}
                      optionFilterProp="children"
                      onChange={_onDistrictChange}
                      filterOption={(input, option) => {
                        removeAccents(option?.label ?? "")
                          .toLowerCase()
                          .includes(removeAccents(input.toLowerCase()));
                      }}
                    />
                    <p className="form-error" style={{ minHeight: 23 }}>
                      {errors?.province?.message || ""}
                    </p>
                  </>
                );
              }}
            ></Controller>
          </div>
          <div className="col-sm-4">
            <label>Ward *</label>
            <Controller
              name="ward"
              control={control}
              rules={{ required: MESSAGE.required }}
              render={({ formState: { errors } }) => {
                return (
                  <>
                    <Select
                      className="form-control form-select"
                      suffixIcon={<></>}
                      showSearch
                      placeholder="Please select Ward"
                      value={wardId}
                      options={wards}
                      optionFilterProp="children"
                      onChange={_onWardChange}
                      filterOption={(input, option) => {
                        removeAccents(option?.label ?? "")
                          .toLowerCase()
                          .includes(removeAccents(input.toLowerCase()));
                      }}
                    />
                    <p className="form-error" style={{ minHeight: 23 }}>
                      {errors?.province?.message || ""}
                    </p>
                  </>
                );
              }}
            ></Controller>
          </div>
        </div>
        <Input
          label="Street address"
          required
          {...register("street", { required: MESSAGE.required })}
          error={errors?.street?.message}
        />
        <button type="submit" className="btn btn-outline-primary-2">
          <span>SAVE CHANGES</span>
          <i className="icon-long-arrow-right" />
        </button>
      </form>
    </div>
  );
};

export default MyInfo;
