import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import React, { useState } from "react"; 
import { fonts } from "../../utils";
import { Pilihan, Tombol } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";

export default function Filter() {
  const navigation = useNavigation();
  // const { gendre, totalpenonton } = state;
  const [gendre, setGendre] = useState("");
  const [ph, setPH] = useState("");
  const [tahun, setTahun] = useState("");
  const [userName, setUserName] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const onContinue = () => {
    // if (gendre || ph || tahun) {
    navigation.navigate("ListFilm", { gendre, ph, tahun, userName });
    // } else {
    //   navigation.navigate("ListFilm", {gendre, ph, tahun} );
    // }
  };

  const onClear = () => {
    setPH("");
    setGendre("");
    setTahun("");
    navigation.navigate("ListFilm", { gendre, ph, tahun, userName });
  };
  const data = [
    { label: "Horror", value: "1" },
    { label: "Drama", value: "2" },
    { label: "Thiler", value: "3" },
    { label: "Action", value: "4" },
    { label: "Comedy", value: "5" },
    { label: "Fantasy", value: "6" },
    { label: "Kita", value: "7" },
    { label: "Kamu", value: "8" },
  ];
  const dataPH = [
    { label: "Rapi Films", value: "1" },
    { label: "Miles Films", value: "2" },
    { label: "Dee Company", value: "3" },
    { label: "MD Pictures", value: "4" },
    { label: "Sinemaku Pictures", value: "5" },
  ];

  const dataTahun = [
    { label: "2020", value: "0" },
    { label: "2021", value: "1" },
    { label: "2022", value: "2" },
    { label: "2023", value: "3" },
    { label: "2024", value: "4" },
    { label: "2025", value: "5" },
  ];
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.pages}>
        <View style={{ alignSelf: "center", marginTop: 50}}>
          <Text style={{ fontFamily: fonts.primary.bold, fontSize: 40 }}>
            Filter
          </Text>
        </View>
        <View style={styles.container}>
          {/* <Pilihan
            label="Gendre"
            datas={data}
            selectedValue={gendre}
            onValueChange={(gendre) => setGendre(gendre)}
          />
          <Pilihan
            label="PH"
            datas={dataPH}
            selectedValue={ph}
            onValueChange={(ph) => setPH(ph)}
          />
          <Pilihan
            label="Tahun"
            datas={dataTahun}
            selectedValue={tahun}
            onValueChange={(tahun) => setTahun(tahun)}
          /> */}
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder="Select Genre"
            searchPlaceholder="Search..."
            // onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            value={gendre}
            onChange={(item) => { 
              setGendre(item.label);
            }}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataPH}
            search
            maxHeight={300}
            labelField="label"
            valueField="label"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder="Select PH"
            searchPlaceholder="Search..."
            value={ph}
            onChange={(item) => { 
              setPH(item.label);
            }}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataTahun}
            search
            maxHeight={300}
            labelField="label"
            valueField="label"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder="Select Year"
            searchPlaceholder="Search..."
            value={tahun}
            onChange={(item) => { 
              setTahun(item.label);
            }}
          />
        </View>
        <View style={{ margin: 30 }}>
          <Tombol
            title="Apply"
            type="text"
            padding={10}
            onPress={() => onContinue()}
            param="test"
          />
        </View>
        <View style={{ marginHorizontal: 30 }}>
          <Tombol
            title="Clear All"
            type="text"
            padding={10}
            onPress={() => onClear()}
            param="test"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 20,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
