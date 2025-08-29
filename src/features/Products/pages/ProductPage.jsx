import { useState } from "react";
import { Plus } from "lucide-react";
import Dialog from "@/components/Common/Dialog";
import { AddEditProductForm } from "../components/AddEditProductForm";

export default function ProductPage() {
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [pending] = useState(false);
  const [removeItem, setRemoveItem] = useState(false);

  const handleClose = () => {
    setShowAddEdit(false);
    setSelectedItem(null);
    setRemoveItem(null);
  };

  const handleCreate = () => {
    setShowAddEdit(true);
    setSelectedItem(null);
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

      <Dialog open={showAddEdit} onClose={handleClose}>
        <h2 className="text-xl font-semibold mb-4">
          {selectedItem ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
        </h2>
        <div>
          <AddEditProductForm data={selectedItem} loading={pending} />
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
              //   onClick={() => handleRemove(removeItem._id)}
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
