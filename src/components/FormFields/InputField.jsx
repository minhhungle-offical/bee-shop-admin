import React from "react";
import { useController } from "react-hook-form";

export function InputField({
  label,
  name,
  control,
  rules,
  defaultValue,
  placeholder,
  disabled = false,
  type = "text",
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
        type={type}
        placeholder={placeholder}
        disabled={disabled}
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
