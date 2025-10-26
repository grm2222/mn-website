// puck/configs/Columns.config.ts
import { Columns } from '../components/Columns';

export const ColumnsConfig = {
  fields: {
    layout: {
      type: "select",
      label: "Column Layout",
      options: [
        { label: "1 Column", value: "1" },
        { label: "2 Columns (50/50)", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
        { label: "2 Columns (33/66)", value: "1/3-2/3" },
        { label: "2 Columns (66/33)", value: "2/3-1/3" },
        { label: "2 Columns (25/75)", value: "1/4-3/4" },
        { label: "2 Columns (75/25)", value: "3/4-1/4" }
      ]
    },
    gap: {
      type: "select",
      label: "Gap",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "XL", value: "xl" }
      ]
    },
    verticalAlign: {
      type: "select",
      label: "Vertical Alignment",
      options: [
        { label: "Stretch", value: "stretch" },
        { label: "Top", value: "start" },
        { label: "Center", value: "center" },
        { label: "Bottom", value: "end" }
      ]
    },
    reverseOnMobile: {
      type: "radio",
      label: "Reverse on Mobile",
      options: [
        { label: "No", value: false },
        { label: "Yes", value: true }
      ]
    }
  },
  defaultProps: {
    layout: "2",
    gap: "md",
    verticalAlign: "stretch",
    reverseOnMobile: false
  },
  render: Columns
};