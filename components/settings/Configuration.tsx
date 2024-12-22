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
      <View style={styles.containerNotifications}>
        <View style={styles.title}>
          <Text style={styles.label}>Scheduler</Text>
        </View>
        <View style={styles.datePickerContainer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <HourModal
              onConfirm={function (val: Date): void {
                setDailyNotification({
                  hour: val.getHours(),
                  minute: val.getMinutes(),
                  type: SchedulableTriggerInputTypes.DAILY,
                });
              }}
            />
            <Text>
              selected: {dailyNotification?.hour ?? "-"}:
              {dailyNotification?.minute.toString().padStart(2, "0") ?? "-"}
            </Text>
          </View>
        </View>
        <View style={styles.containerSchedulation}>
          <Text>Currently active notifications at time: {currentTimer}</Text>

          <View style={styles.containerButtons}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 4,
  },
  title: {
    paddingInline: 10,
    borderBottomWidth: 1,
  },
  containerSchedulation: {
    paddingInline: 10,
    gap: 4,
  },
  containerButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 2,
  },
  datePickerContainer: {
    alignItems: "flex-start",

    flexDirection: "row",
    gap: 1,
  },
  containerNotifications: {
    padding: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    gap: 4,
  },
  label: {
    fontSize: 25,
    paddingBottom: 8,
  },
});

export default Configuration;
