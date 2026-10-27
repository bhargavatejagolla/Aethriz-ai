import React from 'react';
import _GooeyNav from './GooeyNav';

export interface GooeyNavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface GooeyNavProps {
  items?: GooeyNavItem[];
  initialActiveIndex?: number;
  activeIndex?: number;
  onChange?: (index: number, item?: any) => void;
  theme?: 'dark' | 'light';
  color?: string;
  activeTextColor?: string;
  colors?: string[];
  size?: 'sm' | 'md' | 'lg';
  frame?: boolean;
  animationTime?: number;
  particleCount?: number;
  timeVariance?: number;
  className?: string;
  style?: React.CSSProperties;
}

const GooeyNav = _GooeyNav as unknown as React.FC<GooeyNavProps>;
export default GooeyNav;
export * from './GooeyNav';
