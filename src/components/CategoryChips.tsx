import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

type Props = {
    categories: string[];
    selected: string;
    onSelect: (category: string) => void;
};

const emojis: Record<string, string> = {
    Все: '🔥',
    Мясо: '🥩',
    Рыба: '🐟',
    Молочное: '🥛',
    Овощи: '🥦',
    Фрукты: '🍎',
    'Крупы и хлеб': '🍞',
    Бакалея: '🛒',
};

export default function CategoryChips({ categories, selected, onSelect }: Props) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
            {categories.map((category) => {
                const active = category === selected;
                return (
                    <Pressable
                        key={category}
                        accessibilityRole="button"
                        accessibilityState={{ selected: active }}
                        onPress={() => onSelect(category)}
                        style={[styles.chip, active && styles.chipActive]}
                    >
                        <View style={styles.emojiCircle}>
                            <Text style={styles.emoji}>{emojis[category] ?? '🍽️'}</Text>
                        </View>
                        <Text style={[styles.label, active && styles.labelActive]}>{category}</Text>
                    </Pressable>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    row: { gap: 10, paddingVertical: 6, paddingHorizontal: 4 },
    chip: {
        height: 46,
        borderRadius: 23,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 6,
        paddingRight: 16,
        gap: 8,
        shadowColor: '#3C4A6B',
        shadowOpacity: 0.12,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    },
    chipActive: { backgroundColor: colors.primary },
    emojiCircle: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.input, alignItems: 'center', justifyContent: 'center' },
    emoji: { fontSize: 18 },
    label: { ...fonts.semiBold, fontSize: 14, color: colors.title },
    labelActive: { color: colors.white },
});