// puck/configs/Button.config.ts
import { Button } from '../components/Button';

export const ButtonConfig = {
  fields: {
    text: { type: "text", label: "Button Text" },
    link: { type: "text", label: "Link URL" },
    variant: {
      type: "select",
      label: "Variant",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Outline Blue", value: "outline" },
        { label: "Outline Cyan", value: "outline-cyan" },
        { label: "Ghost", value: "ghost" },
        { label: "Success", value: "success" },
        { label: "Warning", value: "warning" }
      ]
    },
    size: {
      type: "select",
      label: "Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" }
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
    fullWidth: {
      type: "radio",
      label: "Full Width",
      options: [
        { label: "No", value: false },
        { label: "Yes", value: true }
      ]
    }
  },
  defaultProps: {
    text: "Click Here",
    link: "#",
    variant: "primary",
    size: "md",
    alignment: "left",
    fullWidth: false
  },
  render: Button
};