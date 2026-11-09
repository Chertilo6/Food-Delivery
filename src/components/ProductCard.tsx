import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Product } from '../api/products';
import { colors, fonts } from '../theme';

export default function ProductCard({ product }: { product: Product }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                    {product.title}
                </Text>
                <Text style={styles.category}>{product.category}</Text>
            </View>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
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
    image: { width: 72, height: 72, borderRadius: 12, backgroundColor: colors.input },
    info: { flex: 1 },
    title: { ...fonts.semiBold, fontSize: 16, color: colors.title },
    category: { ...fonts.regular, fontSize: 13, color: colors.gray, marginTop: 4 },
    price: { ...fonts.bold, fontSize: 18, color: colors.primary },
});