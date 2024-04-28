import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors, fonts } from '../../utils';
import { BannerSlider, HeaderComponent, Jarak, ListJerseys, ListLiga, Tombol } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
 

export default function MainMenu() {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            dispatch(getLiga())
            dispatch(getLimitJersey())
        }
    }, [isFocused]);

    return (
        <View style={styles.page}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderComponent />
                <BannerSlider />
                <View style={styles.pilihLiga}>
                    <Text style={styles.label}>Gendre</Text>
                    <ListLiga />
                </View>

                <View style={styles.pilihJersey}>
                    <Text style={styles.label}>
                        Now <Text style={styles.boldLabel}>Playing</Text> on Bioskop
                    </Text>
                    <ListJerseys />

                    <Tombol title="Lihat Semua" type="text" padding={7} />
                </View>

                <Jarak height={100} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    page: { flex: 1, backgroundColor: colors.white },
    pilihLiga: {
        marginHorizontal: 30,
        marginTop: 10,
    },
    pilihJersey: {
        marginHorizontal: 30,
        marginTop: 10,
    },
    label: {
        fontSize: 18,
        fontFamily: fonts.primary.regular,
    },
    boldLabel: {
        fontSize: 18,
        fontFamily: fonts.primary.bold,
    },
});