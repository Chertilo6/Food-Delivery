import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, logoFont } from '../theme';

type Props = { size?: number };

export default function Logo({ size = 30 }: Props) {
  const roofW = size * 0.95;
  const roofH = size * 0.5;
  return (
    <View style={styles.row}>
      <Text style={[styles.letter, { fontSize: size }]}>F</Text>
      <Text style={[styles.letter, { fontSize: size }]}>o</Text>
      <View>
        <Svg
          width={roofW}
          height={roofH}
          viewBox="0 0 30 16"
          style={{ position: 'absolute', top: -size * 0.12, left: -size * 0.03 }}
        >
          <Path d="M1 15 L15 2 L29 15 L23.5 15 L15 7.6 L6.5 15 Z" fill={colors.primary} />
        </Svg>
        <Text style={[styles.letter, { fontSize: size }]}>o</Text>
      </View>
      <Text style={[styles.letter, { fontSize: size }]}>d</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end' },
  letter: { fontFamily: logoFont, color: colors.dark, includeFontPadding: false },
});
