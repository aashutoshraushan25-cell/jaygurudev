import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 py-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-50 hover:border-orange-300 transition-colors shadow-sm font-bold flex items-center gap-1"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="hidden sm:inline text-sm">पिछला</span>
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-10 h-10 rounded-xl font-extrabold text-base transition-all shadow-sm ${
            p === currentPage
              ? 'bg-orange-600 text-white shadow-md'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-orange-50 hover:border-orange-300'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-50 hover:border-orange-300 transition-colors shadow-sm font-bold flex items-center gap-1"
      >
        <span className="hidden sm:inline text-sm">अगला</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
