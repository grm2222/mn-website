// puck/configs/Footer.config.tsx
import { ComponentConfig } from "@measured/puck";
import { Footer } from '../components/Footer';
import { FooterProps } from '../types';
import ColorPicker from '@/components/ColorPicker';
import ImageUpload from '@/components/ImageUpload';

export const FooterConfig: ComponentConfig<FooterProps> = {
  fields: {
    menuItems: {
      type: "array",
      label: "Top Menu Items",
      arrayFields: {
        text: { type: "text", label: "Menu Text" },
        link: { type: "text", label: "Menu Link" }
      },
      defaultItemProps: { text: "MENU", link: "#" }
    },
    menuGap: {
      type: "number",
      label: "Menu Gap (px)",
      min: 8,
      max: 100
    },
    menuFontSize: {
      type: "number",
      label: "Menu Font Size (px)",
      min: 10,
      max: 20
    },
    menuLetterSpacing: {
      type: "number",
      label: "Menu Letter Spacing (px)",
      min: 0,
      max: 5
    },
    showMenuDivider: {
      type: "radio",
      label: "Show Menu Divider (|)",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false }
      ]
    },
    topBorderColor: {
      type: "custom",
      label: "Top Border Color",
      render: ({ value, onChange }: any) => (
        <ColorPicker 
          value={value} 
          onChange={onChange}
          label="Top Border"
        />
      )
    },
    topBorderHeight: {
      type: "number",
      label: "Top Border Height (px)",
      min: 1,
      max: 10
    },
    bottomBorderColor: {
      type: "custom",
      label: "Bottom Border Color (Middle Line)",
      render: ({ value, onChange }: any) => (
        <ColorPicker 
          value={value} 
          onChange={onChange}
          label="Bottom Border"
        />
      )
    },
    bottomBorderHeight: {
      type: "number",
      label: "Bottom Border Height (px)",
      min: 1,
      max: 10
    },
    socialLinks: {
      type: "array",
      label: "Social Links",
      arrayFields: {
        icon: {
          type: "custom",
          label: "Social Icon (Upload PNG/JPG)",
          render: ({ onChange, value }: any) => (
            <ImageUpload 
              onUpload={(url: string) => onChange(url)} 
              value={value} 
              label="Upload Icon" 
            />
          )
        },
        label: { 
          type: "text", 
          label: "Label/Name (e.g., Facebook)"
        },
        url: { 
          type: "text", 
          label: "URL" 
        }
      },
      defaultItemProps: { icon: "", label: "Social", url: "#" }
    },
    socialIconSize: {
      type: "number",
      label: "Social Icon Size (px)",
      min: 16,
      max: 48
    },
    linkItems: {
      type: "array",
      label: "Bottom Left Button Links",
      arrayFields: {
        text: { type: "text", label: "Button Text" },
        link: { type: "text", label: "Button Link" }
      },
      defaultItemProps: { text: "BUTTON", link: "#" }
    },
    signUpText: {
      type: "text",
      label: "Sign Up Button Text"
    },
    signUpLink: {
      type: "text",
      label: "Sign Up Link"
    },
    copyright: { 
      type: "text", 
      label: "Copyright Text" 
    },
    registrationText: {
      type: "text",
      label: "Registration/EIN Text"
    },
    backgroundColor: {
      type: "select",
      label: "Footer Background",
      options: [
        { label: "White", value: "white" },
        { label: "Light Gray", value: "gray" },
        { label: "Gray", value: "lightGray" }
      ]
    },
    showBackToTop: {
      type: "radio",
      label: "Show Back to Top Arrow",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false }
      ]
    }
  },
  defaultProps: {
    menuItems: [
      { text: "OUR FOUNDER", link: "/founder" },
      { text: "FINANCIALS", link: "/financials" },
      { text: "CAREERS", link: "/careers" },
      { text: "OTHER WAYS TO GIVE", link: "/give" },
      { text: "FAQ", link: "/faq" },
      { text: "STORIES", link: "/stories" },
      { text: "CONTACT", link: "/contact" }
    ],
    menuGap: 32,
    menuFontSize: 13,
    menuLetterSpacing: 1,
    showMenuDivider: false,
    topBorderColor: "#FFD700",
    topBorderHeight: 4,
    bottomBorderColor: "#FFD700",
    bottomBorderHeight: 2,
    socialLinks: [
      { icon: "", label: "Facebook", url: "https://facebook.com" },
      { icon: "", label: "Twitter", url: "https://twitter.com" },
      { icon: "", label: "LinkedIn", url: "https://linkedin.com" },
      { icon: "", label: "Instagram", url: "https://instagram.com" }
    ],
    socialIconSize: 24,
    linkItems: [
      { text: "TERMS OF SERVICE", link: "/terms" },
      { text: "POLICIES AND PROCEDURES", link: "/policies" }
    ],
    signUpText: "SIGN UP FOR EMAIL",
    signUpLink: "/signup",
    copyright: "©COPYRIGHT 2008-2025",
    registrationText: "REGISTERED 501(C)(3). EIN: 95-4714047",
    backgroundColor: "white",
    showBackToTop: true
  },
  render: Footer
};