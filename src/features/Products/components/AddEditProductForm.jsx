import { InputField } from "@/components/FormFields/InputField";
import { MultiUploadField } from "@/components/FormFields/MultiUploadField";
import { NumberField } from "@/components/FormFields/NumberField";
import { SelectField } from "@/components/FormFields/SelectField";
import { TextareaField } from "@/components/FormFields/TextareaField";
import { categoryStore } from "@/store/categoryStore";
import { useForm } from "react-hook-form";

export const AddEditProductForm = ({ data, loading, onSubmit }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: data || {
      code: "",
      name: "",
      price: 0,
      category: "",
      images: [],
    },
  });

  const categoryList = categoryStore((state) => state.categoryList);

  const handleFormSubmit = handleSubmit(() => {
    const form = new FormData();
    onSubmit(form);
  });

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <InputField control={control} name="code" label="Mã sản phẩm" />
      <InputField control={control} name="name" label="Tên sản phẩm" />
      <NumberField control={control} name="price" label="Giá" />

      <SelectField
        control={control}
        name="category"
        label="Loại sản phẩm"
        options={
          Array.isArray(categoryList) &&
          categoryList.length > 0 &&
          categoryList.map((item) => ({
            label: item.name,
            value: item._id,
          }))
        }
      />
      <TextareaField control={control} name="content" label="Mô tả" />

      <div>
        <MultiUploadField name="images" control={control} />
      </div>

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
