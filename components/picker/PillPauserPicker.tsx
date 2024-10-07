import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import the Picker

const PillPausePicker = () => {
  const [pauseDays, setPauseDays] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Your Pill Pause Regimen</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={pauseDays}
          style={styles.picker}
          onValueChange={(itemValue) => setPauseDays(itemValue)}
        >
          <Picker.Item label="Select pause days" value="" />
          <Picker.Item label="21 days of pill + 7 days of pause" value="21+7" />
          <Picker.Item label="24 days of pill + 4 days of pause" value="24+4" />
          <Picker.Item label="28 days of pill (no pause)" value="28" />
          <Picker.Item label="63 days of pill + 7 days of pause" value="63+7" />
          <Picker.Item label="Continuous cycle (no pause)" value="continuous" />
        </Picker>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  resultText: {
    marginTop: 16,
    fontSize: 16,
  },
});

export default PillPausePicker;
