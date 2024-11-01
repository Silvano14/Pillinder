import { registerRootComponent } from "expo";
import { PermissionStatus } from "expo-modules-core";
import * as Notifications from "expo-notifications";
import {
  DailyTriggerInput,
  Notification,
  NotificationResponse,
  NotificationTriggerInput,
} from "expo-notifications";
import React, { FC, useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { DefaultSnackbar } from "../snackbar/DefaultSnackbar";
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

type Props = { trigger: DailyTriggerInput };

const Notify: FC<Props> = ({ trigger }) => {
  const [isVisibleSnackbar, setIsVisibleSnackbar] = useState(false);
  const [notificationPermissions, setNotificationPermissions] =
    useState<PermissionStatus>(PermissionStatus.UNDETERMINED);

  const scheduleNotification = (
    trigger: NotificationTriggerInput = { seconds: 2 }
  ) => {
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
        setIsVisibleSnackbar(true);
        showToast();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNotification = (notification: Notification) => {
    // Prende la notifica quando l'app è attiva
    const content = notification.request.content;
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
    const listener =
      Notifications.addNotificationReceivedListener(handleNotification);
    return () => listener.remove();
  }, [notificationPermissions]);

  useEffect(() => {
    if (notificationPermissions !== PermissionStatus.GRANTED) return;
    const listener = Notifications.addNotificationResponseReceivedListener(
      handleResponseNotification
    );
    return () => listener.remove();
  }, [notificationPermissions]);

  return (
    <>
      <Button mode="contained" onPress={() => scheduleNotification(trigger)}>
        Schedule notifications
      </Button>
      <DefaultSnackbar visible={isVisibleSnackbar}></DefaultSnackbar>
    </>
  );
};

registerRootComponent(Notify);

export default Notify;
