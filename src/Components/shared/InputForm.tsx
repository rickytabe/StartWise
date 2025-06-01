import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  touched?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, touched, id, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={`mt-1 block w-full p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            error && touched ? 'border-red-500' : 'border-gray-300'
          }`}
          {...props}
        />
        {error && touched && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

export default Input;