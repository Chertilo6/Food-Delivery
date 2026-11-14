import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import { CartProvider } from '../context/CartContext';
import { colors } from '../theme';

export default function RootLayout() {
  const [loaded] = useFonts({ Poppins_700Bold });

  if (!loaded) return null;

  return (
    <CartProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: colors.white },
        }}
      />
    </CartProvider>
  );
}