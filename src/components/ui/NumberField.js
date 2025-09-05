import React from "react";
import { Input } from "./input";
import { Label } from "./label";

export default function NumberField({
  label,
  value,
  onChange,
  placeholder,
  suffix,
  prefix,
  required,
  min = 0,
  max,
  step = 1,
  className = ""
}) {
  const handleChange = (e) => {
    const val = parseFloat(e.target.value) || 0;
    onChange(val);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
        {label}
        {required && <span className="text-red-500 text-xs">*</span>}
      </Label>
      <div className="relative group">
        {prefix && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-semibold text-lg z-10">
            {prefix}
          </div>
        )}
        <Input
          type="number"
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`
            h-12 text-base font-medium text-slate-800 border-gray-200 bg-white/80 backdrop-blur-sm
              transition-all duration-300
              hover:border-gray-300 hover:shadow-sm
            ${prefix ? 'pl-10' : ''}
            ${suffix ? 'pr-12' : ''}
          `}
        />
        {suffix && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 font-semibold text-sm z-10">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
}