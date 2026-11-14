import React, { useState } from 'react';
import { router } from 'expo-router';
import AuthScreen from '../../components/AuthScreen';
import Button from '../../components/Button';
import Field from '../../components/Field';
import { validateEmail } from '../../utils/validation';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    const found = validateEmail(email);
    if (found) {
      setError(found);
      return;
    }
    router.push({ pathname: '/verification', params: { email: email.trim() } });
  };

  return (
    <AuthScreen title="Забыли пароль" subtitle="Введите почту — мы отправим код">
      <Field
        label="Эл. почта"
        placeholder="example@gmail.com"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError('');
        }}
        error={error}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus
      />
      <Button title="Отправить код" onPress={submit} />
    </AuthScreen>
  );
}