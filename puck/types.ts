// puck/types.ts
export type SectionProps = {
  backgroundImage?: string;
  backgroundColor?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  minHeight?: string;
  blurAmount?: number;
  paddingY?: string;
  paddingX?: string;
  maxWidth?: string;
  verticalAlign?: string;
  [key: string]: any;
};

export type ColumnsProps = {
  layout?: string;
  gap?: string;
  verticalAlign?: string;
  reverseOnMobile?: boolean;
  [key: string]: any;
};

export type CardProps = {
  backgroundColor?: string;
  padding?: string;
  borderRadius?: string;
  shadow?: string;
  border?: boolean;
  borderColor?: string;
  [key: string]: any;
};

export type ContainerProps = {
  maxWidth?: string;
  paddingX?: string;
  [key: string]: any;
};

export type HeadingProps = {
  text?: string;
  level?: string;
  size?: string;
  color?: string;          // Changed to string for hex color support
  fontWeight?: string;
  fontStyle?: string;
  alignment?: string;
  paddingTop?: number;     // NEW
  paddingBottom?: number;  // NEW
  marginBottom?: number;   // Changed from string to number
  [key: string]: any;
};

export type TextProps = {
  content?: string;
  fontSize?: number;
  textColor?: string;
  alignment?: string;
  marginBottom?: number;  // Changed from string to number
  paddingTop?: number;    // NEW
  paddingBottom?: number; // NEW
  lineHeight?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  textTransform?: string;
  letterSpacing?: string;
  [key: string]: any;
};

export type ButtonProps = {
  text?: string;
  link?: string;
  variant?: string;
  size?: string;
  alignment?: string;
  fullWidth?: boolean;
  [key: string]: any;
};

export type ImageProps = {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  objectFit?: string;
  alignment?: string;
  borderRadius?: string;
  caption?: string;
  [key: string]: any;
};

export type PostSliderProps = {
  postsToShow?: number;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  showArrows?: boolean;
  showDots?: boolean;
  categoryFilter?: string;
  postsLimit?: number;
  gap?: string;
  backgroundColor?: string;
  title?: string;
  showTitle?: boolean;
  [key: string]: any;
};

export type HeaderProps = {
  logo?: string;
  logoWidth?: number;
  logoHeight?: number;
  menuItems?: MenuItem[];  // Changed from any[] to MenuItem[]
  menuGap?: number;
  menuFontSize?: number;  // NEW
  menuFontWeight?: 300 | 400 | 500 | 600 | 700;  // NEW
  menuLetterSpacing?: number;  // NEW
  showMenuDivider?: boolean;
  showSearch?: boolean;  // NEW
  buttonText?: string;
  buttonLink?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  buttonBorderColor?: string;
  buttonBorderWidth?: number;
  buttonBorderRadius?: number;
  backgroundColor?: string;
  textColor?: string;
  [key: string]: any;
};

export type FooterProps = {
  menuItems?: FooterMenuItem[];
  menuGap?: number;
  menuFontSize?: number;
  menuLetterSpacing?: number;
  showMenuDivider?: boolean;
  topBorderColor?: string;
  topBorderHeight?: number;
  bottomBorderColor?: string;
  bottomBorderHeight?: number;
  socialLinks?: SocialLink[];
  linkItems?: FooterMenuItem[];
  signUpText?: string;
  signUpLink?: string;
  copyright?: string;
  registrationText?: string;
  backgroundColor?: string;
  showBackToTop?: boolean;
  [key: string]: any;
};

export type SpacerProps = { 
  height?: string;
  [key: string]: any;
};

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  thumbnail: string | null;
  category: string;
  createdAt: string;
  author: {
    name: string | null;
  };
}

export interface SubmenuItem {
  text: string;
  link: string;
  description?: string;
}

export interface MenuItem {
  text: string;
  link: string;
  submenu?: SubmenuItem[];
}

export interface SocialLink {
  icon?: string;
  label?: string;
  url: string;
}

export interface FooterMenuItem {
  text: string;
  link: string;
}