import { Plus } from "lucide-react";
import { CategoryList } from "../components/CategoryList";
import { useEffect, useState } from "react";
import { AddEditCategoryForm } from "../components/AddEditCategoryForm";
import Dialog from "@/components/Common/Dialog";
import { categoryApi } from "@/api/categoryApi";
import { categoryStore } from "@/store/categoryStore";

export default function CategoryPage() {
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [removeItem, setRemoveItem] = useState(false);

  const categoryList = categoryStore((state) => state.categoryList);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await categoryApi.getAll();
      categoryStore.getState().setCategoryList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClose = () => {
    setShowAddEdit(false);
    setSelectedItem(null);
    setRemoveItem(null);
  };

  const handleCreate = () => {
    setShowAddEdit(true);
    setSelectedItem(null);
  };

  const handleEdit = (data) => {
    setShowAddEdit(true);
    setSelectedItem(data);
  };

  const handleSubmit = async (data) => {
    setPending(true);
    try {
      if (selectedItem) {
        await categoryApi.update(selectedItem._id, data);
      } else await categoryApi.create(data);

      fetchData();
      handleClose();
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  const handleRemove = async (id) => {
    setPending(true);
    try {
      await categoryApi.remove(id);
      fetchData();
      handleClose();
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  };

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

      <div className="shadow-xl bg-white">
        <CategoryList
          data={categoryList}
          loading={loading}
          onEdit={handleEdit}
          onRemove={(item) => setRemoveItem(item)}
        />
      </div>

      <Dialog open={showAddEdit} onClose={handleClose}>
        <h2 className="text-xl font-semibold mb-4">
          {selectedItem ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
        </h2>
        <div>
          <AddEditCategoryForm
            loading={pending}
            data={selectedItem}
            onSubmit={handleSubmit}
          />
        </div>
      </Dialog>

      <Dialog open={!!removeItem} onClose={handleClose}>
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Xác nhận xóa</h2>
          <p className="text-gray-600 mb-6">
            Bạn có chắc chắn muốn xóa danh mục{" "}
            <span className="font-medium text-red-600">{removeItem?.name}</span>
            ?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              onClick={() => handleRemove(removeItem._id)}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
