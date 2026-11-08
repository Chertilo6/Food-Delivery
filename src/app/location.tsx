import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Button from '../components/Button';
import Illustration from '../components/Illustration';
import TargetIcon from '../components/TargetIcon';
import { colors, fonts } from '../theme';

export default function LocationScreen() {
    const { width } = useWindowDimensions();
    const size = Math.min(300, width - 48);

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.content}>
                <Illustration name="location" width={size} height={size} />
                <Button
                    title="Доступ к геопозиции"
                    onPress={() => router.replace('/home')}
                    right={<TargetIcon />}
                    style={styles.button}
                />
                <Text style={styles.note}>
                    Food получит доступ к вашей геопозиции только во время использования приложения
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white, justifyContent: 'center', paddingHorizontal: 24 },
    content: { alignItems: 'center' },
    button: { alignSelf: 'stretch', marginTop: 40 },
    note: {
        ...fonts.regular,
        fontSize: 13,
        lineHeight: 20,
        color: colors.grayText,
        textAlign: 'center',
        textTransform: 'uppercase',
        marginTop: 32,
        paddingHorizontal: 24,
    },
});