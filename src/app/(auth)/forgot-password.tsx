import React, { useState } from 'react';
import { router } from 'expo-router';
import AuthScreen from '../../components/AuthScreen';
import Button from '../../components/Button';
import Field from '../../components/Field';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  return (
    <AuthScreen title="Забыли пароль" subtitle="Введите почту — мы отправим код">
      <Field
        label="Эл. почта"
        placeholder="example@gmail.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus
      />
      <Button
        title="Отправить код"
        onPress={() => router.push({ pathname: '/verification', params: { email: email || 'example@gmail.com' } })}
      />
    </AuthScreen>
  );
}
