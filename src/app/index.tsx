import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Logo from '../components/Logo';
import { colors } from '../theme';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => router.replace('/splash-two'), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Logo size={44} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
});
