import { registerRootComponent } from "expo";
import { PermissionStatus } from "expo-modules-core";
import * as Notifications from "expo-notifications";
import {
  DailyTriggerInput,
  Notification,
  NotificationResponse,
} from "expo-notifications";
import React, { FC, useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { DefaultSnackbar } from "../snackbar/DefaultSnackbar";

Notifications.setNotificationCategoryAsync("welcome", [
  {
    buttonTitle: "Start",
    identifier: "first",
    options: {
      opensAppToForeground: true,
    },
  },

  {
    buttonTitle: "Reject",
    identifier: "second",
    options: {
      opensAppToForeground: false,
    },
  },
  {
    buttonTitle: "Respond with text",
    identifier: "third",
    textInput: {
      submitButtonTitle: "Submit button",
      placeholder: "Placeholder text",
    },
  },
]);

type Props = { trigger: DailyTriggerInput };

const Notify: FC<Props> = ({ trigger }) => {
  const [isVisibleSnackbar, setIsVisibleSnackbar] = useState(false);
  const [notificationPermissions, setNotificationPermissions] =
    useState<PermissionStatus>(PermissionStatus.UNDETERMINED);

  const scheduleNotification = () => {
    const schedulingOptions = {
      content: {
        title: "This is a notification",
        body: "This is the body",
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        color: "blue",
        categoryIdentifier: "welcome",
      },
      trigger: { seconds: 2 },
    };
    Notifications.scheduleNotificationAsync(schedulingOptions)
      .then(() => {
        setIsVisibleSnackbar(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNotification = (notification: Notification) => {
    // Prende la notifica quando l'app è attiva
    const content = notification.request.content;
    console.warn("content", content);
  };

  const handleResponseNotification = (notification: NotificationResponse) => {
    const content = notification.actionIdentifier;
    console.warn("actionIdentifier", content);
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
      <Button mode="contained" onPress={() => scheduleNotification()}>
        Schedule notifications
      </Button>
      <DefaultSnackbar visible={isVisibleSnackbar}></DefaultSnackbar>
    </>
  );
};

registerRootComponent(Notify);

export default Notify;
