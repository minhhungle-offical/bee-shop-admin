import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import Dialog from '@/components/Common/Dialog'
import { AddEditProductForm } from '../components/AddEditProductForm'
import { productApi } from '@/api/productApi'
import { toast } from 'react-toastify'
import { ProductList } from '../components/ProductList'

export default function ProductPage() {
  const [showAddEdit, setShowAddEdit] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
    totalPage: 0,
  })
  const [filter, SelectFilter] = useState({ page: 1, limit: 5 })
  const [pending, setPending] = useState(false)
  const [removeItem, setRemoveItem] = useState(false)
  const [productList, setProductList] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const { data, pagination } = await productApi.getAll(filter)
        setProductList(data)
        setPagination(pagination)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [filter])

  const handleClose = () => {
    setShowAddEdit(false)
    setSelectedItem(null)
    setRemoveItem(null)
  }

  const handleCreate = () => {
    setShowAddEdit(true)
    setSelectedItem(null)
  }

  const handleSubmit = async (formData) => {
    setPending(true)
    try {
      if (selectedItem) {
        await productApi.update(selectedItem._id, formData)
      } else await productApi.create(formData)

      handleClose()
    } catch (error) {
      console.error(error)
      toast.error(`${error}`)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="flex flex-col space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Danh mục sản phẩm</h2>
        <button
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          onClick={handleCreate}
        >
          <Plus className="w-4 h-4" />
          Thêm mới
        </button>
      </div>

      <div>
        <ProductList data={productList} />
      </div>

      <Dialog open={showAddEdit} onClose={handleClose}>
        <h2 className="text-xl font-semibold mb-4">
          {selectedItem ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}
        </h2>
        <div>
          <AddEditProductForm data={selectedItem} loading={pending} onSubmit={handleSubmit} />
        </div>
      </Dialog>

      <Dialog open={!!removeItem} onClose={handleClose}>
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Xác nhận xóa</h2>
          <p className="text-gray-600 mb-6">
            Bạn có chắc chắn muốn xóa danh mục{' '}
            <span className="font-medium text-red-600">{removeItem?.name}</span>?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              //   onClick={() => handleRemove(removeItem._id)}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
