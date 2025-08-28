import React from "react";
import { FiChevronDown } from "react-icons/fi";

export const SortField = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Chọn...",
  name,
  disabled = false,
  error,
  className = "",
}) => {
  return (
    <div className="flex flex-col gap-1 w-full relative">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        className={`appearance-none border px-3 py-2 pr-8 rounded-md text-sm transition focus:outline-none ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        } ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <FiChevronDown
        size={16}
        className="absolute right-3 top-[12px] text-gray-500 pointer-events-none"
      />

      {error && (
        <p className="text-xs text-red-600 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
