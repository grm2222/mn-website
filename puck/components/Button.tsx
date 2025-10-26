// puck/components/Button.tsx
import React from 'react';
import { ButtonProps } from '../types';

export const Button = ({
  text = "Click Here",
  link = '#',
  variant = 'primary',
  size = 'md',
  alignment = 'left',
  fullWidth = false
}: ButtonProps) => {
  const variantMap: Record<string, string> = {
    'primary': 'bg-blue-600 hover:bg-blue-700 text-white',
    'secondary': 'bg-gray-600 hover:bg-gray-700 text-white',
    'outline': 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
    'outline-cyan': 'border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white',
    'ghost': 'text-blue-600 hover:bg-blue-50',
    'success': 'bg-green-600 hover:bg-green-700 text-white',
    'warning': 'bg-orange-600 hover:bg-orange-700 text-white'
  };

  const sizeMap: Record<string, string> = {
    'sm': 'px-4 py-2 text-sm',
    'md': 'px-6 py-3 text-base',
    'lg': 'px-8 py-4 text-lg'
  };

  const alignmentMap: Record<string, string> = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right'
  };

  return (
    <div className={alignmentMap[alignment]}>
      <a
        href={link}
        className={`
          inline-block rounded-lg font-semibold transition-colors
          ${variantMap[variant]}
          ${sizeMap[size]}
          ${fullWidth ? 'w-full text-center' : ''}
        `.trim().replace(/\s+/g, ' ')}
      >
        {text}
      </a>
    </div>
  );
};