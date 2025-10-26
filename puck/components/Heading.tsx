// puck/components/Heading.tsx
import React from 'react';
import { HeadingProps } from '../types';

export const Heading = ({
  text = "Your Heading Here",
  level = 'h2',
  size = 'auto',
  color = '#111827',
  fontWeight = 'bold',
  fontStyle = 'normal',
  alignment = 'left',
  paddingTop = 0,
  paddingBottom = 0,
  marginBottom = 16
}: HeadingProps) => {
  const sizeMap: Record<string, string> = {
    'auto': '',
    'xs': 'text-xs',
    'sm': 'text-sm',
    'base': 'text-base',
    'lg': 'text-lg',
    'xl': 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl'
  };

  const defaultSizeMap: Record<string, string> = {
    'h1': 'text-4xl md:text-6xl',
    'h2': 'text-3xl md:text-5xl',
    'h3': 'text-2xl md:text-4xl',
    'h4': 'text-xl md:text-3xl',
    'h5': 'text-lg md:text-2xl',
    'h6': 'text-base md:text-xl'
  };

  const fontWeightMap: Record<string, string> = {
    'normal': 'font-normal',
    'medium': 'font-medium',
    'semibold': 'font-semibold',
    'bold': 'font-bold',
    'extrabold': 'font-extrabold'
  };

  const fontStyleMap: Record<string, string> = {
    'normal': 'not-italic',
    'italic': 'italic'
  };

  const alignmentMap: Record<string, string> = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right'
  };

  const Tag: any = level;
  const fontSize = size === 'auto' ? defaultSizeMap[level] : sizeMap[size];

  return (
    <div
      style={{
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
        marginBottom: `${marginBottom}px`
      }}
    >
      <Tag 
        className={`
          ${fontSize}
          ${fontWeightMap[fontWeight]}
          ${fontStyleMap[fontStyle]}
          ${alignmentMap[alignment]}
        `.trim().replace(/\s+/g, ' ')}
        style={{
          color: color,
          margin: 0
        }}
      >
        {text}
      </Tag>
    </div>
  );
};