import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../../store/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../Constants/Colors";
import { Redirect, useRouter, useFocusEffect } from "expo-router";

export default function Faviroutes() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const router = useRouter();

  const handleLogout = () => {
    try {
      dispatch(userSlice.actions.userLogout());
      AsyncStorage.removeItem("user");
      router.replace("/signin");
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
        {user?.name}
      </Text>
      <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
        {user?.email}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={{ textAlign: "center", fontSize: 15 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    width: 100,
    height: 30,

    borderRadius: 10,
    justifyContent: "center",

    backgroundColor: "rgb(255,50,55)",
  },
});
