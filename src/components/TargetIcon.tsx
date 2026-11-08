import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

export default function TargetIcon({ size = 28 }: { size?: number }) {
    return (
        <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
            <Svg width={size * 0.64} height={size * 0.64} viewBox="0 0 24 24">
                <Circle cx="12" cy="12" r="5" fill="none" stroke="#FFFFFF" strokeWidth={2} />
                <Circle cx="12" cy="12" r="1.8" fill="#FFFFFF" />
                <Path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" />
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    circle: { backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' },
});