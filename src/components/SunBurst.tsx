import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  size: number;
  rays?: number;
  color: string;
  opacity?: number;
  inner?: number;
  sweep?: number;
  start?: number;
};

export default function SunBurst({ size, rays = 28, color, opacity = 1, inner = 0.18, sweep = 1, start = 0 }: Props) {
  const c = size / 2;
  const rIn = c * inner;
  const rOut = c;
  const step = (Math.PI * 2 * sweep) / rays;
  const a0 = (start * Math.PI) / 180;
  const half = step * 0.28;
  const d: string[] = [];
  for (let i = 0; i < rays; i++) {
    const a = a0 + i * step;
    const p = (r: number, ang: number) => `${(c + r * Math.cos(ang)).toFixed(2)} ${(c + r * Math.sin(ang)).toFixed(2)}`;
    d.push(`M${p(rIn, a - half * 0.45)} L${p(rOut, a - half)} L${p(rOut, a + half)} L${p(rIn, a + half * 0.45)} Z`);
  }
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Path d={d.join(' ')} fill={color} opacity={opacity} />
    </Svg>
  );
}
