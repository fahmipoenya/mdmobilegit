import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { CardJersey } from '../../kecil'
import { useSelector } from 'react-redux'
import { colors } from '../../../utils'

const ListJerseys = ({ jerseys }) => {
    const { getListJerseyLoading,
        getListJerseyResult,
        getListJerseyError } = useSelector((state) => state.jersey);

    return (
        <View style={styles.container}>
            {getListJerseyResult ? (
                Object.keys(getListJerseyResult).map((key) => {
                    return (
                        <CardJersey
                            key={key}
                            jersey={getListJerseyResult[key]}
                        />
                    );
                })
            ) : getListJerseyLoading ? (
                <View style={styles.loading}>
                    <ActivityIndicator color={colors.primary} />
                </View>
            ) : getListJerseyError ? (
                <Text>{getListJerseyError}</Text>
            ) : (
                <Text>Data Kosong</Text>
            )}
        </View>
    )
}

export default ListJerseys

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10
    }
})
