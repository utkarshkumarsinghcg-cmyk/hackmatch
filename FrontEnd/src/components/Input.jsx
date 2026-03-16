import React from 'react';

const Input = ({ 
  label, 
  id, 
  type = 'text', 
  error, 
  className = '', 
  placeholder,
  required = false,
  ...props 
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`px-4 py-2.5 bg-white dark:bg-gray-800 border ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'} rounded-lg transition-all focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed dark:text-white`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
