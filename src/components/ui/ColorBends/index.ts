export { default } from './ColorBends';
export type ColorBendsProps = {
  rotation?: number;
  speed?: number;
  colors?: string[];
  transparent?: boolean;
  autoResize?: boolean;
  scale?: number;
  frequency?: number;
  warp?: number;
  noise?: number;
  className?: string;
  style?: React.CSSProperties;
};
