import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import AuthScreen from '../../components/AuthScreen';
import Button from '../../components/Button';
import EyeIcon from '../../components/EyeIcon';
import Field from '../../components/Field';
import { validateEmail, validateRequired } from '../../utils/validation';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirm?: string }>({});

  const clearError = (field: 'name' | 'email' | 'password' | 'confirm') => {
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = () => {
    let confirmError = validateRequired(confirm, 'Повторите пароль');
    if (!confirmError && confirm !== password) confirmError = 'Пароли не совпадают';
    const found = {
      name: validateRequired(name, 'Введите имя'),
      email: validateEmail(email),
      password: validateRequired(password, 'Введите пароль'),
      confirm: confirmError,
    };
    if (found.name || found.email || found.password || found.confirm) {
      setErrors(found);
      return;
    }
    router.push({ pathname: '/verification', params: { email: email.trim() } });
  };

  const eye = (visible: boolean, toggle: () => void) => (
    <Pressable accessibilityRole="button" accessibilityLabel="Показать пароль" hitSlop={10} onPress={toggle}>
      <EyeIcon off={visible} />
    </Pressable>
  );

  return (
    <AuthScreen title="Регистрация" subtitle="Зарегистрируйтесь, чтобы начать">
      <Field
        label="Имя"
        placeholder="Иван Иванов"
        value={name}
        onChangeText={(text) => {
          setName(text);
          clearError('name');
        }}
        error={errors.name}
        autoCapitalize="words"
      />
      <Field
        label="Эл. почта"
        placeholder="example@gmail.com"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          clearError('email');
        }}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Field
        label="Пароль"
        placeholder="* * * * * * * * *"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          clearError('password');
        }}
        error={errors.password}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        right={eye(showPassword, () => setShowPassword((v) => !v))}
      />
      <Field
        label="Повторите пароль"
        placeholder="* * * * * * * * *"
        value={confirm}
        onChangeText={(text) => {
          setConfirm(text);
          clearError('confirm');
        }}
        error={errors.confirm}
        secureTextEntry={!showConfirm}
        autoCapitalize="none"
        right={eye(showConfirm, () => setShowConfirm((v) => !v))}
      />
      <View style={{ height: 8 }} />
      <Button title="Зарегистрироваться" onPress={submit} />
    </AuthScreen>
  );
}