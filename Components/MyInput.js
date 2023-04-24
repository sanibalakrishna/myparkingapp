import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import Colors from "../Constants/Colors";
import { color } from "react-native-reanimated";

const MyInput = ({ label, error, component, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputi,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
      >
        <TextInput
          {...rest}
          style={[
            { color: Colors[colorScheme ?? "light"].text },
            isFocused && styles.focusedInput,
            error && styles.errorInput,
          ]}
          placeholderTextColor={Colors[colorScheme ?? "light"].text}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? "" : label}
        />
        {component && component}
      </View>
      <View
        style={
          isFocused
            ? [
                styles.labelContainer,
                {
                  backgroundColor:
                    Colors[colorScheme ?? "light"].defaultbackground,
                },
              ]
            : styles.lablenull
        }
      >
        <Text style={isFocused && styles.label}>{label}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 2,
    width: "100%",
    height: "20%",
  },
  inputi: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  focusedInput: {
    borderColor: "#0077cc",
  },
  errorInput: {
    borderColor: "#ee0000",
  },
  labelContainer: {
    position: "absolute",
    top: 18,
    left: 20,
    backgroundColor: "#ff0000",
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 14,
    color: "#0077cc",
  },
  lablenull: {
    display: "none",
  },
});

export default MyInput;
