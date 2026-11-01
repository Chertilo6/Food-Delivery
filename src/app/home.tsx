import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Button from '../components/Button';
import Logo from '../components/Logo';
import { colors, fonts } from '../theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Logo size={40} />
      <Text style={styles.text}>Добро пожаловать! Главный экран скоро появится.</Text>
      <Button title="Выйти" onPress={() => router.replace('/login')} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', padding: 24 },
  text: { ...fonts.regular, fontSize: 16, color: colors.grayText, marginTop: 24, marginBottom: 32, textAlign: 'center' },
  button: { alignSelf: 'stretch' },
});
