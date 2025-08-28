import React from "react";
import { useController } from "react-hook-form";

export function TimeField({
  label,
  name,
  control,
  rules,
  defaultValue,
  placeholder = "Chọn giờ",
  disabled = false,
  ...rest
}) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, control, rules, defaultValue });

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-gray-800">
          {label}
        </label>
      )}

      <input
        id={name}
        {...field}
        {...rest}
        type="time"
        disabled={disabled}
        placeholder={placeholder}
        className={`border rounded-md px-3 py-2 text-gray-900
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition
          ${
            invalid
              ? "border-red-600 focus:ring-red-600 focus:border-red-600"
              : "border-gray-300"
          }
        `}
      />

      {invalid && (
        <p className="text-xs text-red-600" role="alert">
          {error?.message}
        </p>
      )}
    </div>
  );
}
