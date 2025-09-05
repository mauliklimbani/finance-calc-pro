import React from "react";
import NumberField from "./NumberField";

export default function PercentField({ 
  label, 
  value, 
  onChange, 
  required,
  min = 0,
  max = 100,
  step = 0.1,
  className = ""
}) {
  return (
    <NumberField
      label={label}
      value={value}
      onChange={onChange}
      suffix="%"
      placeholder="0.00"
      required={required}
      min={min}
      max={max}
      step={step}
      className={className}
    />
  );
}