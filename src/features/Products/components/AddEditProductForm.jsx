import { InputField } from '@/components/FormFields/InputField'
import { MultiUploadField } from '@/components/FormFields/MultiUploadField'
import { NumberField } from '@/components/FormFields/NumberField'
import { SelectField } from '@/components/FormFields/SelectField'
import { TextareaField } from '@/components/FormFields/TextareaField'
import { categoryStore } from '@/store/categoryStore'
import { FormProvider, useForm } from 'react-hook-form'

export const AddEditProductForm = ({ data, loading, onSubmit }) => {
  const methods = useForm({
    defaultValues: data
      ? {
          ...data,
          images: {
            data: data.images || [],
            removeList: [],
          },
          category: data.category._id,
        }
      : {
          code: '',
          name: '',
          price: 0,
          category: '',
          content: '',
          images: {
            data: [],
            removeList: [],
          },
        },
  })

  const { control, handleSubmit } = methods
  const categoryList = categoryStore((state) => state.categoryList)

  const handleFormSubmit = handleSubmit((values) => {
    console.log({ values })
    const form = new FormData()

    Object.entries(values).forEach(([key, val]) => {
      if (key !== 'images') {
        form.append(key, val)
      }
    })

    values.images.data.forEach((img) => {
      if (img instanceof File) {
        form.append('images', img)
      }
    })

    if (values.images.removeList?.length > 0) {
      form.append('removeImages', JSON.stringify(values.images.removeList))
    }

    onSubmit?.(form)
  })

  return (
    <FormProvider {...methods}>
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
            categoryList.map((item) => ({
              label: item.name,
              value: item._id,
            }))
          }
        />
        <TextareaField control={control} name="content" label="Mô tả" />

        <MultiUploadField name="images" control={control} />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Đang lưu...' : 'Lưu sản phẩm'}
          </button>
        </div>
      </form>
    </FormProvider>
  )
}
