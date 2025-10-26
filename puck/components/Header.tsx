// puck/components/Header.tsx
'use client'

import React, { useState } from 'react';
import { HeaderProps } from '../types';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Search } from 'lucide-react';

export const Header: React.FC<HeaderProps> = ({
  logo,
  logoWidth = 150,
  logoHeight = 60,
  menuItems = [],
  menuGap = 32,
  showMenuDivider = false,
  buttonText = "DONATE",
  buttonLink = "#donate",
  buttonBackgroundColor = "#FFFFFF",
  buttonTextColor = "#2563EB",
  buttonBorderColor = "#2563EB",
  buttonBorderWidth = 2,
  buttonBorderRadius = 4,
  backgroundColor = "white",
  textColor = "gray-900",
  menuFontSize = 14,
  menuFontWeight = 250,
  menuLetterSpacing = 0.5,
  dividerWeight = 10,
  showSearch = false,
}) => {
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

  const bgColorClass = {
    white: 'bg-white',
    transparent: 'bg-transparent',
    gray: 'bg-gray-100',
    dark: 'bg-gray-900'
  }[backgroundColor] || 'bg-white';

  return (
    <header className={`${bgColorClass} sticky top-0 z-50 shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logo ? (
              <Link href="/">
                <Image
                  src={logo}
                  alt="Logo"
                  width={logoWidth}
                  height={logoHeight}
                  className="object-contain"
                />
              </Link>
            ) : (
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Logo
              </Link>
            )}
          </div>

          {/* Navigation Menu - Center */}
          <nav className="hidden lg:flex items-center flex-1 justify-center">
            <ul className="flex items-center">
              {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                  <li
                    className="relative group"
                    onMouseEnter={() => setOpenSubmenu(index)}
                    onMouseLeave={() => setOpenSubmenu(null)}
                  >
                    <Link
                      href={item.link || '#'}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center uppercase"
                      style={{
                        fontSize: `${menuFontSize}px`,
                        fontWeight: menuFontWeight,
                        letterSpacing: `${menuLetterSpacing}px`,
                        padding: `0 ${menuGap / 2}px`
                      }}
                    >
                      {item.text}
                      {item.submenu && item.submenu.length > 0 && (
                        <ChevronDown className="ml-1 w-4 h-4" />
                      )}
                    </Link>

                    {/* Submenu Dropdown */}
                    {item.submenu && item.submenu.length > 0 && (
                      <div
                        className={`absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-200 z-[100] ${
                          openSubmenu === index
                            ? 'opacity-100 visible translate-y-0'
                            : 'opacity-0 invisible -translate-y-2'
                        }`}
                      >
                        <ul className="py-2">
                          {item.submenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={subItem.link || '#'}
                                className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                              >
                                <div 
                                  className="text-gray-900 uppercase"
                                  style={{
                                    fontSize: `${menuFontSize}px`,
                                    fontWeight: menuFontWeight,
                                    letterSpacing: `${menuLetterSpacing}px`
                                  }}
                                >
                                  {subItem.text}
                                </div>
                                {subItem.description && (
                                  <div className="text-xs text-gray-500 mt-1">
                                    {subItem.description}
                                  </div>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>

                  {/* Divider - Placed between menu items */}
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

          {/* Right Side - Search & Button */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            {showSearch && (
              <button
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Donate Button */}
            {buttonText && (
              <Link
                href={buttonLink || '#'}
                className="uppercase font-medium px-6 py-2 transition-all duration-200 hover:opacity-80"
                style={{
                  backgroundColor: buttonBackgroundColor,
                  color: buttonTextColor,
                  borderColor: buttonBorderColor,
                  borderWidth: `${buttonBorderWidth}px`,
                  borderRadius: `${buttonBorderRadius}px`,
                  borderStyle: 'solid',
                  fontSize: `${menuFontSize}px`,
                  fontWeight: menuFontWeight,
                  letterSpacing: `${menuLetterSpacing}px`
                }}
              >
                {buttonText}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              className="text-gray-600 p-2"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};