import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveWidth, responsiveHeight, colors } from '../../../utils';
import { Slider1, Slider2 } from '../../../../assets/images';
import { SliderBox } from 'react-native-image-slider-box';

export default function BannerSlider() {
    return (
        <View style={styles.container}>
            <SliderBox
                images={[Slider1, Slider2]}
                autoplay
                circleLoop
                sliderBoxHeight={responsiveHeight(132)}
                ImageComponentStyle={styles.slider}
                dotStyle={styles.dotStyle}
                dotColor={colors.primary}
                imageLoadingColor={colors.primary}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: -30
    },
    slider: {
        borderRadius: 10,
        width: responsiveWidth(354),
        height: responsiveHeight(132),
        backgroundColor: 'red'
    },
    dotStyle: {
        width: 10,
        height: 5,
        borderRadius: 5
    },
    wrapper: { marginHorizontal: 30 }
});