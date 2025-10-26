// puck/components/Spacer.tsx
import React from 'react';
import { SpacerProps } from '../types';

export const Spacer = ({ height = 'md' }: SpacerProps) => {
  const heightMap: Record<string, string> = {
    'xs': 'h-4',
    'sm': 'h-8',
    'md': 'h-16',
    'lg': 'h-24',
    'xl': 'h-32'
  };

  return <div className={heightMap[height] || 'h-16'} />;
};