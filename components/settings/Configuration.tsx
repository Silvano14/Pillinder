import * as Notifications from "expo-notifications";
import {
  DailyTriggerInput,
  NotificationRequest,
  SchedulableTriggerInputTypes,
} from "expo-notifications";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import Toast, { ToastShowParams } from "react-native-toast-message";
import Notify from "../notifications/Notify";
import { HourModal } from "../time/HourModal";
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
    DailyTriggerInput | undefined
  >(undefined);
  const [notifications, setNotifications] = useState<NotificationRequest[]>([]);

  const fetchScheduledNotifications = async () => {
    try {
      const notifications =
        await Notifications.getAllScheduledNotificationsAsync();
      console.log(notifications);
      setNotifications(notifications);
      console.log(notifications[0].trigger?.dateComponents);
    } catch (error) {
      console.log("Errore nel recuperare le notifiche programmate:", error);
    }
  };

  useEffect(() => {
    fetchScheduledNotifications();
  }, []);

  const onClearNotifications = () => {
    Notifications.cancelAllScheduledNotificationsAsync()
      .then(() => showToast("success", "Cancelled all notifications scheduled"))
      .catch(() => showToast("error", "Error occured"));
  };

  const currentTimer = useMemo(() => {
    if (notifications.length) {
      const firstNotificationTrigger = notifications[0]?.trigger ?? {};
      if (
        firstNotificationTrigger &&
        "dateComponents" in firstNotificationTrigger
      ) {
        return `${firstNotificationTrigger.dateComponents.hour}:${firstNotificationTrigger.dateComponents.minute}`;
      }
    }
  }, [notifications]);

  return (
    <View style={styles.container}>
      <View style={styles.containerNotifications}>
        <Text style={styles.label}>Daily schedule</Text>
        <HourModal
          onConfirm={function (val: Date): void {
            setDailyNotification({
              hour: val.getHours(),
              minute: val.getMinutes(),
              type: SchedulableTriggerInputTypes.DAILY,
            });
          }}
        />

        <Text>Currently active notifications: {notifications.length}</Text>
        <Text>at time: {currentTimer}</Text>

        <Notify navigation={navigation} trigger={dailyNotification}></Notify>
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
    </View>
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
