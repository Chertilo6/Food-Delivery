import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Logo from '../components/Logo';
import SunBurst from '../components/SunBurst';
import { colors } from '../theme';

export default function SplashTwoScreen() {
  useEffect(() => {
    const timer = setTimeout(() => router.replace('/onboarding-one'), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View pointerEvents="none" style={styles.topBurst}>
        <SunBurst size={260} rays={30} color="#E5E7EE" opacity={0.7} inner={0.1} />
      </View>
      <View pointerEvents="none" style={styles.bottomBurst}>
        <SunBurst size={520} rays={30} color={colors.primary} inner={0.02} />
      </View>
      <Logo size={44} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  topBurst: { position: 'absolute', top: -130, alignSelf: 'center' },
  bottomBurst: { position: 'absolute', bottom: -260, left: -40 },
});
