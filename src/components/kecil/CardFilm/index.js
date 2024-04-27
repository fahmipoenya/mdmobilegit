import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  colors,
  fonts,
  numberWithCommas,
  responsiveWidth,
} from "../../../utils";
import Tombol from "../Tombol";
import { useNavigation } from "@react-navigation/native";

const CardFilm = ({ film, index }) => {
  const navigation = useNavigation();
  // console.log(film);
  // console.log(film.Object);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card}>
        <View>
          <Text style={styles.textBold}>{film.Judul}</Text>
          <View style={styles.cardkecil}>
            <View>
              <Text style={styles.text}>{film.RumahProduksi}</Text>
              <Text style={styles.text}>{film.TanggalEdar}</Text>
            </View>
            <View style={styles.wraper}></View>
            <View>
              <Text style={styles.text}>Gendre</Text>
              <Text style={styles.text}>{film.Kategori}</Text>
            </View>
            <View style={styles.wraper}></View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: fonts.primary.regular, fontSize: 10 }}>
                Total Penonton
              </Text>
              <Text style={styles.textBold}>
                {film.JumlahPenonton
                  ? numberWithCommas(film.JumlahPenonton)
                  : ""}
                {/* {film.JumlahPenonton} */}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* <Tombol type="text" title="Detail" padding={7} onPress={() => navigation.navigate('FilmDetail', { film }) }/> */}
    </View>
  );
};

export default CardFilm;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    // flexDirection: 'row',
    // justifyContent:'center'
    // borderWidth: 1,
    // borderColor: 'red'
  },
  card: {
    backgroundColor: "white",
    // width: responsiveWidth(350),
    // width: '100%',
    padding: 5,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 5,
    borderColor: "black",
    borderWidth: 0.5,
  },
  cardkecil: {
    flexDirection: "row",
    // width: responsiveWidth(320),
    // width: '100%',
    justifyContent: "space-between",
    padding: 10,
    // borderWidth: 1,
  },
  text: {
    fontFamily: fonts.primary.regular,
    fontSize: 10,
    textTransform: "capitalize",
    textAlign: "center",
    width: 70,
  },
  textBold: {
    fontFamily: fonts.primary.bold,
    fontSize: 15,
    textTransform: "capitalize",
    textAlign: "left",
    // marginLeft: 10,
    fontWeight: "bold",
    color: "black",
  },
  wraper: {
    borderWidth: 0.5,
    borderColor: "black",
  },
});
