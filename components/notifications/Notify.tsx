import { registerRootComponent } from "expo";
import { PermissionStatus } from "expo-modules-core";
import * as Notifications from "expo-notifications";
import { Notification } from "expo-notifications";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";

const Notify = () => {
  const [notificationPermissions, setNotificationPermissions] =
    useState<PermissionStatus>(PermissionStatus.UNDETERMINED);

  const scheduleNotification = (seconds: number) => {
    const schedulingOptions = {
      content: {
        title: "This is a notification",
        body: "This is the body",
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        color: "blue",
      },
      trigger: {
        seconds: seconds,
      },
    };
    Notifications.scheduleNotificationAsync(schedulingOptions);
  };

  const handleNotification = (notification: Notification) => {
    const { title } = notification.request.content;
    console.warn(title);
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

  return <Button onPress={() => scheduleNotification(1)} title="Notify" />;
};

registerRootComponent(Notify);

export default Notify;
