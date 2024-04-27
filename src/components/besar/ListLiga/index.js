import React from 'react'
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native'
import { CardLiga } from '../../kecil'
import { useSelector } from 'react-redux';
import { colors } from '../../../utils'

const ListLiga = () => {
    const { getListLigaLoading,
        getListLigaResult,
        getListLigaError } = useSelector((state) => state.liga);
        // console.log('liga: ', getListLigaResult)
    return (
        <View style={styles.container}>
            {getListLigaResult ? (
                Object.keys(getListLigaResult).map((key) => {
                    return <CardLiga liga={getListLigaResult[key]} key={key} id={key} />;
                })
            ) : getListLigaLoading ? (
                <View style={styles.loading}>
                    <ActivityIndicator color={colors.primary} />
                </View>
            ) : getListLigaError ? (
                <Text>{getListLigaError}</Text>
            ) : (
                <Text>Data Kosong</Text>
            )}
        </View>
    )
}

export default ListLiga

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    }
})
