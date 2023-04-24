import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyInput from "./MyInput";
import Colors from "../Constants/Colors";
import { bookingsSlice } from "../store/bookingsSlice";
import { Link, Redirect } from "expo-router";
import moment from "moment-timezone";

const Parkingbutton = ({ side, id }) => {
  const colorScheme = useColorScheme();
  const [showbooked, setShowbooked] = useState(false);
  const [diff, setDiff] = useState(null);
  const bookings = useSelector((state) => state.bookings.bookings);

  return (
    <View
      style={[
        side == "right" && styles.parkingbuttonright,
        side == "left" && styles.parkingbuttonleft,
        { borderColor: Colors[colorScheme ?? "light"].text },
      ]}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={showbooked}
        onRequestClose={() => {
          setShowbooked(!showbooked);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {
                shadowColor: Colors[colorScheme ?? "light"].modalshowdow,
                backgroundColor: Colors[colorScheme ?? "light"].background,
              },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                { color: Colors[colorScheme ?? "light"].text },
              ]}
            >
              Booking Details
            </Text>
            <Text
              style={[
                styles.modalText,
                { color: Colors[colorScheme ?? "light"].text },
              ]}
            >
              TimePeriod : {bookings[id]?.timeperiod}
            </Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowbooked(!showbooked)}
            >
              <Text style={styles.textStyle}>Back</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {bookings[id] ? (
        <Pressable style={styles.occupied} onPress={() => setShowbooked(true)}>
          <Text style={styles.dottext}>{id}</Text>
        </Pressable>
      ) : (
        <Link href={{ pathname: "/bookparking", params: { id: id } }} asChild>
          <Pressable style={styles.empty}>
            <Text style={styles.dottext}>{id}</Text>
          </Pressable>
        </Link>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  parkingbuttonright: {
    height: 40,
    width: 60,
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderBottomWidth: 3,

    justifyContent: "center",
    alignItems: "center",
  },
  parkingbuttonleft: {
    height: 40,
    width: 60,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderBottomWidth: 3,

    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    backgroundColor: "lightgreen",
    height: 25,
    width: 25,
    justifyContent: "center",
    borderRadius: 25,
  },
  occupied: {
    backgroundColor: "pink",
    height: 25,
    width: 25,
    justifyContent: "center",
    borderRadius: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "space-evenly",

    height: "35%",
    width: "60%",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalbookingView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: "80%",
    height: "70%",
    justifyContent: "center",
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

  dottext: {
    textAlign: "center",
  },

  buttonClose: {
    backgroundColor: "#2196F3",
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  modalText: {
    fontSize: 15,
  },
});

export default Parkingbutton;
