// puck/components/Columns.tsx
import React from 'react';
import { DropZone } from "@measured/puck";
import { ColumnsProps } from '../types';
import { columnLayoutMap, gapMap } from '../maps';

export const Columns = ({
  layout = '2',
  gap = 'md',
  verticalAlign = 'stretch',
  reverseOnMobile = false,
  puck
}: ColumnsProps) => {
  const verticalAlignMap: Record<string, string> = {
    'stretch': 'items-stretch',
    'start': 'items-start',
    'center': 'items-center',
    'end': 'items-end'
  };

  const getGridClasses = () => {
    if (layout === '1/3-2/3') return 'grid-cols-1 md:grid-cols-3';
    if (layout === '2/3-1/3') return 'grid-cols-1 md:grid-cols-3';
    if (layout === '1/4-3/4') return 'grid-cols-1 md:grid-cols-4';
    if (layout === '3/4-1/4') return 'grid-cols-1 md:grid-cols-4';
    return columnLayoutMap[layout] || 'grid-cols-1 md:grid-cols-2';
  };

  const getColumnSpan = (index: number) => {
    if (layout === '1/3-2/3') return index === 0 ? 'md:col-span-1' : 'md:col-span-2';
    if (layout === '2/3-1/3') return index === 0 ? 'md:col-span-2' : 'md:col-span-1';
    if (layout === '1/4-3/4') return index === 0 ? 'md:col-span-1' : 'md:col-span-3';
    if (layout === '3/4-1/4') return index === 0 ? 'md:col-span-3' : 'md:col-span-1';
    return '';
  };

  const numColumns = layout === '1/3-2/3' || layout === '2/3-1/3' || layout === '1/4-3/4' || layout === '3/4-1/4' 
    ? 2 
    : parseInt(layout) || 2;

  return (
    <div className={`grid ${getGridClasses()} ${gapMap[gap]} ${verticalAlignMap[verticalAlign]} ${reverseOnMobile ? 'flex-col-reverse md:flex-row' : ''}`}>
      {Array.from({ length: numColumns }).map((_, index) => (
        <div key={index} className={getColumnSpan(index)}>
          <DropZone zone={`column-${index}`} />
        </div>
      ))}
    </div>
  );
};