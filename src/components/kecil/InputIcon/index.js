import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, fonts } from "../../../utils";
import { IconBack, IconEye, IconLock } from "../../../../assets/icons";

const InputIcon = ({
  textarea,
  width,
  height,
  fontSize,
  placeholder,
  label,
  value,
  secureTextEntry,
  keyboardType,
  onChangeText,
  disabled,
  icon,
  pwd,
}) => {
  const Icon = () => {
    if (icon === "pass") {
      return <IconEye />;
    }
  };
  if (pwd) {
    return (
      <View style={styles.container}>
        <View style={styles.bungkus}>
          <Icon />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "#FFFFFF",
            }}
          >
            <IconLock />
          </View>
          <TextInput
            style={styles.input(width, height, fontSize)}
            value={value}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            editable={disabled ? false : true}
            placeholder={placeholder}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "#FFFFFF",
            }}
          ></View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.bungkus}>
        <TextInput
          style={styles.input(width, height, fontSize)}
          value={value}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          editable={disabled ? false : true}
          placeholder={placeholder}
        />
        <View>
          <Icon />
        </View>
      </View>
    </View>
  );
};

export default InputIcon;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: (fontSize) => ({
    fontSize: fontSize ? fontSize : 18,
    fontFamily: fonts.primary.regular,
  }),
  input: (width, height, fontSize) => ({
    fontSize: fontSize ? fontSize : 14,
    fontFamily: fonts.primary.bold,
    width: 300,
    height: height,
    borderRadius: 5,
    borderColor: colors.border,
    paddingVertical: 5,
    paddingHorizontal: 10,
    // backgroundColor: "white",
  }),
  bungkus: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
});
