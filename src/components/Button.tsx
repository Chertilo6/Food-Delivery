import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, fonts } from '../theme';

type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
};

export default function Button({ title, onPress, style, disabled }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 }, style]}
    >
      <Text style={styles.text}>{title.toUpperCase()}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { ...fonts.bold, fontSize: 14, color: colors.white, letterSpacing: 0.4 },
});
