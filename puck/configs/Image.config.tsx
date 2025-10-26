// puck/configs/Image.config.tsx
import { ComponentConfig } from "@measured/puck";
import { ImageComponent } from '../components/Image';
import { ImageProps } from '../types';
import ImageUpload from '@/components/ImageUpload';

export const ImageConfig: ComponentConfig<ImageProps> = {
  fields: {
    src: {
      type: "custom",
      label: "Image Upload",
      render: ({ onChange, value }: any) => (
        <ImageUpload onUpload={(url: string) => onChange(url)} value={value} label="Upload Image" />
      )
    },
    alt: { 
      type: "text", 
      label: "Alt Text" 
    },
    width: {
      type: "select",
      label: "Width",
      options: [
        { label: "Full (100%)", value: "full" },
        { label: "3/4 (75%)", value: "3/4" },
        { label: "2/3 (66%)", value: "2/3" },
        { label: "1/2 (50%)", value: "1/2" },
        { label: "1/3 (33%)", value: "1/3" },
        { label: "1/4 (25%)", value: "1/4" },
        { label: "Small (200px)", value: "small" },
        { label: "Medium (400px)", value: "medium" },
        { label: "Large (600px)", value: "large" }
      ]
    },
    height: {
      type: "select",
      label: "Height",
      options: [
        { label: "Auto", value: "auto" },
        { label: "Small (200px)", value: "small" },
        { label: "Medium (400px)", value: "medium" },
        { label: "Large (600px)", value: "large" },
        { label: "48px", value: "48" },
        { label: "64px", value: "64" },
        { label: "96px", value: "96" },
        { label: "128px", value: "128" }
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
    objectFit: {
      type: "select",
      label: "Object Fit",
      options: [
        { label: "Cover", value: "cover" },
        { label: "Contain", value: "contain" },
        { label: "Fill", value: "fill" },
        { label: "None", value: "none" }
      ]
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "XL", value: "xl" },
        { label: "Full (Circle)", value: "full" }
      ]
    },
    caption: { 
      type: "text", 
      label: "Caption" 
    }
  },
  defaultProps: {
    src: "",
    alt: "Image",
    width: "full",
    height: "auto",
    alignment: "center",
    objectFit: "cover",
    borderRadius: "lg",
    caption: ""
  },
  render: ImageComponent
};