import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { CloseIcon, SearchIcon } from './icons';
import { colors, fonts } from '../theme';

type Props = {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
};

export default function SearchField({ value, onChangeText, placeholder = 'Поиск продуктов' }: Props) {
    return (
        <View style={styles.box}>
            <SearchIcon />
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.gray}
                selectionColor={colors.primary}
                returnKeyType="search"
                autoCorrect={false}
                style={styles.input}
            />
            {value.length > 0 ? (
                <Pressable accessibilityRole="button" accessibilityLabel="Очистить поиск" hitSlop={10} onPress={() => onChangeText('')} style={styles.clear}>
                    <CloseIcon />
                </Pressable>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        height: 52,
        borderRadius: 14,
        backgroundColor: colors.input,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        gap: 10,
    },
    input: { flex: 1, height: 52, ...fonts.regular, fontSize: 15, color: colors.title, paddingVertical: 0, outlineStyle: 'none' } as never,
    clear: { width: 20, height: 20, borderRadius: 10, backgroundColor: colors.gray, alignItems: 'center', justifyContent: 'center' },
});