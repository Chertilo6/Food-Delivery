import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchProducts, Product } from '../api/products';
import Button from '../components/Button';
import CategoryChips from '../components/CategoryChips';
import CircleButton from '../components/CircleButton';
import FilterSheet, { ALL_CATEGORIES, SortKey } from '../components/FilterSheet';
import { CartIcon, FilterIcon } from '../components/icons';
import Logo from '../components/Logo';
import ProductCard from '../components/ProductCard';
import PromoBanner from '../components/PromoBanner';
import SearchField from '../components/SearchField';
import { useCart } from '../context/CartContext';
import { colors, fonts } from '../theme';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 6) return 'Доброй ночи';
  if (hour < 12) return 'Доброе утро';
  if (hour < 18) return 'Добрый день';
  return 'Добрый вечер';
}

function normalize(text: string) {
  return text.trim().toLowerCase().replace(/ё/g, 'е');
}

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
  const [search, setSearch] = useState('');

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
    const query = normalize(search);
    const filtered = products.filter(
      (item) =>
        (category === ALL_CATEGORIES || item.category === category) && (!query || normalize(item.title).includes(query)),
    );
    const sorted = [...filtered];
    if (sort === 'priceAsc') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'priceDesc') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'nameAsc') sorted.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
    return sorted;
  }, [products, sort, category, search]);

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
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <CircleButton label="Фильтры и сортировка" dot={filtersActive} onPress={() => setFilterOpen(true)}>
          <FilterIcon />
        </CircleButton>
        <Logo size={26} />
        <CircleButton label="Корзина" dark badge={totalCount} onPress={() => router.push('/cart')}>
          <CartIcon color={colors.white} />
        </CircleButton>
      </View>

      <Text style={styles.greeting}>
        Привет! <Text style={styles.greetingBold}>{getGreeting()}!</Text>
      </Text>
      <SearchField value={search} onChangeText={setSearch} />

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
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          ListHeaderComponent={
            <View>
              <View style={styles.chips}>
                <CategoryChips categories={categories} selected={category} onSelect={setCategory} />
              </View>
              <PromoBanner />
              <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>Все продукты</Text>
                <Text style={styles.sectionCount}>
                  {visible.length} из {products.length}
                </Text>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>Ничего не найдено</Text>
              <Text style={styles.emptyText}>Попробуйте изменить запрос или категорию.</Text>
            </View>
          }
          ListFooterComponent={
            <Pressable accessibilityRole="button" hitSlop={10} onPress={() => router.replace('/login')} style={styles.logout}>
              <Text style={styles.logoutText}>Выйти из аккаунта</Text>
            </Pressable>
          }
          contentContainerStyle={{ paddingBottom: insets.bottom + 24, paddingHorizontal: 4 }}
          showsVerticalScrollIndicator={false}
          style={styles.list}
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
  greeting: { ...fonts.regular, fontSize: 16, color: colors.grayText, marginBottom: 14 },
  greetingBold: { ...fonts.bold, color: colors.title },
  list: { marginTop: 8 },
  chips: { marginHorizontal: -4, marginBottom: 14 },
  sectionRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 22, marginBottom: 14 },
  sectionTitle: { ...fonts.bold, fontSize: 20, color: colors.title },
  sectionCount: { ...fonts.regular, fontSize: 14, color: colors.gray },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  error: { ...fonts.regular, fontSize: 15, color: colors.grayText, textAlign: 'center', marginBottom: 20 },
  retry: { alignSelf: 'stretch' },
  empty: { alignItems: 'center', paddingVertical: 48 },
  emptyTitle: { ...fonts.bold, fontSize: 18, color: colors.title },
  emptyText: { ...fonts.regular, fontSize: 14, color: colors.grayText, marginTop: 6, textAlign: 'center' },
  logout: { alignItems: 'center', paddingVertical: 24 },
  logoutText: { ...fonts.regular, fontSize: 15, color: colors.primary },
});