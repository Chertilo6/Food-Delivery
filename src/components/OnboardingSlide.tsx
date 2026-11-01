import React from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from './Button';
import Illustration, { IllustrationName } from './Illustration';
import { colors, fonts } from '../theme';

type Props = {
  illustration: IllustrationName;
  title: string;
  text: string;
  step: number;
  buttonTitle: string;
  onNext: () => void;
  showSkip?: boolean;
};

export default function OnboardingSlide({ illustration, title, text, step, buttonTitle, onNext, showSkip = true }: Props) {
  const insets = useSafeAreaInsets();
  const { height: screenH, width: screenW } = useWindowDimensions();
  const artH = Math.min(360, screenH * 0.44, (screenW - 48) * (298 / 280));
  const artW = artH * (280 / 298);
  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 16) }]}>
      <StatusBar style="dark" />
      <View style={styles.art}>
        <Illustration name={illustration} width={artW} height={artH} />
      </View>
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.dots}>
          {[0, 1, 2].map((i) => (
            <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
          ))}
        </View>
      </View>
      <View style={styles.actions}>
        <Button title={buttonTitle} onPress={onNext} />
        {showSkip ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Пропустить" onPress={() => router.replace('/login')} hitSlop={10} style={styles.skip}>
            <Text style={styles.skipText}>Пропустить</Text>
          </Pressable>
        ) : (
          <View style={styles.skip} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 24 },
  art: { flex: 1.15, alignItems: 'center', justifyContent: 'center' },
  texts: { alignItems: 'center' },
  title: { ...fonts.bold, fontSize: 24, color: colors.title, textAlign: 'center' },
  text: { ...fonts.regular, fontSize: 16, lineHeight: 24, color: colors.grayText, textAlign: 'center', marginTop: 14, maxWidth: 320 },
  dots: { flexDirection: 'row', gap: 6, marginTop: 24, alignItems: 'center' },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primarySoft },
  dotActive: { backgroundColor: colors.primary },
  actions: { marginTop: 28 },
  skip: { height: 44, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  skipText: { ...fonts.regular, fontSize: 16, color: colors.grayText },
});
