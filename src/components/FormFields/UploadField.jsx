import { useController } from "react-hook-form";
import { useEffect, useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

export function UploadField({
  name,
  control,
  label = "Upload hình ảnh",
  aspectRatio = "16/9",
  disabled = false,
}) {
  const [preview, setPreview] = useState("");

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return toast.error("Không tìm thấy file");

    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
    onChange(file);
  };

  useEffect(() => {
    if (!preview && value?.url) {
      setPreview(value.url);
    }
  }, [value, preview]);

  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-gray-800">
          {label}
        </label>
      )}

      <label
        className={`w-full relative rounded-md overflow-hidden bg-gray-100 border flex items-center justify-center cursor-pointer hover:bg-gray-200 ${
          error ? "border-red-500" : "border-gray-300"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        style={{ aspectRatio }}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="preview"
              className="object-cover w-full h-full"
            />
          </>
        ) : (
          <FiUploadCloud className="text-gray-400" size={48} />
        )}
        {!disabled && (
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        )}
      </label>

      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}
