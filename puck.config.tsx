// puck.config.tsx
'use client'

import { Config } from "@measured/puck";

// Import all component configs
import { SectionConfig } from './puck/configs/Section.config';
import { ColumnsConfig } from './puck/configs/Columns.config';
import { CardConfig } from './puck/configs/Card.config';
import { ContainerConfig } from './puck/configs/Container.config';
import { HeadingConfig } from './puck/configs/Heading.config';
import { TextConfig } from './puck/configs/Text.config';
import { ButtonConfig } from './puck/configs/Button.config';
import { ImageConfig } from './puck/configs/Image.config';
import { SpacerConfig } from './puck/configs/Spacer.config';
import { PostSliderConfig } from './puck/configs/PostSlider.config';
import { HeaderConfig } from './puck/configs/Header.config';
import { FooterConfig } from './puck/configs/Footer.config';

export const config: Config = {
  components: {
    Section: SectionConfig,
    Columns: ColumnsConfig,
    Card: CardConfig,
    Container: ContainerConfig,
    Heading: HeadingConfig,
    Text: TextConfig,
    Button: ButtonConfig,
    Image: ImageConfig,
    Spacer: SpacerConfig,
    PostSlider: PostSliderConfig,
    Header: HeaderConfig,
    Footer: FooterConfig,
  }
};