import { clear } from "@/utils/AsyncStorage";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { PillType } from "../pills/PillType";

const PillForm = () => {
  const [pillType, setPillType] = useState("");

  const clearData = () => {
    clear();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pill Type</Text>
      <PillType />

      <View>
        <Button onPress={clearData} mode="contained-tonal">
          Clear data
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  picker: {
    height: 50,
    marginBottom: 16,
  },
  dateText: {
    marginVertical: 16,
  },
});

export default PillForm;
