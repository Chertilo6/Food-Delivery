import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

type Props = {
    onPress: () => void;
    label: string;
    dark?: boolean;
    badge?: number;
    dot?: boolean;
    children: ReactNode;
};

export default function CircleButton({ onPress, label, dark, badge = 0, dot, children }: Props) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={label}
            onPress={onPress}
            style={({ pressed }) => [styles.button, dark ? styles.dark : styles.light, pressed && { opacity: 0.8 }]}
        >
            {children}
            {badge > 0 ? (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
                </View>
            ) : null}
            {dot ? <View style={styles.dot} /> : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: { width: 45, height: 45, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
    light: { backgroundColor: '#ECF0F4' },
    dark: { backgroundColor: colors.title },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        minWidth: 22,
        height: 22,
        borderRadius: 11,
        paddingHorizontal: 5,
        backgroundColor: colors.primary,
        borderWidth: 2,
        borderColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: { ...fonts.bold, fontSize: 11, color: colors.white },
    dot: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.primary,
        borderWidth: 2,
        borderColor: colors.white,
    },
});