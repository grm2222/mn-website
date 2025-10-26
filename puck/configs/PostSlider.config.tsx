// puck/configs/PostSlider.config.ts
import { PostSlider } from '../components/PostSlider';

export const PostSliderConfig = {
  fields: {
    showTitle: {
      type: "radio",
      label: "Show Title",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false }
      ]
    },
    title: { type: "text", label: "Section Title" },
    postsToShow: {
      type: "select",
      label: "Posts to Show",
      options: [
        { label: "1 Post", value: 1 },
        { label: "2 Posts", value: 2 },
        { label: "3 Posts", value: 3 },
        { label: "4 Posts", value: 4 }
      ]
    },
    categoryFilter: {
      type: "select",
      label: "Category Filter",
      options: [
        { label: "All Categories", value: "all" },
        { label: "Global", value: "global" },
        { label: "Mongolia", value: "mongolia" },
        { label: "Vietnam", value: "vietnam" },
        { label: "China", value: "china" }
      ]
    },
    postsLimit: {
      type: "number",
      label: "Maximum Posts",
      min: 3,
      max: 20
    },
    autoPlay: {
      type: "radio",
      label: "Auto Play",
      options: [
        { label: "Enabled", value: true },
        { label: "Disabled", value: false }
      ]
    },
    autoPlaySpeed: {
      type: "number",
      label: "Auto Play Speed (seconds)",
      min: 3,
      max: 10
    },
    showArrows: {
      type: "radio",
      label: "Show Arrows",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false }
      ]
    },
    showDots: {
      type: "radio",
      label: "Show Dots",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false }
      ]
    },
    gap: {
      type: "select",
      label: "Gap Between Cards",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" }
      ]
    },
    backgroundColor: {
      type: "select",
      label: "Background Color",
      options: [
        { label: "Transparent", value: "transparent" },
        { label: "White", value: "white" },
        { label: "Gray 50", value: "gray-50" },
        { label: "Gray 100", value: "gray-100" }
      ]
    }
  },
  defaultProps: {
    showTitle: true,
    title: "Latest Stories",
    postsToShow: 3,
    categoryFilter: "all",
    postsLimit: 9,
    autoPlay: true,
    autoPlaySpeed: 5,
    showArrows: true,
    showDots: true,
    gap: "md",
    backgroundColor: "transparent"
  },
  render: PostSlider
};