import * as Notifications from "expo-notifications";
import {
  DailyTriggerInput,
  NotificationRequest,
  SchedulableTriggerInputTypes,
} from "expo-notifications";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Toast, { ToastShowParams } from "react-native-toast-message";
import Notify from "../notifications/Notify";
import { HourModal } from "../time/HourModal";

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
      setNotifications(notifications);
    } catch (error) {
      console.log("Errore nel recuperare le notifiche programmate:", error);
    }
  };

  useEffect(() => {
    fetchScheduledNotifications();
  }, []);

  const onClearNotifications = () => {
    Notifications.cancelAllScheduledNotificationsAsync()
      .then(() => {
        showToast("success", "Cancelled all notifications scheduled");
      })
      .catch((err) => {
        console.error(err);
        showToast("error", "Error occured");
      });
  };

  const currentTimer = useMemo(() => {
    if (notifications.length) {
      const firstNotificationTrigger = notifications[0]
        ?.trigger as DailyTriggerInput;
      if (
        firstNotificationTrigger &&
        typeof firstNotificationTrigger === "object" &&
        "dateComponents" in firstNotificationTrigger
      ) {
        const dateComponents = firstNotificationTrigger.dateComponents as {
          hour: number;
          minute: number;
        };
        return `${dateComponents.hour}:${dateComponents.minute
          .toString()
          .padStart(2, "0")}`;
      }
    }
    return "No notifications scheduled";
  }, [notifications]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add a reminder</Text>
        <View style={{ height: 130 }}>
          <TextInput label="Medicine name" mode="outlined"></TextInput>
          <TextInput label="How often" mode="outlined"></TextInput>
        </View>
        <View style={styles.reminderContainer}>
          <HourModal
            onConfirm={function (val: Date): void {
              setDailyNotification({
                hour: val.getHours(),
                minute: val.getMinutes(),
                type: SchedulableTriggerInputTypes.DAILY,
              });
            }}
          />
          <Text style={styles.labelHour}>{currentTimer}</Text>
        </View>
        <View>
          <View>
            <Notify
              navigation={navigation}
              trigger={dailyNotification}
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
        </View>
      </View>
      <Button mode="contained">Save reminder</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    justifyContent: "space-between",
  },
  labelHour: {
    fontSize: 20,
  },
  content: {
    gap: 4,
  },
  reminderContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Configuration;
