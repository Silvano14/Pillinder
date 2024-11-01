import { clear } from "@/utils/AsyncStorage";
import { DailyTriggerInput } from "expo-notifications";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import Notify from "../notifications/Notify";
import * as Notifications from "expo-notifications";
import Toast from "react-native-toast-message";

const showToast = () => {
  Toast.show({
    type: "success",
    text1: "Cancelled all notifications scheduled",
    text2: "This is some something 👋",
  });
};
const Configuration = () => {
  const [dailyNotification, setDailyNotification] = useState<DailyTriggerInput>(
    {
      hour: 20,
      minute: 0,
      repeats: true,
    }
  );

  const clearData = () => {
    clear();
  };

  const onClearNotifications = () => {
    Notifications.cancelAllScheduledNotificationsAsync()
      .then((data) => showToast())
      .catch((data) => console.log(data));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View>
          <Button onPress={clearData} mode="contained-tonal">
            Clear data
          </Button>
        </View>

        <View style={styles.containerNotifications}>
          <Text style={styles.label}>Daily schedule</Text>
          <View style={styles.wrapperInput}>
            <TextInput
              keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
              label={"Hour"}
              style={styles.input}
              value={dailyNotification.hour ?? ""}
              onChangeText={(e) => {
                setDailyNotification({
                  ...dailyNotification,
                  hour: parseInt(e),
                });
              }}
            />
            <TextInput
              keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
              style={styles.input}
              label={"Minute"}
              value={dailyNotification.minute ?? ""}
              onChangeText={(e) => {
                setDailyNotification({
                  ...dailyNotification,
                  minute: parseInt(e),
                });
              }}
            />
          </View>
        </View>
        <Notify trigger={dailyNotification}></Notify>
        <Button mode="contained" onPress={onClearNotifications}>
          Clear notifications
        </Button>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 4,
  },
  containerNotifications: {
    padding: 15,
    backgroundColor: "gray",
    borderRadius: 20,
  },
  input: {
    flex: 1,
    gap: 2,
    marginHorizontal: 2,
  },
  wrapperInput: {
    flexDirection: "row",
  },
  label: {
    fontSize: 25,
    marginBottom: 8,
  },
});

export default Configuration;
