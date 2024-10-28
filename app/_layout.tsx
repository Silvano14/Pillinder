import { AppSettingsContextProvider } from "@/context/AppSettingsContextProvider";
import { Stack } from "expo-router";
import React from "react";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <AppSettingsContextProvider>
        <Stack>
          <Stack.Screen name="index" />
        </Stack>
      </AppSettingsContextProvider>
    </PaperProvider>
  );
}
