import { useController } from "react-hook-form";
import { useEffect, useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

export function MultiUploadField({
  name,
  control,
  label = "Upload hình ảnh",
  aspectRatio = "16/9",
  maxFiles = 6,
  disabled = false,
}) {
  const [previews, setPreviews] = useState([]);

  const {
    field: { value = [], onChange },
    fieldState: { error },
  } = useController({ name, control });

  useEffect(() => {
    if (value.length && previews.length === 0) {
      const initialPreviews = value.map((v) =>
        typeof v === "string"
          ? { url: v, file: null }
          : { file: v, url: URL.createObjectURL(v) }
      );
      setPreviews(initialPreviews);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return toast.error("Không tìm thấy file");

    if (previews.length + files.length > maxFiles) {
      toast.error(`Chỉ được upload tối đa ${maxFiles} ảnh`);
      return;
    }

    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    const updatedPreviews = [...previews, ...newPreviews];
    setPreviews(updatedPreviews);
    onChange(updatedPreviews.map((p) => p.file || p.url));
  };

  const handleRemove = (index) => {
    const updatedPreviews = [...previews];
    updatedPreviews.splice(index, 1);
    setPreviews(updatedPreviews);
    onChange(updatedPreviews.map((p) => p.file || p.url));
  };

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-gray-800">
          {label}
        </label>
      )}
      <div className="grid grid-cols-3 gap-2">
        {previews.map((p, idx) => (
          <div
            key={idx}
            className={`relative rounded-md overflow-hidden border ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            style={{ aspectRatio }}
          >
            <img
              src={p.url}
              alt={`preview-${idx}`}
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="absolute top-1 right-1 bg-gray-800 bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75 cursor-pointer"
            >
              <FiX size={16} />
            </button>
          </div>
        ))}

        {previews.length < maxFiles && !disabled && (
          <label
            className={`flex items-center justify-center rounded-md overflow-hidden border border-gray-300 bg-gray-100 cursor-pointer hover:bg-gray-200`}
            style={{ aspectRatio }}
          >
            <FiUploadCloud className="text-gray-400" size={48} />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      {error && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
}
