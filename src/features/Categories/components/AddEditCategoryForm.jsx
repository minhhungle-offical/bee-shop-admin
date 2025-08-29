import { InputField } from "@/components/FormFields/InputField";
import { UploadField } from "@/components/FormFields/UploadField";
import { useForm } from "react-hook-form";

export const AddEditCategoryForm = ({ loading, data, onSubmit }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: data || {
      name: "",
      image: null,
    },
  });

  const handleFormSubmit = handleSubmit((formData) => {
    const form = new FormData();

    form.append("name", formData.name);

    if (formData.image instanceof File) {
      form.append("image", formData.image);
    }

    onSubmit(form);
  });

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div className="w-1/3">
        <UploadField name="image" control={control} label="Hình danh mục" />
      </div>
      <InputField name="name" control={control} label="Tên danh mục" />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Đang lưu..." : "Lưu danh mục"}
        </button>
      </div>
    </form>
  );
};
