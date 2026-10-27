import React from 'react';
import _RubberSegment from './RubberSegment';

export interface RubberSegmentItem {
  value: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
}

export interface RubberSegmentProps {
  items?: (string | RubberSegmentItem)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, index: number) => void;
  trackColor?: string;
  thumbColor?: string;
  textColor?: string;
  activeTextColor?: string;
  size?: 'sm' | 'md' | 'lg';
  radius?: number;
  inset?: number;
  equalSlots?: boolean;
  stretch?: number;
  squash?: number;
  speed?: number;
  glide?: number;
  draggable?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const RubberSegment = _RubberSegment as unknown as React.FC<RubberSegmentProps>;
export default RubberSegment;
export * from './RubberSegment';
