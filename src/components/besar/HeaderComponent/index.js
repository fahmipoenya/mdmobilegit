import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { colors, fonts, responsiveHeight } from '../../../utils';
import { IconCari } from '../../../../assets/icons'
import { Jarak, Tombol } from '../../kecil'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
 

export default function HeaderComponent({ page }) {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const selesaiCari = () => {
        //jalankan action save keyword
        dispatch(saveKeywordJersey(search));

        //jika itu halaman home kita navigate ke listJersey
        if (page !== "ListFilm") {
            navigation.navigate("ListFilm");
        }

        //kembalikan state search itu ke string kosong
        setSearch("");
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapperHeader}>

                {/* Input Pencarian  */}
                <View style={styles.searchSection}>
                    <IconCari />
                    <TextInput
                        placeholder="Cari Film. . ." style={styles.input}
                        value={search}
                        onChangeText={(search) => setSearch(search)}
                        onSubmitEditing={() => selesaiCari()}
                    />
                </View>
                <Jarak width={10} />
          <Tombol
            icon="sort"
            padding={10}
            onPress={() => navigation.navigate('SortPage')}
          />
          <Jarak width={10} />
          <Tombol
            icon="filter"
            padding={10}
            onPress={() => navigation.navigate('FilterPage')}
          />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        height: responsiveHeight(125),
    },
    wrapperHeader: {
        marginTop: 15,
        marginHorizontal: 30,
        flexDirection: 'row',
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 5,
        paddingLeft: 10,
        alignItems: 'center'
    },
    input: {
        fontSize: 16,
        fontFamily: fonts.primary.regular
    },
});