// puck/configs/Text.config.tsx
import { ComponentConfig } from "@measured/puck";
import { Text } from '../components/Text';
import { TextProps } from '../types';
import ColorPicker from '@/components/ColorPicker';

export const TextConfig: ComponentConfig<TextProps> = {
  fields: {
    content: { 
      type: "textarea", 
      label: "Content" 
    },
    fontSize: { 
      type: "number", 
      label: "Font Size (px)",
      min: 8,
      max: 100
    },
    textColor: {
      type: "custom",
      label: "Text Color",
      render: ({ value, onChange }: any) => (
        <ColorPicker 
          value={value} 
          onChange={onChange}
          label="Text Color"
        />
      )
    },
    bold: {
      type: "radio",
      label: "Bold",
      options: [
        { label: "No", value: false },
        { label: "Yes", value: true }
      ]
    },
    italic: {
      type: "radio",
      label: "Italic",
      options: [
        { label: "No", value: false },
        { label: "Yes", value: true }
      ]
    },
    underline: {
      type: "radio",
      label: "Underline",
      options: [
        { label: "No", value: false },
        { label: "Yes", value: true }
      ]
    },
    textTransform: {
      type: "select",
      label: "Text Transform",
      options: [
        { label: "None", value: "none" },
        { label: "UPPERCASE", value: "uppercase" },
        { label: "lowercase", value: "lowercase" },
        { label: "Capitalize", value: "capitalize" }
      ]
    },
    alignment: {
      type: "select",
      label: "Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
        { label: "Justify", value: "justify" }
      ]
    },
    lineHeight: {
      type: "select",
      label: "Line Height",
      options: [
        { label: "Tight", value: "tight" },
        { label: "Normal", value: "normal" },
        { label: "Relaxed", value: "relaxed" },
        { label: "Loose", value: "loose" }
      ]
    },
    letterSpacing: {
      type: "select",
      label: "Letter Spacing",
      options: [
        { label: "Tighter", value: "tighter" },
        { label: "Tight", value: "tight" },
        { label: "Normal", value: "normal" },
        { label: "Wide", value: "wide" },
        { label: "Wider", value: "wider" },
        { label: "Widest", value: "widest" }
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
    content: "Your text content goes here.",
    fontSize: 16,
    textColor: "#374151",
    bold: false,
    italic: false,
    underline: false,
    textTransform: "none",
    alignment: "left",
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 16,
    lineHeight: "relaxed",
    letterSpacing: "normal"
  },
  render: Text
};