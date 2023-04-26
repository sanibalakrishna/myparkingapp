import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Parkingbutton from "../../Components/Parkingbutton";
import {
  Redirect,
  useFocusEffect,
  useNavigation,
  useRouter,
} from "expo-router";
import Colors from "../../Constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { useGetBookingsMutation } from "../../store/apiSlice";
import { bookingsSlice } from "../../store/bookingsSlice";
import MyInput from "../../Components/MyInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { log } from "react-native-reanimated";
import { utc } from "moment-timezone";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userSlice } from "../../store/userSlice";
const currentDateStr = new Date().toLocaleString("en-US", {
  timeZone: "Asia/Kolkata",
});
const index = () => {
  const colorScheme = useColorScheme();
  const [date, setDate] = useState(currentDateStr);
  const [dateerror, setDateerror] = useState(false);
  const user = useSelector((state) => state.user.user);
  const tempuser = useRef();
  tempuser.current = user;

  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const router = useRouter();
  const bookings = useSelector((state) => state.bookings.bookings);
  const getData = async () => {
    try {
      const response = await fetch(
        "https://myparkingbackend.vercel.app/booking/date/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date }),
        }
      );
      const data = await response.json();

      const tempbooking = new Array(24).fill(null);
      for (let i = 0; i < data?.length; i++) {
        tempbooking[data[i].slotno] = {
          dateofparking: data[i].dateofparking,
          timeperiod: data[i].timeperiod,
          typeofvehicle: data[i].typeofvehicle,
          vehiclenumber: data[i].vehiclenumber,
        };
      }
      console.log(date);
      console.log(tempbooking);
      dispatch(bookingsSlice.actions.setBookings(tempbooking));
    } catch (error) {
      console.log(error);
    }
  };
  const showDatePicker = (name) => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateString, something) => {
    console.log(something);
    const date = new Date(dateString);
    const ISTDateString = date.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    console.log(ISTDateString);
    setDate(ISTDateString);

    hideDatePicker();
  };

  const handleSearch = () => {
    if (date == "") {
      setDateerror(true);
    } else {
      getData();
      console.log(date);
    }
  };
  const onTabFocus = useCallback(() => {
    getData();
    console.log("Hello");
  }, []);
  useFocusEffect(onTabFocus);

  return (
    <View style={styles.container}>
      <View style={styles.datesearch}>
        <MyInput
          label="Pick Date"
          value={date}
          onChangeText={(value) => setDate(value)}
          error={dateerror}
          component={
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                style={styles.datebutton}
                onPress={() => showDatePicker("timeperiod")}
              >
                <MaterialIcons
                  name="date-range"
                  size={24}
                  color={Colors[colorScheme ?? "light"].text}
                />
              </TouchableOpacity>
              <TouchableOpacity
                title="🔍"
                style={styles.searchbutton}
                onPress={handleSearch}
              >
                <MaterialIcons
                  name="search"
                  size={24}
                  color={Colors[colorScheme ?? "light"].text}
                />
              </TouchableOpacity>
            </View>
          }
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <View
        style={[
          styles.parkmap,
          { borderColor: Colors[colorScheme ?? "light"].text },
        ]}
      >
        <View
          style={{
            alignItems: "center",
            position: "absolute",
            top: -20,
            left: "40%",
          }}
        >
          <Text
            style={[
              styles.parkinglabel,
              {
                color: "#FD5D5D",
                backgroundColor:
                  Colors[colorScheme ?? "light"].defaultbackground,
              },
            ]}
          >
            Exit
          </Text>
        </View>
        <View>
          <Parkingbutton side={"right"} id={0} />
          <Parkingbutton side={"right"} id={1} />
          <Parkingbutton side={"right"} id={2} />
          <Parkingbutton side={"right"} id={3} />
          <Parkingbutton side={"right"} id={4} />
          <Parkingbutton side={"right"} id={5} />
        </View>
        <View
          style={{
            justifyContent: "space-between",
            height: 280,
            position: "relative",
            top: -15,
          }}
        >
          <AntDesign
            name="arrowup"
            size={26}
            color={Colors[colorScheme ?? "light"].text}
          />
          <AntDesign
            name="arrowup"
            size={26}
            color={Colors[colorScheme ?? "light"].text}
          />
        </View>
        <View style={styles.middle}>
          <View>
            <Parkingbutton side={"left"} id={6} />
            <Parkingbutton side={"left"} id={7} />
            <Parkingbutton side={"left"} id={8} />
            <Parkingbutton side={"left"} id={9} />
            <Parkingbutton side={"left"} id={10} />
            <Parkingbutton side={"left"} id={11} />
          </View>

          <View>
            <Parkingbutton side={"right"} id={12} />
            <Parkingbutton side={"right"} id={13} />
            <Parkingbutton side={"right"} id={14} />
            <Parkingbutton side={"right"} id={15} />
            <Parkingbutton side={"right"} id={16} />
            <Parkingbutton side={"right"} id={17} />
          </View>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            height: 280,
            position: "relative",
            top: -15,
          }}
        >
          <AntDesign
            name="arrowup"
            size={26}
            color={Colors[colorScheme ?? "light"].text}
          />
          <AntDesign
            name="arrowup"
            size={26}
            color={Colors[colorScheme ?? "light"].text}
          />
        </View>
        <View>
          <Parkingbutton side={"left"} id={18} />
          <Parkingbutton side={"left"} id={19} />
          <Parkingbutton side={"left"} id={20} />
          <Parkingbutton side={"left"} id={21} />
          <Parkingbutton side={"left"} id={22} />
          <Parkingbutton side={"left"} id={23} />
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          position: "relative",
          top: -20,
        }}
      >
        <Text
          style={[
            styles.parkinglabel,
            {
              color: "#59CE8F",
              backgroundColor: Colors[colorScheme ?? "light"].defaultbackground,
            },
          ]}
        >
          Entry
        </Text>
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
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },

  middle: {
    flexDirection: "row",
  },
  parkmap: {
    paddingVertical: 50,
    borderWidth: 3,

    flexDirection: "row",
    justifyContent: "space-between",
  },

  parkinglabel: {
    fontSize: 25,

    width: 80,
    textAlign: "center",
  },
  datesearch: {
    height: "25%",
  },
  datebutton: {
    backgroundColor: "#87CEFA",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  searchbutton: {
    backgroundColor: "#FFA500",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
});

export default index;
