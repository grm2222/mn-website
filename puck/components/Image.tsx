// puck/components/Image.tsx
import React from 'react';
import { ImageProps } from '../types';
import Image from 'next/image';

export const ImageComponent = ({
  src = "",
  alt = "Image",
  width = "full",
  height = "auto",
  alignment = "center",
  objectFit = "cover",
  borderRadius = "lg",
  caption = ""
}: ImageProps) => {
  const widthMap: Record<string, string> = {
    'full': 'w-full',
    '3/4': 'w-3/4',
    '2/3': 'w-2/3',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
    '1/4': 'w-1/4',
    'small': 'w-[200px]',
    'medium': 'w-[400px]',
    'large': 'w-[600px]'
  };

  const heightMap: Record<string, string> = {
    'auto': 'h-auto',
    'small': 'h-[200px]',
    'medium': 'h-[400px]',
    'large': 'h-[600px]',
    '48': 'h-12',
    '64': 'h-16',
    '96': 'h-24',
    '128': 'h-32'
  };

  const alignmentMap: Record<string, string> = {
    'left': 'mr-auto',
    'center': 'mx-auto',
    'right': 'ml-auto'
  };

  const objectFitMap: Record<string, string> = {
    'cover': 'object-cover',
    'contain': 'object-contain',
    'fill': 'object-fill',
    'none': 'object-none'
  };

  const borderRadiusMap: Record<string, string> = {
    'none': 'rounded-none',
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'xl': 'rounded-xl',
    'full': 'rounded-full'
  };

  if (!src) {
    return (
      <div className={`
        ${widthMap[width]}
        ${heightMap[height]}
        ${alignmentMap[alignment]}
        ${borderRadiusMap[borderRadius]}
        bg-gray-200 flex items-center justify-center text-gray-500
      `}>
        No image uploaded
      </div>
    );
  }

  return (
    <div className="w-full flex" style={{ justifyContent: alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start' }}>
      <div className={`${widthMap[width]} ${heightMap[height]} relative ${borderRadiusMap[borderRadius]} overflow-hidden`}>
        <Image
          src={src}
          alt={alt}
          fill={height === 'auto' ? false : true}
          width={height === 'auto' ? 1000 : undefined}
          height={height === 'auto' ? 1000 : undefined}
          className={`${objectFitMap[objectFit]} ${height === 'auto' ? 'w-full h-auto' : 'w-full h-full'}`}
          unoptimized
        />
      </div>
      {caption && (
        <p className={`text-sm text-gray-600 mt-2 w-full ${alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left'}`}>
          {caption}
        </p>
      )}
    </div>
  );
};