import { AppSettingsContextProvider } from "@/context/AppSettingsContextProvider";
import { Stack } from "expo-router";
import React from "react";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <PaperProvider>
      <AppSettingsContextProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Pill reminder" }} />
        </Stack>
      </AppSettingsContextProvider>
      <Toast />
    </PaperProvider>
  );
}
