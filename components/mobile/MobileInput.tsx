'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface MobileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const MobileInput = forwardRef<HTMLInputElement, MobileInputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full
              min-h-[48px]
              ${icon ? 'pl-12' : 'pl-4'}
              pr-4
              text-base
              bg-gray-800/50
              border border-gray-700
              rounded-2xl
              text-white
              placeholder-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-purple-500
              focus:border-transparent
              transition-all
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-400 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

MobileInput.displayName = 'MobileInput';

export default MobileInput;
