import { CalendarTracker } from "@/components/calendar/CalendarTracker";
import Notify from "@/components/notifications/Notify";
import React from "react";
import { View } from "react-native";

export default function Index() {
  return (
    <View>
      <CalendarTracker></CalendarTracker>
      <Notify />
    </View>
  );
}
