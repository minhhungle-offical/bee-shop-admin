import { FiSearch, FiX } from "react-icons/fi";
import { useMemo } from "react";
import { debounce } from "lodash";

export const SearchInput = ({
  value,
  onChange,
  onClear,
  placeholder = "Tìm kiếm...",
  delay = 400,
}) => {
  const debouncedOnChange = useMemo(() => {
    return debounce((val) => onChange?.(val), delay);
  }, [onChange, delay]);

  const handleChange = (e) => {
    const val = e.target.value;
    debouncedOnChange(val);
  };

  return (
    <div className="relative w-full">
      <span className="absolute left-3 top-[70%]  -translate-y-1/2 text-gray-400">
        <FiSearch size={18} />
      </span>

      <input
        type="text"
        defaultValue={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm"
      />

      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-[70%] -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <FiX size={16} />
        </button>
      )}
    </div>
  );
};
