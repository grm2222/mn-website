// puck/components/Text.tsx
import React from 'react';
import { TextProps } from '../types';

export const Text = ({
  content = "Your text content goes here.",
  fontSize = 16,
  textColor = "#374151",
  alignment = "left",
  marginBottom = 16,
  paddingTop = 0,
  paddingBottom = 0,
  lineHeight = "relaxed",
  bold = false,
  italic = false,
  underline = false,
  textTransform = "none",
  letterSpacing = "normal"
}: TextProps) => {
  const lineHeightMap: Record<string, string> = {
    tight: 'leading-tight',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose'
  };

  const letterSpacingMap: Record<string, string> = {
    tighter: 'tracking-tighter',
    tight: 'tracking-tight',
    normal: 'tracking-normal',
    wide: 'tracking-wide',
    wider: 'tracking-wider',
    widest: 'tracking-widest'
  };

  const alignmentMap: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };

  const textTransformMap: Record<string, string> = {
    none: 'normal-case',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize'
  };

  return (
    <div
      style={{
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
        marginBottom: `${marginBottom}px`
      }}
    >
      <p
        className={`
          ${alignmentMap[alignment]}
          ${lineHeightMap[lineHeight]}
          ${letterSpacingMap[letterSpacing]}
          ${textTransformMap[textTransform]}
          ${bold ? 'font-bold' : ''}
          ${italic ? 'italic' : ''}
          ${underline ? 'underline' : ''}
        `}
        style={{
          fontSize: `${fontSize}px`,
          color: textColor,
          margin: 0
        }}
      >
        {content}
      </p>
    </div>
  );
};