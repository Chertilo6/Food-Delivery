import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MinusIcon, PlusIcon } from './icons';
import { colors, fonts } from '../theme';

type Props = {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
};

export default function QuantityControl({ quantity, onIncrease, onDecrease }: Props) {
    return (
        <View style={styles.row}>
            <Pressable accessibilityRole="button" accessibilityLabel="Убрать один" onPress={onDecrease} hitSlop={6} style={[styles.button, styles.minus]}>
                <MinusIcon size={14} />
            </Pressable>
            <Text style={styles.quantity}>{quantity}</Text>
            <Pressable accessibilityRole="button" accessibilityLabel="Добавить ещё один" onPress={onIncrease} hitSlop={6} style={[styles.button, styles.plus]}>
                <PlusIcon size={14} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center' },
    button: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
    minus: { backgroundColor: '#FFE7D9' },
    plus: { backgroundColor: colors.primary },
    quantity: { ...fonts.bold, fontSize: 15, color: colors.title, minWidth: 28, textAlign: 'center' },
});