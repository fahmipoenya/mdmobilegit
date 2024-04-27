import {
  FlatList, 
  StyleSheet,
  Text,
  TextInput,
  View, 
  Pressable,
  Modal,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { HeaderComponent, Jarak, Tombol } from "../../components";
import { colors, fonts, numberWithCommas, responsiveHeight } from "../../utils";
import { IconCari } from "../../../assets/icons"; 
import { useNavigation, useRoute } from "@react-navigation/native";
import base64 from "react-native-base64"; 
import CardFilm from "../../components/kecil/CardFilm";

export default function ListFilm() {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [cari, setCari] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalRec, setTotalRec] = useState("");
  const [totalPen, setTotaPen] = useState("");
  const navigation = useNavigation();
  const [genre, setGendre] = useState("");
  const [phx, setPH] = useState("");
  const [tahunx, setTahun] = useState("");
  const [filter, setFilter] = useState([]);
  const route = useRoute();
  const { gendre, password, ph, tahun, username, column, sorting } =
    route.params;
  const user = "user!123";
  const pass = "test123test";
  const [tampilFilter, setTampilFilter] = useState('');

  // console.log(route.params)
  useEffect(() => {
    if (tahun || ph || gendre || column || sorting) {
      getData();
      setPageCurrent(1);
    } else {
      getData();
    }
    if (gendre && !tahun && !ph){
      setTampilFilter('Genre')
    } else if (gendre && tahun && !ph){
      setTampilFilter('Genre, Tahun')
    }else if(gendre && tahun && ph){
      setTampilFilter('Genre, Tahun, PH')
    }else if(ph && !gendre && !tahun){
      setTampilFilter('PH')
    }else if(ph && gendre && !tahun){
      setTampilFilter('Genre, PH')
    }else if(tahun && !gendre && !ph){
      setTampilFilter('Tahun')
    }else{
      setTampilFilter('')
    }
  }, [tahun, ph, gendre, column, sorting]);

  const apiURL = "http://md.rest2api.biz.id/webapi/v1/api/getfilm.php";

  const getData = async () => {
    setLoading(true);
    console.log(route.params);
    const respon = await fetch(apiURL, {
      method: "POST",
      headers: {
        Authorization: "Basic " + base64.encode(user + ":" + pass),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filterby: {
          tahun: tahun,
          genre: gendre,
          rmhProduksi: ph,
        },
        sortby: { column: column?column.toLowerCase(): column, sorting: sorting },
        limit: 10,
        page: 1,
      }),
    });
    const reponJson = await respon.json();
    // console.log(reponJson);
    reponJson ? setData(reponJson.data): setData([]);
    reponJson ? setOldData(reponJson.data) : setOldData([]);
    reponJson ? setTotalPosts(reponJson.nextPage): setTotalPosts('');
    reponJson ? setTotalRec(reponJson.totalFilm) : setTotalRec('');
    reponJson ? setTotaPen(reponJson.totalPenonton): setTotaPen('');
    // console.log(data);
    setLoading(false);
  };

  const loadMore = async () => {
    setLoading(true);
    // setFilter(dataFilter);
    setPageCurrent(pageCurrent + 1);
    console.log(pageCurrent);
    const respon1 = await fetch(apiURL, {
      method: "POST",
      headers: {
        Authorization: "Basic " + base64.encode(user + ":" + pass),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filterby: {
          tahun: tahun,
          genre: gendre,
          rmhProduksi: ph,
        },
        sortby: { column: column?column.toLowerCase(): column, sorting: sorting },
        limit: 10,
        page: pageCurrent,
      }),
    });
    const reponJson = await respon1.json();

    reponJson ? setTotalPosts(reponJson.nextPage) : setTotalPosts(''); 
    reponJson ? setData((existingItem) => [...existingItem, ...reponJson.data]) : setData([]); 

    setLoading(false);
  };

  const onSearch = (text) => {
    if (text == "") {
      setData(oldData);
    } else {
      let tempList = data.filter((item) => {
        return item.Judul.toLowerCase().includes(text.toLowerCase());
      });
      setData(tempList);
    }
  };

  const handleLoadMore = () => {
    return totalPosts > 0 ? (cari == "" ? loadMore() : null) : null;
  };

  const endComponent = () => {
    return totalPosts > 0 ? (
      <View>
        <Text style={styles.text}> Loading...</Text>
      </View>
    ) : (
      <View>
        <Text style={styles.text}> End Page</Text>
      </View>
    );
  };

  const handleTextFilter = () => {
    return tampilFilter ? (
      <Text style={styles.text}>
        Filter by : {tampilFilter}
      </Text>
    ) : (
      ""
    );
  };

  return (
    <View style={styles.page}>
      {/* <HeaderComponent page="ListFilm" /> */}
      <View>
        {/* <Text>{route.params ? route.params.gendre : ''}</Text> */}
        <View style={styles.containerSearch}>
          <View style={styles.wrapperHeader}>
            {/* Input Pencarian  */}
            <View style={styles.searchSection}>
              <IconCari />
              <TextInput
                placeholder="search"
                style={styles.input}
                onChangeText={(text) => {
                  onSearch(text);
                  setCari(text);
                }}
              />
            </View>
            <Jarak width={10} />
            <Tombol
              icon="sort"
              padding={10}
              onPress={() => navigation.navigate("SortPage")}
              // onPress={() => setModalVisible(true)}
            />
            <Jarak width={10} />
            <Tombol
              icon="filter"
              padding={10}
              onPress={() => navigation.navigate("FilterPage")}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 30,
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>
            Total Penonton : {totalPen? numberWithCommas(totalPen) : ''}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: 30,
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <View style={{ marginTop: -10 }}>{handleTextFilter()}</View>
      </View>

      <Jarak />
      <FlatList
        style={styles.pilihJersey}
        data={data}
        renderItem={({ item }) => <CardFilm film={item} />}
        keyExtractor={(item, index) => index}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
        ListFooterComponent={endComponent}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Sort By</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>
                Tahun kjsbdfskdjbfsdbfjsbdfjlsdfsdfjb
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.white },
  container: {
    marginTop: -15,
  },
  pilihLiga: {
    marginHorizontal: 30,
  },
  pilihJersey: {
    marginHorizontal: 30,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
  },
  boldLabel: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
  text: {
    fontFamily: fonts.primary.regular,
    fontSize: 12,
    textTransform: "capitalize",
    textAlign: "left",
    color: "black",
    padding: 5,
  },
  containerSearch: {
    // backgroundColor: colors.primary,
    marginTop: 40,
    marginHorizontal: 30,
    borderWidth: 1,
    borderRadius: 10,
    // height: responsiveHeight(70),
  },
  wrapperHeader: {
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: 30,
    flexDirection: "row",
    // marginHorizontal: 'auto'
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingLeft: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.primary.regular,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "gray",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
