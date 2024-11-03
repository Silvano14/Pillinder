import { clear } from "@/utils/AsyncStorage";
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
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
import Toast, { ToastShowParams } from "react-native-toast-message";
import Notify from "../notifications/Notify";
import { DailyTriggerInput } from "expo-notifications";

const showToast = (
  type: ToastShowParams["type"],
  text1: ToastShowParams["text1"]
) => {
  Toast.show({
    type,
    text1,
  });
};
const Configuration = () => {
  const [dailyNotification, setDailyNotification] = useState<
    | {
        hour?: number;
        minute?: number;
        repeats: boolean;
      }
    | undefined
  >();

  const fetchScheduledNotifications = async () => {
    try {
      const notifications =
        await Notifications.getAllScheduledNotificationsAsync();
      console.log("notifications", notifications);
      if (notifications.length) {
        setDailyNotification({
          hour: notifications[0].trigger.dateComponents.hour,
          minute: notifications[0].trigger.dateComponents.minute,
          repeats: true,
        });
      }
    } catch (error) {
      console.log("Errore nel recuperare le notifiche programmate:", error);
    }
  };

  useEffect(() => {
    fetchScheduledNotifications();
  }, []);

  const clearData = () => {
    clear();
  };

  const onClearNotifications = () => {
    Notifications.cancelAllScheduledNotificationsAsync()
      .then(() => showToast("success", "Cancelled all notifications scheduled"))
      .catch(() => showToast("error", "Error occured"));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View>
          <Button onPress={clearData} mode="contained-tonal">
            Clear all pills (restart app)
          </Button>
        </View>

        <View style={styles.containerNotifications}>
          <Text style={styles.label}>Daily schedule</Text>
          <View style={styles.wrapperInput}>
            <TextInput
              keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
              label={"Hour"}
              style={styles.input}
              value={dailyNotification?.hour?.toString() ?? undefined}
              onChangeText={(e) => {
                setDailyNotification({
                  ...dailyNotification,
                  hour: parseInt(e),
                  repeats: true,
                });
              }}
            />
            <TextInput
              keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
              style={styles.input}
              label={"Minute"}
              value={dailyNotification?.minute?.toString() ?? undefined}
              onChangeText={(e) => {
                setDailyNotification({
                  ...dailyNotification,
                  minute: parseInt(e),
                  repeats: true,
                });
              }}
            />
          </View>
        </View>
        <Notify trigger={dailyNotification as DailyTriggerInput}></Notify>
        <Button
          mode="contained"
          onPress={() => {
            setDailyNotification(undefined);
            onClearNotifications();
          }}
        >
          Clear schedules
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
    borderRadius: 20,
    borderWidth: 1,
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
