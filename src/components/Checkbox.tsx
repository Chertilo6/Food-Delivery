import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, fonts } from '../theme';

type Props = { label: string; checked: boolean; onToggle: () => void };

export default function Checkbox({ label, checked, onToggle }: Props) {
  return (
    <Pressable accessibilityRole="checkbox" accessibilityState={{ checked }} onPress={onToggle} style={styles.row}>
      <View style={[styles.box, checked && styles.boxOn]}>
        {checked ? (
          <Svg width={12} height={12} viewBox="0 0 24 24">
            <Path d="m5 12 5 5 9-10" fill="none" stroke={colors.white} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        ) : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  box: { width: 20, height: 20, borderRadius: 4, borderWidth: 1.5, borderColor: colors.line, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white },
  boxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  label: { ...fonts.regular, fontSize: 14, color: colors.grayText },
});
