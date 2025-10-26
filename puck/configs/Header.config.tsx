// puck/configs/Header.config.ts
import { ComponentConfig } from "@measured/puck";
import { Header } from '../components/Header';
import { HeaderProps } from '../types';
import ImageUpload from '@/components/ImageUpload';
import ColorPicker from '@/components/ColorPicker';

export const HeaderConfig: ComponentConfig<HeaderProps> = {
  fields: {
    logo: {
      type: "custom",
      label: "Logo Upload",
      render: ({ onChange, value }: any) => (
        <ImageUpload onUpload={(url: string) => onChange(url)} value={value} label="Upload Logo" />
      )
    },
    logoWidth: { 
      type: "number", 
      label: "Logo Width (px)", 
      min: 50, 
      max: 300 
    },
    logoHeight: { 
      type: "number", 
      label: "Logo Height (px)", 
      min: 20, 
      max: 100 
    },
    menuItems: {
      type: "array",
      label: "Menu Items",
      arrayFields: {
        text: { type: "text", label: "Menu Text" },
        link: { type: "text", label: "Menu Link" },
        submenu: {
          type: "array",
          label: "Submenu Items",
          arrayFields: {
            text: { type: "text", label: "Submenu Text" },
            link: { type: "text", label: "Submenu Link" },
            description: { type: "text", label: "Description (optional)" }
          }
        }
      },
      defaultItemProps: { text: "Menu", link: "#", submenu: [] }
    },
    menuGap: {
      type: "number",
      label: "Menu Gap (px)",
      min: 8,
      max: 100
    },
    showMenuDivider: {
      type: "radio",
      label: "Show Menu Divider (|)",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false }
      ]
    },
    buttonText: { 
      type: "text", 
      label: "Button Text" 
    },
    buttonLink: { 
      type: "text", 
      label: "Button Link" 
    },
    buttonBackgroundColor: {
      type: "custom",
      label: "Button Background Color",
      render: ({ value, onChange }: any) => (
        <ColorPicker 
          value={value} 
          onChange={onChange}
          label="Background"
        />
      )
    },
    buttonTextColor: {
      type: "custom",
      label: "Button Text Color",
      render: ({ value, onChange }: any) => (
        <ColorPicker 
          value={value} 
          onChange={onChange}
          label="Text"
        />
      )
    },
    buttonBorderColor: {
      type: "custom",
      label: "Button Border Color",
      render: ({ value, onChange }: any) => (
        <ColorPicker 
          value={value} 
          onChange={onChange}
          label="Border"
        />
      )
    },
    buttonBorderWidth: {
      type: "number",
      label: "Button Border Width (px)",
      min: 0,
      max: 10
    },
    buttonBorderRadius: {
      type: "number",
      label: "Button Border Radius (px)",
      min: 0,
      max: 50
    },
    backgroundColor: {
      type: "select",
      label: "Header Background",
      options: [
        { label: "White", value: "white" },
        { label: "Transparent", value: "transparent" },
        { label: "Gray", value: "gray" },
        { label: "Dark", value: "dark" }
      ]
    },
    textColor: {
      type: "select",
      label: "Text Color",
      options: [
        { label: "Black", value: "gray-900" },
        { label: "Dark Gray", value: "gray-700" },
        { label: "Gray", value: "gray-600" },
        { label: "White", value: "white" },
        { label: "Blue", value: "blue-600" }
      ]
    }
  },
  defaultProps: {
    logo: '',
    logoWidth: 120,
    logoHeight: 40,
    menuItems: [
      { text: "ABOUT US", link: "#" },
      { text: "WHAT WE DO", link: "#" },
      { text: "IMPACT", link: "#" },
      { text: "FIELD NOTES", link: "#" },
      { text: "GET INVOLVED", link: "#" }
    ],
    menuGap: 32,
    showMenuDivider: false,
    buttonText: "DONATE",
    buttonLink: "#donate",
    buttonBackgroundColor: "#FFFFFF",
    buttonTextColor: "#2563EB",
    buttonBorderColor: "#2563EB",
    buttonBorderWidth: 2,
    buttonBorderRadius: 4,
    backgroundColor: "white",
    textColor: "gray-900"
  },
  render: Header
};