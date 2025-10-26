// puck/components/Container.tsx
import React from 'react';
import { DropZone } from "@measured/puck";
import { ContainerProps } from '../types';
import { maxWidthMap, paddingXMap } from '../maps';

export const Container = ({
  maxWidth = 'xl',
  paddingX = 'md',
  puck
}: ContainerProps) => {
  return (
    <div className={`${maxWidthMap[maxWidth]} mx-auto ${paddingXMap[paddingX]}`}>
      <DropZone zone="container-content" />
    </div>
  );
};