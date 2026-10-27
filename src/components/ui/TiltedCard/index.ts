import React from 'react';
import _TiltedCard, { TiltedCardLayer as _TiltedCardLayer } from './TiltedCard';

export interface TiltedCardProps {
  imageSrc?: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string | number;
  containerWidth?: string | number;
  imageHeight?: string | number;
  imageWidth?: string | number;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  overlayDepth?: number;
  children?: React.ReactNode;
  backContent?: React.ReactNode;
  flipOnClick?: boolean;
  flipped?: boolean;
  onFlip?: (isFlipped: boolean) => void;
  glareEffect?: boolean;
  glareIntensity?: number;
  glareColor?: string;
  rimGlare?: boolean;
  rimColor?: string;
  springTension?: number;
  springFriction?: number;
  perspective?: number;
  gyroscope?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface TiltedCardLayerProps {
  depth?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const TiltedCard = _TiltedCard as unknown as React.FC<TiltedCardProps>;
export const TiltedCardLayer = _TiltedCardLayer as unknown as React.FC<TiltedCardLayerProps>;
export default TiltedCard;
export * from './TiltedCard';
