import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../theme';

type Props = { onDigit: (d: string) => void; onDelete: () => void };

const LETTERS: Record<string, string> = { '2': 'АБВ', '3': 'ГДЕ', '4': 'ЖЗИ', '5': 'КЛМ', '6': 'НОП', '7': 'РСТ', '8': 'УФХ', '9': 'ЦЧШ' };
const ROWS = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];

function Key({ children, onPress, label, dark }: { children: React.ReactNode; onPress: () => void; label: string; dark?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.key, dark && styles.keyDark, pressed && { backgroundColor: '#B9BCC4' }]}
    >
      {children}
    </Pressable>
  );
}

export default function NumPad({ onDigit, onDelete }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.pad, { paddingBottom: Math.max(insets.bottom, 8) + 14 }]}>
      {ROWS.map((row) => (
        <View key={row[0]} style={styles.row}>
          {row.map((d) => (
            <Key key={d} label={d} onPress={() => onDigit(d)}>
              <Text style={styles.digit}>{d}</Text>
              {LETTERS[d] ? <Text style={styles.letters}>{LETTERS[d]}</Text> : <Text style={styles.letters}> </Text>}
            </Key>
          ))}
        </View>
      ))}
      <View style={styles.row}>
        <View style={styles.spacer} />
        <Key label="0" onPress={() => onDigit('0')}>
          <Text style={styles.digit}>0</Text>
        </Key>
        <Pressable accessibilityRole="button" accessibilityLabel="Удалить" onPress={onDelete} style={styles.delete}>
          <Svg width={26} height={20} viewBox="0 0 26 20">
            <Path d="M8 1h15a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8l-7-9z" fill="none" stroke={colors.dark} strokeWidth={1.6} strokeLinejoin="round" />
            <Path d="m12 6 7 8m0-8-7 8" stroke={colors.dark} strokeWidth={1.6} strokeLinecap="round" />
          </Svg>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pad: { backgroundColor: colors.keypad, paddingTop: 8, paddingHorizontal: 4, gap: 7 },
  row: { flexDirection: 'row', gap: 6, paddingHorizontal: 2 },
  key: { flex: 1, height: 46, borderRadius: 5, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 0, shadowOffset: { width: 0, height: 1 }, elevation: 1 },
  keyDark: { backgroundColor: '#ACB0BA' },
  digit: { ...fonts.regular, fontSize: 22, color: '#000', lineHeight: 26 },
  letters: { ...fonts.semiBold, fontSize: 9, color: '#000', letterSpacing: 1, lineHeight: 10 },
  spacer: { flex: 1 },
  delete: { flex: 1, height: 46, alignItems: 'center', justifyContent: 'center' },
});
