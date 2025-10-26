// puck/configs/Container.config.ts
import { Container } from '../components/Container';

export const ContainerConfig = {
  fields: {
    maxWidth: {
      type: "select",
      label: "Max Width",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "XL", value: "xl" },
        { label: "Full", value: "full" }
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
    }
  },
  defaultProps: {
    maxWidth: "xl",
    paddingX: "md"
  },
  render: Container
};