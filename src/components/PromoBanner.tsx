import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatTenge } from '../utils/format';
import SunBurst from './SunBurst';
import { colors, fonts } from '../theme';

export default function PromoBanner() {
    return (
        <View style={styles.banner}>
            <View pointerEvents="none" style={styles.burst}>
                <SunBurst size={200} rays={20} color={colors.white} opacity={0.16} inner={0.1} />
            </View>
            <Text style={styles.label}>АКЦИЯ</Text>
            <Text style={styles.title}>Бесплатная доставка</Text>
            <Text style={styles.text}>При заказе от {formatTenge(15000)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    banner: { backgroundColor: colors.primary, borderRadius: 20, padding: 20, overflow: 'hidden' },
    burst: { position: 'absolute', right: -60, top: -60 },
    label: { ...fonts.bold, fontSize: 12, color: colors.white, opacity: 0.85, letterSpacing: 1 },
    title: { ...fonts.bold, fontSize: 22, color: colors.white, marginTop: 6 },
    text: { ...fonts.regular, fontSize: 14, color: colors.white, opacity: 0.95, marginTop: 4 },
});