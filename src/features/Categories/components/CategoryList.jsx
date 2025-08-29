import { Edit, Trash2 } from "lucide-react";

export const CategoryList = ({ loading, data, onEdit, onRemove }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-2 py-2 text-center w-16">
            #
          </th>
          <th className="border border-gray-300 px-2 py-2 text-center w-24">
            Hình ảnh
          </th>
          <th className="border border-gray-300 px-4 py-2 text-left">
            Tên danh mục
          </th>
          <th className="border border-gray-300 px-4 py-2 text-left">
            Đường dẫn
          </th>
          <th className="border border-gray-300 px-2 py-2 text-center w-28">
            Thao tác
          </th>
        </tr>
      </thead>

      <tbody>
        {loading ? (
          <tr>
            <td
              colSpan={5}
              className="text-center border border-gray-300 px-4 py-4 text-gray-500"
            >
              Đang tải dữ liệu...
            </td>
          </tr>
        ) : data?.length > 0 ? (
          data.map((item, index) => (
            <tr key={item.id || index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-2 py-2 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-300 px-2 py-2">
                <div className="flex justify-center w-full">
                  {item.image?.url && (
                    <img
                      src={item.image.url}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.slug}</td>
              <td className="border border-gray-300 px-2 py-2 text-center">
                <button
                  className="inline-flex items-center justify-center px-2 py-1 text-sm text-green-600  rounded hover:text-green-700 cursor-pointer"
                  onClick={() => onEdit?.(item)}
                >
                  <Edit size={16} />
                </button>
                <button
                  className="ml-2 inline-flex items-center justify-center px-2 py-1 text-sm text-red-500  rounded hover:text-red-600 cursor-pointer"
                  onClick={() => onRemove?.(item)}
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={5}
              className="text-center border border-gray-300 px-4 py-4 text-gray-500"
            >
              Không có dữ liệu
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
