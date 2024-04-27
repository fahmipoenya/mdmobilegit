import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  Alert,
} from "react-native"; 
import { Inputan, Jarak, Tombol } from "../../components";
import { colors, fonts, responsiveHeight } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import InputIcon from "../../components/kecil/InputIcon"; 
import base64 from "react-native-base64";

export default function Login() {
  const navigation = useNavigation();
  const [state, setState] = useState({
    username: "",
    password: "",
    gendre: "",
    ph: "",
    tahun: "",
  });
  const { username, password, gendre, ph, tahun } = state;
  const authLogin = () => {
    const encode = base64.encode(password);
    const user = 'user!123';
    const pass = 'test123test';
    if (username.length < 1) {
      alert("Enter Email or Username!");
    } else if (password.length < 1) {
      alert("Enter Password!");
    } else {
      fetch("http://md.rest2api.biz.id/webapi/v1/api/login.php", {
        method: "POST",
        headers: {
          Authorization: "Basic " + base64.encode(user + ":" + pass),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usernm: username, pass: encode }),
      })
        .then((response) => {
          if (!response.ok) throw response;
          return response.json();
        })
        .then((responseJson) => {
          navigation.navigate("ListFilm", state);
        })
        .catch((error) => {
          if (error instanceof Error) {
            // console.log(error); 
            alert(error);
          } else {
            error.json().then((body) => {
              // if (body.message) {
              //   alert(body.message);
              // // }
              // console.log(body);
              Alert.alert(body.message);
            });
          }
        });
    } 
  };

  return (
    <View style={styles.pages}>
      <ImageBackground
        source={require("../../../assets/images/backgorund.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={{ bborderRadius: 30, padding: 10 }}>
          <Image
            style={styles.tinyLogo}
            source={require("../../../assets/images/mdpLite.png")}
            resizeMode="contain"
          />
        </View>
        <Jarak height={20} />
        <Jarak height={25} />
        <View style={styles.cardLogin}>
          <InputIcon
            placeholder="Email or Username"
            value={username}
            onChangeText={(username) => setState({ ...state, username })}
          />
          <Jarak height={25} />
          <InputIcon
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(password) => setState({ ...state, password })}
          />

          <Jarak height={50} />
          <Tombol
            title="Login"
            type="text"
            padding={12}
            fontSize={30}
            onPress={() => authLogin()}
            // onPress={() => navigation.navigate("ListFilm")}
          />
          <Jarak height={30} />
          <View style={styles.register}>
            {/* <Text
            style={styles.textBlue}
            // onPress={() => navigation.navigate("Register1")}
          >
            Register
          </Text> */}
            <Text
              style={styles.textBlue}
              // onPress={() => navigation.navigate("Register1")}
            >
              Forgot Password?
            </Text>
          </View>
        </View>
      </ImageBackground>

      {/* <View style={styles.sosmed}>
        <TouchableOpacity>
          <FingerBack style={{ margin: 10 }} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
  },
  ilustrasi: {
    position: "absolute",
    bottom: 0,
    right: -100,
  },
  title: {
    fontFamily: fonts.primary.bold,
    fontSize: 50,
    margin: 20,
  },
  logo: {
    alignItems: "center",
    marginTop: responsiveHeight(20),
  },
  tinyLogo: {
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").height / 3,
    padding: 20,
    alignSelf: "center",
  },
  cardLogin: {
    // backgroundColor: colors.white,
    marginHorizontal: 20,
    shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
    padding: 30,
    borderRadius: 10,
    // marginTop: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  textBlue: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: colors.primary,
  },
});
