import React from 'react';
import _PulseHeart from './PulseHeart';

export interface PulseHeartProps {
  liked?: boolean;
  defaultLiked?: boolean;
  count?: number;
  onChange?: (liked: boolean, count: number) => void;
  showCount?: boolean;
  icon?: 'heart' | 'star' | 'thumb' | React.ReactNode;
  idleOutline?: boolean;
  size?: number;
  corner?: number;
  likedColor?: string;
  idleColor?: string;
  pillColor?: string;
  textColor?: string;
  duration?: number;
  swell?: number;
  heartbeat?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const PulseHeart = _PulseHeart as unknown as React.FC<PulseHeartProps>;
export default PulseHeart;
export * from './PulseHeart';
