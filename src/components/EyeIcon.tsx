import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export default function EyeIcon({ off = false, color = '#A0A5BA', size = 20 }: { off?: boolean; color?: string; size?: number }) {
  const p = { fill: 'none' as const, stroke: color, strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path {...p} d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <Circle {...p} cx="12" cy="12" r="3" />
      {off ? <Path {...p} d="M4 4l16 16" /> : null}
    </Svg>
  );
}
