import React from 'react'
import { useController } from 'react-hook-form'

export function TextareaField({
  label,
  name,
  control,
  rules,
  defaultValue,
  placeholder,
  disabled = false,
  rows = 5,
  ...rest
}) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, control, rules, defaultValue })

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-gray-800">
          {label}
        </label>
      )}

      <textarea
        id={name}
        {...field}
        {...rest}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        className={`border rounded-md px-3 py-2 text-gray-900 resize-none
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition whitespace-pre-wrap
          ${invalid ? 'border-red-600 focus:ring-red-600 focus:border-red-600' : 'border-gray-300'}
        `}
      />

      {invalid && (
        <p className="text-xs text-red-600" role="alert">
          {error?.message}
        </p>
      )}
    </div>
  )
}
