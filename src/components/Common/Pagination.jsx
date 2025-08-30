import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

export default function Pagination({ page = 1, totalPage, total, limit = 10, onPageChange }) {
  const totalPages = totalPage || Math.ceil(total / limit)

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1)
  }

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1)
  }

  const renderPages = () => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, page - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 rounded transition-colors duration-200 cursor-pointer
            ${
              i === page
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
            }
          `}
        >
          {i}
        </button>,
      )
    }

    return pages
  }

  return (
    <div className="flex items-center justify-end space-x-2 mt-4">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="px-3 py-1 rounded bg-gray-300 text-gray-700 disabled:opacity-50 cursor-pointer hover:bg-gray-400 transition-colors flex items-center"
      >
        <ChevronLeft size={16} /> <span>Prew</span>
      </button>

      {renderPages()}

      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="px-3 py-1 rounded bg-gray-300 text-gray-700 disabled:opacity-50 cursor-pointer hover:bg-gray-400 transition-colors flex items-center"
      >
        <span>Next</span> <ChevronRight size={16} />
      </button>
    </div>
  )
}
