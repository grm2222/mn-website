// puck/configs/Card.config.ts
import { Card } from '../components/Card';

export const CardConfig = {
  fields: {
    backgroundColor: {
      type: "select",
      label: "Background Color",
      options: [
        { label: "White", value: "white" },
        { label: "Gray 50", value: "gray-50" },
        { label: "Blue 50", value: "blue-50" },
        { label: "Transparent", value: "transparent" }
      ]
    },
    padding: {
      type: "select",
      label: "Padding",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "XL", value: "xl" }
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
        { label: "2XL", value: "2xl" }
      ]
    },
    shadow: {
      type: "select",
      label: "Shadow",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "XL", value: "xl" }
      ]
    },
    border: {
      type: "radio",
      label: "Show Border",
      options: [
        { label: "No", value: false },
        { label: "Yes", value: true }
      ]
    },
    borderColor: {
      type: "select",
      label: "Border Color",
      options: [
        { label: "Gray 200", value: "gray-200" },
        { label: "Gray 300", value: "gray-300" },
        { label: "Blue 200", value: "blue-200" },
        { label: "Cyan 200", value: "cyan-200" }
      ]
    }
  },
  defaultProps: {
    backgroundColor: "white",
    padding: "md",
    borderRadius: "lg",
    shadow: "md",
    border: false,
    borderColor: "gray-200"
  },
  render: Card
};