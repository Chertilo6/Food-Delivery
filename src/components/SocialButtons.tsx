import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../theme';

const white = '#FFFFFF';

function Circle({ bg, label, children }: { bg: string; label: string; children: React.ReactNode }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} style={({ pressed }) => [styles.circle, { backgroundColor: bg, opacity: pressed ? 0.8 : 1 }]}>
      {children}
    </Pressable>
  );
}

export default function SocialButtons() {
  return (
    <View style={styles.row}>
      <Circle bg={colors.facebook} label="Войти через Facebook">
        <Svg width={26} height={26} viewBox="0 0 24 24">
          <Path fill={white} d="M13.5 21v-8h2.7l.5-3.2h-3.2V7.9c0-.9.4-1.7 1.8-1.7h1.5V3.4S15.9 3.2 14.7 3.2c-2.6 0-4.3 1.6-4.3 4.4v2.2H7.6V13h2.8v8z" />
        </Svg>
      </Circle>
      <Circle bg={colors.twitter} label="Войти через Twitter">
        <Svg width={26} height={26} viewBox="0 0 24 24">
          <Path fill={white} d="M21 6.6c-.6.3-1.3.5-2 .6.7-.4 1.3-1.1 1.5-1.9-.7.4-1.4.7-2.2.8a3.5 3.5 0 0 0-6 3.2A10 10 0 0 1 5 5.6a3.5 3.5 0 0 0 1.1 4.7c-.6 0-1.1-.2-1.6-.4 0 1.7 1.2 3.1 2.8 3.5-.5.1-1 .2-1.6.1.4 1.4 1.7 2.4 3.3 2.4A7 7 0 0 1 4 17.3 10 10 0 0 0 9.4 19c6.5 0 10.1-5.400 10.1-10.100v-.5c.7-.5 1.200-1.100 1.500-1.800z" />
        </Svg>
      </Circle>
      <Circle bg={colors.apple} label="Войти через Apple">
        <Svg width={26} height={26} viewBox="0 0 24 24">
          <Path fill={white} d="M16.4 12.700c0-2.200 1.800-3.200 1.900-3.300-1-1.500-2.600-1.700-3.200-1.700-1.400-.1-2.600.8-3.300.8s-1.700-.8-2.800-.8c-1.400 0-2.800.8-3.500 2.100-1.500 2.600-.4 6.400 1.100 8.500.7 1 1.600 2.200 2.700 2.100 1.100 0 1.500-.7 2.800-.7s1.700.7 2.800.7c1.200 0 1.900-1 2.600-2.100.8-1.200 1.100-2.300 1.200-2.400-.1 0-2.300-.9-2.300-3.200zM14.300 6.200c.6-.7 1-1.700.9-2.700-.9 0-1.900.6-2.500 1.300-.5.600-1 1.600-.9 2.600 1 .1 1.900-.5 2.500-1.200z" />
        </Svg>
      </Circle>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
  circle: { width: 62, height: 62, borderRadius: 31, alignItems: 'center', justifyContent: 'center' },
});
