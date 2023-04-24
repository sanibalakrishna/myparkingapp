import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import Colors from "../Constants/Colors";
import { Link, useRouter } from "expo-router";
import { useSignupUserMutation } from "../store/apiSlice";
import { useDispatch } from "react-redux";
import { userSlice } from "../store/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = () => {
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [errors, setErrors] = useState([false, false, false]);
  const [loading, setLoading] = useState(false);
  const [signupUser] = useSignupUserMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const temperrors = [...errors];
      if (name == "") {
        temperrors[0] = true;
      } else {
        temperrors[0] = false;
      }
      if (email == "") {
        temperrors[1] = true;
      } else {
        temperrors[1] = false;
      }
      if (password == "") {
        temperrors[2] = true;
      } else {
        temperrors[2] = false;
      }
      setErrors(temperrors);
      if (temperrors[0] || temperrors[1] || temperrors[2]) {
        setLoading(false);
        return;
      }
      const response = await signupUser({ name, email, password });
      if (response.error) {
        console.log(response);
        console.log("error");
        console.log(response.error.data.message);
      } else {
        dispatch(userSlice.actions.userlogin(response.data));
        await AsyncStorage.setItem("user", JSON.stringify(response.data));
        router.replace("/");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: Colors[colorScheme ?? "light"].homebackground,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={[styles.title, { color: Colors[colorScheme ?? "light"].text }]}
      >
        My Parking
      </Text>
      <Text
        style={[
          styles.titletag,
          { color: Colors[colorScheme ?? "light"].text },
        ]}
      >
        Welcome
      </Text>

      <View style={styles.fields}>
        <Text
          style={[
            { color: Colors[colorScheme ?? "light"].text },
            styles.inputlabel,
          ]}
        >
          Name
        </Text>
        <View
          style={[
            styles.inputtag,
            { backgroundColor: Colors[colorScheme ?? "light"].inputbackground },
            errors[0] && { borderWidth: 1, borderColor: "red" },
          ]}
        >
          <Feather
            name="user"
            size={20}
            color={colorScheme === "dark" ? "white" : "black"}
          />
          <TextInput
            style={[
              styles.input,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
            onChangeText={setName}
            value={name}
          />
        </View>
      </View>
      <View style={styles.fields}>
        <Text
          style={[
            { color: Colors[colorScheme ?? "light"].text },
            styles.inputlabel,
          ]}
        >
          Email
        </Text>
        <View
          style={[
            styles.inputtag,
            { backgroundColor: Colors[colorScheme ?? "light"].inputbackground },
            errors[1] && { borderWidth: 1, borderColor: "red" },
          ]}
        >
          <Feather
            name="mail"
            size={20}
            color={colorScheme === "dark" ? "white" : "black"}
          />
          <TextInput
            style={[
              styles.input,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
            onChangeText={setEmail}
            value={email}
          />
        </View>
      </View>
      <View style={styles.fields}>
        <Text
          style={[
            { color: Colors[colorScheme ?? "light"].text },
            styles.inputlabel,
          ]}
        >
          Password
        </Text>
        <View
          style={[
            styles.inputtag,
            { backgroundColor: Colors[colorScheme ?? "light"].inputbackground },
            errors[2] && { borderWidth: 1, borderColor: "red" },
          ]}
        >
          <Feather
            name="lock"
            size={20}
            color={colorScheme === "dark" ? "white" : "black"}
          />
          <TextInput
            style={[
              styles.input,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={showpassword}
          />
          <TouchableOpacity
            onPress={() => setShowpassword((prevstate) => !prevstate)}
          >
            {showpassword ? (
              <Feather
                name="eye"
                size={20}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            ) : (
              <Feather
                name="eye-off"
                size={20}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {(errors[0] || errors[1] || errors[2]) && (
        <Text style={{ color: "red", marginTop: 10 }}>
          Ensure all the fields are filled properly
        </Text>
      )}

      <TouchableOpacity style={styles.btn} onPress={handleSignup}>
        <Text
          style={[
            styles.btntext,
            { color: Colors[colorScheme ?? "light"].text },
          ]}
        >
          Sign Up
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: Colors[colorScheme ?? "light"].text,
          position: "absolute",
          bottom: 20,
        }}
      >
        Already An Account
        <Link href="/signin">
          <Text style={{ color: "skyblue" }}>Sign In</Text>
        </Link>
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
  },
  titletag: {
    fontSize: 20,
    fontWeight: "500",
  },
  inputtag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 50,
  },

  fields: {
    width: "80%",
    marginTop: 30,
  },
  inputlabel: {
    fontSize: 15,
    fontWeight: "700",
  },
  btn: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    height: 50,
    marginTop: 30,
    borderRadius: 10,
  },
  btntext: { fontSize: 18, fontWeight: "400" },
  input: {
    width: "85%",
    marginLeft: 7,
    height: "100%",
  },
});

export default Signup;
