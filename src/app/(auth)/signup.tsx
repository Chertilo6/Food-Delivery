import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import AuthScreen from '../../components/AuthScreen';
import Button from '../../components/Button';
import EyeIcon from '../../components/EyeIcon';
import Field from '../../components/Field';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const eye = (visible: boolean, toggle: () => void) => (
    <Pressable accessibilityRole="button" accessibilityLabel="Показать пароль" hitSlop={10} onPress={toggle}>
      <EyeIcon off={visible} />
    </Pressable>
  );

  return (
    <AuthScreen title="Регистрация" subtitle="Зарегистрируйтесь, чтобы начать">
      <Field label="Имя" placeholder="Иван Иванов" value={name} onChangeText={setName} autoCapitalize="words" />
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
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        right={eye(showPassword, () => setShowPassword((v) => !v))}
      />
      <Field
        label="Повторите пароль"
        placeholder="* * * * * * * * *"
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry={!showConfirm}
        autoCapitalize="none"
        right={eye(showConfirm, () => setShowConfirm((v) => !v))}
      />
      <View style={{ height: 8 }} />
      <Button title="Зарегистрироваться" onPress={() => router.push({ pathname: '/verification', params: { email: email || 'example@gmail.com' } })} />
    </AuthScreen>
  );
}
