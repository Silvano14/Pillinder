import React from "react";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

export const Notifications = () => {
  const pushNotification = () => {
    PushNotificationIOS.addNotificationRequest({
      alertTitle: "hello",
    });
  };

  return (
    <div>
      <button onClick={pushNotification}>notifica</button>
    </div>
  );
};
