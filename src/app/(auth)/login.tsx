import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import AuthScreen from '../../components/AuthScreen';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import EyeIcon from '../../components/EyeIcon';
import Field from '../../components/Field';
import SocialButtons from '../../components/SocialButtons';
import { colors, fonts } from '../../theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <AuthScreen title="Вход" subtitle="Войдите в свой аккаунт">
      <Field
        label="Эл. почта"
        placeholder="example@gmail.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Field
        label="Пароль"
        placeholder="* * * * * * * * *"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!visible}
        autoCapitalize="none"
        right={
          <Pressable accessibilityRole="button" accessibilityLabel="Показать пароль" hitSlop={10} onPress={() => setVisible((v) => !v)}>
            <EyeIcon off={visible} />
          </Pressable>
        }
      />

      <View style={styles.optionsRow}>
        <Checkbox label="Запомнить меня" checked={remember} onToggle={() => setRemember((v) => !v)} />
        <Pressable accessibilityRole="link" hitSlop={10} onPress={() => router.push('/forgot-password')}>
          <Text style={styles.forgot}>Забыли пароль?</Text>
        </Pressable>
      </View>

      <Button title="Войти" onPress={() => router.replace('/home')} style={styles.button} />

      <View style={styles.signUpRow}>
        <Text style={styles.gray}>Нет аккаунта? </Text>
        <Pressable accessibilityRole="link" hitSlop={10} onPress={() => router.push('/signup')}>
          <Text style={styles.signUp}>РЕГИСТРАЦИЯ</Text>
        </Pressable>
      </View>

      <Text style={styles.or}>Или</Text>
      <SocialButtons />
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  optionsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4, marginBottom: 24 },
  forgot: { ...fonts.regular, fontSize: 14, color: colors.primary },
  button: { marginBottom: 24 },
  signUpRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  gray: { ...fonts.regular, fontSize: 14, color: colors.grayText },
  signUp: { ...fonts.bold, fontSize: 14, color: colors.primary, letterSpacing: 0.3 },
  or: { ...fonts.regular, fontSize: 16, color: colors.grayText, textAlign: 'center', marginVertical: 14 },
});
