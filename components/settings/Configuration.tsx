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
import { Button, Checkbox, TextInput } from "react-native-paper";
import Toast, { ToastShowParams } from "react-native-toast-message";
import Notify from "../notifications/Notify";
import { DailyTriggerInput } from "expo-notifications";
import { Link } from "expo-router";
import { BreakDays } from "./BreakDays";

const showToast = (
  type: ToastShowParams["type"],
  text1: ToastShowParams["text1"]
) => {
  Toast.show({
    type,
    text1,
  });
};
const Configuration = ({ navigation }) => {
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

  const setTime = (field: "hour" | "minute", value: string) => {
    let result: number | string = parseInt(value);
    if (isNaN(result)) {
      result = "";
    }

    setDailyNotification({
      ...dailyNotification,
      [field]: result,
      repeats: true,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.containerNotifications}>
          <Text style={styles.label}>Daily schedule</Text>
          <View style={styles.wrapperInput}>
            <TextInput
              keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
              label={"Hour"}
              style={styles.input}
              value={dailyNotification?.hour?.toString() ?? ""}
              onChangeText={(e) => {
                setTime("hour", e);
              }}
            />
            <TextInput
              keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
              style={styles.input}
              label={"Minute"}
              value={dailyNotification?.minute?.toString() ?? ""}
              onChangeText={(e) => {
                setTime("minute", e);
              }}
            />
          </View>
          <Notify
            navigation={navigation}
            trigger={dailyNotification as DailyTriggerInput}
          ></Notify>
          <Button
            mode="contained"
            onPress={() => {
              setDailyNotification(undefined);
              onClearNotifications();
            }}
          >
            Clear schedules
          </Button>
        </View>
        <View style={styles.wrapperBreakDates}>
          <BreakDays />
        </View>
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
    gap: 4,
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
  wrapperBreakDates: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Configuration;
