import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from './Button';
import { colors, fonts } from '../theme';

export type SortKey = 'default' | 'priceAsc' | 'priceDesc' | 'nameAsc';

export const ALL_CATEGORIES = 'Все';

const sortOptions: { key: SortKey; label: string }[] = [
    { key: 'default', label: 'По умолчанию' },
    { key: 'priceAsc', label: 'Сначала дешёвые' },
    { key: 'priceDesc', label: 'Сначала дорогие' },
    { key: 'nameAsc', label: 'По алфавиту' },
];

type Props = {
    visible: boolean;
    categories: string[];
    sort: SortKey;
    category: string;
    onChangeSort: (value: SortKey) => void;
    onChangeCategory: (value: string) => void;
    onReset: () => void;
    onClose: () => void;
};

function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={onPress}
            style={[styles.chip, selected && styles.chipSelected]}
        >
            <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
        </Pressable>
    );
}

export default function FilterSheet({ visible, categories, sort, category, onChangeSort, onChangeCategory, onReset, onClose }: Props) {
    const insets = useSafeAreaInsets();

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Закрыть" />
                <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16) + 8 }]}>
                    <View style={styles.handle} />
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>Фильтры</Text>
                        <Pressable accessibilityRole="button" hitSlop={10} onPress={onReset}>
                            <Text style={styles.reset}>Сбросить</Text>
                        </Pressable>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.section}>Сортировка</Text>
                        <View style={styles.chips}>
                            {sortOptions.map((option) => (
                                <Chip key={option.key} label={option.label} selected={sort === option.key} onPress={() => onChangeSort(option.key)} />
                            ))}
                        </View>

                        <Text style={styles.section}>Категория</Text>
                        <View style={styles.chips}>
                            {categories.map((item) => (
                                <Chip key={item} label={item} selected={category === item} onPress={() => onChangeCategory(item)} />
                            ))}
                        </View>
                    </ScrollView>

                    <Button title="Готово" onPress={onClose} style={styles.done} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(18,18,35,0.45)' },
    sheet: { maxHeight: '85%', backgroundColor: colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 10 },
    handle: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: colors.line, marginBottom: 14 },
    titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
    title: { ...fonts.bold, fontSize: 22, color: colors.title },
    reset: { ...fonts.regular, fontSize: 15, color: colors.primary },
    section: { ...fonts.semiBold, fontSize: 15, color: colors.label, marginTop: 18, marginBottom: 12 },
    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    chip: { paddingHorizontal: 16, height: 40, borderRadius: 20, backgroundColor: colors.input, alignItems: 'center', justifyContent: 'center' },
    chipSelected: { backgroundColor: colors.primary },
    chipText: { ...fonts.medium, fontSize: 14, color: colors.grayText },
    chipTextSelected: { color: colors.white },
    done: { marginTop: 20 },
});