import React, { ReactNode } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, fonts } from '../theme';

type Props = TextInputProps & { label: string; right?: ReactNode; error?: string };

export default function Field({ label, right, error, style, ...rest }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
      <View style={[styles.box, error ? styles.boxError : null]}>
        <TextInput
          {...rest}
          placeholderTextColor={colors.gray}
          selectionColor={colors.primary}
          style={[styles.input, style]}
        />
        {right}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 16 },
  label: { ...fonts.regular, fontSize: 12, color: colors.label, marginBottom: 8 },
  box: {
    height: 56,
    borderRadius: 10,
    backgroundColor: colors.input,
    borderWidth: 1,
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 19,
  },
  boxError: { borderColor: colors.error },
  error: { ...fonts.regular, fontSize: 12, color: colors.error, marginTop: 6 },
  input: { flex: 1, height: 56, ...fonts.regular, fontSize: 14, color: colors.grayText, paddingVertical: 0, outlineStyle: 'none' } as never,
});