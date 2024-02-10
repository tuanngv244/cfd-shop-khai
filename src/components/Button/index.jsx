import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  variant = "primary",
  className = "",
  children = "Button",
  link,
  disabled,
  ...restProps
}) => {
  let variantClass = "";
  switch (variant) {
    case "primary":
      variantClass = "btn btn-primary";
      break;

    case "border":
      variantClass = "btn btn-outline-primary-2 ";
      break;

    case "grey":
      variantClass = "course__btn btn btn--grey";
      break;

    default:
      break;
  }
  if (disabled) {
    variantClass = "btn btn--grey";
    restProps.onClick = () => {};
  }
  if (link) {
    return (
      <Link to={link} className={`${variantClass} ${className}`} {...restProps}>
        {children}
      </Link>
    );
  }
  return (
    <button className={`${variantClass} ${className}`} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
