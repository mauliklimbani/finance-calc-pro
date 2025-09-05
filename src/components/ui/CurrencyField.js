import React from "react";
import { formatIndianNumber } from "../lib/format";
import NumberField from "./NumberField";

export default function CurrencyField({ 
  label, 
  value, 
  onChange, 
  currency = "INR", 
  required,
  className = ""
}) {
  const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£'
  };

  const formatValue = (val) => {
    if (!val) return '';
    return currency === 'INR' ? formatIndianNumber(val) : val.toLocaleString();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <NumberField
        label={label}
        value={value}
        onChange={onChange}
        prefix={currencySymbols[currency]}
        placeholder="0"
        required={required}
        min={0}
        className="w-full"
      />
      {value > 0 && (
        <p className="text-xs text-slate-500 font-medium pl-1">
          {currencySymbols[currency]}{formatValue(value)}
        </p>
      )}
    </div>
  );
}