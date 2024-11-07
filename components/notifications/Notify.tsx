import { mergeItem } from "@/utils/AsyncStorage";
import { registerRootComponent } from "expo";
import { PermissionStatus } from "expo-modules-core";
import * as Notifications from "expo-notifications";
import {
  DailyTriggerInput,
  NotificationResponse,
  NotificationTriggerInput,
} from "expo-notifications";
import React, { FC, useEffect, useState } from "react";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";

Notifications.setNotificationCategoryAsync("welcome", [
  {
    buttonTitle: "I take it!",
    identifier: "takeIt",
    options: {
      opensAppToForeground: true,
    },
  },

  {
    buttonTitle: "Dismiss",
    identifier: "dismiss",
    options: {
      opensAppToForeground: false,
    },
  },
  {
    buttonTitle: "Repeat in...",
    identifier: "repeat",
    textInput: {
      submitButtonTitle: "Save",
      placeholder: "Minutes..",
    },
    options: {
      opensAppToForeground: false,
    },
  },
]);

const showToast = () => {
  Toast.show({
    type: "success",
    text1: "Saved!",
  });
};

type Props = { trigger: DailyTriggerInput | undefined };

const Notify: FC<Props> = ({ trigger, navigation }) => {
  const [notificationPermissions, setNotificationPermissions] =
    useState<PermissionStatus>(PermissionStatus.UNDETERMINED);

  const scheduleNotification = (
    trigger: NotificationTriggerInput = { seconds: 2 }
  ) => {
    Notifications.cancelAllScheduledNotificationsAsync().then(() => {
      const schedulingOptions = {
        content: {
          title: "Pill reminder",
          body: "You have to take the pill",
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          color: "blue",
          categoryIdentifier: "welcome",
        },
        trigger,
      };
      if (schedulingOptions) {
        Notifications.scheduleNotificationAsync(schedulingOptions)
          .then(() => {
            showToast();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  const handleResponseNotification = (notification: NotificationResponse) => {
    if (
      notification.actionIdentifier ===
      "expo.modules.notifications.actions.DEFAULT"
    ) {
      navigation.navigate("Calendar");
    }

    if (notification.actionIdentifier === "takeIt") {
      const date = new Date().toISOString().split("T")[0];
      navigation.navigate("Calendar");

      mergeItem("dates", {
        [date]: {
          marked: true,
        },
      });
    }

    if (notification.actionIdentifier === "repeat") {
      if (notification.userText) {
        const isNumber = parseInt(notification.userText);
        if (!isNaN(isNumber)) {
          const seconds = isNumber * 60;
          scheduleNotification({ seconds });
        }
      }
    }
  };

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setNotificationPermissions(status);
    return status;
  };

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  useEffect(() => {
    if (notificationPermissions !== PermissionStatus.GRANTED) return;
    const listener = Notifications.addNotificationResponseReceivedListener(
      handleResponseNotification
    );
    return () => listener.remove();
  }, [notificationPermissions]);

  return (
    <>
      <Button
        mode="contained"
        style={{ opacity: trigger ? 1 : 0.5 }}
        onPress={() => {
          if (trigger) {
            scheduleNotification(trigger);
          }
        }}
      >
        Schedule notifications
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          scheduleNotification();
        }}
      >
        2 second
      </Button>
    </>
  );
};

registerRootComponent(Notify);

export default Notify;
