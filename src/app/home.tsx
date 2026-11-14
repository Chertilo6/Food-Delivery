import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchProducts, Product } from '../api/products';
import Button from '../components/Button';
import CircleButton from '../components/CircleButton';
import FilterSheet, { ALL_CATEGORIES, SortKey } from '../components/FilterSheet';
import { CartIcon, FilterIcon } from '../components/icons';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { colors, fonts } from '../theme';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { totalCount } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState<SortKey>('default');
  const [category, setCategory] = useState(ALL_CATEGORIES);

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

  const categories = useMemo(() => [ALL_CATEGORIES, ...Array.from(new Set(products.map((item) => item.category)))], [products]);

  const visible = useMemo(() => {
    const filtered = category === ALL_CATEGORIES ? products : products.filter((item) => item.category === category);
    const sorted = [...filtered];
    if (sort === 'priceAsc') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'priceDesc') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'nameAsc') sorted.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
    return sorted;
  }, [products, sort, category]);

  const filtersActive = sort !== 'default' || category !== ALL_CATEGORIES;

  const resetFilters = () => {
    setSort('default');
    setCategory(ALL_CATEGORIES);
  };

  const retry = () => {
    setLoading(true);
    setAttempt((n) => n + 1);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <CircleButton label="Фильтры и сортировка" dot={filtersActive} onPress={() => setFilterOpen(true)}>
          <FilterIcon />
        </CircleButton>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>Продукты</Text>
          {!loading && !error ? (
            <Text style={styles.count}>
              Показано: {visible.length} из {products.length}
            </Text>
          ) : null}
        </View>
        <CircleButton label="Корзина" dark badge={totalCount} onPress={() => router.push('/cart')}>
          <CartIcon color={colors.white} />
        </CircleButton>
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
          data={visible}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard product={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
          ListFooterComponent={
            <Pressable accessibilityRole="button" hitSlop={10} onPress={() => router.replace('/login')} style={styles.logout}>
              <Text style={styles.logoutText}>Выйти из аккаунта</Text>
            </Pressable>
          }
          contentContainerStyle={{ paddingBottom: insets.bottom + 24, paddingHorizontal: 4 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <FilterSheet
        visible={filterOpen}
        categories={categories}
        sort={sort}
        category={category}
        onChangeSort={setSort}
        onChangeCategory={setCategory}
        onReset={resetFilters}
        onClose={() => setFilterOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  headerCenter: { flex: 1, alignItems: 'center' },
  title: { ...fonts.bold, fontSize: 22, color: colors.title },
  count: { ...fonts.regular, fontSize: 13, color: colors.gray, marginTop: 2 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  error: { ...fonts.regular, fontSize: 15, color: colors.grayText, textAlign: 'center', marginBottom: 20 },
  retry: { alignSelf: 'stretch' },
  logout: { alignItems: 'center', paddingVertical: 24 },
  logoutText: { ...fonts.regular, fontSize: 15, color: colors.primary },
});