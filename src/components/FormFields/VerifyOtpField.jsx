import React, { useRef } from "react";
import { useController } from "react-hook-form";

export function VerifyOtpField({ name, control, rules, disabled = false }) {
  const {
    field: { value = "", onChange },
    fieldState: { invalid, error },
  } = useController({ name, control, rules });

  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, "").slice(-1); // chỉ 1 số
    const newValue = value.split("");
    newValue[index] = val;
    const joined = newValue.join("").padEnd(6, "");
    onChange(joined);

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newValue = value.split("");
      if (!value[index] && index > 0) {
        newValue[index - 1] = "";
        inputsRef.current[index - 1]?.focus();
      }
      newValue[index] = "";
      onChange(newValue.join("").padEnd(6, ""));
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (paste.length === 6) {
      onChange(paste);
      paste.split("").forEach((char, i) => {
        inputsRef.current[i].value = char;
      });
      inputsRef.current[5]?.focus();
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex justify-between gap-2">
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[i] || ""}
            disabled={disabled}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
            className={`w-12 h-12 text-center border rounded-md text-xl font-medium
              text-gray-900 focus:outline-none focus:ring-2 transition
              ${
                invalid
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
          />
        ))}
      </div>

      {invalid && (
        <p className="text-sm text-red-600" role="alert">
          {error?.message}
        </p>
      )}
    </div>
  );
}
