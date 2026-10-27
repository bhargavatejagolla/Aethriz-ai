import React from 'react';
import _HoldButton from './HoldButton';

export interface HoldButtonProps {
  children?: React.ReactNode;
  doneLabel?: React.ReactNode;
  icon?: React.ReactNode;
  doneIcon?: React.ReactNode;
  backgroundColor?: string;
  fillColor?: string;
  textColor?: string;
  fillTextColor?: string;
  size?: 'sm' | 'md' | 'lg';
  radius?: number;
  fillDirection?: 'left' | 'right' | 'top' | 'bottom';
  holdTime?: number;
  releaseTime?: number;
  pressScale?: number;
  onHold?: () => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const HoldButton = _HoldButton as unknown as React.FC<HoldButtonProps>;
export default HoldButton;
export * from './HoldButton';
