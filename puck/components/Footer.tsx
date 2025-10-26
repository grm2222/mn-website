// puck/components/Footer.tsx
'use client'

import React from 'react';
import { FooterProps } from '../types';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC<FooterProps> = ({ 
  menuItems = [],
  menuGap = 32,
  showMenuDivider = false,
  menuFontSize = 13,
  menuLetterSpacing = 1,
  topBorderColor = '#FFD700',
  topBorderHeight = 2,
  bottomBorderColor = '#FFD700',
  bottomBorderHeight = 2,
  socialLinks = [],
  socialIconSize = 24,
  linkItems = [],
  signUpText = 'SIGN UP FOR EMAIL',
  signUpLink = '#',
  copyright = '©COPYRIGHT 2008-2025',
  registrationText = 'REGISTERED 501(C)(3). EIN: 95-4714047',
  backgroundColor = 'white',
  showBackToTop = true
}) => {
  // Fixed font weights
  const menuFontWeight = 250;
  const dividerWeight = 300;

  const bgColorClass = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    lightGray: 'bg-gray-100'
  }[backgroundColor] || 'bg-white';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`${bgColorClass}`}>
      {/* Top Yellow Border - Full Width */}
      <div 
        style={{ 
          backgroundColor: topBorderColor,
          height: `${topBorderHeight}px`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section - Navigation Menu & Social Icons */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-8 gap-6">
          
          {/* Navigation Menu - Left/Center */}
          <nav className="flex-1 flex justify-center lg:justify-start">
            <ul className="flex flex-wrap items-center justify-center">
              {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                  <li>
                    <Link
                      href={item.link || '#'}
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-200 uppercase"
                      style={{
                        fontSize: `${menuFontSize}px`,
                        fontWeight: menuFontWeight,
                        letterSpacing: `${menuLetterSpacing}px`,
                        padding: `0 ${menuGap / 2}px`
                      }}
                    >
                      {item.text}
                    </Link>
                  </li>

                  {/* Divider */}
                  {showMenuDivider && index < menuItems.length - 1 && (
                    <li className="flex items-center">
                      <span 
                        className="text-gray-400 text-sm mx-1"
                        style={{ fontWeight: dividerWeight }}
                      >
                        |
                      </span>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </nav>

          {/* Social Icons - Right */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex items-center gap-5">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.url || '#'}
                  className="hover:opacity-70 transition-opacity duration-200"
                  aria-label={social.label || 'Social Link'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon && social.icon.trim() !== '' ? (
                    <Image
                      src={social.icon}
                      alt={social.label || 'Social icon'}
                      width={socialIconSize}
                      height={socialIconSize}
                      className="object-contain"
                      unoptimized
                    />
                  ) : (
                    <div 
                      className="bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-semibold"
                      style={{ 
                        width: `${socialIconSize}px`, 
                        height: `${socialIconSize}px` 
                      }}
                    >
                      {social.label ? social.label.charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Yellow Border - Full Width */}
      <div 
        style={{ 
          backgroundColor: bottomBorderColor,
          height: `${bottomBorderHeight}px`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bottom Section - Links, Sign Up, Copyright */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-8 gap-6">
          
          {/* Left - Additional Link Buttons */}
          <div className="flex items-center gap-3">
            {linkItems.map((item, index) => (
              <Link
                key={index}
                href={item.link || '#'}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 uppercase border border-gray-400 px-4 py-1.5"
                style={{
                  fontSize: `${menuFontSize - 1}px`,
                  letterSpacing: `${menuLetterSpacing}px`,
                  fontWeight: menuFontWeight
                }}
              >
                {item.text}
              </Link>
            ))}
          </div>

          {/* Center - Sign Up Button */}
          <div>
            <Link
              href={signUpLink || '#'}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 uppercase border-2 border-gray-600 px-6 py-2 inline-block"
              style={{
                fontSize: `${menuFontSize}px`,
                fontWeight: menuFontWeight,
                letterSpacing: `${menuLetterSpacing}px`
              }}
            >
              {signUpText}
            </Link>
          </div>

          {/* Right - Copyright & Registration + Back to Top */}
          <div className="text-right flex items-center gap-6">
            <div className="text-xs text-gray-600 leading-relaxed">
              <div 
                className="uppercase"
                style={{
                  letterSpacing: `${menuLetterSpacing}px`,
                  fontWeight: menuFontWeight
                }}
              >
                {copyright}
              </div>
              <div 
                className="uppercase mt-1"
                style={{
                  letterSpacing: `${menuLetterSpacing}px`,
                  fontWeight: menuFontWeight
                }}
              >
                {registrationText}
              </div>
            </div>

            {/* Back to Top Arrow */}
            {showBackToTop && (
              <button
                onClick={scrollToTop}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                aria-label="Back to top"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 15l7-7 7 7" 
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};