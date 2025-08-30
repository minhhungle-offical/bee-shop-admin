import Pagination from '@/components/Common/Pagination'
import { Edit, Trash2 } from 'lucide-react'

const headers = [
  {
    label: '#',
    className: 'text-center w-16',
    render: (item, index) => index + 1,
  },

  {
    label: 'Hình ảnh',
    className: 'text-center w-32',
    render: (item) =>
      item.images?.[0]?.url ? (
        <img
          src={item.images[0].url}
          alt={item.name}
          className="w-32 h-16 object-cover rounded mx-auto"
        />
      ) : null,
  },
  {
    label: 'Mã sp',
    className: 'text-left',
    render: (item) => item.code,
  },
  {
    label: 'Tên sản phẩm',
    className: 'text-left',
    render: (item) => item.name,
  },
  {
    label: 'Loại sản phẩm',
    className: 'text-left',
    render: (item) => item.category?.name,
  },
  {
    label: 'Mã / Slug',
    className: 'text-left',
    render: (item) => item.slug,
  },
  {
    label: 'Giá',
    className: 'text-right w-32',
    render: (item) => `${item.price?.toLocaleString('vi-VN')} đ`,
  },
  {
    label: 'Thao tác',
    className: 'text-center w-28',
    render: (item, index, onEdit, onRemove) => (
      <>
        <button
          className="inline-flex items-center justify-center px-2 py-1 text-sm text-green-600 hover:text-green-700 cursor-pointer"
          onClick={() => onEdit?.(item)}
        >
          <Edit size={16} />
        </button>
        <button
          className="ml-2 inline-flex items-center justify-center px-2 py-1 text-sm text-red-500 hover:text-red-600 cursor-pointer"
          onClick={() => onRemove?.(item)}
        >
          <Trash2 size={16} />
        </button>
      </>
    ),
  },
]

export const ProductList = ({
  loading,
  data,
  filter,
  pagination,
  onEdit,
  onRemove,
  onFilterChange,
}) => {
  const handlePageChange = (page) => {
    onFilterChange?.({
      ...filter,
      page,
    })
  }

  return (
    <>
      <table className="w-full border-collapse border border-gray-300 shadow-xl rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((h, i) => (
              <th key={i} className={`border border-gray-300 px-4 py-2 ${h.className}`}>
                {h.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center border border-gray-300 px-4 py-4 text-gray-500"
              >
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : data?.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id || index} className="bg-white hover:bg-gray-50">
                {headers.map((h, i) => (
                  <td key={i} className={`border border-gray-300 px-4 py-2 ${h.className}`}>
                    {h.render(item, index, onEdit, onRemove)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center border border-gray-300 px-4 py-4 text-gray-500"
              >
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        page={filter?.page}
        limit={filter?.limit}
        total={pagination?.total}
        totalPages={pagination?.totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}
