import React, { forwardRef, useImperativeHandle, useState } from "react";

const ProductColor = ({ colors, defaultColor, onChange }, ref) => {
  const [selectColor, setSelectColor] = useState(defaultColor);
  useImperativeHandle(ref, () => {
    return {
      value: selectColor,
      reset: () => {
        setSelectColor(defaultColor);
      },
    };
  });
  const _onColorChange = (e, color) => {
    e?.stopPropagation();
    setSelectColor(color);
    onChange?.(color);
  };
  // console.log("selectColor", selectColor);
  return (
    <div className="product-nav product-nav-dots">
      {colors?.map((color, index) => {
        return (
          <div
            key={index}
            className={`product-nav-item ${
              selectColor === color ? "active" : ""
            }`}
            style={{ background: color }}
            onClick={(e) => {
              _onColorChange(e, color);
            }}
          >
            <span className="sr-only">{color}</span>
          </div>
        );
      })}
    </div>
  );
};

export default forwardRef(ProductColor);
