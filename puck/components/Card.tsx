// puck/components/Card.tsx
import React from 'react';
import { DropZone } from "@measured/puck";
import { CardProps } from '../types';
import { colorMap } from '../maps';

export const Card = ({
  backgroundColor = 'white',
  padding = 'md',
  borderRadius = 'lg',
  shadow = 'md',
  border = false,
  borderColor = 'gray-200',
  puck
}: CardProps) => {
  const paddingMap: Record<string, string> = {
    'none': 'p-0',
    'sm': 'p-4',
    'md': 'p-6',
    'lg': 'p-8',
    'xl': 'p-12'
  };

  const borderRadiusMap: Record<string, string> = {
    'none': 'rounded-none',
    'sm': 'rounded',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'xl': 'rounded-xl',
    '2xl': 'rounded-2xl'
  };

  const shadowMap: Record<string, string> = {
    'none': 'shadow-none',
    'sm': 'shadow-sm',
    'md': 'shadow-md',
    'lg': 'shadow-lg',
    'xl': 'shadow-xl'
  };

  const borderColorMap: Record<string, string> = {
    'gray-200': 'border-gray-200',
    'gray-300': 'border-gray-300',
    'blue-200': 'border-blue-200',
    'cyan-200': 'border-cyan-200'
  };

  return (
    <div className={`
      ${colorMap[backgroundColor]}
      ${paddingMap[padding]}
      ${borderRadiusMap[borderRadius]}
      ${shadowMap[shadow]}
      ${border ? `border-2 ${borderColorMap[borderColor]}` : ''}
    `}>
      <DropZone zone="card-content" />
    </div>
  );
};