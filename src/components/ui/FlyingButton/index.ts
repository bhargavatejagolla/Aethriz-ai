import React from 'react';
import _FlyingButton from './FlyingButton';

export interface FlyingButtonProps {
  children?: React.ReactNode;
  onClick?: (event: any) => void;
  theme?: 'dark' | 'light';
  size?: 'small' | 'medium' | 'large' | 'extra-large';
  radius?: number;
  altitude?: number;
  hoverTime?: number;
  jets?: number;
  thrusters?: boolean;
  trigger?: 'hover' | 'click';
  carryCursor?: boolean;
  ramp?: boolean;
  rampColor?: string;
  smoke?: number;
  className?: string;
  style?: React.CSSProperties;
}

const FlyingButton = _FlyingButton as unknown as React.FC<FlyingButtonProps>;
export default FlyingButton;
export * from './FlyingButton';
