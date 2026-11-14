import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type IconProps = { color?: string; size?: number };

const base = { fill: 'none' as const, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export function FilterIcon({ color = '#181C2E', size = 20 }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path {...base} d="M3 7h18M3 17h12" stroke={color} strokeWidth={2.2} />
        </Svg>
    );
}

export function CartIcon({ color = '#181C2E', size = 20 }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path {...base} d="M3 4h2.2l2.1 10.2a1.6 1.6 0 0 0 1.6 1.3h7.9a1.6 1.6 0 0 0 1.6-1.2L20 8H6.2" stroke={color} strokeWidth={2} />
            <Circle cx="9.5" cy="19.5" r="1.5" fill={color} />
            <Circle cx="16.5" cy="19.5" r="1.5" fill={color} />
        </Svg>
    );
}

export function PlusIcon({ color = '#FFFFFF', size = 16 }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path {...base} d="M12 5v14M5 12h14" stroke={color} strokeWidth={2.6} />
        </Svg>
    );
}

export function MinusIcon({ color = '#FF7622', size = 16 }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path {...base} d="M5 12h14" stroke={color} strokeWidth={2.6} />
        </Svg>
    );
}

export function BackIcon({ color = '#181C2E', size = 18 }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path {...base} d="m15 5-7 7 7 7" stroke={color} strokeWidth={2.4} />
        </Svg>
    );
}

export function CheckIcon({ color = '#FFFFFF', size = 40 }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path {...base} d="m5 12 5 5 9-10" stroke={color} strokeWidth={2.6} />
        </Svg>
    );
}

export function SearchIcon({ color = '#A0A5BA', size = 20 }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth={2.2} fill="none" />
            <Path {...base} d="m20 20-3.5-3.5" stroke={color} strokeWidth={2.2} />
        </Svg>
    );
}

export function CloseIcon({ color = '#FFFFFF', size = 12 }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path {...base} d="M6 6l12 12M18 6 6 18" stroke={color} strokeWidth={3} />
        </Svg>
    );
}