import { View, Text, StyleSheet, TextInput, KeyboardTypeOptions } from "react-native";
import React from "react";


interface Props {
  title: string;
  placeholder: string;
  onChangeText?: (text: string) => void;
  value?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
}

export const FormInput = ({ title, placeholder, onChangeText, value, secureTextEntry, keyboardType }: Props) => {
  return (
    <View>
      <Text style={styles.inputTitle}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#575757"}
        style={styles.inputEmailandPassword}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry = {secureTextEntry}
        autoCapitalize="none" 
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputTitle: {
    marginBottom: 10,
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "normal",
  },
  inputEmailandPassword: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderColor: "#A448FF",
    borderWidth: 3,
    borderRadius: 10,
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "normal",
  },
});
