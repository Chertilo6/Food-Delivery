import React, { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SunBurst from './SunBurst';
import { colors, fonts } from '../theme';

type Props = {
  title: string;
  subtitle?: string;
  highlight?: string;
  children: ReactNode;
  footer?: ReactNode;
  scroll?: boolean;
};

export default function AuthScreen({ title, subtitle, highlight, children, footer, scroll = true }: Props) {
  const insets = useSafeAreaInsets();
  const Body = scroll ? ScrollView : View;
  const bodyProps = scroll
    ? { keyboardShouldPersistTaps: 'handled' as const, showsVerticalScrollIndicator: false, contentContainerStyle: styles.content }
    : { style: styles.content };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View pointerEvents="none" style={styles.burstLeft}>
          <SunBurst size={190} rays={22} color="#FFFFFF" opacity={0.09} />
        </View>
        <View pointerEvents="none" style={styles.burstRight}>
          <SunBurst size={190} rays={22} color="#FFFFFF" opacity={0.09} />
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Назад"
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/login'))}
          style={[styles.back, { top: insets.top + 12 }]}
        >
          <Svg width={18} height={18} viewBox="0 0 24 24">
            <Path d="m15 5-7 7 7 7" fill="none" stroke={colors.dark} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </Pressable>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        {highlight ? <Text style={styles.highlight}>{highlight}</Text> : null}
      </View>
      <View style={styles.card}>
        <Body {...(bodyProps as object)}>{children}</Body>
      </View>
      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.dark },
  header: { height: 232, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: 0 },
  burstLeft: { position: 'absolute', left: -95, top: -95 },
  burstRight: { position: 'absolute', right: -95, top: -95 },
  back: {
    position: 'absolute',
    left: 24,
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { ...fonts.bold, fontSize: 30, color: colors.white, marginTop: 26 },
  subtitle: { ...fonts.regular, fontSize: 16, color: colors.white, opacity: 0.85, marginTop: 4, textAlign: 'center' },
  highlight: { ...fonts.semiBold, fontSize: 16, color: colors.white, textAlign: 'center' },
  card: { flex: 1, backgroundColor: colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: 'hidden' },
  content: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 28, flexGrow: 1 },
});
