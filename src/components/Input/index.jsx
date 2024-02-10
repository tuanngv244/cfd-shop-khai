import React, { forwardRef } from "react";

const Input = (
  { label, required, error, renderInput, name = "", ...inputProps },
  ref
) => {
  return (
    <div className="form-group">
      <label className="label" htmlFor={name}>
        {label} {required && <span>*</span>}
      </label>
      {renderInput?.({ ...inputProps, ref }) || (
        <input
          type="text"
          ref={ref}
          name={name}
          id={name}
          className={`form-control ${error ? "input-error" : ""}`}
          {...inputProps}
        />
      )}
      <p className="form-error" style={{ minHeight: 23 }}>
        {error || ""}
      </p>
    </div>
  );
};

export default forwardRef(Input);
