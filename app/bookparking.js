import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Alert,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  Link,
  Redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import MyInput from "../Components/MyInput";
import { bookingsSlice } from "../store/bookingsSlice";
import Colors from "../Constants/Colors";
import { useBookParkingMutation } from "../store/apiSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from "@expo/vector-icons";
export default function Page() {
  const colorScheme = useColorScheme();
  const [parkingdetails, setParkingdetails] = useState({
    typeofvehicle: "",
    timeperiod: "",
    dateofparking: "",
    vehiclenumber: "",
  });
  const [parkingdate, setParkingdate] = useState(false);
  const [errors, setErrors] = useState([false, false, false, false]);
  const [loading, setLoading] = useState(false);
  const bookings = useSelector((state) => state.bookings.bookings);
  const { id } = useSearchParams();
  const router = useRouter();
  const [bookParking] = useBookParkingMutation();
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = (name) => {
    if (name == "dateofparking") {
      setParkingdate(true);
    } else {
      setParkingdate(false);
    }

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
    console.log(ISTDateString); //
    if (parkingdate) {
      setParkingdetails({ ...parkingdetails, dateofparking: ISTDateString });
    } else {
      setParkingdetails({ ...parkingdetails, timeperiod: ISTDateString });
    }

    // console.log("A date has been picked: ", parkingdetails.dateofparking);

    hideDatePicker();
  };

  const handleBooking = async () => {
    setLoading(true);
    const temperrors = [...errors];
    let i = 0;
    for (let key in parkingdetails) {
      if (parkingdetails[key] == "") {
        temperrors[i] = true;
      } else {
        temperrors[i] = false;
      }
      i++;
    }

    setErrors(temperrors);

    if (temperrors[0] || temperrors[1] || temperrors[2] || temperrors[3]) {
      setLoading(false);
      return;
    } else {
      const bookingdetails = JSON.parse(JSON.stringify(parkingdetails));
      bookingdetails.slotno = id;
      console.log(bookingdetails);
      const response = await bookParking({
        bookingdetails,
        token: user.token,
      });
      console.log(response);
      setLoading(false);
      if (response.data) {
        console.log(response)
        dispatch(
          bookingsSlice.actions.setBookings({
            id,
            booking: parkingdetails,
          })
        );
        Alert.alert("Title", response.data.message, [
          {
            text: "OK",
            onPress: () => router.replace("/"),
          },
        ]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.modalText,
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
        Slot No - {id}
      </Text>
      <MyInput
        label="Type of Vehicle"
        value={parkingdetails.typeofvehicle}
        onChangeText={(value) =>
          setParkingdetails({ ...parkingdetails, typeofvehicle: value })
        }
        error={errors[0]}
      />

      <MyInput
        label="Date of Parking"
        value={parkingdetails.dateofparking}
        onChangeText={(value) =>
          setParkingdetails({ ...parkingdetails, dateofparking: value })
        }
        error={errors[2]}
        component={
          <TouchableOpacity
            style={styles.datebutton}
            onPress={() => showDatePicker("dateofparking")}
          >
            <MaterialIcons
              name="date-range"
              size={24}
              color={Colors[colorScheme ?? "light"].text}
            />
          </TouchableOpacity>
        }
      />

      <MyInput
        label="Time Period"
        value={parkingdetails.timeperiod}
        onChangeText={(value) =>
          setParkingdetails({ ...parkingdetails, timeperiod: value })
        }
        error={errors[2]}
        component={
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
        }
      />

      <MyInput
        label="Vehicle Number"
        value={parkingdetails.vehiclenumber}
        onChangeText={(value) =>
          setParkingdetails({ ...parkingdetails, vehiclenumber: value })
        }
        error={errors[3]}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {(errors[0] || errors[1] || errors[2] || errors[3]) && (
        <Text style={{ color: "red" }}>
          Please ensure all the fields are filled properly
        </Text>
      )}

      <TouchableOpacity
        style={[
          styles.button,
          styles.buttonClose,
          { backgroundColor: "lightgreen" },
        ]}
        onPress={handleBooking}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.textStyle}>Book</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 15,
    textAlign: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  datebutton: {
    backgroundColor: "#87CEFA",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
});
