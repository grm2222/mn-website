// puck/configs/Heading.config.tsx
import { ComponentConfig } from "@measured/puck";
import { Heading } from '../components/Heading';
import { HeadingProps } from '../types';
import ColorPicker from '@/components/ColorPicker';

export const HeadingConfig: ComponentConfig<HeadingProps> = {
  fields: {
    text: { 
      type: "text", 
      label: "Text" 
    },
    level: {
      type: "select",
      label: "Heading Level",
      options: [
        { label: "H1", value: "h1" },
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
        { label: "H4", value: "h4" },
        { label: "H5", value: "h5" },
        { label: "H6", value: "h6" }
      ]
    },
    size: {
      type: "select",
      label: "Size",
      options: [
        { label: "Auto", value: "auto" },
        { label: "XS", value: "xs" },
        { label: "Small", value: "sm" },
        { label: "Base", value: "base" },
        { label: "Large", value: "lg" },
        { label: "XL", value: "xl" },
        { label: "2XL", value: "2xl" },
        { label: "3XL", value: "3xl" },
        { label: "4XL", value: "4xl" },
        { label: "5XL", value: "5xl" },
        { label: "6XL", value: "6xl" }
      ]
    },
    color: {
      type: "custom",
      label: "Text Color",
      render: ({ value, onChange }: any) => (
        <ColorPicker 
          value={value || '#111827'} 
          onChange={onChange}
          label="Text Color"
        />
      )
    },
    fontWeight: {
      type: "select",
      label: "Font Weight",
      options: [
        { label: "Normal", value: "normal" },
        { label: "Medium", value: "medium" },
        { label: "Semibold", value: "semibold" },
        { label: "Bold", value: "bold" },
        { label: "Extra Bold", value: "extrabold" }
      ]
    },
    fontStyle: {
      type: "select",
      label: "Font Style",
      options: [
        { label: "Normal", value: "normal" },
        { label: "Italic", value: "italic" }
      ]
    },
    alignment: {
      type: "select",
      label: "Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" }
      ]
    },
    paddingTop: {
      type: "number",
      label: "Padding Top (px)",
      min: 0,
      max: 200
    },
    paddingBottom: {
      type: "number",
      label: "Padding Bottom (px)",
      min: 0,
      max: 200
    },
    marginBottom: {
      type: "number",
      label: "Margin Bottom (px)",
      min: 0,
      max: 200
    }
  },
  defaultProps: {
    text: "Your Heading Here",
    level: "h2",
    size: "auto",
    color: "#111827",
    fontWeight: "bold",
    fontStyle: "normal",
    alignment: "left",
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 16
  },
  render: Heading
};