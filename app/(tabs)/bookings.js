import { View, Text, Pressable, useColorScheme } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { useSelector } from "react-redux";
import React, { useState, useCallback } from "react";
import Colors from "../../Constants/Colors";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet } from "react-native-web";
import { ColorSpace, color } from "react-native-reanimated";

const Bookingcard = ({ booking }) => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={[
        styles.bookingcard,
        { backgroundColor: Colors[colorScheme ?? "light"].homebackground },
      ]}
    >
      <Text
        style={{ color: Colors[colorScheme ?? "light"].text, fontSize: 17 }}
      >
        vehiclenumber:{booking.vehiclenumber}
      </Text>
      <Text
        style={{ color: Colors[colorScheme ?? "light"].text, fontSize: 17 }}
      >
        dateofparking:{booking.vehiclenumber}
      </Text>
      <Text
        style={{ color: Colors[colorScheme ?? "light"].text, fontSize: 17 }}
      >
        timeperiod:{booking.timeperiod}
      </Text>
      <Text
        style={{ color: Colors[colorScheme ?? "light"].text, fontSize: 17 }}
      >
        typeofvehicle:{booking.typeofvehicle}
      </Text>
    </View>
  );
};
const bookings = () => {
  const colorScheme = useColorScheme();
  const user = useSelector((state) => state.user.user);
  const [bookingdetails, setBookingdetails] = useState([]);

  const getData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(
        "https://myparkingbackend.vercel.app/user/profile",
        options
      );
      const tempresponse = await response.json();
      const data = tempresponse.bookings;
      const tempbooking = [];
      for (let i = 0; i < data?.length; i++) {
        tempbooking.push({
          slotno: data[i].slotno,
          dateofparking: data[i].dateofparking,
          timeperiod: data[i].timeperiod,
          typeofvehicle: data[i].typeofvehicle,
          vehiclenumber: data[i].vehiclenumber,
        });
      }
      console.log(data);
      setBookingdetails(tempbooking);
      console.log(bookingdetails);

      // dispatch(bookingsSlice.actions.setBookings(tempbooking));
    } catch (error) {
      console.log(error);
    }
  };
  const onTabFocus = useCallback(() => {
    getData();
  }, []);
  useFocusEffect(onTabFocus);
  return (
    <View style={styles.container}>
      <FlatList
        data={bookingdetails}
        renderItem={({ item }) => <Bookingcard booking={item} />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  bookingcard: {
    borderRadius: 25,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 20,
  },
});

export default bookings;
