// puck/configs/Section.config.tsx
import { ComponentConfig } from "@measured/puck";
import { Section } from '../components/Section';
import { SectionProps } from '../types';
import ImageUpload from '@/components/ImageUpload';
import ColorPicker from '@/components/ColorPicker';

export const SectionConfig: ComponentConfig<SectionProps> = {
  fields: {
    backgroundImage: {
      type: "custom",
      label: "Background Image",
      render: ({ onChange, value }: any) => (
        <ImageUpload 
          onUpload={(url: string) => onChange(url)} 
          value={value} 
          label="Upload Background Image" 
        />
      )
    },
    backgroundColor: {
      type: "custom",
      label: "Background Color",
      render: ({ value, onChange }: any) => (
        <ColorPicker 
          value={value || 'transparent'} 
          onChange={onChange}
          label="Background Color"
        />
      )
    },
    overlayColor: {
      type: "select",
      label: "Overlay Color",
      options: [
        { label: "Black", value: "black" },
        { label: "White", value: "white" }
      ]
    },
    overlayOpacity: {
      type: "number",
      label: "Overlay Opacity",
      min: 0,
      max: 1,
      step: 0.1
    },
    blurAmount: {
      type: "number",
      label: "Background Blur (px)",
      min: 0,
      max: 20,
      step: 1
    },
    minHeight: {
      type: "select",
      label: "Min Height",
      options: [
        { label: "Auto", value: "auto" },
        { label: "Screen", value: "screen" },
        { label: "Small (300px)", value: "sm" },
        { label: "Medium (500px)", value: "md" },
        { label: "Large (700px)", value: "lg" }
      ]
    },
    paddingY: {
      type: "select",
      label: "Vertical Padding",
      options: [
        { label: "None", value: "none" },
        { label: "XS", value: "xs" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" }
      ]
    },
    paddingX: {
      type: "select",
      label: "Horizontal Padding",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" }
      ]
    },
    maxWidth: {
      type: "select",
      label: "Max Width",
      options: [
        { label: "Full", value: "full" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra Large", value: "xl" },
        { label: "2XL", value: "2xl" }
      ]
    },
    verticalAlign: {
      type: "select",
      label: "Vertical Alignment",
      options: [
        { label: "Top", value: "top" },
        { label: "Center", value: "center" },
        { label: "Bottom", value: "bottom" }
      ]
    }
  },
  defaultProps: {
    backgroundColor: "transparent",
    overlayColor: "black",
    overlayOpacity: 0.3,
    blurAmount: 4,
    minHeight: "md",
    paddingY: "lg",
    paddingX: "md",
    maxWidth: "xl",
    verticalAlign: "center"
  },
  render: Section
};