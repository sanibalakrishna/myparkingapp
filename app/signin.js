import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  Button,
  ActivityIndicator,
} from "react-native";

import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import Colors from "../Constants/Colors";
import { Link, useRouter } from "expo-router";
import { color } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { useLoginUserMutation } from "../store/apiSlice";
import { userSlice } from "../store/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const signin = () => {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [errors, setErrors] = useState([false, false]);
  const dispatch = useDispatch();
  const [userLogin] = useLoginUserMutation();
  const user = useSelector((state) => state);
  const router = useRouter();
  const storeUserData = async (userData) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      console.log("User data stored successfully");
    } catch (error) {
      console.log("Error storing user data:", error);
    }
  };
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const temperrors = [...errors];
      if (email == "") {
        temperrors[0] = true;
      } else {
        temperrors[0] = false;
      }
      if (password == "") {
        temperrors[1] = true;
      } else {
        temperrors[1] = false;
      }
      setErrors(temperrors);
      if (temperrors[0] || temperrors[1]) {
        setLoading(false);
        return;
      }
      const response = await userLogin({ email, password });
      if (response.error) {
        console.log(response.error.data.message);
      } else {
        dispatch(userSlice.actions.userlogin(response.data));
        await storeUserData(JSON.stringify(response.data));
        router.replace("/");
      }

      setLoading(false);
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
          Email
        </Text>
        <View
          style={[
            styles.inputtag,
            { backgroundColor: Colors[colorScheme ?? "light"].inputbackground },
            errors[0] && { borderWidth: 1, borderColor: "red" },
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
            errors[1] && { borderWidth: 1, borderColor: "red" },
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
      {(errors[0] || errors[1]) && (
        <Text style={{ color: "red", marginTop: 10 }}>
          Ensure all the fields are filled properly
        </Text>
      )}

      <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text
            style={[
              styles.btntext,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          >
            Sign In
          </Text>
        )}
      </TouchableOpacity>
      <Text
        style={{
          color: Colors[colorScheme ?? "light"].text,
          position: "absolute",
          bottom: 20,
        }}
      >
        Don't Have An Account?
        <Link href="/signup">
          <Text style={{ color: "skyblue" }}>Sign Up</Text>
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
export default signin;
