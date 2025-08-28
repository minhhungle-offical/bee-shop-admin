import React, { useState } from "react";
import { useController } from "react-hook-form";

export function MultiSelectField({
  label,
  name,
  control,
  rules,
  options = [],
  className = "",
}) {
  const {
    field: { onChange, value = [] },
    fieldState: { invalid, error },
  } = useController({ name, control, rules });

  const [isOpen, setIsOpen] = useState(false);

  const toggleSelect = (val) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const removeTag = (val) => {
    onChange(value.filter((v) => v !== val));
  };

  const selectedLabels = options
    .filter((opt) => value.includes(opt.value))
    .map((opt) => opt.label);
  console.log("value: ", value);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-800">{label}</label>
      )}

      <div className="border rounded-md px-3 py-2 bg-white relative">
        <div className="flex flex-wrap gap-2 mb-2 min-h-[36px]">
          {selectedLabels.length > 0 ? (
            selectedLabels.map((label, idx) => (
              <span
                key={idx}
                className="flex items-center bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full"
              >
                {label}
                <button
                  type="button"
                  className="ml-1 text-red-500 hover:text-red-700"
                  onClick={() =>
                    removeTag(options.find((o) => o.label === label)?.value)
                  }
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-400">Chưa chọn thẻ nào</span>
          )}
        </div>

        <button
          type="button"
          className="text-sm text-blue-500 hover:underline"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Ẩn danh sách thẻ" : "Thêm thẻ..."}
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-2 bg-white border rounded-md shadow w-full max-h-48 overflow-y-auto">
            {options.map((opt) => (
              <div
                key={opt.value}
                className={`px-3 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
                  value.includes(opt.value)
                    ? "bg-blue-500/10 font-semibold text-blue-500"
                    : ""
                }`}
                onClick={() => toggleSelect(opt.value)}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {invalid && (
        <p className="text-xs text-red-600 mt-1" role="alert">
          {error?.message}
        </p>
      )}
    </div>
  );
}
