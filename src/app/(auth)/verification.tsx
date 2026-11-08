import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import AuthScreen from '../../components/AuthScreen';
import Button from '../../components/Button';
import NumPad from '../../components/NumPad';
import { colors, fonts } from '../../theme';

const CODE_LENGTH = 4;
const RESEND_SECONDS = 50;

export default function VerificationScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [code, setCode] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const addDigit = (d: string) => setCode((c) => (c.length < CODE_LENGTH ? [...c, d] : c));
  const removeDigit = () => setCode((c) => c.slice(0, -1));
  const resend = () => {
    if (seconds > 0) return;
    setCode([]);
    setSeconds(RESEND_SECONDS);
  };

  return (
    <AuthScreen
      title="Подтверждение"
      subtitle="Мы отправили код на вашу почту"
      highlight={email || 'example@gmail.com'}
      scroll={false}
      footer={<NumPad onDigit={addDigit} onDelete={removeDigit} />}
    >
      <View style={styles.labelRow}>
        <Text style={styles.label}>КОД</Text>
        <View style={styles.resendWrap}>
          <Pressable accessibilityRole="button" disabled={seconds > 0} onPress={resend} hitSlop={8}>
            <Text style={[styles.resend, seconds === 0 && { color: colors.primary }]}>Отправить снова</Text>
          </Pressable>
          <Text style={styles.timer}>{seconds > 0 ? ` через ${String(seconds).padStart(2, '0')} сек` : ''}</Text>
        </View>
      </View>

      <View style={styles.cells}>
        {Array.from({ length: CODE_LENGTH }).map((_, i) => (
          <View key={i} style={[styles.cell, i === code.length && styles.cellActive]}>
            <Text style={styles.cellText}>{code[i] ?? ''}</Text>
          </View>
        ))}
      </View>

      <Button
        title="Подтвердить"
        disabled={code.length < CODE_LENGTH}
        onPress={() => router.replace('/location')}
      />
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  label: { ...fonts.regular, fontSize: 13, color: colors.label },
  resendWrap: { flexDirection: 'row', alignItems: 'center' },
  resend: { ...fonts.regular, fontSize: 13, color: colors.label, textDecorationLine: 'underline' },
  timer: { ...fonts.regular, fontSize: 13, color: colors.label },
  cells: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 28 },
  cell: { width: 62, height: 62, borderRadius: 10, backgroundColor: colors.input, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: 'transparent' },
  cellActive: { borderColor: colors.primary, backgroundColor: colors.white },
  cellText: { ...fonts.semiBold, fontSize: 20, color: colors.title },
});
