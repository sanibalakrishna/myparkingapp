import React from "react";
import { View, Text, useColorScheme } from "react-native";
import { SplashScreen, Stack, useRouter } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "../store/index";

const _layout = () => {
  const colorScheme = useColorScheme();
  return (
    <>
      <Provider store={store}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <RootNav />
        </ThemeProvider>
      </Provider>
    </>
  );
};
function RootNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="bookparking"
        options={{ presentation: "modal", title: "Book Parking Slot" }}
      />

      <Stack.Screen name="signin" options={{ headerShown: false }} />

      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}

export default _layout;
