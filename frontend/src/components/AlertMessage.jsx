import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

export const AlertMessage = ({ type = 'info', message, onClose }) => {
  if (!message) return null;

  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    error: 'bg-red-50 border-red-200 text-red-900',
  };

  const icons = {
    info: <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />,
    success: <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
    error: <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />,
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border font-bold text-sm sm:text-base my-3 shadow-sm ${
        styles[type] || styles.info
      }`}
    >
      <div className="flex items-center gap-3">
        {icons[type]}
        <span>{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 font-bold text-lg leading-none ml-4"
        >
          &times;
        </button>
      )}
    </div>
  );
};
