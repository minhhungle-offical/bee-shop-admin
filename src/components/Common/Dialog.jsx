import { X } from "lucide-react";

export default function Dialog({
  open,
  onClose,
  children,
  maxWidth = "max-w-xl",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      <div
        className={`relative bg-white rounded-2xl shadow-lg w-full ${maxWidth} p-6 z-10`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <div>{children}</div>
      </div>
    </div>
  );
}
