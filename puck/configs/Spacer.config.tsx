// puck/configs/Spacer.config.ts
import { Spacer } from '../components/Spacer';

export const SpacerConfig = {
  fields: {
    height: {
      type: "select",
      label: "Height",
      options: [
        { label: "XS", value: "xs" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "XL", value: "xl" }
      ]
    }
  },
  defaultProps: {
    height: "md"
  },
  render: Spacer
};