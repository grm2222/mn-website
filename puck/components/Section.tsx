// puck/components/Section.tsx
import React from 'react';
import { DropZone } from "@measured/puck";
import { SectionProps } from '../types';
import { heightMap, paddingYMap, paddingXMap, maxWidthMap, colorMap } from '../maps';

export const Section = ({
  backgroundImage,
  backgroundColor = 'transparent',
  overlayColor = 'black',
  overlayOpacity = 0.4,
  blurAmount = 0,
  minHeight = 'auto',
  paddingY = 'md',
  paddingX = 'md',
  maxWidth = 'xl',
  verticalAlign = 'center',
  puck
}: SectionProps) => {
  const backgroundStyle = backgroundImage 
    ? { 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }
    : {};

  const verticalAlignMap: Record<string, string> = {
    'top': 'items-start',
    'center': 'items-center',
    'bottom': 'items-end'
  };

  // Handle background color - support both hex colors and transparent
  const bgStyle = backgroundColor && backgroundColor !== 'transparent' 
    ? { backgroundColor } 
    : {};

  return (
    <section 
      className={`relative ${heightMap[minHeight]} ${paddingYMap[paddingY]} ${paddingXMap[paddingX]} flex ${verticalAlignMap[verticalAlign]} overflow-hidden`}
      style={bgStyle}
    >
      {/* Background Image with Blur */}
      {backgroundImage && (
        <div 
          className="absolute inset-0"
          style={{
            ...backgroundStyle,
            filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none',
            transform: blurAmount > 0 ? 'scale(1.1)' : 'scale(1)' // Prevent blur edge artifacts
          }}
        />
      )}
      
      {/* Overlay */}
      {backgroundImage && overlayOpacity > 0 && (
        <div 
          className={`absolute inset-0 ${overlayColor === 'black' ? 'bg-black' : 'bg-white'}`}
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      {/* Content */}
      <div className={`relative z-10 w-full ${maxWidthMap[maxWidth]} mx-auto ${paddingXMap[paddingX]}`}>
        <DropZone zone="section-content" />
      </div>
    </section>
  );
};