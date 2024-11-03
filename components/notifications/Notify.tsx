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

const Notify: FC<Props> = ({ trigger }) => {
  const [notificationPermissions, setNotificationPermissions] =
    useState<PermissionStatus>(PermissionStatus.UNDETERMINED);
  const [isUserSetNotification, setIsUserSetNotification] = useState(false);

  const scheduleNotification = (
    trigger: NotificationTriggerInput = { seconds: 2 }
  ) => {
    Notifications.cancelAllScheduledNotificationsAsync().then(() => {
      setIsUserSetNotification(true);
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
      Notifications.scheduleNotificationAsync(schedulingOptions)
        .then(() => {
          showToast();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const handleResponseNotification = (notification: NotificationResponse) => {
    const { userText } = notification;
    if (userText) {
      const isNumber = parseInt(userText);
      if (!isNaN(isNumber)) {
        const seconds = isNumber * 60;
        scheduleNotification({ seconds });
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
    if (isUserSetNotification) {
      const listener = Notifications.addNotificationResponseReceivedListener(
        handleResponseNotification
      );
      return () => listener.remove();
    }
  }, [notificationPermissions]);

  return (
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
  );
};

registerRootComponent(Notify);

export default Notify;
