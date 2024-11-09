import { StartDate } from "@/components/settings/StartDate";
import React from "react";
import { StyleSheet, View } from "react-native";

const startDate = () => {
  return (
    <View style={styles.container}>
      <StartDate />
    </View>
  );
};

export default startDate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
