import { clear } from "@/utils/AsyncStorage";
import { DailyTriggerInput } from "expo-notifications";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { DefaultHelperText } from "../DefaultHelperText/DefaultHelperText";
import Notify from "../notifications/Notify";
import { PillType } from "../pills/PillType";

const PillForm = () => {
  const [dailyNotification, setDailyNotification] = useState<DailyTriggerInput>(
    {
      hour: 20,
      minute: 0,
      repeats: true,
    }
  );

  const clearData = () => {
    clear();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.label}>Pill Type</Text>
      <PillType />
      <View>
        <Button onPress={clearData} mode="contained-tonal">
          Clear data
        </Button>
      </View>

      <View style={styles.containerNotifications}>
        <Text style={styles.label}>Daily</Text>
        <View style={styles.contentNotifications}>
          <TextInput
            label={"Hour"}
            value={dailyNotification.hour.toString()}
            onChangeText={(e) => {
              setDailyNotification({ ...dailyNotification, hour: parseInt(e) });
            }}
          />
        </View>
        <View style={styles.contentNotifications}>
          <TextInput
            label={"Minutes"}
            value={dailyNotification.minute.toString()}
            onChangeText={(e) => {
              setDailyNotification({
                ...dailyNotification,
                minute: parseInt(e),
              });
            }}
          />
        </View>
      </View>
      <Notify trigger={dailyNotification}></Notify>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 4,
  },
  containerNotifications: {
    padding: 8,
    backgroundColor: "gray",
    borderRadius: 20,
    flexDirection: "row",
  },
  contentNotifications: {
    flexDirection: "row",
  },
  hourInput: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default PillForm;
