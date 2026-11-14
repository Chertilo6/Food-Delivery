import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Product } from '../api/products';
import { useCart } from '../context/CartContext';
import { formatTenge } from '../utils/format';
import { PlusIcon } from './icons';
import ProductImage from './ProductImage';
import QuantityControl from './QuantityControl';
import { colors, fonts } from '../theme';

export default function ProductCard({ product }: { product: Product }) {
    const { getQuantity, add, decrease } = useCart();
    const quantity = getQuantity(product.id);

    return (
        <View style={styles.card}>
            <ProductImage uri={product.thumbnail} />
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                    {product.title}
                </Text>
                <Text style={styles.category} numberOfLines={1}>
                    {product.category} · за 1 {product.unit}
                </Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.price}>{formatTenge(product.price)}</Text>
                {quantity === 0 ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Добавить в корзину: ${product.title}`}
                        onPress={() => add(product)}
                        style={styles.addButton}
                    >
                        <PlusIcon />
                    </Pressable>
                ) : (
                    <QuantityControl quantity={quantity} onIncrease={() => add(product)} onDecrease={() => decrease(product.id)} />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 12,
        gap: 12,
        shadowColor: '#3C4A6B',
        shadowOpacity: 0.12,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    info: { flex: 1 },
    title: { ...fonts.semiBold, fontSize: 16, color: colors.title },
    category: { ...fonts.regular, fontSize: 13, color: colors.gray, marginTop: 4 },
    right: { alignItems: 'flex-end', gap: 8 },
    price: { ...fonts.bold, fontSize: 16, color: colors.primary },
    addButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
});