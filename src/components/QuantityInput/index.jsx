import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import styled from "styled-components";
const InputNumberStyle = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  /* -moz-appearance: textfield; */
`;

const QuantityInput = (
  {
    className,
    defaultValue = 1,
    min = 1,
    max = 10,
    step = 1,
    onChange,
    ...inputProps
  },
  ref
) => {
  const [currentQuantity, setCurrentQuantity] = useState(defaultValue);
  useImperativeHandle(ref, () => {
    return {
      value: currentQuantity,
      reset: () => {
        setCurrentQuantity(defaultValue);
      },
    };
  });
  useEffect(() => {
    onChange?.(currentQuantity);
  }, [currentQuantity]);

  const _modifyValue = (value) => {
    if (value > max) return max;
    else if (value < min) return min;
    else return value;
  };

  const _onInputChange = (e) => {
    setCurrentQuantity(
      e.target.value !== "" ? _modifyValue(Number(e.target.value)) : ""
    );
  };

  const _onBlurInput = () => {
    if (currentQuantity === "") setCurrentQuantity(defaultValue);
  };

  const _onIncrease = () => {
    const value = _modifyValue(Number(currentQuantity) + Number(step));
    setCurrentQuantity(value);
  };
  const _onDecrease = () => {
    const value = _modifyValue(Number(currentQuantity) - Number(step));
    setCurrentQuantity(value);
  };

  return (
    <div className={className}>
      <div className="input-group input-spinner">
        <div className="input-group-prepend">
          <button
            className="btn btn-decrement btn-spinner"
            onClick={_onDecrease}
          >
            <i className="icon-minus"></i>
          </button>
        </div>
        <InputNumberStyle
          type="number"
          style={{ textAlign: "center" }}
          className="form-control"
          defaultValue={defaultValue}
          max={max}
          value={currentQuantity}
          onChange={(e) => _onInputChange(e)}
          onBlur={_onBlurInput}
          {...inputProps}
        />
        <div className="input-group-append">
          <button
            style={{ minWidth: "26" }}
            className="btn btn-increment btn-spinner"
            onClick={_onIncrease}
          >
            <i className="icon-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(QuantityInput);
