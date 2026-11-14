import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../components/Button';
import CircleButton from '../components/CircleButton';
import { BackIcon, CheckIcon } from '../components/icons';
import ProductImage from '../components/ProductImage';
import QuantityControl from '../components/QuantityControl';
import { CartItem, useCart } from '../context/CartContext';
import { formatTenge } from '../utils/format';
import { colors, fonts } from '../theme';

function CartRow({ item }: { item: CartItem }) {
    const { add, decrease } = useCart();
    const { product, quantity } = item;

    return (
        <View style={styles.row}>
            <ProductImage uri={product.thumbnail} size={64} />
            <View style={styles.rowInfo}>
                <Text style={styles.rowTitle} numberOfLines={2}>
                    {product.title}
                </Text>
                <Text style={styles.rowUnit}>
                    {formatTenge(product.price)} · за 1 {product.unit}
                </Text>
                <View style={styles.rowControl}>
                    <QuantityControl quantity={quantity} onIncrease={() => add(product)} onDecrease={() => decrease(product.id)} />
                </View>
            </View>
            <Text style={styles.rowTotal}>{formatTenge(product.price * quantity)}</Text>
        </View>
    );
}

export default function CartScreen() {
    const insets = useSafeAreaInsets();
    const { items, totalCount, totalPrice, clear } = useCart();
    const [ordered, setOrdered] = useState(false);

    const order = () => {
        clear();
        setOrdered(true);
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <View style={styles.side}>
                    <CircleButton label="Назад" onPress={() => router.back()}>
                        <BackIcon />
                    </CircleButton>
                </View>
                <Text style={styles.title}>Корзина</Text>
                <View style={[styles.side, styles.sideRight]}>
                    {items.length > 0 ? (
                        <Pressable accessibilityRole="button" hitSlop={10} onPress={clear}>
                            <Text style={styles.clear}>Очистить</Text>
                        </Pressable>
                    ) : null}
                </View>
            </View>

            {ordered ? (
                <View style={styles.center}>
                    <View style={styles.successCircle}>
                        <CheckIcon />
                    </View>
                    <Text style={styles.centerTitle}>Заказ оформлен</Text>
                    <Text style={styles.centerText}>Спасибо! Курьер скоро свяжется с вами.</Text>
                    <Button title="К продуктам" onPress={() => router.back()} style={styles.centerButton} />
                </View>
            ) : items.length === 0 ? (
                <View style={styles.center}>
                    <Text style={styles.centerTitle}>Корзина пуста</Text>
                    <Text style={styles.centerText}>Добавьте продукты из списка.</Text>
                    <Button title="К продуктам" onPress={() => router.back()} style={styles.centerButton} />
                </View>
            ) : (
                <>
                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.product.id}
                        renderItem={({ item }) => <CartRow item={item} />}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 16 }}
                    />
                    <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
                        <View style={styles.totalRow}>
                            <View>
                                <Text style={styles.totalLabel}>Итого</Text>
                                <Text style={styles.totalCount}>Товаров: {totalCount}</Text>
                            </View>
                            <Text style={styles.totalPrice}>{formatTenge(totalPrice)}</Text>
                        </View>
                        <Button title="Оформить заказ" onPress={order} />
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 20 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
    side: { width: 90, alignItems: 'flex-start' },
    sideRight: { alignItems: 'flex-end' },
    title: { ...fonts.bold, fontSize: 22, color: colors.title },
    clear: { ...fonts.regular, fontSize: 15, color: colors.primary },
    row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
    rowInfo: { flex: 1 },
    rowTitle: { ...fonts.semiBold, fontSize: 16, color: colors.title },
    rowUnit: { ...fonts.regular, fontSize: 13, color: colors.gray, marginTop: 2 },
    rowControl: { marginTop: 10, alignSelf: 'flex-start' },
    rowTotal: { ...fonts.bold, fontSize: 16, color: colors.primary },
    separator: { height: 1, backgroundColor: colors.line },
    footer: { borderTopWidth: 1, borderTopColor: colors.line, paddingTop: 16, gap: 16 },
    totalRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    totalLabel: { ...fonts.bold, fontSize: 18, color: colors.title },
    totalCount: { ...fonts.regular, fontSize: 13, color: colors.gray, marginTop: 2 },
    totalPrice: { ...fonts.bold, fontSize: 26, color: colors.title },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 60 },
    successCircle: { width: 84, height: 84, borderRadius: 42, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
    centerTitle: { ...fonts.bold, fontSize: 22, color: colors.title },
    centerText: { ...fonts.regular, fontSize: 15, color: colors.grayText, textAlign: 'center', marginTop: 8 },
    centerButton: { alignSelf: 'stretch', marginTop: 28 },
});