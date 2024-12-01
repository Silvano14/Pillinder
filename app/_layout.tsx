import { NavigationContainer } from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <PaperProvider>
      <MyStatusBar backgroundColor="#E01BAE" barStyle="light-content" />
      <NavigationContainer>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Pill reminder" }} />
        </Stack>
      </NavigationContainer>
      <Toast />
    </PaperProvider>
  );
}
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: 50,
  },
});
