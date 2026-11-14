import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchProducts, Product } from '../api/products';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { colors, fonts } from '../theme';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchProducts()
      .then((items) => {
        if (!cancelled) {
          setProducts(items);
          setError('');
        }
      })
      .catch(() => {
        if (!cancelled) setError('Не удалось загрузить продукты. Проверьте интернет.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = () => {
    setLoading(true);
    setAttempt((n) => n + 1);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Продукты</Text>
          {!loading && !error ? <Text style={styles.count}>Всего: {products.length}</Text> : null}
        </View>
        <Pressable accessibilityRole="button" hitSlop={10} onPress={() => router.replace('/login')}>
          <Text style={styles.logout}>Выйти</Text>
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
          <Button title="Повторить" onPress={retry} style={styles.retry} />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ProductCard product={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
          contentContainerStyle={{ paddingBottom: insets.bottom + 24, paddingHorizontal: 4 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  title: { ...fonts.bold, fontSize: 26, color: colors.title },
  count: { ...fonts.regular, fontSize: 14, color: colors.gray, marginTop: 2 },
  logout: { ...fonts.regular, fontSize: 15, color: colors.primary },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  error: { ...fonts.regular, fontSize: 15, color: colors.grayText, textAlign: 'center', marginBottom: 20 },
  retry: { alignSelf: 'stretch' },
});  